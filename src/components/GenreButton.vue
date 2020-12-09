<template>
    <a class="genreButton" 
      v-bind:class="{'selected':isSelected}"
      @click="change">
        {{genreType}}
    </a>
</template>

<script>
import { computed } from 'vue'
export default {
    name: "GenreButton",
    data(){
        return {
            selected: false
        }
    },
    props:{
        genreType: String
    },
    computed:{
        isSelected(){
            return selected;
        }
    },
    methods:{
        change(){
            this.selected = !this.selected;
        }
    }

}
</script>

<style scoped>

.genreButton{
    width: 25px;
    height: 25px;
    margin: 5px;
    padding: 5px;
    text-align: center;
    transition: .08s;
    background-color: rgb(47, 88, 75);
    border-radius: 15px;
    border: solid rgb(0, 0, 0);
    color: whitesmoke;
    -ms-user-select: none;
    user-select: none;
}

.genreButton:active{
    background-color: rgb(121, 173, 157);
    border: solid rgb(83, 83, 83);

}

.genreButton:hover{
    cursor: pointer;
}
.selected{
    background-color:  rgb(29, 185, 84);
}
</style>