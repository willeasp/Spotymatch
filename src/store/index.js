import { createStore } from 'vuex'
import { fireauth } from '../api/firebase/config'

export default createStore({
  state: {
    currentUserEmail : "no user"
  },

  mutations: {
    setCurrentUserEmail(state, email) {
      state.currentUserEmail = email;
    }
  },

  actions: {
    USER_SIGN_IN(state, {email, password}) {
      console.log("USERSIGNIN" + password);
      fireauth().signInWithEmailAndPassword(email, password)
      .then((user) => {
          this.commmit("setCurrentUserEmail", user.email);
      })
      .catch((error) => {
          console.error(error);
      });
    }
  },

  modules: {
  },

  getters: {
    getCurrentUser: state=> state.currentUserEmail
  }
})
