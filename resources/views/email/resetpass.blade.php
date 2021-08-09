@extends('email_base')
@push('css')
<style type="text/css">
	.wrapper {
		height: 100%;
		background: #f2f2f2;
		margin: 0 auto;
	}

	.container {
		width: 60%;
		margin: 0 auto;
		padding-bottom: 20px;
	}

	.content {
		background: white;
		padding: 20px 30px;
		border-radius: 8px;
	}

	.img {
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding: 50px 0;
	}

	strong {
		color: #92A9AB;
		font-size: 23px;
		font-weight: bolder;
	}

	p {
		font-size: 16px;
		font-weight: normal;
	}

	p.note {
		color: #c6c6c6;
	}

	button {
		color: #fff;
		background: #cf995f;
		border: 1px solid #cf995f;
		width: 400px;
		padding: 15px 10px;
		border-radius: 24px;
		margin-top: 15px;
		margin-bottom: 20px;
	}

	.social-icons {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50px;
		margin-bottom: 25px;
	}

	.social-icons img {
		margin: 0 40px;
	}

	.divider {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50px;
		margin-bottom: 50px;
	}

	.divider div {
		width: 100%;
		border: 2px solid #d4d4d4;
		margin: 0 50px; 
	}

	h2 span { 
		background:#fff; 
		padding:0 10px; 
	}

	.bottom {
		text-align: center;
	}

	.address {
		margin-bottom: 50px;
	}
</style>
@endpush
@section('content')
	<div class="wrapper">
		<div class="container">
			<img 
				src="{{asset('images/neuma-logo.png')}}"
				alt="image"
				class="img"
				width="180px"
			/>

			<div class="content">
				<img 
					src="{{asset('images/reset-pass.png')}}"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					Hello {{$user->name}},
				</strong>

				<p>
					It seems you forgot your password for your Neuma account. You can change your password by clicking the button below
				</p>

				<div class="cta-container">
					<a href="{{ $url }}">
					<button>
						Reset Password
					</button>
					</a>
				</div>

				<p class="note">
					The above link is only meant for you. Please don’t share it with anyone. The link will expire in 24 hours.
				</p>
			</div>

			<div class="social-icons">
				<img 
					src="{{asset('images/icon-facebook.png')}}"
					with="35"
					height="35"
					alt="image"
				/>
				<img 
					src="{{asset('images/icon-twitter.png')}}"
					with="35"
					height="35"
					alt="image"
				/>
				<img 
					src="{{asset('images/icon-instagram.png')}}"
					with="35"
					height="35"
					alt="image"
				/>
			</div>

			<div class="divider">
				<div></div>
				<img 
					src="{{asset('images/neuma-icon.png')}}"
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