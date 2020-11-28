import { createStore, } from 'vuex'
import fb from '../api/firebase/firebaseSource' 

export default createStore({
  state: {
    user : null
  },

  mutations: {
    // synchronous

    set_user(state, user) {
      state.user = user;
    },

    logout(state) {
      state.user = null;
    }
  },

  actions: {
    // asynchronous
    USER_SIGN_IN(state, {email, password}) {
      fb.signInUser(email, password)
      .then(user=> {
        state.commit("set_user", user);
      })
      .catch(err => console.error(err, "user could not sign in"));
    },

    CREATE_USER(state, {email, password}) {
      fb.createUser(email, password)
      .then(user=> {
        state.commit("set_user", user);
      })
      .catch(err=> console.error(err, "could not create user"));
    },

    USER_SIGN_OUT(state) {
      fb.signOutUser()
      .then(()=> {
        state.commit("logout");
      })
      .catch(err=> console.error(err, "Could not log out user"));
    },

    SET_USER(state, user) {
      state.commit("set_user", user);
    }
  },

  modules: {
  },

  getters: {
    getCurrentUser: state=> state.user
  }
})