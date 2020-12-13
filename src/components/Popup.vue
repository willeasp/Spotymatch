<template>
    <div class="notifications">
        <transition-group name="message" mode="out-in">
            <Message
                class="singleMessage"
                v-for="message in getMessages()"
                :key="message['id']"
                :msg="message"
                v-bind:class="{ 
                    'green' : (message['category'] === 'Success!'   ||  message['color'] === 'green'),
                    'red'   : (message['category'] === 'Error'      ||  message['color'] === 'red') 
                }"
            />
        </transition-group>
    </div>
</template>

<script>
// acknowledgment:
// Pattern and styling for Popup.vue and Message.vue heavily inspired by git repo
// https://github.com/markusantonwolf/best-practice-vue-js-tailwind-post-css

import Message from "./Message";

export default {
    components: {
        Message,
    },
    computed: {
        messages() {
            return this.$store.getters.getPopupMessages;
        },
    },
    methods: {
        getMessages() {
            return this.messages;
        },
    },
};
</script>

<style lang="postcss">
.format {
    padding: 1px;
    text-align: center;
    color: white;
    user-select: none;
    -ms-user-select: none;
    height: 100%;
    text-emphasis: before;
}
.category {
    margin-top: 5px;
    margin-bottom: 3px;
    font-size: x-large;
    text-shadow: 1px 1px 8px #000000cb, -1px -1px 5px #00000034;
}
.message {
    margin-top: 0px;
    margin-bottom: 5px;
    font-size: medium;
    font-stretch: extra-expanded;
    text-shadow: 1px 1px 5px #000000, -1px 1px 5px #000000;     /* horizontal, vertical, distance */
}

.format:hover {
    cursor: pointer;
}
.notifications {
    z-index: 5;
    position: fixed;
    width: 100%;
    top: calc(1rem + 30px);
    z-index: 999;
}
/* purgecss end ignore */
.singleMessage {
    border-radius: 10px;
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.555);
    background-color: rgba(255, 255, 255, 0.849);
    backdrop-filter: blur(5px);
}
.red {
    background-color: rgba(212, 27, 27, 0.712);
}
.green {
    background-color: rgba(63, 146, 25, 0.712);        
}
.border {
    border: solid 2px orange;
}
/* purgecss start ignore */
.message-enter-active,
.message-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.message-enter-from,
.message-leave-to {
    opacity: 0;
    transform: translateY(-3rem);
}
</style>