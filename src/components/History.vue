<template>
  <div class="history">
    <HistorySidebar class="sidebar" />
    <HistoryShow class="show" /> 
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
.history{
    display: grid;
    gap: 10px;
}
.sidebar{
    grid-column: 1 / 2;
    grid-row: 1;
    /* border: solid 1px orangered; */
}
.show{
    grid-column: 2 / 3;
    grid-row: 1;
    /* border: solid 1px burlywood; */
}
</style>