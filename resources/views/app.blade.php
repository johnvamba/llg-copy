<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Love Lives Generously</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <script src="{{ mix('assets/canvasjs.min.js') }}"></script>
        <script src="{{ mix('assets/canvasjs.react.js') }}"></script>
        
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[API_KEY]&libraries=places"></script>
    </head>
    <body>
        <div id="app"></div>
        
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
