<template>
    <div class="color-bg">
    <div class="black-bg">
        <div class="title text">
            <h1>Welcome to Spotymatcher</h1>
            <h2>Discover new songs</h2>
        </div>
        <div id="sign-in">
            <form>
                <h3 class="text">Sign In</h3>
                <input type="text" v-model="email" placeholder="email" />
                <input
                    type="text"
                    v-model="password"
                    placeholder="password"
                    @keydown.enter="signIn"
                />
                <button id="email" @click="signIn">sign in</button>
                <button id="password" @click="createAccount">create account</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        signIn() {
            this.$store.dispatch("USER_SIGN_IN", {
                email: this.email,
                password: this.password,
            });
        },

        createAccount() {
            this.$store.dispatch("CREATE_USER", {
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style scoped>
.text {
    font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
    color: white;
}
.title {
    font-size: 28px;
    font-weight: 900;
    width: 100%;
    text-align: center;
}
.color-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    /* background-image: "../assets/pear-png-28.png"; */

    background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce),
        to(#be31a5)
    );
}
.black-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.849));
}

#sign-in {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

form {
    /* display: flex;
    justify-content: center; */
    margin: 0 auto;
    width: 500px;
    height: 700px;
    border: 5px solid rgb(0, 0, 0);
    background: #121212;
    text-align: center;
}
.imgContainer {
    text-align: center;
    height: 10%;
}
.loginContainer {
    padding: 20px;
}
</style>