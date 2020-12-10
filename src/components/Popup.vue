<template>
  <div class="border" v-for="message in getMessages()" :key="message['id']">
      <Message :msg="message" />
  </div>
</template>

<script>
import Message from "./Message"

export default {
    components : {
        Message,
    },
    computed:{
        messages(){
            return this.$store.getters.getPopupMessages;
        }
    },
    methods:{
        getMessages() {
            return this.messages;
        }
    },
}
</script>

<style>
.border{
    border: solid 2px orange;
}
</style>