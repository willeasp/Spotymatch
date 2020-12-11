<template>
  <transition name="notifications" mode="out-in">
      <div>
        <div 
        class="notifications">
            <transition-group name="message" mode="out-in">
                <Message class="singleMessage" v-for="message in getMessages()" :key="message['id']" :msg="message"/>
            </transition-group>
        </div>
        </div>
  </transition>
</template>

<script>
// acknowledgment:
// Pattern and styling for Popup.vue and Message.vue heavily inspired by git repo
// https://github.com/markusantonwolf/best-practice-vue-js-tailwind-post-css

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

<style lang="postcss" scoped>
.notifications {
  position: fixed;
  width: calc(100% - 2rem);
  top: calc(1rem + 40px);
  right: 1rem;
  left: 1rem;


}
@screen md {
  .notifications {
    max-width: 400px;
    width: 40vw;
    left: auto;
  }
}
/* purgecss start ignore */
.notifications-enter-active,
.notifications-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.notifications-enter,
.notifications-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
.message-enter-active,
.message-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.message-enter,
.message-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}
/* purgecss end ignore */
.singleMessage{
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  margin: 1rem;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
}
.border{
    border: solid 2px orange;
}
</style>