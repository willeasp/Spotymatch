<template>
    <b
        class="sidebarButton"
        @click="activate"
        v-bind:class="{ historySidebarButtonActive: isActive }"
        >{{ getReco["visualTime"] }}</b
    >
</template>

<script>
export default {
    name: "HistorySidebarButton",

    props: {
        reco: Object,
    },

    methods: {
        activate() {
            this.$store.dispatch("SET_VIEW_HISTORY", this.reco);
        },
    },

    computed: {
        getReco() {
            return this.reco;
        },
        isActive() {
            return (
                this.reco["key"] ===
                this.$store.getters.getViewingHistory["key"]
            );
        },
    },
};
</script>

<style>
/* Style the links inside the navigation bar */
.sidebarButton {
    display: grid;
    line-height: 40px;
    text-align: center;
    height: 40px;
    width: 200px;
    border-radius: 6px;
    color: rgb(238, 238, 238);
    background-color: rgba(0, 0, 0, 0.2);
    margin: 1rem;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
    transition-property: background-color, border-color, color, box-shadow,
        filter;
    transition-duration: 0.3s;
}
/* Change the color of links on hover */
.sidebarButton:hover {
    background-color: rgba(255, 255, 255, 0.823);
    color: black;
    cursor: pointer;
}

/* Active history is highlighted */
.historySidebarButtonActive {
    background-color: rgba(208, 208, 208, 0.4);
}
</style>