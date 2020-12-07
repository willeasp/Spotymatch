<template>
    <div id="search">
        <form>
            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="acousticness" class="slider" id="myRange">
                <h2>{{"Acousticness: " + acousticness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="danceability" class="slider" id="myRange">
                <h2>{{"Danceability: " + danceability/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="energy" class="slider" id="myRange">
                <h2>{{"Energy: " + energy/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="instrumentalness" class="slider" id="myRange">
                <h2>{{"Instrumentalness: " + instrumentalness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="liveness" class="slider" id="myRange">
                <h2>{{"Liveness: " + liveness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="loudness" class="slider" id="myRange">
                <h2>{{"Loudness: " + loudness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="popularity" class="slider" id="myRange">
                <h2>{{"Popularity: " + popularity/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="1" max="1000" v-model="speechiness" class="slider" id="myRange">
                <h2>{{"Speechiness: " + speechiness/1000}}</h2>
            </div>
            

            <li v-for="track in recommendations" :key="track.name">
                {{track.name}}
            </li>
        </form>
    </div>
    <div class="welcome">
        
        <button @click="getToken"> tokenaye</button>
        <button @click="getRekt"> get rec</button>
        <button @click="resultHistory"> history</button>
        
    </div>
</template>

<script >
export default {
    name: "Search",
    data(){
        return {
            acousticness: 500,
            danceability: 500,
            energy: 500,
            instrumentalness: 500,
            liveness: 500,
            loudness: 500,
            popularity: 500,
            speechiness: 500
            
        }
    }
    ,
    computed: {
        recommendations() {
            return this.$store.getters.getRecommendations.tracks;
        }
    },
    methods: {
        getToken(){
            this.$store.dispatch("REQUEST_TOKEN");
            setTimeout(()=>console.log(this.$store.getters.getToken), 500);
            },
        getRekt(){
            this.$store.dispatch("REQUEST_RECOMMENDATION", 
            {
                "seed_genres": ["rock","afrobeat","alternative"],
                "acousticness": this.acousticness/100,
                "danceability": this.danceability/100,
                "energy": this.energy/100,
                "instrumentalness": this.instrumentalness/100,
                "liveness": this.liveness/100,
                "loudness": this.loudness/100,
                "popularity": this.popularity/10,
                "speechiness": this.speechiness/100
            });
        },
        resultHistory(){
            this.$store.dispatch("FETCH_RESULT_HISTORY");
            setTimeout(()=> console.log(this.$store.getters.getPreviousRecommendations) ,1000);
        }
    }
}
</script>

<style scoped>

.slideContainer{
    width: 400px;
    background-color: grey;
    margin: 20px;
    text-align: center;

}
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 300px;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s; 
  transition: opacity .2s;
}
.slider:hover{
    opacity: 1;
}
</style>