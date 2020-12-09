<template>
    <div class="welcome">
        <button @click="getToken"> tokenaye</button>
        <button @click="getRekt"> get rec</button>
        <button @click="resultHistory"> history</button>
    </div>
</template>

<script >
export default {
    name: "Search",
    methods: {
        getToken(){
            this.$store.dispatch("REQUEST_TOKEN");
            setTimeout(()=>console.log(this.$store.getters.getToken), 500);
            },
        getRekt(){
            this.$store.dispatch("REQUEST_RECOMMENDATION", 
            {
                "seed_genres": ["rock","afrobeat","alternative"],
                "liveness": 0.4
            });
        },
        resultHistory(){
            this.$store.dispatch("FETCH_RESULT_HISTORY");
            setTimeout(()=> console.log(this.$store.getters.getPreviousRecommendations) ,1000);
        }
    }
}
</script>

<style>
</style>