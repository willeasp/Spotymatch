<template>
  <b 
    @click="activate"
    v-bind:class="{'historySidebarButtonActive': isActive}"
  >{{getReco["visualTime"]}}</b>
</template>

<script>
export default {
    name: "HistorySidebarButton",

    props:{
        reco: Object,
    },
    
    methods:{  
        activate() {
            this.$store.dispatch("SET_VIEW_HISTORY", this.reco);
        },
    },

    computed : {
        getReco(){
            return this.reco;
        },
        isActive(){
            return this.reco["key"] === this.$store.getters.getViewingHistory["key"];
        }
    }
}
</script>

<style>

/* Style the links inside the navigation bar */
    b {
        color: #f2f2f2;
        text-align: center;
        padding: 15px;
        display: inline-block;
        text-decoration: none;
        font-size: 17px;
        transition-property: background-color,border-color,color,box-shadow,filter;
        transition-duration: .3s;
        background-color:rgba(0, 0, 0, 0.2);
        width:200px;
    }

    /* Change the color of links on hover */
    b:hover {
        background-color: rgba(255, 255, 255, 0.823);
        color: black;
        cursor: pointer;
    }


    /* Active history is highlighted */
    .historySidebarButtonActive{
        background-color:rgba(208, 208, 208, 0.4)
    }
</style>