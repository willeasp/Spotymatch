<template>
    <div class="color-bg">
    <div class="black-bg">
        <template v-if="user">
            <MainContent/>
        </template>
        <template v-else>
            <Login/>
        </template>
    </div>
    </div>
</template>



<script>
import MainContent from "./components/MainContent.vue";
import Login from "./components/Login.vue";

// använd v-if för conditional rendering!!!!
export default {
    name: "App",
    components: {
        MainContent,
        Login,
    },
    computed: {
        user() {
            const user = this.$store.getters.getCurrentUser;
            return user;
        },
    },
};
</script>


<style>

    body {
        font-family: circular-spotify-ui,Helvetica Neue,Helvetica,Arial,sans-serif;
        font-weight: 400;
    }

    .color-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    /* background-image: "../assets/pear-png-28.png"; */

    background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce),
        to(#be31a5)
        );
    }

    .black-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.849));
        overflow-y: scroll;

        /* Hide scrollbar for IE, Edge and Firefox */    
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .black-bg::-webkit-scrollbar {
        display: none;
    }
</style>
