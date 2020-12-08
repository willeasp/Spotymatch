<template>
    <div>
        <div class="historySidebarTitle">
            Previous History
        </div>
        <div id="historySidebar" v-for="key in formatHistory(previousRecommendations)" 
            :key="key"
            >
            <HistorySidebarButton v-bind:reco = "key" />
        </div>
    </div>
</template>

<script>
import HistorySidebarButton from "./HistorySidebarButton"


export default {
    name: "HistorySidebar",
    
    components:{
        HistorySidebarButton,
    },

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
        },
        setViewingRecommendation(rec) {
            // console.log(rec.obj["time"]);
            console.log("rec: " + rec)
        }
    },
    computed: {
        previousRecommendations(){
            return this.$store.getters.getPreviousRecommendations;
        }
    },
}
</script>

<style>
    .historySidebarTitle{
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        display: inline-block;
        text-decoration: none;
        font-size: 20px;
        /* transition-property: background-color,border-color,color,box-shadow,filter;
        transition-duration: .3s; */
        background-color:rgba(0, 0, 0, 0.2);
        width:200px;
    }
    .historySidebarTitle:hover{
        cursor:default;
    }
</style>