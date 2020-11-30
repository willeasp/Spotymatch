<template>
    <img class="logo" alt="Pear logo" src="../assets/pe.png" />
    <div class="welcome">
        <h1 id="welcomeText">Welcome to Spotymatch</h1>
        <h2>Route through the page on the topbar</h2>
        <button @click="signOut">sign out</button>
    </div>
</template>

<script>
export default {
    name: "Welcome",

    computed: {
        user() {
            const user = this.$store.getters.getCurrentUser;
            return user && user.user;
        },
    },

    methods: {
        signOut() {
            this.$store.dispatch("USER_SIGN_OUT");
        },
    },
};
</script>

<style scoped>
#welcomeText {
    size: 48px;
    color: olivedrab;
}
</style>