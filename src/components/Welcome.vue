
<template>
    <img class="logo" alt="Pear logo" src="../assets/pe.png" />
    <div class="welcome">
        <h1 id="welcomeText">Welcome to Spotymatch</h1>
        <h2>Route through the page on the topbar</h2>
        <button @click="signOut">sign out</button>
        <Search/>
    </div>
</template>

<script>
import Search from "./Search.vue";
export default {
    name: "Welcome",
    components: {
        Search,
    },
    computed: {
        user() {
            const user = this.$store.getters.getCurrentUser;
            return user && user.user;
        },
    },

    methods: {
        signOut() {
            this.$store.dispatch("USER_SIGN_OUT");
        }
    }
}
</script>

<style scoped>
    #welcomeText {
        size: 48px;
        color: olivedrab;
    }
</style>