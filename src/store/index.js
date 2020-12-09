import { createStore } from 'vuex';
import APIcontroller from '../api/spotifySource.js';
import firebaseSource from '../api/firebase/firebaseSource';
const fb = firebaseSource.fb;
const db = firebaseSource.db;

export default createStore({
    state: {
        token: "", // authorisation token for current session
        lastRecommendation: {},  // the last received spotify recommendation
        user: null,     // user currently logged in
        history: [], // all recommendations
        viewingHistory: {}, // a recommendation
        route: window.location.hash.substring(1),
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        saveRecommendation(state, recommendationObject) {
            state.lastRecommendation = recommendationObject;
        },
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        },
        setHistory(state, object) {
            state.history = object;
        },
        setRoute(state, route) {
            state.route = route;
        },
        setViewingHistory(state, newViewHistory){
            state.viewingHistory = newViewHistory;
        }
    },

    actions: {
        /**
         * Retrieves a new token and refreshes it every hour.
         * Call this in the beginning of a session
         * @param {*} state is handled automatically
         */
        REQUEST_TOKEN(state) {
            APIcontroller.getToken().then(token => {
                state.commit('setToken', token);
            });

            setTimeout(() => {
                state.commit('setToken', "");
                state.dispatch('setToken');
            }, 3600 * 1000);
        },

        /**
         * Request a list of 20 tracks based on queryObject
         * @param {*} state is handled automatically
         * @param {*} queryObject contains the query
         */
        REQUEST_RECOMMENDATION(state, queryObject) {
            //for debugging so we not spam api, replace token with new token every 1h
            //let temptoken = "BQCDxQc1PPXSsfKnTHCj6JPUpUF72TsZaZhDT-M4h1TSo9mblUI3cK-hWD4lixSghzq30NqauUwdX2UU7Vw";
            APIcontroller.getRecommendations(state.getters.getToken, queryObject)
                .then(res => res.json())
                .then(res => {
                    state.commit('saveRecommendation', res);
                    db.pushRecommendation(res, queryObject, state.getters.getCurrentUser.uid);
                });
        },

        /**
         * Sign in to firebase with already registered user
         * @param {*} state 
         * @param {*} param1 
         */
        USER_SIGN_IN(state, { email, password }) {
            fb.signInUser(email, password)
                .catch(err => console.error(err, "user could not sign in"));
        },

        /**
         * Create a new user in firebase
         * @param {*} state 
         * @param {*} param1 
         */
        CREATE_USER(state, { email, password }) {
            fb.createUser(email, password)
                .then(user => {
                    state.commit("setUser", user);
                })
                .catch(err => console.error(err, "could not create user"));
        },

        /**
         * Sign user out from firebase
         */
        USER_SIGN_OUT() {
            fb.signOutUser()
                .catch(err => console.error(err, "Could not log out user"));
        },

        /**
         * Set the current user as user
         * @param {*} state 
         * @param {*} user 
         */
        SET_USER(state, user) {
            state.commit("setUser", user);
        },

        /**
         * Fetches user history from firbase
         * @param {*} state 
         */     
        FETCH_RESULT_HISTORY(state) {
            db.fetchResultHistory(state.getters.getCurrentUser.uid)
                .then((snapshot) => {

                    let history = [];
                    let val = snapshot.val();
                    for (const snapShotID in val) {
                        history.push(val[snapShotID]);
                    }
                    state.commit("setPreviousRecommendations", val);
                });
        },
        /**
         * Subscribes to history changes and adds the new history to the store.
         * @param {*} state 
         */
        SUBSCRIBE_RESULT_HISTORY(state) {
            db.subscribeResultHistory(
                state.getters.getCurrentUser.uid,
                snapshot => state.commit("setHistory", snapshot.val())
            );
            return () => db.unsubscribeResultHistory(state.getters.getCurrentUser.uid);
        },
        /**
         * Sets the viewingHistory state.
         * @param {*} state 
         * @param {Object comtaining a single reccomendation selected from state.history} newViewHistory 
         */
        SET_VIEW_HISTORY(state, newViewHistory){
            state.commit("setViewingHistory", newViewHistory);
        },
        /**
         * Set the current route in the webpage
         * @param {*} state 
         * @param {*} route 
         */
        SET_ROUTE(state, route) {
            state.commit("setRoute", route);
        }
    },

    getters: {
        /**
         * Gets the current auth token
         * @param {*} state is handled automatically
         */
        getToken(state) {
            return state.token;
        },

        /**
         * Gets the list of song from the API request
         * @param {*} state is handled automatically
         */
        getRecommendations(state) {
            return state.lastRecommendation;
        },

        /**
         * @returns The user currently logged in to firebase
         * @param {*} state 
         */
        getCurrentUser(state) {
            return state.user;
        },

        getPreviousRecommendations(state) { // not changed because of compatability (should be changed)
            return state.history;
        },
        getViewingHistory(state){
            return state.viewingHistory;
        },
        getRoute(state) {
            return state.route;
        }
    },

    modules: {
    }
})
