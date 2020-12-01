<template>
  <h1>This is Spotymatch APP</h1>
</template>

<script>
import APIcontroller from './api/spotifySource.js'
import store from './store/index.js';

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
