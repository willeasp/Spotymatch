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
    console.log("firebase user: ")
    console.log(user);
    if(user){ store.dispatch('SET_USER', user); }
    else {store.dispatch('SET_USER', null);}
});
