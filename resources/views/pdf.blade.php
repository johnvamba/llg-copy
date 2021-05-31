<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Neuma Cares</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{!! asset('images/favicon.png') !!}" rel="icon" type="image/png" sizes="50x50">
        <link href="https://fonts.googleapis.com/css?family=Inter:200,600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap" rel="stylesheet">

        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        <style type="text/css">
            @media print {
                body {
                    height: 3508px;
                    width: 2480px;
                }
            }
        </style>
        @stack('css')
    </head>
    <body>
        @yield('content')
        <link href="{{ asset('css/general.css') }}" rel="stylesheet">
        <link href="{{ asset('css/update-12042020.css') }}" rel="stylesheet">
    </body>
    @stack('js')
</html>
