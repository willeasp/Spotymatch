<template>
    <div id="search">
        <form>
            <div id="genreContainer">
                <a
                  class="genreButton" 
                  v-for="genre in genres" :key="genre"
                  @click="changeSelected(genre)"
                  v-bind:class="{'selected':isSelected(genre)}"
                    >
                    {{genre}}
                </a>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="acousticness" class="slider" id="myRange">
                <h2>{{"Acousticness: " + acousticness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="danceability" class="slider" id="myRange">
                <h2>{{"Danceability: " + danceability/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="energy" class="slider" id="myRange">
                <h2>{{"Energy: " + energy/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="instrumentalness" class="slider" id="myRange">
                <h2>{{"Instrumentalness: " + instrumentalness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="liveness" class="slider" id="myRange">
                <h2>{{"Liveness: " + liveness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="loudness" class="slider" id="myRange">
                <h2>{{"Loudness: " + loudness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="popularity" class="slider" id="myRange">
                <h2>{{"Popularity: " + popularity/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="speechiness" class="slider" id="myRange">
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
            speechiness: 500,
            seedGenres: []
        }
    }
    ,
    computed: {
        recommendations() {
            return this.$store.getters.getRecommendations.tracks;
        },
        genres(){
            return ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", 
                "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", 
                "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", 
                "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", 
                "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", 
                "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", 
                "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", 
                "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", 
                "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", 
                "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", 
                "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", 
                "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", 
                "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", 
                "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", 
                "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", 
                "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", 
                "trip-hop", "turkish", "work-out", "world-music"];
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
        },
        changeSelected(genre){
            if(this.isSelected(genre)){
                this.seedGenres = this.seedGenres.filter(word => word !== genre);
            }
            else{
                this.seedGenres = this.seedGenres.length < 3 ? [...this.seedGenres, genre] : this.seedGenres;
            }
            // this.seedGenres = this.seedGenres.includes(genre) ? this.seedGenres.filter(genre) : this.seedGenres.push(genre);
        },
        isSelected(genre){
            return this.seedGenres.includes(genre);
        }
    }
}
</script>

<style scoped>

form{
    background-color: rgb(54, 54, 54);
    margin: 10%;
    border-radius: 10px;
    box-shadow: 5px 5px 10px;
    padding: 20px;
}

#genreContainer{
    display: flex;
    width: 80%;
    height: 120px;
    margin-left:10%;
    margin-top: 30px;
    text-align: center;
    transition: .2s;
    background-color: rgb(206, 206, 206);
    border-radius: 15px;
    border: solid rgb(0, 0, 0);
    color:black;

}

.genreButton{
    flex:1;
    width: 10%;
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

.slideContainer{
    padding-top: 10px;
    width: 80%;
    height: 50px;
    margin-left:10%;
    margin-top: 30px;
    text-align: center;
    transition: .2s;
    background-color: rgb(206, 206, 206);
    border-radius: 35px;
    border: solid rgb(0, 0, 0);
    color:black;
    -ms-user-select: none;
    user-select: none;
}
.slideContainer:hover{
    color: whitesmoke;
    background-color: rgb(29, 185, 84);
}
h2{
    margin-left: 10%;
    margin-top: 5px;
    position: absolute;
}

.slider {
    position: absolute;
    margin-right: 10%;
    -webkit-appearance: none;
    appearance: none;
    width: 350px;
    height: 35px;
    background: rgb(58, 70, 61);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s; 
    transition: opacity .4s;
    border-radius: 20px;
    padding-right: 10px;
    padding-left: 10px;
    overflow-x: auto ;
}
.slider:hover{
    opacity: 1;
}




</style>