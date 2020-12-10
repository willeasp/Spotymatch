<template>
    <TopBar/>

    <template v-if="route === 'Welcome'">
        <div class="notTopBar">
            <Welcome/>
        </div>
    </template>
    <template v-if="route === 'Search'">
        <div class="notTopBar">
            <Search/>
        </div>
    </template>
    <template v-if="route === 'Result'">
        <div class="notTopBar">
            <Result/>
        </div>
    </template>
    <template v-if="route === 'History'">
        <div class="notTopBar">
            <History/>
        </div>
    </template>
    
</template>

<script>
import TopBar from './TopBar';
import Welcome from './Welcome';
import Search from './Search';
import Result from './Result';
import History from './History';

export default {
    name: "MainContent",

    components: {
        TopBar,
        Welcome,
        Search,
        Result,
        History,
    },

    computed: {
        route() {
            return this.$store.getters.getRoute;
        }
    },

    beforeMount() {
        const tokenObjectString = localStorage.getItem("tokenObject");
        let tokenObject = {};
        if(tokenObjectString) {
            tokenObject = JSON.parse(tokenObjectString);
            let currentTime = Number(new Date());
            // check if token is valid
            if(tokenObject["time"] > currentTime){
                this.$store.dispatch("SET_TOKEN", tokenObject["token"]);
                // set timeout based on how much time is left
                setTimeout(() => {
                    this.$store.dispatch('REQUEST_TOKEN');
                }, (tokenObject["time"] - currentTime) );
                return;
            }
        }
        // no token in local storage or token invalid
        this.$store.dispatch('REQUEST_TOKEN');
        setTimeout(() => {
            this.$store.dispatch('REQUEST_TOKEN');
        }, 3600 * 1000 ); 
    },
}
</script>

<style scoped>
    .notTopBar {
        margin-top: 48px;
    }
</style>