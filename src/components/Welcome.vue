<template>
    <!-- <img class="logo" alt="Pear logo" src="../assets/pe.png" />
    <div class="welcome">
        <h1 id="welcomeText">Welcome to Spotymatch</h1>
        <h2>Route through the page on the topbar</h2>
    </div> -->
    <div>
        <Popup />
        <button @click="newPopup">Click here to win an iPhone 14!!!!!!</button>
    </div>
</template>

<script>
import Popup from './Popup.vue'

export default {
    name: "Welcome",    
    computed: {
        user() {
            const user = this.$store.getters.getCurrentUser;
            return user && user.user;
        },
    },
    components: {
        Popup,
    },
    methods:{
        newPopup(){
            this.$store.dispatch("ADD_MSG", {category: "SURPRISE",msg: "I give you virus!!!!!"})
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