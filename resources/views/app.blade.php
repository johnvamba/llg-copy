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
        
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{ env('MIX_PLACESAUTOCOMPLETE_API_KEY') }}&libraries=places"></script>
    </head>
    <body>
        <div id="app"></div>

        <script src="{{ mix('js/app.js') }}"></script>

        <!-- <script src="https://www.gstatic.com/firebasejs/7.21.0/firebase.js"></script>
        <script>
            $(document).ready(function(){
                const config = {
                    apiKey: "AIzaSyAP7Gy5v8PwKbgKfEr4Grfkui6pSl3KLdw",
                    authDomain: "lovelivegenerously-5fa93.firebaseapp.com",
                    databaseURL: "https://lovelivegenerously-5fa93.firebaseio.com",
                    projectId: "lovelivegenerously-5fa93",
                    storageBucket: "lovelivegenerously-5fa93.appspot.com",
                    messagingSenderId: "326354133547",
                    appId: "1:326354133547:web:dd6701e70fa6e92ca1406e",
                    measurementId: "G-24E1YE8Q23"
                };

                firebase.initializeApp(config);
                const messaging = firebase.messaging();
                
                messaging
                    .requestPermission()
                    .then(function () {
                        return messaging.getToken()
                    })
                    .then(function(token) {
                        console.log(token);
                    })
                    .catch(function (err) {
                        console.log("Unable to get permission to notify.", err);
                    });
            
                messaging.onMessage(function(payload) {
                    const noteTitle = payload.notification.title;
                    const noteOptions = {
                        body: payload.notification.body,
                        icon: payload.notification.icon,
                    };
                    new Notification(noteTitle, noteOptions);
                });
            });
        </script> -->
    </body>
</html>
