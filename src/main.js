import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import firebase from 'firebase'
let app;
let database_unsubscriber;

firebase.auth().onAuthStateChanged((user)=>{
    if(!app) {
        createApp(App).use(store).mount('#app');
        app = true;
    }
    if(user) {
        // resore state
        store.dispatch('SET_USER', user);
        // start database observer
        database_unsubscriber = store.dispatch('SUBSCRIBE_RESULT_HISTORY');
    }
    else {
        store.dispatch('SET_USER', null);
        // setup removal of observer
        if(database_unsubscriber){
            database_unsubscriber();
            database_unsubscriber = null;
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

