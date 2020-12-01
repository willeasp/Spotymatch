import { fireauth } from './config'

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

/* fireauth().onAuthStateChanged(user => {
    if (user) {
        user;
    } else {
        console.log("user is signed out");
    }
  }); */

export default fb;