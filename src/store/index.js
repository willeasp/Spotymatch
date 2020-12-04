import { createStore } from 'vuex';
import APIcontroller from '../api/spotifySource.js';
import firebaseSource from '../api/firebase/firebaseSource';
const fb = firebaseSource.fb;
const db = firebaseSource.db;

export default createStore({
  state: {
    token: "", // authorisation token for current session
    lastRecommendation: {},  // the last received spotify recommendation
    user: null,
    previousRecommendations: [], // all recommendations
    viewingRecommendation: {}, // en recommendation
    navHash: ""
  },
  mutations: {
    setToken(state, token){
      state.token = token;
    },
    saveRecommendation(state, recommendationObject){
      state.lastRecommendation = recommendationObject;
    },
    set_user(state, user) {
        state.user = user;
    },
    logout(state) {
        state.user = null;
    },
    setPreviousRecommendations(state, object){
      state.previousRecommendations = object;
    },
    setNavHash(state, newHash){
      state.navHash = newHash;
    }
    // ,
    // setViewingRecommendation(state){
    //   state;
    // }
  },
  actions: {
    /**
     * Retrieves a new token and refreshes it every hour.
     * Call this in the beginning of a session
     * @param {*} state is handled automatically
     */
    REQUEST_TOKEN(state){
      APIcontroller.getToken().then(token => {
        state.commit('setToken', token);
      });

      setTimeout(() => {
        state.commit('setToken', "");
        state.dispatch('setToken');
      }, 3600*1000);
    },
    /**
     * Request a list of 20 tracks based on queryObject
     * @param {*} state is handled automatically
     * @param {*} queryObject contains the query
     */
    REQUEST_RECOMMENDATION(state, queryObject){
      //for debugging so we not spam api, replace token with new token every 1h
      //let temptoken = "BQCDxQc1PPXSsfKnTHCj6JPUpUF72TsZaZhDT-M4h1TSo9mblUI3cK-hWD4lixSghzq30NqauUwdX2UU7Vw";
      APIcontroller.getRecommendations(state.getters.getToken, queryObject)
      .then(res => res.json())
      .then(res => {
        state.commit('saveRecommendation', res);
        db.pushRecommendation(res, queryObject, state.getters.getCurrentUser.user.uid);
      });
    },
    USER_SIGN_IN(state, { email, password }) {
            fb.signInUser(email, password)
                // .then(user => {
                //     state.commit("set_user", user);
                // })
                .catch(err => console.error(err, "user could not sign in"));
                
    },

    CREATE_USER(state, { email, password }) {
            fb.createUser(email, password)
                .then(user => {
                    state.commit("set_user", user);
                })
                .catch(err => console.error(err, "could not create user"));
    },

    USER_SIGN_OUT(state) {
            fb.signOutUser()
                // .then(() => {
                //     state.commit("logout");
                // })
                .catch(err => console.error(err, "Could not log out user"));
    },

    SET_USER(state, user) {
      state.commit("set_user", user);
    },
    /**
     * Fetches user history from firbase
     * @param {*} state 
     */
    FETCH_RESULT_HISTORY(state){
        db.fetchResultHistory(state.getters.getCurrentUser.user.uid)
        .then((snapshot)=>{
          let history = [];
          for (const snapShotID in snapshot.val()){
            history.push({
              "songs" : snapshot.val()[snapShotID]["songs"],
              "time" : snapshot.val()[snapShotID]["time"],
              "seeds" : snapshot.val()[snapShotID]["seeds"]
            });
          }
          state.commit("setPreviousRecommendations", history);
        });
    },
    SET_NAV_HASH(state, newHash){
      window.location.hash = newHash;
      state.commit("setNavHash", newHash);
    }
  },
  getters: {
    /**
     * Gets the current auth token
     * @param {*} state is handled automatically
     */
    getToken(state){
      return state.token;
    },
    /**
     * Gets the list of song from the API request
     * @param {*} state is handled automatically
     */
    getRecommendations(state){
      return state.lastRecommendation;
    },
    getCurrentUser(state){
      return state.user; 
    },
    getPreviousRecommendations(state){
      return state.previousRecommendations;
    }
  },
  modules: {
  }
})
