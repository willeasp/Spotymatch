<template>
    <div id="search">
        <div class="loadingBackgorund" v-if="loading">
                <Loading class="loading" />
        </div>
        <h1 id="title">Search Form</h1>
        <form>
            <div id="genreContainer">
                <div>
                    <input id="genreSearch" type="text" 
                        v-model="searchInput" placeholder="Filter genres"/>
                    <a id="genreReset" @click="genreReset" >
                        Reset Genres
                    </a>
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

        <!-- container for each slider -->
            <div class="slideContainer"
                v-for="slider in querySliders" :key="slider.name"
                v-bind:class="{'disabled':isDisabled(slider.name)}"
                >
                <h2 class="sliderTitle">{{slider.name + ": " + Math.round(slider.value * slider.scale)+ slider.unit}}</h2>

                <a class="descButton" v-if="isDesc(slider.name)" @click="changeDesc(slider.name)">&#x25B2;</a>
                <a class="descButton" v-else @click="changeDesc(slider.name)">&#x25BC;</a>
                <span class="description" v-if="isDesc(slider.name)" >{{slider.desc}}</span>

                <div class="disableButton" @click="changeDisabled(slider.name)">
                    <span class="disableText" v-if="isDisabled(slider.name)">Enable</span>
                    <span class="disableText" v-else>Disable</span>
                </div>

                <!-- slider -->
                <input type="range"
                    class="slider"
                    v-bind:disabled="isDisabled(slider.name)" 
                    :min="slider.min" 
                    :max="slider.max" 
                    :step="slider.step" 
                    v-model="slider.value" />                       
            </div>

        </form>
        <div id="sideBar">
            <div id="buttonContainer">
                <div :class="{'disabledButton':noGenres()}" class="bigButton" id="recButton" @click="getRec">
                    Get Recommendation
                </div>
                <div class="bigButton" id="resetButton" @click="reset">
                    Reset
                </div>
            </div>
            <div id="textContainer">
                <span>
                <h2>Here you can find recommendations of songs to your liking. <br></h2>
                <h3> 
                    Step by step introduction: <br><br>
                    1.  Select one to five genres of the resulting recommendation songs. <br>
                </h3>
                <h3 class="red">
                        Select at least one genre to perform a search. <br><br>
                </h3>
                <h3>
                    2.  Select the characteristics of the songs with the sliders, you can disable specific attributes if you do not care of them. <br>
                        If you do not know what the different attributes mean you have an "arrow button" which shows a description. <br><br>
                    3.  Get your recommended songs by clicking the "GET RECOMMENDATION" button.<br>
                </h3>
                </span>
            </div>
        </div>
    </div> 
    
</template>

<script >

import Loading from "./Loading.vue";


export default {
    name: "Search",
    components: {
        Loading
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
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "A confidence measure from 0 to 100% of whether the " 
                        + "track is acoustic. 100% represents high confidence the track is acoustic."
                },
                danceability: {
                    value: 0.5,
                    name: "danceability",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Danceability describes how suitable a track is for "
                        + "dancing based on a combination of musical elements "
                        + "including tempo, rhythm stability, beat strength, and" 
                        + " overall regularity."
                },
                energy: {
                    value: 0.5,
                    name: "energy",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Energy represents a perceptual measure of intensity"
                        + " and activity. Typically, energetic tracks feel fast,"
                        + " loud, and noisy. For example, death metal has high"
                        + " energy, while a Bach prelude scores low on the scale. "
                },
                instrumentalness: {
                    value: 0.5,
                    name: "instrumentalness",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Predicts whether a track contains no vocals. “Ooh” and"
                        + " “aah” sounds are treated as instrumental in this"
                        + " context. Rap or spoken word tracks are clearly"
                        + " “vocal”. The closer the instrumentalness value is to"
                        + " 100%, the greater likelihood the track contains no vocal"
                        + " content. Values above 50% are intended to represent"
                        + " instrumental tracks, but confidence is higher as the"
                        + " value approaches 100%."
                },
                liveness: {
                    value: 0.5,
                    name: "liveness",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Detects the presence of an audience in the recording."
                        + " Higher liveness values represent an increased"
                        + " probability that the track was performed live. A value"
                        + " above 80% provides strong likelihood that the track is"
                        + " live."
                },
                popularity: {
                    value: 50,
                    name: "popularity",
                    min: 0,
                    max: 100,
                    enabled: true,
                    step: 1,
                    scale: 1,
                    unit: "%",
                    description: false,
                    desc: "The popularity of the track. The value will be between 0"
                        + " and 100%, with 100% being the most popular. The popularity"
                        + " is calculated by algorithm and is based, in the most part,"
                        + " on the total number of plays the track has had and how"
                        + " recent those plays are. "
                },
                speechiness: {
                    value: 0.5,
                    name: "speechiness",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Speechiness detects the presence of spoken words in a track."
                        + " The more exclusively speech-like the recording (e.g. talk"
                        + " show, audio book, poetry), the closer to 100% the attribute"
                        + " value. Values above 66% describe tracks that are probably"
                        + " made entirely of spoken words. Values between 33% and 66%"
                        + " describe tracks that may contain both music and speech,"
                        + " either in sections or layered, including such cases as rap"
                        + " music. Values below 33% most likely represent music and"
                        + " other non-speech-like tracks."
                },
                valence: {
                    value: 0.5,
                    name: "valence",
                    min: 0,
                    max: 1,
                    enabled: true,
                    step: 1/100,
                    scale: 100,
                    unit: "%",
                    description: false,
                    desc: "Describing the musical positiveness conveyed by a track."
                        + " Tracks with high valence sound more positive (e.g. happy,"
                        + " cheerful, euphoric), while tracks with low valence sound"
                        + " more negative (e.g. sad, depressed, angry)."
                },
                tempo: {
                    value: 130,
                    name: "tempo",
                    min: 10,
                    max: 250,
                    enabled: true,
                    step: 1,
                    scale: 1,
                    unit: "BPM",
                    description: false,
                    desc: "The overall estimated tempo of a track in beats per minute"
                        + " (BPM). In musical terminology, tempo is the speed or pace"
                        + " of a given piece and derives directly from the average"
                        + " beat duration.\n"
                },
                loudness: {
                    value: -30,
                    name: "loudness",
                    min: -60,
                    max: 0,
                    enabled: true,
                    step: 1,
                    scale: 1,
                    unit: "dB",
                    description: false,
                    desc: "The overall loudness of a track in decibels (dB). Loudness"
                            + " values are averaged across the entire track and are"
                            + " useful for comparing relative loudness of tracks."
                            + " Loudness is the quality of a sound that is the primary"
                            + " psychological correlate of physical strength (amplitude)."
                            + " Values typical range between -60 and 0 db."
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
        },
        loading(){
            return  this.$store.getters.getLoading;
        },
        
    },
    methods: {
        getRec(){
            if(this.noGenres()){
                this.$store.dispatch("ADD_MSG", {
                    category: "No Genres",
                    msg: "Must select at least one genre to get a recommendation",
                    color: "red"
                })
                return; 
            }
            let searchQuery = {
                "seed_genres": this.seedGenres
            };
            Object.keys(this.querySliders).forEach(key=> {
                if(this.querySliders[key].enabled)
                    searchQuery[key] = this.querySliders[key].value;
            });

            this.$store.dispatch("REQUEST_RECOMMENDATION", searchQuery)
            .then(()=>{
                this.reroute("Result");
            })
            .catch(()=>{
                this.$store.dispatch("ADD_MSG", {
                    category: "Recomendation",
                    msg: "Something went wrong, check if your search is correctly filled or try again later",
                    color: "red"
                })
            });
        },
        reroute(location){
            window.location.hash = location;
        },
        reset(){
            Object.keys(this.querySliders).forEach(key=>{
                this.querySliders[key].value = (this.querySliders[key].max-this.querySliders[key].min)/2+this.querySliders[key].min;
                this.querySliders[key].enabled = true;
            });
            this.genreReset();
        },
        genreReset(){
            this.seedGenres = [];
        },
        changeSelected(genre){
            if (this.isSelected(genre)){
                this.seedGenres = this.seedGenres.filter(word => word !== genre);
            }
            else if ( this.seedGenres.length < 5) {
                this.seedGenres = this.seedGenres.length < 5 ? [...this.seedGenres, genre] : this.seedGenres;
            }
            else {
                this.$store.dispatch("ADD_MSG", {
                    category: "Genres",
                    msg: "You can only pick 5 genres",
                    color: "red"
                })
            }
        },
        isSelected(genre){
            return this.seedGenres.includes(genre);
        },
        changeDisabled(slider){
            this.querySliders[slider].enabled = !this.querySliders[slider].enabled;
        },
        isDisabled(slider){
            return !this.querySliders[slider].enabled;
        },
        changeDisabledSpec(slider){
            if (slider === this.tempo.name){
                this.tempo.enabled = !this.tempo.enabled;
            }
            else if (slider === this.loudness.name){
                this.loudness.enabled = !this.loudness.enabled;
            }
        },
        isDisabledSpec(slider){
            if (slider === this.tempo.name){
                return !this.tempo.enabled;
            }
            else if (slider === this.loudness.name){
                return !this.loudness.enabled;
            }
        },
        changeDesc(slider){
            this.querySliders[slider].description = !this.querySliders[slider].description;
        },
        isDesc(slider){
            return this.querySliders[slider].description;
        },
        noGenres(){
            return this.seedGenres < 1;
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
    z-index: 0;
    margin: 15px;
    height: 35px;
    border-radius: 20px;
    font-size: 22px;
    padding-left: 20px;
    padding-bottom: 8px;
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
    background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce79),
        to(#be31a46e)
        );    
    color: black;
    font-weight: bold;
    box-shadow: 2px 2px 5px;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
}
#genreReset:active{
    background-color: rgb(142, 177, 206);
    color: rgb(192, 192, 192);
}

.genreButton{
    flex:1;
    height: 20px;
    width: auto;
    max-width: 180px;
    margin: 3px;
    padding: 12px 15px 9px;
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
    z-index: 0;
}
.slideContainer:not(.disabled){
    background: linear-gradient(
            90deg,
            rgba(247, 247, 247, 1) 0%,
            rgb(218, 206, 255) 100%
        );   
}
.descButton{
    width: 40px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 25px;
}
.descButton:hover{
    cursor: pointer;
}
.descButton:active{
    color:rgb(58, 58, 58);
}
.description{
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20px;
    width: 90%;
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
    margin-top: 5px;
    width: 85%;
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
/*slider handleknob css*/
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 20px; /* Set a specific slider handle width */
  height: 20px; /* Slider handle height */
  background: rgba(104, 32, 109, 0.788);
  border-radius: 50%;
  cursor: pointer; /* Cursor on hover */
}
/*slider handleknob css*/
.slider::-moz-range-thumb {
  width: 20px; /* Set a specific slider handle width */
  height: 20px; /* Slider handle height */
  background: rgba(104, 32, 109, 0.788);
  cursor: pointer; /* Cursor on hover */
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
    width: 25%;
    height: 85%;
    padding: 20px;
    z-index: 1;
    top: 0;
    right: 0;
    margin-top: 70px;
    margin-right:3%;
    margin-bottom:5%;
    background: linear-gradient(
            90deg,
            rgba(247, 247, 247, 1) 0%,
            rgb(218, 206, 255) 100%
        );       border-radius: 15px;
    box-shadow: 5px 5px 10px;
    position: fixed;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none; 
}
#sidebar::-webkit-scrollbar {
  display: none;
}
#textContainer{
    height: auto;
    position: relative;
}
#sidebar > h3, #sidebar > h2{
    height: 300px;
}
.red{
    color: red;
    background-color: transparent;
}

#buttonContainer{
    width: 100%;
    height: 170px;
    position: relative;
}

.bigButton{
    height: 20px;
    margin: 0 auto;
    width: 80%;
    max-width: 350px;
    padding: 20px;
    text-align: center;
    background-color: rgb(253, 253, 253);
    border-radius: 50px;
    color: rgb(0, 0, 0);
    -ms-user-select: none;
    user-select: none;
    text-transform: uppercase;
    font-weight: bold;
    transition: 0.2s;
    box-shadow: 2px 2px 5px;
    font-size: (20px + 1.35vw);
    
    font-weight: bold; 
    margin-top:5%;    
    line-height: 90%;
}

.bigButton:hover:not(.disabledButton){
    cursor: pointer;
    background-color:  rgba(133, 46, 150, 0.699);
    color: white;
    box-shadow: 5px 5px 15px;
}

.bigButton:active:not(.disabledButton){
    background-color: rgb(197, 151, 206);
}

#recButton{
    flex:0;
    height:auto;
    
}

.disabledButton{
    background-color: rgba(83, 83, 83, 0.438);
}
.disabledButton:hover{
    background-color: rgba(139, 36, 36, 0.774);
}
.loading{
    padding: 20px;
    text-align: center;
    z-index: 1;
    position: fixed;
    top: 50%;
    right:50%;
    width: 10%;
    background-color: blue;
    border-radius: 100%;
    background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#6192ce79),
        to(#be31a46e)
        );
}

</style>
