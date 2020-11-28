<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    

    <template v-if="user">
      <h3>{{user}} is logged in.</h3>
      <button @click="signOut">sign out</button>
    </template>
    <template v-else>
      <h3>Sign In</h3>
      <input v-model="email" placeholder="email"/>
      <input v-model="password" placeholder="passwd"/>
      <button @click="signIn">sign in</button>
      <button @click="createAccount">create account</button>
    </template>

    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
//import { watch } from 'vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      email : "",
      password : "",
    }
  },

  computed: {
    user() {
      const user = this.$store.getters.getCurrentUser;
      return user && user.user.email;
    }
  },

  props: {
    msg: String
  },

  methods: {
    signIn() {
      this.$store.dispatch("USER_SIGN_IN", {email:this.email, password:this.password});
    },

    createAccount() {
      this.$store.dispatch("CREATE_USER", {email:this.email, password:this.password});
    },

    signOut() {
      this.$store.dispatch("USER_SIGN_OUT");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
