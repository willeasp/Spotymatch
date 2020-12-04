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
        database.ref('USERS/' + userUID).once('value').then((snapshot)=>{
            let history = [];
            
            for (const snapShotID in snapshot.val()){
              history.push({
                "songs" : snapshot.val()[snapShotID]["songs"],
                "time" : snapshot.val()[snapShotID]["time"],
                "seeds" : snapshot.val()[snapShotID]["seeds"]
              });
            }
            return history;
        });
    },
    pushRecommendation : (spotifyRec, queryObject, userUID) => {
        database.ref("USERS/" + userUID).push({
            "songs": spotifyRec.tracks,
            "seeds": queryObject,
            "time": Date.now()
          });
    }
}


/* fireauth().onAuthStateChanged(user => {
    if (user) {
        user;
    } else {
        console.log("user is signed out");
    }
  }); */


export default {fb, db};