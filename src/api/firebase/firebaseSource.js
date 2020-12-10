import firebase from 'firebase';
import firebaseConfig from './config.js';

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
    ,
}

const database = firebase.database();
const db = {
    fetchResultHistory : (userUID)=>{
        return database.ref('USERS/' + userUID).once('value');
    },
    /**
     * Subscribes to changes to a user's history in the firebase database.
     * 
     * The callback will receive a DataSnapshot which can be accessed with the
     * .val(), if there is no data .val() will return null.
     * 
     * The callback will only get triggered when the data changes but it won't
     * trigger until the contents have been synchronized. 
     * 
     * @param {*}  userUID userUID that identifies the user data that should
     *                     be subscribed to
     * @param {*} callback callback that will be triggered
     */
    subscribeResultHistory : (userUID, callback) => {
        const callbackOnFailure = Error => {
            db.unsubscribeResultHistory(userUID);
            alert("You don't have permission to read from the database of this user." 
                + "\nAccess to history has been terminated.");
        }
        return database.ref('USERS/' + userUID).on('value', callback, callbackOnFailure);
    },
    /**
     * Unsubscribes from any subscribers attached to a user's history.
     * 
     * @param {*}  userUID userUID that identifies the user data that should
     *                     be unsubscribed from
     */
    unsubscribeResultHistory : (userUID) => {
        database.ref('USERS/' + userUID).off('value', undefined);
    },
    /**
     * Pushes a new recommendation to the database.
     * @param {*}  spotifyRec result object from spotify api call
     * @param {*}  queryObject object containing the query information
     * @param {*}  userUID userUID for user that should update its database
     */
    pushRecommendation : (spotifyRec, queryObject, userUID) => {
        const onCompleteCallback = (Error) => {
            if (Error) alert("You don't have permission to change the database for this user.");
            //else write was successful
        }
        database.ref("USERS/" + userUID).push({
            "songs": spotifyRec.tracks,
            "seeds": queryObject,
            "time": Date.now()
          },
          onCompleteCallback);
    }
}
export default {fb, db};