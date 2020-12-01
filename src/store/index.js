import { createStore } from 'vuex'
import APIcontroller from '../api/spotifySource.js'

export default createStore({
  state: {
    token: "", // authorisation token for current session
    lastRecommendation: {}  // the last received spotify recommendation
  },
  mutations: {
    setToken(state, token){
      state.token = token;
    },
    saveRecommendation(state, recommendationObject){
      state.lastRecommendation = recommendationObject;
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
    }
  },
  modules: {
  }
})
