<template>
    <div class="history">
        <HistorySidebar class="sidebar" />
        <Result mode="history" class="show"/>
    </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import HistorySidebar from "./HistorySidebar.vue";
import Result from './Result.vue';

export default {
    name: "History",
    methods: {},
    components: {
        HistorySidebar,
        Result,
    },
};
</script>

<style scoped>
.history {
    display: grid;
    overflow: hidden;
}

.sidebar {
    grid-column: 1 / 2;
    grid-row: 1;
    text-align: center;
    height: 100%;
    width: 230px;
    margin: 1rem;
    /* border: solid 1px red; */
}

.show {
    grid-column: 2 / 3;
    grid-row: 1;
    height: 100%;
    flex: 1;
    /* border: solid 1px burlywood; */
}
</style>