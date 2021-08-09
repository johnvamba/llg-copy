@extends('email_base')
@push('css')
<style type="text/css">
	.org-container {
		padding: 10px 20px 10px 10px;
		background-color: rgba(242, 242, 242, 0.7);
		border-radius: 5px;
	}
	.org-img {
		display: inline-block;
		vertical-align: bottom;
		width: 55px;
		height: 55px;
		border-radius: 55px;
		border: 2px solid #FFFFFF;

	}
	.org-details {
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
	}
	p.org-title{
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: 600;
		font-size: 13px;
		line-height: 170%;
		letter-spacing: 0.015em;
		color: #000000;
		opacity: 0.7;
	}
	p.org-website, p.org-contacts {
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: normal;
		font-size: 10px;
		line-height: 170%;
		letter-spacing: 0.015em;
		color: #000000;
		opacity: 0.7;
	}

	p i {
		width: 10px;
		height: 10px;
		margin-right: 5px;
		display: inline-block;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
	i.website {
		background-image: url("{{ asset('/images/link.png') }}");
	}
	i.call {
		background-image: url("{{ asset('/images/phone.png') }}");
	}
	i.mail {
		margin-left: 5px;
		background-image: url("{{ asset('/images/mail.png') }}");
	}

	.org-details p {
		margin: 0;
	}
	.org-title span {
		background-color: rgba(207, 153, 95, 0.12);
		border-radius: 50px;
		font-family: Inter;
		font-style: normal;
		font-weight: normal;
		font-size: 10px;
		line-height: 12px;
	    padding: 4px 10px;
	    float: right;
		color: #CF995F;
	}
	.org-goals p {
		margin: 0px;
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: 600;
		font-size: 10px;
		line-height: 15px;
		color: #4C4C4C;
	}
	.org-goals p span {
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
				width="180px"
			/>

			<div class="content">
				<img 
					src="https://admin.neuma.church/images/org-approve.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					You have been approved!
				</strong>

				<p>
					Congratulations, your organisation has been approved by Neuma Care. You can start sharing this now and grow your organisation.
				</p>

				<div class="org-container">
					<div class="org-img" style="background-image: url('{{$org->getFirstMediaUrl('photo', 'listing')}}')"></div>
					<div class="org-details">
						<p class="org-title">{{ $org->name ?? 'org-name'}}</p>

						<p class="org-website"><i class="website"></i>{{ $org->site ?? 'org-site'}}</p>

						<p class="org-contacts">
							<i class="call"></i>{{ $org->phone_number ?? 'org-phone_number'}}
							<i class="mail"></i>{{ $org->email ?? 'org-email'}}
						</p>
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