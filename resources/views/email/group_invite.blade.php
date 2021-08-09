@extends('email_base')
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
					src="https://admin.neuma.church/images/register.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>Dear {{$user['name'] ?? 'User'}}, </strong>

				<p>
					You are invited to join {{ $group->name ?? 'a group' }} on Love-Lives Generously.
					<br/>
					Sign-in and be up-to-date with your local community.
					<br/>
					<br/>
					Warm welcome.
					<br/>
					<br/>
					Neuma Team
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
