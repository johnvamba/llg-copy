@extends('email_base')
@push('css')
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
@endpush
@section('content')
<div style="width: auto; margin:auto;">
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
</div>
@endsection
@push('js')
<script>
	(function(){
		window.print();
		window.onafterprint = function(){ window.close() };
	})();
</script>
@endpush