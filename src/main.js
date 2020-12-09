import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import firebase from 'firebase'
let app;
let promise_database_unsubscriber;

firebase.auth().onAuthStateChanged((user)=>{
    if(!app) {
        createApp(App).use(store).mount('#app');
        app = true;
    }
    if(user) {
        // resore state
        store.dispatch('SET_USER', user);
        // start database observer
        promise_database_unsubscriber = store.dispatch('SUBSCRIBE_RESULT_HISTORY').then(x=>x);
    }
    else {
        store.dispatch('SET_USER', null);
        // setup removal of observer
        if(promise_database_unsubscriber){
            promise_database_unsubscriber.then(unsubscribe=>unsubscribe());
            promise_database_unsubscriber = null;
        }
    }
})

function hashChange() {
    if(! ["#Welcome", "#Search", "#Result", "#History", "#Login"].find(knownRoute=> window.location.hash === knownRoute)) {
        window.location.hash="Welcome";
    }
    
    store.dispatch("SET_ROUTE", window.location.hash.substring(1));
}

hashChange();

window.addEventListener("hashchange", hashChange);

