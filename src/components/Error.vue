<template>
    <div class="errorbox">
        {{message}}
    </div>
</template>

<script>
export default {
    name: "Error",
    props: {
        message: String,
    }
    
}
</script>

<style>
.errorbox {
    color: red;
}
</style>