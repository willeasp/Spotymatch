<template>
    <div>
        <div id="historySidebar" v-for="recommendation in formatHistory(previousRecommendations)" :key="recommendation">
            <div>{{ recommendation["visualTime"] }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HistorySidebar",
    methods: {
        formatHistory : recommendations => {
            let history = [];
            for(let key in recommendations){
                history.push(
                    {
                    key: key,
                    songs: recommendations[key]["songs"],
                    time: recommendations[key]["time"],
                    seeds: recommendations[key]["seeds"],
                    visualTime: new Intl.DateTimeFormat('se-SV', {
                         year: 'numeric', 
                         month: 'numeric', 
                         day: 'numeric',
                         hour: 'numeric',
                         minute: 'numeric',
                         second: 'numeric' 
                         }).format(new Date(recommendations[key]["time"]))
                    }
                
            )
            }
            history.sort((a,b)=> a["time"] < b["time"]);
            return history;
        }
    },
    computed: {
        previousRecommendations(){
            console.log("computed: ");
            console.log(this.$store.getters.getPreviousRecommendations);
            return this.$store.getters.getPreviousRecommendations;
        }
    },
}
</script>

<style>

</style>