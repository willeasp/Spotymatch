<template>
    <Popup/>
    <div class="title text">
        <div class="header">
            <h1>Welcome to Sp<img
                src="https://open.scdn.co/cdn/images/icons/Spotify_256.c8416b60.png"
                alt="spotify-logo"
            />tymatcher</h1>
            
        </div>
        <h2>Discover new songs based on preferences</h2>
    </div>
    <div class="sign-in slide-top">
        <form @submit.prevent>
            <h3 class="text">SIGN IN TO SPOTYMATCH</h3>
            <div class="login-input">
                <label for="login-username"> E-mail </label>
                <input
                    :class="{ error: emailError }"
                    type="text"
                    v-model="email"
                    id="login-username"
                    placeholder="E-mail"
                />
                <Error v-if="emailError" v-model:message="error" />
            </div>
            <div class="login-input">
                <label for="login-password"> Password </label>
                <input
                    :class="{ error: passwordError }"
                    type="password"
                    v-model="password"
                    id="login-password"
                    placeholder="Password"
                />
                <Error v-if="passwordError" v-model:message="error" />
            </div>

            <template v-if="isUser">
                <button class="btn" @click="signIn">sign in</button>
                <div class="registered">
                    Not registered?
                    <a @click="setIsUser(false)">Sign up</a>
                </div>
            </template>
            <template v-else>
                <button class="btn" @click="createAccount">
                    create account
                </button>
                <div class="registered">
                    Already registered?
                    <a @click="setIsUser(true)">Sign in</a>
                </div>
            </template>
            <div class="info">
                <p>
                    The Spotymatch app does not have access to your password. We
                    only collect your email to be able to store your favourite
                    searches for future reference.
                </p>
            </div>
            <div class="forgot-password">
                Forgot your password?
                <a @click="passwordReset">Reset password</a>
            </div>
        </form>
    </div>
</template>

<script>
import Error from "./Error";
import Popup from "./Popup";
export default {
    name: "Login",
    components: {
        Error,
        Popup
    },
    data() {
        return {
            email: "",
            password: "",
            isUser: true,
            error: "",
            errorCode: "",
        };
    },

    computed: {
        emailError() {
            return [
                "auth/invalid-email",
                "auth/user-not-found",
                "auth/email-already-in-use",
            ].includes(this.errorCode);
        },

        passwordError() {
            return [
                "auth/invalid-password",
                "auth/wrong-password",
                "auth/weak-password",
            ].includes(this.errorCode);
        },
    },
    methods: {
        signIn() {
            this.$store
                .dispatch("USER_SIGN_IN", {
                    email: this.email,
                    password: this.password,
                })
                .catch((err) => {
                    this.error = err.message;
                    this.errorCode = err.code;
                });
        },

        createAccount() {
            this.$store
                .dispatch("CREATE_USER", {
                    email: this.email,
                    password: this.password,
                })
                .catch((err) => {
                    this.error = err.message;
                    this.errorCode = err.code;
                });
        },

        setIsUser(status) {
            this.isUser = status;
        },

        passwordReset() {
            this.$store.dispatch("USER_RESET_PASSWORD", this.email);
        }
    },
};
</script>

<style scoped>
h1 {
    margin-top: 100px;
}
h2 {
    margin-bottom: 20px;
}
.text {
    color: white;
    cursor: default;
}
.title {
    font-size: 2vw;
    font-weight: 700;
    width: 100%;
    text-align: center;
}

.sign-in {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 100px;
}

form {
    margin: 0 auto;
    width: 500px;
    height: 500px;
    border: 5px solid rgb(0, 0, 0);
    background: #141414;
    text-align: center;
    border-radius: 5px;
}

.btn {
    margin-top: 30px;
    margin-bottom: 5px;
    color: #fff;
    background-color: #15883e;
    letter-spacing: 2px;
    transition-property: background-color, border-color, color, box-shadow,
        filter;
    transition-duration: 0.3s;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 500px;
    padding: 16px 55px 15px;
    text-transform: uppercase;
    font-family: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    line-height: 60px;
    outline: none;
}
.btn:hover {
    background-color: #1db954;
}
.btn:active {
    background-color: #52c078;
}

.login-input {
    text-align: left;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    line-height: 1.5;
    color: white;
    font-weight: 400;
    font-family: circular-spotify-ui, Helvetica Neue, Helvetica, Arial,
        sans-serif;
    box-sizing: border-box;
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    width: 100%;
    margin-bottom: 10px;
}

label {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    line-height: 1.5;
    color: white;
    font-family: circular-spotify-ui, Helvetica Neue, Helvetica, Arial,
        sans-serif;
    box-sizing: border-box;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
}
input {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    font: inherit;
    margin: 0;
    font-family: inherit;
    display: block;
    font-size: 16px;
    line-height: 1.5;
    width: 100%;
    height: 40px;
    padding: 6px 12px;
    border: 1px solid #15883e;
    border-radius: 0;
    box-shadow: none;
    transition: border-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
}
.error {
    -webkit-tap-highlight-color: rgb(255, 37, 37);
    border: 1px solid rgb(255, 37, 37);
}

.registered {
    color: rgb(105, 153, 76);
    margin: 3px;
}

a {
    font-style: bold;
    text-decoration: underline;
    color: rgb(127, 170, 86);
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}
a:hover {
    cursor: pointer;
    color: rgb(255, 255, 255);
}
a:visited {
    border: none;
}

:root {
    --y: 500;
}
.slide-top {
    -webkit-animation: slide-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation-fill-mode: backwards;
}
@-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}
@keyframes slide-top {
    0% {
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

.info {
    margin: 0 auto;
    width: 60%;
    text-align: justify;
    margin-top: 35px;
}

.info p {
    direction: left;
    unicode-bidi: bidi-override;
}

.header img {
    margin: 0px;
    vertical-align: middle;
    height: 4vw;
}

.forgot-password a {
    color: inherit;
}
.forgot-password a:hover {
    color: rgb(65, 65, 65);
}
</style>
