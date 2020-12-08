<template>
  <b 
    @click="activate"
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
        }
    }
}
</script>

<style>

</style>