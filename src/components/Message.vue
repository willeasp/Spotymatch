<template>
  <div class="flex justify-center w-full text-center">
    <div class="format">
      <p class="messageType">{{ msg["category"] }}</p>
      <p class="messageText"> {{ msg["msg"] }}</p>
    </div>
  </div>
</template>

<script>
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

    },
    mounted (){
            this.timeout = setTimeout(() => {
                this.$store.dispatch("REMOVE_MSG", this.msg["id"])
            }
            , 2000);
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
</style>