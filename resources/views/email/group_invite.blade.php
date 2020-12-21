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
		You are invited to join {{ $group->name ?? 'a group' }} on Love-Lives Generously.
		<br/>
		Sign-in and be up-to-date with your local community.
	</p>
	<p>Warm welcome.</p>
	<strong>Neuma Team</strong>
@endsection