<template>
    <div class="topnav">
        <RouteButton routeName="Welcome"/>
        <RouteButton routeName="Search"/>
        <RouteButton routeName="Result"/>
        <RouteButton routeName="History"/>
        <a 
        class="btn-right"
        @click="signOut">
        Sign Out
        </a>
    </div>
</template>

<script>
import RouteButton from "./RouteButton"

export default {
    name: "TopBar",
    components: {
        RouteButton,
    },

    methods: {
        signOut() {
            this.$store.dispatch("USER_SIGN_OUT");
        }
    }
}
</script>

<style scoped>
    /* Add a black background color to the top navigation */
    .topnav {
        background-color: #121212;
        overflow: hidden;
    }

    /* Style the links inside the navigation bar */
    a {
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        transition-property: background-color,border-color,color,box-shadow,filter;
        transition-duration: .3s;
    }

    /* Change the color of links on hover */
    a:hover {
        background-color: #1db954;
        color: black;
    }
    
    /* Add a color to the active/current link */
    a:active {
        background-color: #4CAF50;
        color: white;
    } 

    /* For buttons to the right */
    .btn-right {
        float: right;
    }
</style>