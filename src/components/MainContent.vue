<template>
    <TopBar/>

    <template v-if="route === 'Welcome'">
        <Welcome/>
    </template>
    <template v-if="route === 'Search'">
        <Search/>
    </template>
    <template v-if="route === 'Result'">
        <Result/>
    </template>
    
</template>

<script>
import TopBar from './TopBar';
import Welcome from './Welcome';
import Search from './Search';
import Result from './Result';

export default {
    name: "MainContent",

    components: {
        TopBar,
        Welcome,
        Search,
        Result,
    },

    computed: {
        route() {
            return this.$store.getters.getRoute;
        }
    }
}
</script>

<style scoped>

</style>