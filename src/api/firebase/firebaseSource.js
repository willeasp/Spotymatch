import firebase from 'firebase';
import  firebaseConfig  from './config.js';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
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

const database = firebase.database();
const db = {
    fetchResultHistory : (userUID)=>{
        return database.ref('USERS/' + userUID).once('value');
    },
    pushRecommendation : (spotifyRec, queryObject, userUID) => {
        database.ref("USERS/" + userUID).push({
            "songs": spotifyRec.tracks,
            "seeds": queryObject,
            "time": Date.now()
          });
    }
}

export default {fb, db};