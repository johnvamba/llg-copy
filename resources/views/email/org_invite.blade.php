@extends('email_base')
@push('css')
<style type="text/css">
	* {
		font-family: InterRegular;
	}
</style>
@endpush
@section('content')
	<strong>Dear {{$user['name'] ?? 'User'}}, </strong>
	<p>
		You are invited to join {{ $org->name ?? 'an organization' }} on Love-Lives Generously.
		<br/>
		Sign-in and discuss with your favorite philanthrophists and activists.
	</p>
	<p>Warm welcome.</p>
	<strong>Neuma Team</strong>
@endsection