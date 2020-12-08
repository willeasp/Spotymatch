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
    error: null,
    loading: false,
    doneLoading: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    saveRecommendation(state, recommendationObject) {
      state.lastRecommendation = recommendationObject;
    },
    set_user(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    setPreviousRecommendations(state, object) {
      state.previousRecommendations = object;
    },
    setError(state, error){
      state.error = error;
    },
    setLoading(state, status){
      state.loading = status;
    },
    setDoneLoading(state, status){
      state.doneLoading = status;
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
      let temptoken = "BQDEqA5UbnH6bjD8El9n8X7tC4OxUWkhMUX6BRNO8fdUcxm_V5NM_026Z5qo5l-E9ivmIfG5OJv-aucrnnc";
      state.commit('setLoading', true);
      state.commit('setDoneLoading', false);
      // APIcontroller.getRecommendations(state.getters.getToken, queryObject)
      APIcontroller.getRecommendations(temptoken, queryObject)
      .then(response => {
        if (response.ok) return response;
        else if(response.status === 401) {
          state.dispatch('REQUEST_TOKEN');
        }
        throw new Error(response.statusText);
      })
      .then(res => res.json())
      .then(res => {
        state.commit('saveRecommendation', res);
        // db.pushRecommendation(res, queryObject, state.getters.getCurrentUser.uid);
      })
      .catch(err => {
        state.commit('setError', err.message)
        console.log(err.message);
      });
      state.commit('setLoading', false);
      state.commit('setDoneLoading', true);
    },

    USER_SIGN_IN(state, { email, password }) {
      fb.signInUser(email, password)
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
        .catch(err => console.error(err, "Could not log out user"));
    },

    SET_USER(state, user) {
      state.commit("set_user", user);
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
    SET_NAV_HASH(newHash) {
      window.location.hash = newHash;
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
    getCurrentUser(state) {
      return state.user;
    },
    getPreviousRecommendations(state) {
      return state.previousRecommendations;
    },
    getError(state){
      return state.error;
    }
  },
  modules: {
  }
})
