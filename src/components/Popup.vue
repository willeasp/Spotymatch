<template>
    <transition name="notifications" mode="out-in">
        <div>
            <div class="notifications">
                <transition-group name="message" mode="out-in">
                    <Message
                        class="singleMessage"
                        v-for="message in getMessages()"
                        :key="message['id']"
                        :msg="message"
                        v-bind:class="{'green': (message['category'] === 'Success!'),
                                        'red': (message['category'] === 'Error')}"
                    />
                </transition-group>
            </div>
        </div>
    </transition>
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
    text-shadow: 2px 2px 10px #000000;
}
.header {
    margin-top: 5px;
    margin-bottom: 3px;
    font-size: x-large;
}
.message {
    margin-top: 0px;
    margin-bottom: 5px;
    font-size: medium;
    font-stretch: extra-expanded;
}

.format:hover {
    cursor: pointer;
}
.notifications {
    position: fixed;
    width: 100%;
    top: calc(1rem + 30px);
}
/* purgecss end ignore */
.singleMessage {
    border-radius: 10px;
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
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
/* .notifications-enter-active,
.notifications-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.notifications-enter,
.notifications-leave-to {
    opacity: 0;
    transform: translateY(2rem);
} */
.message-enter-active,
.message-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.message-enter,
.message-leave-to {
    opacity: 0;
    transform: translateY(-3rem);
}

/* .slide-top {
    -webkit-animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        reverse both;
    animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

@-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-100px);
        transform: translateY(-100px);
    }
}
@keyframes slide-top {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-100px);
        transform: translateY(-100px);
    }
} */
</style>