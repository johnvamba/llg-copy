@extends('pdf')
@push('css')
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.26.1/apexcharts.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.26.1/apexcharts.min.css" rel="stylesheet">
<style type="text/css">
	* {
		font-family: 'Inter', 'Arial', sans-serif;
	}
	.header {
		width: 100%;
	    height: 80px;
	    margin: 0 auto;
	    display: flex;
	    align-items: center;
	    background-color: #587B7F;
	    justify-content: center;
	    align-content: center;
	}
</style>
@endpush
@section('content')
<div>
	<div class="header">
		<img 
			src="{{ asset('images/neuma-logo-white.png') }}"
			alt="image"
			class="img"
			width="150px" 
		/>
	</div>
	<h1>Neuma Report</h1>
	<div class="graph">
		<div id="chart"></div>
	</div>
	<div class="content" style="width: auto; margin:auto;">
		<table class="table">
			<thead>
				<tr>
					<th>Donors</th>
					<th>Organisation</th>
					<th>Amount</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				@forelse($needs as $need)
				<tr>
					<td>{{ $need->title }}</td>
					<td>{{ optional($need->organization)->name }}</td>
					<!-- <td>Added By</td> -->
					<td>$ {{ number_format(0, 2) }}</td>
					
					<td>{{ optional($need->created_at)->format('m/d/Y') }}</td>
				</tr>
				@empty
				<tr>
					<td colspan="7">No need listing found on your query</td>
				</tr>
				@endforelse
			</tbody>
		</table>
		{{--
		<table class="table">
			<thead class="thead-dark">
				<tr>
					<th>Need</th>
					<th>Organization</th>
					<!-- <th>Created By</th> -->
					<th>Type of Need</th>
					<th>Goal</th>
					<th>Raised</th>
					<th>Status</th>
					<th>Date Added</th>
				</tr>
			</thead>
			<tbody>
				@forelse($needs as $need)
				<tr>
					<td>{{ $need->title }}</td>
					<td>{{ optional($need->organization)->name }}</td>
					<!-- <td>Added By</td> -->
					<td>{{ optional($need->type)->name }}</td>
					<td>{{ number_format($need->Goal, 2) }}</td>
					<td>{{ number_format($need->raised, 2) }}</td>
					<td>
						@if(is_null($need->approved_at))
							Pending
				        @elseif($need->raised >= $need->goal)
				            Achieved
				        @else 
				            On-going
				        @endif
					</td>
					<td>{{ optional($need->created_at)->format('m/d/Y') }}</td>
				</tr>
				@empty
				<tr>
					<td colspan="7">No need listing found on your query</td>
				</tr>
				@endforelse
			</tbody>
		</table>
			--}}
	</div>
<div>
@endsection
@push('js')
<script>
	(function(){
		const options = {
	        	series: [{
		            name: 'Donations',
		            data: [2,3,5]
		        }, {
		            name: 'Fundraise',
		            data: [1,5,4]
		        }, {
		            name: 'Volunteer',
		            data: [2,1,0]
		        }],
	            title: {
	                text: 'Needs',
	                align: 'left',
	                offsetY: 20,
	                style: {
	                    fontWeight: 'thin'
	                }
	            },
	            theme: {
	                mode: 'light', 
	                monochrome: {
	                    enabled: true,
	                    color: '#AA6E2D',
	                    shadeTo: 'light',
	                    shadeIntensity: 0.65
	                },
	            },
	            chart: {
	                type: 'bar',
	                height: '500px',
	                toolbar: {
	                    show: false
	                }
	            },
	            legend: {
	                position: 'top',
	                horizontalAlign: 'right',
	                offsetY: -10,
	            },  
	            plotOptions: {
	                bar: {
	                    horizontal: false,
	                    columnWidth: '55%',
	                    borderRadius: 15,
	                    // endingShape: 'rounded'
	                },
	            },
	            dataLabels: {
	                enabled: false
	            },
	            stroke: {
	                show: true,
	                width: 2,
	                colors: ['transparent']
	            },
	            xaxis: {
	                categories: ['Test 1', "Test 2", "Test 3"]
	                // categories: ['Jan '+data.year, 'Feb '+data.year, 'Mar '+data.year, 'Apr '+data.year, 'May '+data.year, 'Jun '+data.year, 'Jul '+data.year, 'Aug '+data.year, 'Setp '+data.year, 'Oct '+data.year, 'Nov '+data.year, 'Dec '+data.year],
	            },
	            fill: {
	                opacity: 1
	            },
	            tooltip: {
	                y: {
	                    formatter: function (val) {
	                        return val
	                    }
	                }
	            },
	            grid: {
	                show: true,
	                strokeDashArray: 3
	            }
	        }
		var chart = new ApexCharts(document.querySelector("#chart"), options);
		chart.render();

		window.print();
		//window.onafterprint = function(){ window.close() };
	})();
</script>
@endpush