<template>
  <div>
    <HistorySidebar/>
    <!-- <div> <button @click="setBananaHash">banana</button> </div>
    <div> <button @click="setAppleHash">apple</button> </div>
    <div> <button @click="setMonkeyHash">monkey</button> </div> -->
  </div>
</template>

<script>

import HistorySidebar from './HistorySidebar.vue';


export default {
    
    name: "History",
    methods: {

        // setBananaHash(){
        //     this.$store.dispatch("SET_NAV_HASH", "banana")
        // },
        // setAppleHash(){
        //     this.$store.dispatch("SET_NAV_HASH", "apple")
        // },
        // setMonkeyHash(){
        //     this.$store.dispatch("SET_NAV_HASH", "monkey")
        // },

    },
    components: {
        HistorySidebar,
    },

}
</script>

<style>

</style>