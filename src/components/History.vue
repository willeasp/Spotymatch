<template>
  <div id="history">
    <HistorySidebar />
    <HistoryShow /> 
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import HistorySidebar from './HistorySidebar.vue';
import HistoryShow from './HistoryShow.vue';

export default {
    
    name: "History",
    methods: {

    },
    components: {
        HistorySidebar,
        HistoryShow,
    },

}
</script>

<style scoped>


</style>