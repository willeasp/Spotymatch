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
        error: null, //if request recommendation throws error
        loading: false, //request recommendation loading
        doneLoading: false  // request recommendation done loading
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setTokenTimeout(state, time){
            state.tokenTimeout = time;
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
        setError(state, error) {
            state.error = error;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        setDoneLoading(state, status) {
            state.doneLoading = status;
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
        async REQUEST_TOKEN(state) {
            await APIcontroller.getToken().then(tokenObject => {
                state.commit('setToken', tokenObject["access_token"]);
                const timeInSeconds = new Date() / 1000;
                state.commit('setTokenTimeout', tokenObject["expires_in"] + timeInSeconds);
            });

            setTimeout(() => {
                state.commit('setToken', "");
                state.dispatch('REQUEST_TOKEN');
            }, 3600 * 1000);
        },
        /**
         * Request a list of 20 tracks based on queryObject
         * @param {*} state is handled automatically
         * @param {*} queryObject contains the query
         */
        async REQUEST_RECOMMENDATION(state, queryObject) {
            //for debugging so we not spam api, replace token with new token every 1h
            //let temptoken = "BQDEqA5UbnH6bjD8El9n8X7tC4OxUWkhMUX6BRNO8fdUcxm_V5NM_026Z5qo5l-E9ivmIfG5OJv-aucrnnc";
            state.commit('setLoading', true);
            state.commit('setDoneLoading', false);

            // ugly fix for tokens disapearing on page reload
            if(!state.getters.getToken) {
                await state.dispatch('REQUEST_TOKEN');
            }

            APIcontroller.getRecommendations(state.getters.getToken, queryObject)
                // APIcontroller.getRecommendations(temptoken, queryObject)
                .then(response => {
                    if (response.ok) return response;
                    else if (response.status === 401) {
                        state.dispatch('REQUEST_TOKEN');
                    }
                    throw new Error(response.statusText);
                })
                .then(res => res.json())
                .then(res => {
                    state.commit('saveRecommendation', res);
                    db.pushRecommendation(res, queryObject, state.getters.getCurrentUser.uid);
                })
                .catch(err => {
                    state.commit('setError', err.message)
                    console.log(err.message);
                });
            state.commit('setLoading', false);
            state.commit('setDoneLoading', true);
        },
        /**
        * Sign in to firebase with already registered user
        * @param {*} state 
        * @param {*} param1 
        */
        USER_SIGN_IN(state, { email, password }) {
            fb.signInUser(email, password)
                .catch(err => console.error(err, "user could not sign in"));
            state.dispatch('REQUEST_TOKEN');
        },
        /**
        * Sign user out from firebase
        */
        USER_SIGN_OUT() {
            fb.signOutUser()
                .catch(err => console.error(err, "Could not log out user"));
        },

        SET_USER(state, user) {
            state.commit("setUser", user);
        },
        /**
        * Create a new user in firebase
        * @param {*} state 
        * @param {*} param1 
        */
        CREATE_USER(state, { email, password }) {
            fb.createUser(email, password)
                .then(user => {
                    state.commit("set_user", user);
                })
                .catch(err => console.error(err, "could not create user"));
        },
        /**
         * Fetches user history from firbase
         * @param {*} state 
         */     
        FETCH_RESULT_HISTORY(state) {
            db.fetchResultHistory(state.getters.getCurrentUser.uid)
                .then((snapshot) => {

                    let history = [];
                    for (const snapShotID in snapshot.val()) {
                        history.push({
                            "songs": snapshot.val()[snapShotID]["songs"],
                            "time": snapshot.val()[snapShotID]["time"],
                            "seeds": snapshot.val()[snapShotID]["seeds"]
                        });
                    }
                    state.commit("setPreviousRecommendations", history);
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
        },

        getError(state) {
            return state.error;

        }
    },
    modules: {

    }
})
