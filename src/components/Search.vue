<template>
    <div id="search">
        <h1 id="title">Search Form</h1>
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
                <input type="range" min="0" max="1000" v-model="acousticness" class="slider">
                <h2>{{"Acousticness: " + acousticness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="danceability" class="slider">
                <h2>{{"Danceability: " + danceability/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="energy" class="slider" >
                <h2>{{"Energy: " + energy/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="instrumentalness" class="slider" >
                <h2>{{"Instrumentalness: " + instrumentalness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="liveness" class="slider" >
                <h2>{{"Liveness: " + liveness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="loudness" class="slider" >
                <h2>{{"Loudness: " + loudness/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="popularity" class="slider" >
                <h2>{{"Popularity: " + popularity/1000}}</h2>
            </div>

            <div class="slideContainer">
                <input type="range" min="0" max="1000" v-model="speechiness" class="slider" >
                <h2>{{"Speechiness: " + speechiness/1000}}</h2>
            </div>
            
            <div id="lowerButtons">
                <div id="recButton" @click="getRec">
                    <span>Get recommendations</span>
                </div>
            </div>

        </form>
    </div>
    
</template>

<script >


export default {
    name: "Search",
    data(){
        return {
            genres:["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", 
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
                "trip-hop", "turkish", "work-out", "world-music"],
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
    },
    methods: {
        getRec(){
            this.$store.dispatch("REQUEST_RECOMMENDATION", 
            {
                "seed_genres": this.seedGenres,
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
        changeSelected(genre){
            if(this.isSelected(genre)){
                this.seedGenres = this.seedGenres.filter(word => word !== genre);
            }
            else{
                this.seedGenres = this.seedGenres.length < 5 ? [...this.seedGenres, genre] : this.seedGenres;
            }
        },
        isSelected(genre){
            return this.seedGenres.includes(genre);
        }
    }
}
</script>

<style scoped>

#title{
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.692);
    width: 300px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
}
#title:hover{
    cursor: default;
}
form{
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    flex-direction: column;
}

#genreContainer{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    width: 80%;
    margin-left:10%;
    margin-top: 30px;
    text-align: center;
    transition: .2s;
    background-color:  rgba(255, 255, 255, 0.692);
    border-radius: 15px;
    color:black;
    box-shadow: 5px 5px 10px;

}

.genreButton{
    flex:1;
    height: 20px;
    width: auto;
    margin: 3px;
    padding: 5px;
    text-align: center;
    transition: .12s;
    background-color: rgb(24, 27, 26);
    border-radius: 15px;
    color: whitesmoke;
    white-space: nowrap;
    -ms-user-select: none;
    user-select: none;
    text-transform: uppercase;
    font-weight: bold;
}
.genreButton:active{
    background-color: rgb(150, 173, 166);
}
.genreButton:hover{
    cursor: pointer;
    box-shadow: 5px 5px 5px;
    color: rgba(89, 180, 121, 0.575);

}
.selected:hover{
    color: white;
}
.selected{
    background-color:  rgb(29, 185, 84);
    color: white;

}

.slideContainer{
    padding-top: 10px;
    width: 80%;
    height: 50px;
    margin-left:10%;
    margin-top: 30px;
    text-align: center;
    transition: .2s;
    background-color:  rgba(255, 255, 255, 0.692);
    border-radius: 35px;
    color:black;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 5px 5px 10px;
}
.slideContainer:hover{
    color: whitesmoke;
    background-color: rgba(89, 180, 121, 0.575);
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
    background: rgba(77, 77, 77, 0.452);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s; 
    border-radius: 20px;
    padding-right: 10px;
    padding-left: 10px;
    overflow-x: auto ;
    transition: all 0.3s ease;
}
.slider:hover{
    opacity: 1;
    background-color: rgba(89, 180, 121, 0.575);
}
#lowerButtons{
    margin-left: 5%;
    margin-top: 70px; 
}
#recButton{
    margin-bottom: 5%;
    height: 50px;
    width: 250px;
    padding: 15px;
    text-align: center;
    background-color: rgb(253, 253, 253);
    border-radius: 50px;
    color: rgb(0, 0, 0);
    -ms-user-select: none;
    user-select: none;
    text-transform: uppercase;
    font-weight: bold;
    white-space: nowrap;
    vertical-align:middle;
    font-size: 20px;
    line-height:50px;
}
#recButton:hover{
    cursor: pointer;
    background-color: rgb(59, 153, 72);
    color: white;
    box-shadow: 5px 5px 15px;
    
}

</style>