
<template>
    <header id="topMenu">
        <img class ="logo" src="../assets/pe.png" alt="Pear logo">
        <h1>Spotymatch</h1>
    </header>
</template>

<script>
export default {
    name: "TopMenu" 
}
</script>

<style scoped>
    .topMenu {
        background: #333;
        color: darkolivegreen;
        text-align: left;
        padding: 10px;
        height: 100px;
    }
    /* .logo{
        height: ;
    } */
    h1 {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>