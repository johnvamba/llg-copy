@extends('pdf')
@push('css')
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.26.1/apexcharts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.0/dist/js.cookie.min.js"></script>
<!-- <script src="https://printjs-4de6.kxcdn.com/print.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.26.1/apexcharts.min.css" rel="stylesheet">
<link href="{{ asset('css/print.css') }}" media="print" rel="stylesheet" />
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
<div id="printable">
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
					<th>Need</th>
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
					<th>Organisation</th>
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
		const token = Cookies.get('oToken_admin') || Cookies.get('oToken_org_admin');
		const options = {
	            title: {
	                text: 'Needs Met',
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
	                width: "1200px",
	                toolbar: {
	                    show: false
	                },
	                events: {
	                	animationEnd: function() {
		                	setTimeout(()=>{
		                		// printJS('printable', 'html'); //bati
		                		window.print()
		                	}, 100)
	                	}
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
	                    borderRadius: 10,
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
	            
	            noData: {
					text: 'Loading...'
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
		axios.get("/api/web/needs/graph", {
			headers: {
				'Authorization': "Bearer "+ token
			}
		}).then(({ data })=>{
			const { donation, fundraise, volunteer, categories } = data
			var chart = new ApexCharts(document.querySelector("#chart"), 
				{
					...options, 
		        	series: [{
			            name: 'Donations',
			            data: donation
			        }, {
			            name: 'Fundraise',
			            data: fundraise
			        }, {
			            name: 'Volunteer',
			            data: volunteer
			        }],
			        xaxis: {
		                categories
		            }
			   	});
			chart.render();
		})
	})();
</script>
@endpush