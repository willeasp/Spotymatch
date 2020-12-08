<template>
    <div class="historySidebar gridchild">
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
/* eslint-disable vue/no-unused-components */

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
        padding: 15px;
        display: inline-block;
        text-decoration: none;
        font-size: 20px;
        background-color:rgba(0, 0, 0, 0.2);
        width:200px;

    }
    .historySidebarTitle:hover{
        cursor:default;
    }
    .historySidebar{
        
        text-align: center;
        height:100%;
        width: 230px;
        border:1px solid red ;
    }
</style>