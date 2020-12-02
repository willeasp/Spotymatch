import firebase from 'firebase';
import  firebaseConfig  from './config.js';

firebase.initializeApp(firebaseConfig);
const fireauth = firebase.auth;

const fb = {    
    createUser: (email, password)=> 
        fireauth().createUserWithEmailAndPassword(email, password)
    ,
    signInUser: (email, password)=> 
        fireauth().signInWithEmailAndPassword(email, password)
    ,
    signOutUser: ()=>
        fireauth().signOut()
    ,
    currentUser: ()=>
        fireauth().currentUser
}

const db = firebase.database();


/* fireauth().onAuthStateChanged(user => {
    if (user) {
        user;
    } else {
        console.log("user is signed out");
    }
  }); */


export default {fb, db};