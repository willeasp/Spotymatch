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
            store.dispatch("ADD_MSG", {
                category: "Error",
                msg: err
            });
        }
        app.mount('#app');
        
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

// subscribe to hashchanges so that the routing will follow
function hashChange() {
    if(! ["#Search", "#Result", "#History", "#Login"].find(knownRoute=> window.location.hash === knownRoute)) {
        window.location.hash="Search";
    }
    
    store.dispatch("SET_ROUTE", window.location.hash.substring(1));
}
hashChange();
window.addEventListener("hashchange", hashChange);

// handle javascript errors
window.onerror = function (errorMsg, url, lineNumber) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}

// subscribe to errors that the store throws.
store.subscribeAction({
    error: (action, state, error) => {
        action; state; error;
        // add action here, if we want to
        console.error("Error Action: " + action.type + 
        "\n\rCode: " + error.code + 
        "\n\rMessage: " + error.message);
    }
});
