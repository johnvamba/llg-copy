@extends('email_base')
@push('css')
<style type="text/css">

	.table tbody tr td.first-td {
		text-align: left;
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 170%;
		vertical-align: text-top;
		letter-spacing: 0.015em;
		color: #000000;
		opacity: 0.5;
	}
	.table tbody tr td.last-td {
		text-align: right;
		font-family: Poppins, Arial;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 170%;
		letter-spacing: 0.015em;
		color: #000000;
		opacity: 0.7;
	}
	.table {
	    border-spacing: 0px 15px;
	}
	.table tbody tr td.register {
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		line-height: 170%;
		/* or 20px */
		text-align: right;
		letter-spacing: 0.015em;
		color: #52CC8A;
		opacity: 0.7;
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
					src="https://admin.neuma.church/images/new-org.png"
					width="400"
					height="250"
					alt="image"
					class="img"
				/>
				
				<strong>
					New Organization Signed Up
				</strong>

				<p>
					<span>{{ $org->name ?? 'an organization'}}</span> has submitted an application request for an organization account on Neuma.
					<br/>
					<br/>
					<br/>
					Here are the details:
				</p>
				<table class="table">
					<thead>
						<th style="width: 20%"></th>
						<th style="width: 80%"></th>
					</thead>
					<tbody>
						<tr>
							<td class="first-td">Organisation Name: </td>
							<td class="last-td">{{ $org->name ?? 'Organisation' }}</td>
						</tr>
						<tr>
							<td class="first-td">Website: </td>
							<td class="last-td">{{ $org->site }}</td>
						</tr>
						<tr>
							<td class="first-td">Phone Number: </td>
							<td class="last-td"> {{ $org->phone_number }}</td>
						</tr>
						<tr>
							<td class="first-td">Email Address: </td>
							<td class="last-td">{{$org->email}}</td>
						</tr>
						<tr>
							<td class="first-td">About: </td>
							<td class="last-td"> {{$org->description}}</td>
						</tr>
						<tr>
							<td class="first-td">ACNC Registered: </td>
							<td class="register">{{$org->acnc ? 'YES' : 'NO'}}</td>
						</tr>
						<tr>
							<td class="first-td">Fundraising Registered: </td>
							<td class="register">{{$org->fundraiser ? 'YES' : 'NO'}}</td>
						</tr>
						<tr>
							<td class="first-td">Liability Insured: </td>
							<td class="register">{{$org->insured ? 'YES' : 'NO'}}</td>
						</tr>
					</tbody>
				</table>
				<div class="cta-container">
					<a href="{{ $url }}">
					<button>
						Approve Account
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
	</div>
@endsection