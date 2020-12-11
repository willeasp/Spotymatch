<template>
  <div @click="removeMsg" class="format">
    <div >
      <p class="messageType">{{ msg["category"] }}</p>
      <p class="messageText"> {{ msg["msg"] }}</p>
    </div>
  </div>
</template>

<script>
// Acknowledgment:
// Pattern and styling for Popup.vue and Message.vue heavily inspired by git repo
// https://github.com/markusantonwolf/best-practice-vue-js-tailwind-post-css

export default {
    props : {
            msg : {
                type: Object
            }
    },
    data() {
        return {
            timeout: null,
        }
    },
    methods:{
        removeMsg(){
            this.$store.dispatch("REMOVE_MSG", this.msg["id"]);
        }
    },
    mounted (){
            this.timeout = setTimeout(() => {
                this.$store.dispatch("REMOVE_MSG", this.msg["id"])
            }
            , 10000);
    },
}
</script>

<style scoped>
.format{
    text-align: center;
}
.messageType{
    font-size:x-large;
    color:rgb(67, 67, 67);
}
.messageText{
    font-size: medium;
}
.removeBtn{
    background: rgb(67, 67, 67, 0.5);
    height:30px;
    width: 30px;
    line-height: 30px;
    border-radius: 6px;
}

.format:hover{
    cursor: pointer;
}
</style>