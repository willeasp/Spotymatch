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
    /* gap: 10px; */
    overflow:hidden;
}

.sidebar{
    grid-column: 1 / 2;
    grid-row: 1;
    text-align: center;
    height:100%;
    width: 230px;
    /* margin: 10px 10px; */
    margin: 1rem;
    /* overflow: scroll; */
    /* IE and Edge */
    /* -ms-overflow-style: none;   */
     /* Firefox */
    /* scrollbar-width: none;  */

    /* width: auto; */
    /* border: solid 1px orangered; */
}
/* Chrome, Safari and Opera */
/* .sidebar::-webkit-scrollbar {
  display: none;
} */
.show{
    grid-column: 2 / 3;
    grid-row: 1;
    height: 100%;
    flex: 1;
    /* overflow:  hidden */
    /* IE and Edge */
    /* -ms-overflow-style: none;   */
     /* Firefox */
    /* scrollbar-width: none;  */
    /* border: solid 1px burlywood; */
}
/* .show::-webkit-scrollbar {
  display: none;
} */
</style>