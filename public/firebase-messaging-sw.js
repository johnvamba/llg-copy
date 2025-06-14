/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebaseConfig = {
    apiKey: "AIzaSyAP7Gy5v8PwKbgKfEr4Grfkui6pSl3KLdw",
    authDomain: "lovelivegenerously-5fa93.firebaseapp.com",
    databaseURL: "https://lovelivegenerously-5fa93.firebaseio.com",
    projectId: "lovelivegenerously-5fa93",
    storageBucket: "lovelivegenerously-5fa93.appspot.com",
    messagingSenderId: "326354133547",
    appId: "1:326354133547:web:dd6701e70fa6e92ca1406e",
    measurementId: "G-24E1YE8Q23"
};

firebase.initializeApp(firebaseConfig);

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});