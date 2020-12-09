<template>
    <div class="title text">
        <h1>Welcome to Spotymatcher</h1>
        <h2>Discover new songs</h2>
    </div>
    <div class="sign-in">
        <form @submit.prevent>
            <h3 class="text">SIGN IN TO SPOTYMATCH</h3>
            <div class="login-input">
                <label for="login-username">
                    E-mail
                </label>
                <input :class="{'error':emailError}" type="text" v-model="email" id="login-username" placeholder="E-postadress eller användarnamn"/>
                <Error v-if="emailError" v-model:message="error"/>
            </div>
            <div class="login-input">
                <label for="login-password">
                    Password
                </label>
                <input type="password" v-model="password" id="login-password" placeholder="Password">
                <Error v-if="errorCode === 'auth/wrong-password'" v-model:message="error"/>
            </div>
            
            <template v-if="isUser">
                <button class="btn" @click="signIn">sign in</button>
                <div class="registered">
                    Not registered?
                    <a @click="setIsUser(false)">Sign up</a>
                </div>
            </template>
            <template v-else>
                <button class="btn" @click="createAccount">create account</button>
                <div class="registered">
                    Already registered?
                    <a @click="setIsUser(true)">Sign in</a>
                </div>
            </template>
        </form>
    </div>
</template>

<script>
import Error from './Error';
export default {
    name: "Login",
    components: {
        Error,
    },
    data() {
        return {
            email: "",
            password: "",
            isUser: true,
            error: "",
            errorCode: ""
        };
    },

    computed: {
        emailError() {
            return this.errorCode === 'auth/invalid-email' ||
            this.errorCode === 'auth/user-not-found';
        }
    },
    methods: {
        signIn() {   
            this.$store.dispatch("USER_SIGN_IN", {
                email: this.email,
                password: this.password,
            })
            .catch(err => {
                this.error = err.message;
                this.errorCode = err.code;
                console.log(err);
            });
        },

        createAccount() {
            this.$store.dispatch("CREATE_USER", {
                email: this.email,
                password: this.password,
            });
        },

        setIsUser(status) {
            this.isUser = status;
        }
    },
};
</script>

<style scoped>
.text {
    color: white;
    cursor: default;
}
.title {
    font-size: 28px;
    font-weight: 700;
    width: 100%;
    text-align: center;
}

.sign-in {
    text-align: center;
    color: #2c3e50;
    margin-top: 45px;
}

form {
    margin: 0 auto;
    width: 500px;
    height: 700px;
    border: 5px solid rgb(0, 0, 0);
    background: #121212;
    text-align: center;
}

.btn {
    color: #fff;
    background-color: #15883e;
    letter-spacing: 2px;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 500px;
    padding: 16px 50px 18px;
    text-transform: uppercase;
    font-family: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    line-height: 60px;
}
.btn:hover {
    background-color: #1db954;
}

.login-input {
    text-align: left;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-size: 16px;
    line-height: 1.5;
    color: white;
    font-weight: 400;
    font-family: circular-spotify-ui,Helvetica Neue,Helvetica,Arial,sans-serif;
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
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-size: 16px;
    line-height: 1.5;
    color: white;
    font-family: circular-spotify-ui,Helvetica Neue,Helvetica,Arial,sans-serif;
    box-sizing: border-box;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
}
input {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
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
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.error {
    -webkit-tap-highlight-color: rgb(255, 0, 0);
    border: 1px solid #ff0000;
}

.registered { 
    color: rgb(105, 153, 76);
    margin: 3px;
}

a {
    font-style: bold;
    text-decoration: underline;
    color: rgb(127, 170, 86);
}
a:hover {
    cursor: pointer;
    color: rgb(255, 255, 255)
}
a:visited {
    border: none;
}
</style>
