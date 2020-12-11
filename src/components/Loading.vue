<template>
    <img
        class="rotate-center loading"
        src="https://open.scdn.co/cdn/images/favicon.5cb2bd30.ico"
        alt="spotify-logo"
    />
</template>

<script>
export default {
    name: "Loading",
};
</script>

<style>
.rotate-center {
    -webkit-animation: rotate-center 1s linear infinite both;
    animation: rotate-center 1s linear infinite both;
}

@-webkit-keyframes rotate-center {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotate-center {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>