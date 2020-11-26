import { createStore } from 'vuex'
import APIcontroller from '../api/spotifySource.js'

export default createStore({
  state: {
    token: "",
    lastRecommendation: {}
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
     * @param {*} state 
     */
    setToken(state){
      APIcontroller.getToken()
      .then(token => {
        state.commit('setToken', token);
        console.log("store set token: " + token)});
      setTimeout(() => {
        state.dispatch('setToken');
      }, 3600*1000);
    },
    /**
     * Saves the recommendation list from the API call
     * @param {*} state 
     * @param {*} recommendationObject 
     */
    saveRecommendation(state, recommendationObject){
      state.commit('saveRecommendation', recommendationObject);
    },
    /**
     * Request a list of 20 tracks based on queryObject
     * @param {*} state 
     * @param {*} queryObject contains the query
     */
    requestRecomendation(state, queryObject){
      //for debugging so we not spam api
      //let temptoken = "BQCDxQc1PPXSsfKnTHCj6JPUpUF72TsZaZhDT-M4h1TSo9mblUI3cK-hWD4lixSghzq30NqauUwdX2UU7Vw";
      APIcontroller.getRecommendations(state.getters.getToken, queryObject)
      .then(res => res.json())
      .then(res => {state.commit('saveRecommendation', res)});
    }
  },
  getters: {
    /**
     * Gets the current auth token
     * @param {*} state 
     */
    getToken(state){
      return state.token;
    },
    /**
     * Gets the list of song from the API request
     * @param {*} state 
     */
    getRecommendations(state){
      return state.lastRecommendation;
    }
  },
  modules: {
  }
})
