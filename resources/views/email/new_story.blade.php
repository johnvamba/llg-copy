@extends('email_base')
@push('css')
<style type="text/css">
	.content .title h4{
		font-family: Inter;
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
		line-height: 150%;
		letter-spacing: 0.015em;
		position: relative;
		margin: 0px;
	}
	.content .title h4 span {
		position: absolute;
		font-family: Inter;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #98999B;
		right: 0px;
	}
	.pre-content {
	    position: relative;
		border-radius: 4px 4px 0px 0px;
		margin-bottom: -5px;
		background: #829C9F;
		padding: 30px 20px;
	}
	.pre-content h2 {
		font-family: Inter;
		font-style: normal;
		font-weight: bold;
		font-size: 20px;
		line-height: 150%;
		/* identical to box height, or 30px */

		letter-spacing: 0.015em;
		margin: 0px;
		color: #FFFFFF;
	}
	.pre-content p {
		font-style: normal;
		font-weight: normal;
		font-size: 11px;
		line-height: 170%;
		letter-spacing: 0.015em;
		margin: 0px;
		color: #FFFFFF;
	}
	.content .title .categories {
		color: #cf995f;
	}
	.content img {
		padding: 20px 0px;
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
			<div class="pre-content">
				<h2>New Story was Published</h2>
				<p>A need has been acheived! Thank you for your help!</p>
			</div>
			<div class="content">
				<img 
					src="{{$photo ?? 'https://admin.neuma.church/images/register.png'}}"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				<div class="title">
					<h4>{{$story->title}} <span>{{ optional($story->posted_at)->format('m/d/y') ?? now()->format('m/d/y')}}</span></h4>
					<div class="categories">
						@foreach($story->categories as $cat)
						<span>{{$cat->name}}</span>
						@endforeach
					</div>
				</div>
				<p>
					{{$story->short_description}}
				</p>

				<a href="{{ $url }}">
				<button>
					Continue Reading
				</button>
				</a>
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