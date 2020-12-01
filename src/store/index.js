import { createStore } from 'vuex'
import APIcontroller from '../api/spotifySource.js'
import fb from '../api/firebase/firebaseSource'

export default createStore({
  state: {
    token: "", // authorisation token for current session
    lastRecommendation: {},  // the last received spotify recommendation
    
    user: null
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
    }
  },
  actions: {
    /**
     * Retrieves a new token and refreshes it every hour.
     * Call this in the beginning of a session
     * @param {*} state is handled automatically
     */
    requestToken(state){
      APIcontroller.getToken().then(token => {
        state.commit('setToken', token);
        console.log("store set token: " + token)
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
    requestRecomendation(state, queryObject){
      //for debugging so we not spam api, replace token with new token every 1h
      //let temptoken = "BQCDxQc1PPXSsfKnTHCj6JPUpUF72TsZaZhDT-M4h1TSo9mblUI3cK-hWD4lixSghzq30NqauUwdX2UU7Vw";
      APIcontroller.getRecommendations(state.getters.getToken, queryObject)
      .then(res => res.json())
      .then(res => {state.commit('saveRecommendation', res)});
    },
    USER_SIGN_IN(state, { email, password }) {
            fb.signInUser(email, password)
                .then(user => {
                    state.commit("set_user", user);
                })
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
                .then(() => {
                    state.commit("logout");
                })
                .catch(err => console.error(err, "Could not log out user"));
    },

    SET_USER(state, user) {
            state.commit("set_user", user);
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
    }
  },
  modules: {
  }
})
