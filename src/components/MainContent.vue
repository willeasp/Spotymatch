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
    }
}
</script>

<style scoped>
    .notTopBar {
        margin-top: 48px;
    }
</style>