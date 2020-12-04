<template>
    <template v-if="user">
        <Welcome/>
    </template>
    <template v-else>
        <Login/>
    </template>
</template>

<script>
import Welcome from "./components/Welcome.vue";
import Login from "./components/Login.vue";

// använd v-if för conditional rendering!!!!
export default {
    name: "App",
    components: {
        Welcome,
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
