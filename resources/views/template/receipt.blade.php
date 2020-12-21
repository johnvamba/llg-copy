@push('css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/fontawesome.min.css" integrity="sha512-8jdwayz5n8F2cnW26l9vpV6+yGOcRAqz6HTu+DQ3FtVIAts2gTdlFZOGpYhvBMXkWEgxPN3Y22UWyZXuDowNLA==" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/brands.min.css" integrity="sha512-AMDXrE+qaoUHsd0DXQJr5dL4m5xmpkGLxXZQik2TvR2VCVKT/XRPQ4e/LTnwl84mCv+eFm92UG6ErWDtGM/Q5Q==" crossorigin="anonymous" />
<style type="text/css">
	.receipt * {
		font-family: InterRegular;
	}
	.receipt i.fab {
		font-family: 'Font Awesome 5 Brands';
		    color: #8992A6;
	}
	.receipt {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 35px;
	}
	.receipt > div {
		margin-bottom: 35px;
	}
	.receipt > div:last-child {
		margin: 0px !important;
	}
	.receipt > .receipt-header {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.receipt > .receipt-header > img.rounded-img {
		width: 80px !important;
		height: 80px !important;
		margin-right: 10px;
		border-radius: 40px;
	}
	.receipt > .receipt-header > * {
		display: inline-block;
		text-align: right;
	}
	.receipt > .receipt-header address {
		font-style: normal;
	    font-weight: 500;
	    font-size: 14px;
	    line-height: 150%;
	    text-align: right;
	    letter-spacing: 0.01em;
	    color: #98999B;
	    margin: 0;
	}
	.receipt > .receipt-body {
		padding: 35px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.08);
		border-top: 1px solid rgba(0,0,0,0.08);
	}
	.receipt > .receipt-summary {
		
	}
	.receipt > .receipt-summary ul {
		margin: 0;
		padding: 0;
		background: #F3F3F3;
	}
	.receipt > .receipt-summary ul li {
		display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding: 20px;
	    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}
	.receipt > .receipt-summary ul li:last-child {
		font-weight: 600;
		border: 0px;
	}

	.receipt > .receipt-footer {
		background: #31313F;
    	padding: 25px;
	}
	.receipt > .receipt-footer p {
		padding: 18px 0 0;
	    font-style: normal;
	    font-weight: normal;
	    font-size: 12px;
	    line-height: 160%;
	    text-align: center;
	    letter-spacing: 0.01em;
	    color: #848DA0;
	    width: 100%;
	    max-width: 280px;		
	    margin: 0 auto;
	}
	.receipt > .receipt-footer ul {
		display: flex;
		margin: 0;
		padding: 0;
		align-items: center;
    	justify-content: center;
	}
	.receipt > .receipt-footer ul li {
		margin: 0 6px;
	    background: rgba(137, 146, 166, 0.08);
	    border-radius: 50px;
	    width: 100%;
	    max-width: 27.13px;
	    height: 27.13px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
</style>
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