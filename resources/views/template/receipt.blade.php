@push('css')
<style type="text/css">
/*.receipt i.fab {
    font-family: 'Font Awesome 5 Brands';
    color: #8992A6;
    padding-top: 5px;
}*/
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
/*    display: flex;
    align-items: center;
    justify-content: center;*/
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
.receipt > .receipt-header .receipt-title{
	width: 500px;
	vertical-align: top;
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
    display: block;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.receipt > .receipt-summary ul li.last-child {
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
.receipt > .receipt-footer .receipt-link {
    display: block;
    margin: auto;
    text-align: center;
}
.receipt > .receipt-footer .receipt-link a {
    display: inline-block;
    background: rgba(137, 146, 166, 0.08);
    border-radius: 50px;
    width: 100%;
    max-width: 27.13px;
    height: 27.13px;
    margin: auto;
    margin-right: 20px;
    background-position: center;
    background-repeat: no-repeat;
}
.receipt > .receipt-footer .receipt-link a.fb{
    background-image: url(https://admin.neuma.church/images/mail-facebook.png);
}
.receipt > .receipt-footer .receipt-link a.twwt{
    background-image: url(https://admin.neuma.church/images/mail-twitter.png);
}
.receipt > .receipt-footer .receipt-link a.inst{
    background-image: url(https://admin.neuma.church/images/mail-instagram.png);
}
</style>
@endpush

@php
	$templateImage = optional($template)->getFirstMediaUrl('photo');
	$orgImage = optional($org)->getFirstMediaUrl('photo');

	$imageDefault = is_null($templateImage) ? $templateImage : (is_null($orgImage) ? $orgImage : 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp')
@endphp

<div class="receipt">
	<div class="receipt-header">
		<img class="rounded-img" src="{{ $imageDefault }}"/>
		<div class="receipt-title">
			<strong>{{ optional($org)->name ?? 'Organisation'}}</strong>
			<address>{{ optional($org)->location ?? 'Location'}}</address>
		</div>
	</div>
	<div class="receipt-body">
		<strong>Dear {{ $user->name ?? 'User'}}</strong>
		<br/>
		@if(!trim(optional($template)->html_content))
		<p>We give thanks to your generous donation. <br/> We Appreciate you helping out our organisation.</p>
		@else
			{!! optional($template)->html_content !!}
		@endif
		<!-- Content Here -->
		<strong>{{ optional($org)->name ?? 'Organisation'}}</strong>
	</div> 
	<div class="receipt-summary">
		<p>Summary</p>
		@if(empty($transacts))
		<p>No data found</p>
		@else
		<ul>
			@foreach($transacts as $key => $value)
			<li><span>{{$key ?? 'Payment'}}</span><span style="float: right">$ {{$value ?? number_format(0, 2)}}</span></li>
			@endforeach
			<li class="last-child"><span>Amount Paid</span><span style="float: right">$ {{$paid ?? number_format(0, 2)}}</span></li>
		</ul>
		@endif
	</div>
	@if( optional($template)->facebook ||
		optional($template)->instagram ||
		optional($template)->twitter ||
		optional($template)->text )
	<div class="receipt-footer">
		<div class="receipt-link">
			@if(optional($template)->facebook) 
			<a target="_blank" class="fb" href="{{ optional($template)->facebook}}"></a> 
			@endif
			@if(optional($template)->twitter) 
			<a target="_blank" class="twwt" href="{{ optional($template)->twitter}}"></a> 
			@endif
			@if(optional($template)->instagram) 
			<a target="_blank" class="inst" href="{{ optional($template)->instagram}}"></a> 
			@endif
		</div>
		@if(optional($template)->text)
			<p>{{ optional($template)->text }}</p>
		@endif 
	</div>
	@endif
</div>