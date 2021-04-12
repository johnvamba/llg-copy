@extends('email_base')
@push('css')
<style type="text/css">
	.need-container {
		padding: 10px 20px 10px 10px;
		background-color: rgba(242, 242, 242, 0.7);
		border-radius: 5px;
	}
	.need-img {
		display: inline-block;
		vertical-align: bottom;
		width: 85px;
		height: 60px;
	}
	.need-details {
		margin-left: 15px; 
		display: inline-block;
		vertical-align: bottom;
	    height: 60px;
	    width: calc(100% - 120px);
	}
	hr {
		border: 3px solid #E1E1E1;
		border-radius: 5px;
		margin: 5px 0px;
		background-color: #e1e1e1;
	}
	.need-title p{
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 170%;
		letter-spacing: 0.015em;
		color: #000000;
		opacity: 0.7;
		margin: 0px;
	}
	.need-title span {
		background-color: rgba(207, 153, 95, 0.12);
		border-radius: 50px;
		font-family: Inter, Arial;
		font-style: normal;
		font-weight: normal;
		font-size: 10px;
		line-height: 12px;
	    padding: 4px 10px;
	    float: right;
		color: #CF995F;
	}
	.need-goals p {
		margin: 0px;
		font-family: Poppins,Arial;
		font-style: normal;
		font-weight: 600;
		font-size: 10px;
		line-height: 15px;
		color: #4C4C4C;
	}
	.need-goals p span {
		float: right;
		font-weight: 500;
		font-size: 10px;
		line-height: 15px;
		letter-spacing: 0.02em;
	}
</style>
@endpush
@section('content')
	<div class="wrapper">
		<div class="container">
			<img 
				src="https://admin.neuma.church/images/neuma-logo.png"
				alt="image"
				class="img"
			/>

			<div class="content">
				<img 
					src="https://admin.neuma.church/images/need-approve.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					Your Need Request has been approved!
				</strong>

				<p>
					Your request for {{ $need->title ?? 'need-title'}} has been approved and now published on the Neuma App. Start sharing this to get to your goal
				</p>

				<div class="need-container">
					<div class="need-img" style="background-image: url('{{$need->getFirstMediaUrl('photo', 'invoice')}}')"></div>
					<div class="need-details">
						<div class="need-title">
							<p>{{ $need->title ?? 'need-title'}}<span>{{ optional($need->type)->name }}</span></p>
						</div>
						<hr>
						<div class="need-goals">
							<p>Raised: ${{ $need->raised ?? 0.00}} <span>Goal: ${{$need->goal ?? 0.00}}</span></p>
						</div>
					</div>
				</div>
			</div>

			<div class="social-icons">
				<img 
					src="https://admin.neuma.church/images/icon-facebook.png"
					with="35"
					height="35"
					alt="image"
				/>
				<img 
					src="https://admin.neuma.church/images/icon-twitter.png"
					with="35"
					height="35"
					alt="image"
				/>
				<img 
					src="https://admin.neuma.church/images/icon-instagram.png"
					with="35"
					height="35"
					alt="image"
				/>
			</div>

			<div class="divider">
				<div></div>
				<img 
					src="https://admin.neuma.church/images/neuma-icon.png"
					alt="image"
				/>
				<div></div>
			</div>

			<div class="bottom">
				<p>10 Griffiths St, Richmond VIC 3121,</p>
				<p class="address">Melbourne, Australia</p>
				<p>
					Want to cancel your subscription? 
					<span>
						<a href="#">Unsubcribe</a>
					</span>
				</p>
			</div>
		</div>
	</div>
@endsection