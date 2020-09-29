import * as firebase from 'firebase/app';
import 'firebase/messaging'

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

const initFirebase = firebase.initializeApp(config);

const messaging = firebase.messaging.isSupported() ? 
    initFirebase.messaging()
    : null;

export {messaging};