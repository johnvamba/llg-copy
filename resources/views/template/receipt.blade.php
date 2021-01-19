@push('css')

@endpush

<div class="receipt">
	<div class="receipt-header">
		<img class="rounded-img" src="{{ optional($template)->getFirstMediaUrl('photo') ?? optional($org)->getFirstMediaUrl('photo') ?? 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}}"/>
		<div class="receipt-title">
			<strong>{{ optional($org)->name ?? 'Organization'}}</strong>
			<address>{{ optional($org)->location ?? 'Location'}}</address>
		</div>
	</div>
	<div class="receipt-body">
		<strong>Dear {{ $user->name ?? 'User'}}</strong>
		<br/>
		@if(!trim(optional($template)->html_content))
		<p>We give thanks to your generous donation. <br/> We Appreciate you helping out our organization.</p>
		@else
			{!! optional($template)->html_content !!}
		@endif
		<!-- Content Here -->
		<strong>{{ optional($org)->name ?? 'Organization'}}</strong>
	</div> 
	<div class="receipt-summary">
		<p>Summary</p>
		@if(empty($transacts))
		<p>No data found</p>
		@else
		<ul>
			@foreach($transacts as $key => $value)
			<li><span>{{$key ?? 'Payment'}}</span><span>$ {{$value ?? number_format(0, 2)}}</span></li>
			@endforeach
			<li><span>Amount Paid</span><span>$ {{$paid ?? number_format(0, 2)}}</span></li>
		</ul>
		@endif
	</div>
	@if( optional($template)->facebook ||
		optional($template)->instagram ||
		optional($template)->twitter ||
		optional($template)->text )
	<div class="receipt-footer">
		@if(optional($template)->facebook ||
		optional($template)->instagram ||
		optional($template)->twitter)
		<ul>
			@if(optional($template)->facebook) 
			<li><a target="_blank" href="{{ optional($template)->facebook}}"><i class="fab fa-facebook-f"></i></a></li> 
			@endif
			@if(optional($template)->twitter) 
			<li><a target="_blank" href="{{ optional($template)->twitter}}"><i class="fab fa-twitter"></i></a></li> 
			@endif
			@if(optional($template)->instagram) 
			<li><a target="_blank" href="{{ optional($template)->instagram}}"><i class="fab fa-instagram"></i></a></li> 
			@endif
		</ul>
		@endif
		@if(optional($template)->text)
			<p>{{ optional($template)->text }}</p>
		@endif 
	</div>
	@endif
</div>