@extends('email_base')
@push('css')

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
					src="https://admin.neuma.church/images/register.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					You've been invited to register
				</strong>

				<p>
					You are invited you to access {{ $org->name ?? 'an organization'}} on Love-Lives Generously. 
					Click this button bellow to create your account
				</p>

				<div class="cta-container">
					<a href="{{ $url }}">
					<button>
					Complete Your Account
					</button>
					</a>
				</div>

				<p class="note">
					This invitation will expire on {{ $expires->format('jS M Y') }}
				</p>
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
				<p>Long long address here please,</p>
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