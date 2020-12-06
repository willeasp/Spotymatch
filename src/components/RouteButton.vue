<template>
    <a 
    @click="setRoute"
    v-bind:class="{'currentRoute':isCurrentRoute}" >
    {{routeName}}
    </a>
</template>

<script>
export default {
    name: "TopBarButton",
    props: {
        routeName: String,
    },

    computed: {
        isCurrentRoute() {
            return this.routeName === this.$store.getters.getRoute;
        }
    },

    methods: {
        setRoute: function() {
            this.$store.dispatch("SET_ROUTE", this.routeName);
        }
    }
    
}
</script>

<style scoped> 
    
    /* Change styling of the current link */
    .currentRoute {
        background-color: #15883e;
        color: black;
    }
</style>