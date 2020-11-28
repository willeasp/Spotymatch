import firebase from 'firebase';

var firebaseConfig = {
        apiKey: "AIzaSyDWASsxQyd0pgRaCAVW8G1VGlFk8C78NPk",
        authDomain: "spotymatcher.firebaseapp.com",
        databaseURL: "https://spotymatcher.firebaseio.com",
        projectId: "spotymatcher",
        storageBucket: "spotymatcher.appspot.com",
        messagingSenderId: "895199290235",
        appId: "1:895199290235:web:7588788e758ce041f353de",
        measurementId: "G-7JTH39M45W"
    };

firebase.initializeApp(firebaseConfig);

export const fireauth = firebase.auth;

export const db = firebase.database();


