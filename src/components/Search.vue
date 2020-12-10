<template>
    <div id="search">
        <h1 id="title">Search Form</h1>
        <form>
            <div id="genreContainer">
                <input id="genreSearch" type="text" 
                    v-model="searchInput"/>
                <a class="genreButton" 
                    v-for="genre in filterdGenres" :key="genre"
                    @click="changeSelected(genre)"
                    v-bind:class="{'selected':isSelected(genre)}">
                    {{genre}}
                </a>
            </div>

            <div class="slideContainer"
                v-for="slider in querySliders" :key="slider.name"
                v-bind:class="{'disabled':isDisabled(slider.name)}"
                >
                <h2 class="sliderTitle">{{slider.name + ": " + slider.value/slider.max*100+ "%"}}</h2>
                <div class="disableButton" @click="changeDisabled(slider.name)">
                    <span class="disableText" v-if="isDisabled(slider.name)">Enable</span>
                    <span class="disableText" v-else>Disable</span>
                </div>
                <input v-bind:disabled="isDisabled(slider.name)" type="range" :min="slider.min" :max="slider.max" :step="slider.max/100" v-model="slider.value" class="slider"/>
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
                searchInput: "",
            querySliders: {
                acousticness: {
                    value: 0.5,
                    name: "Acousticness",
                    min: 0,
                    max: 1
                },
                danceability:{
                    value: 0.5,
                    name: "Danceability",
                    min: 0,
                    max: 1
                },
                energy: {
                    value: 0.5,
                    name: "Energy",
                    min: 0,
                    max: 1
                },
                instrumentalness: {
                    value: 0.5,
                    name: "Instrumentalness",
                    min: 0,
                    max: 1
                },
                liveness: {
                    value: 0.5,
                    name: "Liveness",
                    min: 0,
                    max: 1
                },
                loudness: {
                    value: 0.5,
                    name: "Loudness",
                    min: 0,
                    max: 1
                },
                popularity: {
                    value: 0.5,
                    name: "Popularity",
                    min: 0,
                    max: 100
                },
                speechiness: {
                    value: 0.5,
                    name: "Speechiness",
                    min: 0,
                    max: 1
                }
            },
            seedGenres: [],
            enabledSliders: ["Acousticness", "Danceability", "Energy", "Instrumentalness", "Liveness", "Loudness", "Popularity", "Speechiness"]
        }
    }
    ,
    computed: {
        recommendations() {
            return this.$store.getters.getRecommendations.tracks;
        },
        filterdGenres(){
            const search = this.searchInput.toLowerCase();
            return this.genres.filter(genre => genre.includes(search));
        }
        
    },
    methods: {
        getRec(){
            var searchQuery = {
                "seed_genres": this.seedGenres
            };

            this.enabledSliders.forEach(enabledSlider => {
                const sliderName = enabledSlider.toLowerCase();
                searchQuery[sliderName] = this.querySliders[sliderName].value;
                });

            console.log("enabled sliders: ");
            console.log(this.enabledSliders);

            console.log("search query: ");
            console.log(searchQuery);
            this.$store.dispatch("REQUEST_RECOMMENDATION", searchQuery);
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
        },
        changeDisabled(slider){
            if(this.isDisabled(slider)){
                this.enabledSliders =  [...this.enabledSliders, slider];
            }
            else{
                this.enabledSliders = this.enabledSliders.filter(enabledSlider => enabledSlider !== slider);
            }
        },
        isDisabled(slider){
            return !this.enabledSliders.includes(slider);
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
    box-shadow: 5px 5px 10px;
}
#title:hover{
    cursor: default;
}
form{
    margin-left: 0;
    margin-right: 30%;
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

#genreSearch{
    width:60%;
    margin: 10px;
    margin-right: 40%;
    height: 35px;
    border-radius: 20px;
    font-size: 28px;
    padding-left: 20px;
    border:none;
}

.genreButton{
    flex:1;
    height: 20px;
    width: auto;
    max-width: 180px;
    margin: 3px;
    padding: 10px;
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
    background-color: rgb(191, 141, 201);
}
.genreButton:hover{
    cursor: pointer;
    box-shadow: 5px 5px 5px;
    color: rgba(104, 32, 109, 0.788);

}
.selected:hover{
    color: white;
}
.selected{
    background-color:  rgba(133, 46, 150, 0.699);
    color: white;

}

.slideContainer{
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 80%;
    margin-left:10%;
    margin-top: 30px;
    text-align: left;
    transition: .2s;
    background-color:  rgb(238, 238, 238, 0.85);
    border-radius: 35px;
    color:black;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 5px 5px 10px;
    border:none;

}

.disableButton{
    flex:1;
    display: flex;
    width: 60px;
    height: 30px;
    padding:5px;
    margin-left: 20px;
    border-radius: 40px;
    background-color: rgba(129, 129, 129, 0.76);
    box-shadow: 3px 3px 5px;
}
.disableButton:hover{
    cursor: pointer;
}
.disabled{
    background-color: rgba(0, 0, 0, 0.226);
}

.disabled > input:hover{
    cursor: not-allowed;
    background-color: rgb(112, 21, 21);
}

.disableText{
    flex:1;
    line-height: 30px;
    font-weight: bold  ;
}
.sliderTitle{
    margin-top: 5px;
    margin-left: 5%;
    flex:1;
}

.slider {
    flex:1;
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
.slideContainer:hover:not(.disabled) > .slider{
background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce),
        to(#be31a5)
        );
    opacity: 0.5; 
}
.slider:hover{
    opacity: 1;
    cursor: pointer;
}
.disabled:hover > .slider{
    background-color: rgba(77, 15, 15, 0.719);
    
}
.disabled:hover > .disableButton{
    opacity: 1;
}
.disabled:hover{
    opacity: 0.5;
    background-color: rgba(131, 26, 12, 0.575);
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
    transition: 0.2s;
}
#recButton:hover{
    cursor: pointer;
    background-color: rgba(89, 180, 121, 0.575);
    color: white;
    box-shadow: 5px 5px 15px;
    
}

</style>