<template>
    <div @click="removeMsg" class="format slide-top">
        <div>
            <h1 class="category">{{ msg["category"] }}</h1>
            <p class="message">{{ msg["msg"] }}</p>
        </div>
    </div>
</template>

<script>
// Acknowledgment:
// Pattern and styling for Popup.vue and Message.vue heavily inspired by git repo
// https://github.com/markusantonwolf/best-practice-vue-js-tailwind-post-css

export default {
    props: {
        msg: {
            type: Object,
        },
    },
    
    methods: {
        removeMsg() {
            this.$store.dispatch("REMOVE_MSG", this.msg["id"]);
        },
    },
    mounted() {
        setTimeout(() => {
            this.$store.dispatch("REMOVE_MSG", this.msg["id"]);
        }, 3000);
    },
};
</script>

<style scoped>

</style>