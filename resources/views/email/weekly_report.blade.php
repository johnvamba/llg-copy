@extends('email_base')
@push('css')
<style type="text/css">
	.wrapper::before{
		height: 380px;
		width: 100%;
	    background-color: #587B7F;
	    content: '';
	    position: absolute;
	    z-index: 1;
	}
	.container {
		position: relative;
		z-index: 2;
	}
	.report-header {
		font-family: Inter, Arial;
		font-style: normal;
		font-weight: bold;
		font-size: 20px;
		line-height: 150%;
		color: #404040;
		margin: 0;
		margin-bottom: 3px;
		text-align: center;
	}
	.report-date {
		font-family: Inter, Arial;
		font-style: normal;
		font-weight: normal;
		font-size: 11px;
		line-height: 150%;
		margin: 0;
		color: #231F20;
		text-align: center;
	}
	.panels .panel {
		display: inline-block;
		width: 32%;
	}
	.panel h4.value {
		font-family: Inter, Arial;
		font-style: normal;
		font-weight: bold;
		font-size: 20px;
		line-height: 150%;
		color: #404040;
		margin: 0 0 5px;
	}
	.panel p.label {
		font-family: Inter;
		font-style: normal;
		font-weight: normal;
		font-size: 11px;
		line-height: 150%;
		color: #969696;
		margin: 0 0 5px
	}
	.login-panel {
		height: auto;
		background-color: #587B7F;
		padding: 25px 0px;
		border-radius: 0px 0px 10px 10px;
	}
	.login-panel > * {
		display: inline-block;
		width: 49.5%;
		vertical-align: top;
	}
	.login-panel h4, .login-panel p {
		font-family: Inter, Arial;
		font-style: normal;
		line-height: 150%;
		color: #FFFFFF;
		margin: 0;
	}
	.login-panel h4 {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 10px;
	}
	.login-panel p {
		font-weight: normal;
		font-size: 12px;
		word-wrap: 
	}
	a.btn button {
		width: auto;
		background: #CF995F;
		border-radius: 4px;
	}
</style>
@endpush
@section('content')
	<div class="wrapper">
		<div class="container">
			<img 
				src="http://admin.neuma.church/images/neuma-logo-white.png"
				alt="image"
				class="img"
				width="180px"
			/>

			<div class="content">
				<h4 class="report-header">Your Weekly Report</h4>
				<p class="report-date">From {{ $startDate->toFormattedDateString() }} to {{ $endDate->toFormattedDateString() }} </p>
				<img 
					src="http://admin.neuma.church/images/weekly-report.png"
					alt="image"
					class="img"
				/>
				<div class='panels'>
					<div class="panel">
						<img 
							src="http://admin.neuma.church/images/donation-email.png"
							alt="image"
							class="img-panel"
						/>
						<h4 class="value">${{ $donations }}</h4>
						<p class="label">Total Donation Raised</p>
					</div>
					<div class="panel">
						<img 
							src="http://admin.neuma.church/images/volunteers.png"
							alt="image"
							class="img-panel"
						/>
						<h4 class="value">{{ $volunteers }}</h4>
						<p class="label">New Volunteers</p>
					</div>
					<div class="panel">
						<img 
							src="http://admin.neuma.church/images/contributors.png"
							alt="image"
							class="img-panel"
						/>
						<h4 class="value">{{ $contributions }}</h4>
						<p class="label">Total Contributions</p>
					</div>
				</div>
			</div>
			<div class="login-panel">
				<img 
					src="http://admin.neuma.church/images/loginimage.png"
					alt="image"
					class="img-panel"
				/>
				<div>
					<h4>Login to see more</h4>
					<p>Check out full details of these transaction in the portal.</p>
					<a class="btn" href="{{ $url ?? '#' }}">
						<button>
							Login Now
						</button>
					</a>
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
