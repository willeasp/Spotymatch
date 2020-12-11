<template>
    <div class="historySidebar gridchild">
        <div class="historySidebarTitle">Previous History</div>
        <div class="loading" v-if="getPreviousRecommendationStatus === 'loading'">
            <Loading />
        </div>
        <div class="noHistory" v-if="getPreviousRecommendationStatus === 'empty'">
            <div>There is no existing history.</div>
        </div>
        <div
            id="historySidebar"
            v-for="key in formatHistory(previousRecommendations)"
            :key="key"
        >
            <HistorySidebarButton v-bind:reco="key" />
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import HistorySidebarButton from "./HistorySidebarButton";
import Loading from "./Loading.vue";

export default {
    name: "HistorySidebar",

    components: {
        HistorySidebarButton,
        Loading
    },

    methods: {
        formatHistory: (recommendations) => {
            let history = [];
            for (let key in recommendations) {
                history.push({
                    key: key,
                    songs: recommendations[key]["songs"],
                    time: recommendations[key]["time"],
                    seeds: recommendations[key]["seeds"],
                    visualTime: new Intl.DateTimeFormat("se-SV", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    }).format(new Date(recommendations[key]["time"])),
                });
            }
            history.sort((a, b) => a["time"] < b["time"]);
            return history;
        },
    },
    computed: {
        previousRecommendations() {
            return this.$store.getters.getPreviousRecommendations;
        },
        getPreviousRecommendationStatus(){
            let recExist = this.$store.getters.getPreviousRecommendations;
            if (! recExist) return "empty";
            else return (Object.keys(recExist).length > 0) ? "loaded" : "loading" ;
            // return Object.keys(this.$store.getters.getPreviousRecommendations).length > 0;
        }
    },
};
</script>

<style>
.historySidebarTitle {
    display: grid;
    color: #f2f2f2;
    text-align: center;
    padding: 15px;
    display: inline-block;
    text-decoration: none;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    width: 200px;
    height: 60px;
    line-height: 60px;
    border-radius: 6px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
}
.historySidebarTitle:hover {
    cursor: default;
}

.noHistory{
    color:white;
    height: auto;
    padding-top: 25px;
    font-size: small;

}
.loading{
    padding: 10px;
}
</style>