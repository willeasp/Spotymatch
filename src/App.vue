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


/* @keyframes vibrator {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
.logon{
    animation: vibrator 0.15s linear infinite both;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
