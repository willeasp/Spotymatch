<template>
    <a 
    @click="setRoute"
    v-bind:class="{'currentRoute':isCurrentRoute}" >
    {{text}}
    </a>
</template>

<script>
export default {
    name: "TopBarButton",
    props: {
        routeName: String,
        text: String,
    },

    computed: {
        isCurrentRoute() {
            return this.routeName === this.$store.getters.getRoute;
        }
    },

    methods: {
        setRoute: function() {
            window.location.hash = this.routeName;
        }
    }
    
}
</script>

<style scoped> 
    
</style>