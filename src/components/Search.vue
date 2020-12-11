<template>
    <div id="search">
        <h1 id="title">Search Form</h1>
        <form>
            <div id="genreContainer">
                <div>
                    <input id="genreSearch" type="text" 
                        v-model="searchInput" placeholder="Filter genres"/>
                    <div id="genreReset" @click="genreReset">
                        Reset Genres
                    </div>
                </div>
                <div id="genreButtons">
                    <a class="genreButton" 
                        v-for="genre in filterdGenres" :key="genre"
                        @click="changeSelected(genre)"
                        v-bind:class="{'selected':isSelected(genre)}">
                        {{genre}}
                    </a>
                </div>
            </div>

            <div class="slideContainer"
                v-for="slider in querySliders" :key="slider.name"
                v-bind:class="{'disabled':isDisabled(slider.name)}"
                >
                <h2 class="sliderTitle">{{slider.name + ": " + Math.round(slider.value/slider.max*100)+ "%"}}</h2>
                <div class="disableButton" @click="changeDisabled(slider.name)">
                    <span class="disableText" v-if="isDisabled(slider.name)">Enable</span>
                    <span class="disableText" v-else>Disable</span>
                </div>
                <input type="range"
                    class="slider"
                    v-bind:disabled="isDisabled(slider.name)" 
                    :min="slider.min" 
                    :max="slider.max" 
                    :step="slider.max/100" 
                    v-model="slider.value" />                       
            </div>

        </form>
        <div id="sideBar">
            <div class="bigButton" id="recButton" @click="getRec">
                <RouteButton routeName="Result" text="Get Recommendation"/>
            </div>
            <div class="bigButton" id="resetButton" @click="reset">
                <span>Reset</span>
            </div>
        </div>
    </div> 
    
</template>

<script >
import RouteButton from './RouteButton'

export default {
    name: "Search",
    components: {
        RouteButton,
    },

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
                    name: "acousticness",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                danceability:{
                    value: 0.5,
                    name: "danceability",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                energy: {
                    value: 0.5,
                    name: "energy",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                instrumentalness: {
                    value: 0.5,
                    name: "instrumentalness",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                liveness: {
                    value: 0.5,
                    name: "liveness",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                loudness: {
                    value: 0.5,
                    name: "loudness",
                    min: 0,
                    max: 1,
                    enabled: true
                },
                popularity: {
                    value: 50,
                    name: "popularity",
                    min: 0,
                    max: 100,
                    enabled: true
                },
                speechiness: {
                    value: 0.5,
                    name: "speechiness",
                    min: 0,
                    max: 1,
                    enabled: true
                }
            },
            seedGenres: [],
        }
    },

    mounted() {
        const querySlidersString = localStorage.getItem("querySliders");
        if (querySlidersString)
            this.querySliders = JSON.parse(querySlidersString);

        const seedGenresString = localStorage.getItem("seedGenres");
        if (seedGenresString)
            this.seedGenres = JSON.parse(seedGenresString);
    },

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
            let searchQuery = {
                "seed_genres": this.seedGenres
            };
            Object.keys(this.querySliders).forEach(key=> {
                if(this.querySliders[key].enabled)
                    searchQuery[key] = this.querySliders[key].value;
            });
            this.$store.dispatch("REQUEST_RECOMMENDATION", searchQuery);
        },
        reset(){
            Object.keys(this.querySliders).forEach(key=>{
                this.querySliders[key].value = this.querySliders[key].max/2;
                this.querySliders[key].enabled = true;
            });
            this.genreReset();
        },
        genreReset(){
            this.seedGenres = [];
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
            let s = this.querySliders[slider];
            this.querySliders[slider].enabled = s.enabled ? false : true;
        },
        isDisabled(slider){
            return !this.querySliders[slider].enabled;
        }
    
    },

    watch: {
        querySliders: {
            handler(val) {
                localStorage.setItem("querySliders", JSON.stringify(val));
            },
            deep: true
        },
        seedGenres: {
            handler(val) {
                localStorage.setItem("seedGenres", JSON.stringify(val));
            },
            deep: true
        }
    }
}
</script>

<style scoped>

#title{
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    background: linear-gradient(
        90deg,
        rgba(247, 247, 247, 1) 0%,
        rgb(218, 206, 255) 100%
    );
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
    margin-bottom: 30px;
}

#genreContainer{
    padding: 10px;
    width: 80%;
    margin-left:10%;
    margin-top: 30px;
    background: linear-gradient(
            90deg,
            rgba(247, 247, 247, 1) 0%,
            rgb(218, 206, 255) 100%
        );    
    border-radius: 15px;
    box-shadow: 5px 5px 10px;
}

#genreButtons{
    display: flex;
    flex-wrap: wrap;
    max-height: 250px;
    overflow-y: scroll;
    text-align: center;
    transition: .2s;
    color:black;
    -ms-overflow-style: none;  
    scrollbar-width: none; 
}
#genreButtons::-webkit-scrollbar {
    display: none;
}

#genreSearch{
    width:60%;
    margin: 15px;
    height: 35px;
    border-radius: 20px;
    font-size: 22px;
    padding-left: 20px;
    border:none;
}
#genreSearch:focus{
    outline: none;
}
#genreReset{
    width:100px;
    padding: 10px;
    margin-right: 5%;
    margin-bottom: 5%;
    border-radius: 30px;
    background-color: blueviolet;
    color: black;
    box-shadow: 2px 2px 5px;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
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
    flex-flow: wrap; 
    align-items: center;
    padding: 10px;
    width: 80%;
    margin-left:10%;
    margin-top: 30px;
    text-align: left;
    transition: .2s;
    border-radius: 15px;
    color:black;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 5px 5px 10px;
    border:none;

}
.slideContainer:not(.disabled){
    background: linear-gradient(
            90deg,
            rgba(247, 247, 247, 1) 0%,
            rgb(218, 206, 255) 100%
        );   
}

.disableButton{
    width: 70px;
    padding:5px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 40px;
    box-shadow: 1px 1px 3px;
    text-align: center;
    background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce79),
        to(#be31a46e)
        );
    color: black;
}
.disableButton:active{
    background-color: rgb(142, 177, 206);
    color: rgb(192, 192, 192);
}
.disableButton:hover{
    cursor: pointer;
}
.disabled{
    background-color: rgba(0, 0, 0, 0.226);
}
.disabled > .disableButton{
    opacity: 0.5;
    color: black;
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
    margin-left: 20px;
    margin-top: 5%;
    width: 100%;
    text-transform: capitalize;
}

.slider {
    flex:1;
    margin-right:10px;
    -webkit-appearance: none;
    /* appearance: none; */
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
.disabled:hover{
    opacity: 0.5;
    background-color: rgba(131, 26, 12, 0.575);
}
.disabled > .disableButton:hover{
    opacity: 1;
}


#sideBar{
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 25%;
    height: 80%;
    z-index:1;
    top: 48px;
    right: 0;
    margin-top: 5%;
    margin-right:5%;
    background: linear-gradient(
            90deg,
            rgba(247, 247, 247, 1) 0%,
            rgb(218, 206, 255) 100%
        );       border-radius: 15px;
    box-shadow: 5px 5px 10px;
    position: fixed;
}

.bigButton{
    margin: 0 auto;
    margin-top: 20px;
    height: 50px;
    width: 80%;
    max-width: 300px;
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
    transition: 0.2s;
}

.bigButton:hover{
    cursor: pointer;
    background-color:  rgba(133, 46, 150, 0.699);
    color: white;
    box-shadow: 5px 5px 15px;
    
}
.bigButton:active{
    background-color: rgb(197, 151, 206);
}
#recButton{
    flex:0;
}
#resetButton{
    flex:0;
}
</style>