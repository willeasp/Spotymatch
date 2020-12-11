import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import firebase from 'firebase'
let app;
let promise_database_unsubscriber;

firebase.auth().onAuthStateChanged((user)=>{
    if(!app) {
        app = createApp(App);
        app.use(store);
        // Error handler, to use this, do *throw 'message';*
        app.config.errorHandler = function(err) {
            console.log(err);
            store.dispatch("ADD_MSG", {
                category: "Error",
                msg: err
            });
        }
        app.mount('#app');
        console.log(app);
        
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

window.onerror = function (errorMsg, url, lineNumber) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}