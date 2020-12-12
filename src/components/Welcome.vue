<template>
    <button @click="error">Error</button>
    <button @click="this.$store.dispatch('ADD_MSG', {category:'Success!', msg:'You did it, you son of a bitch!'})">Success!</button>
    <img class="logo" alt="Pear logo" src="../assets/pe.png" />
    <button @click="this.$store.dispatch('ADD_MSG', {category:'Sheisse', msg:'Welcome to gabbatown'})">CLICK ME</button>
    <div class="welcome">
        <h1 id="welcomeText">Welcome to Spotymatch</h1>
        <h2>Route through the page on the topbar</h2>
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
        error() {
            throw "This is an error";
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