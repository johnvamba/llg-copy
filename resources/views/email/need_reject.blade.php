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
					src="https://admin.neuma.church/images/need-disapprove.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					Your Need Request has not been approved.
				</strong>

				<p>
					So sorry, your request for {{ $need->title ?? 'need-title'}} was not appoved. If you have concerns, please contact us.
				</p>

				<div class="cta-container">
					<a href="{{ $url }}">
					<button>
						Contact Neuma Care
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