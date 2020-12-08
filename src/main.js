import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import firebase from 'firebase'
let app;

firebase.auth().onAuthStateChanged((user)=>{
    if(!app) {
        createApp(App).use(store).mount('#app');
        app = true;
    }
    if(user) store.dispatch('SET_USER', user)
    else store.dispatch('SET_USER', null)
});


function hashChange() {
    if(! ["#Welcome", "#Search", "#Result", "#History", "#Login"].find(knownRoute=> window.location.hash === knownRoute)) {
        window.location.hash="Welcome";
    }
    
    store.dispatch("SET_ROUTE", window.location.hash.substring(1));
}

hashChange();

window.addEventListener("hashchange", hashChange);