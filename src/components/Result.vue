<template lang="">
<div>  
    <div v-if="this.mode==='search'">
        <h1 v-if="!searchExists" class="noResult" >There is no result registered, please perform a search.</h1>
    </div>
    <div v-if="!loading" class="list"> 
        <div v-if="enableList"> 
            <h1 class ="searchResult noselect"> Search result</h1> 
            <span class="genres noselect"> 
                <h2> Based on genres: </h2>
                <div class="genre" v-for="seed in seeds" v-bind:key="seed"> 
                    <h2>{{(seed).charAt(0).toUpperCase() + (seed).slice(1)}} </h2>
                    </div>
            </span>
            <div class="attributes noselect">
                <div >
                    <h2> Song attributes &#x25BC;</h2>
                </div>
                <ul class="attribute"
                    v-for="atribute in attributes"
                    :key="atribute"
                >
                    <h2> {{atribute}} </h2>
                </ul>
            </div>
        <div> 
        </div>
            <span class="songCard"  v-for="track in tracks" v-bind:key="track">
                <div class="songNumber"> 
                    <div v-show="!isClicked(track.name)"> 
                        <div class="play noselect" v-if="track.preview_url" @click="playPreview(track.preview_url, track.name)"> &#9658; </div> 
                    </div>
                    <div class="pause noselect" @click="playPreview(track.preview_url, track.name)" v-show="isClicked(track.name)"> &#9612; &#9612;</div>
                </div>
                <div class="image"> <img v-bind:src="track.album.images[0].url"> </div>
                <div class="songInfo"> 
                    <h2>{{track.name}} </h2>
                    <h3> {{track.album.name}} </h3>
                    <h3> {{track.artists[0].name}} </h3>
                    <a :href="track.external_urls.spotify" target="_blank">Open in Spotify</a>
                </div>
                <div class="explicitContainer noselect"> 
                    <div class="explicit" v-if="track.explicit">Explicit</div>    
                </div>
                <div class="playin noselect"> 
                    <img v-show="isClicked(track.name)" src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif">
                </div>
                <h3 class="songDuration noselect"> Duration {{formatMilliseconds(track.duration_ms)}}</h3>
            </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tracks: [],
            seeds: [],
            attributes: [],
            enableList: false,
            preview: null,
            interval: null,
            clicked: [],
            currentTrack: null,
        };
    },
    props: {
        mode: {
            type: String,
            validator: function (val) {
                return ["search", "history"].indexOf(val) !== -1;
            },
        },
    },
    methods: {
        populateData() {
            let data;
            this.tracks = [];
            this.seeds = [];
            this.attributes = [];
            
            if (this.mode === "search") {
                data = this.$store.getters.getRecommendations;
                if (data.res) {
                    this.tracks = data.res.tracks;
                    this.seeds = data.queryObject.seed_genres;
                    let h = data.queryObject;
                    for (let key in h) {
                        if (key !== "seed_genres")
                            this.attributes.push(key + " " + h[key]);
                    }
                    this.enableList = true;
                }
            } else if (this.mode === "history") {
                data = this.$store.getters.getViewingHistory;
                
                if (data.songs) {
                    this.tracks = data.songs;
                    this.seeds = data.seeds.seed_genres;
                    let h = data.seeds;
                    for (let key in h) {
                        if (key !== "seed_genres")
                            this.attributes.push(key.toUpperCase() + ": " + h[key]);
                    }
                    this.enableList = true;
                }
            }
        },
        formatMilliseconds(milliseconds) {
            let hours = Math.floor(milliseconds / 1000 / 60 / 60);
            let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
            let seconds = Math.floor(milliseconds / 1000) % 60;

            hours = hours < 10 ? "0" + hours : hours;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (hours !== "00") {
                minutes = minutes < 10 ? "0" + minutes : minutes;
                return hours + ":" + minutes + ":" + seconds;
            } else return minutes + ":" + seconds;
        },
        playPreview(link, trackid) {
            if(this.preview){
                this.stopPreview();
                if(trackid === this.currentTrack) {
                    this.currentTrack = null;
                    link = null;
                }
            }
            if (link && trackid !== this.currentTrack) {
                this.preview = new Audio(link);
                this.currentTrack = trackid;
                this.preview.volume = 0.3;
                this.clicked.push(trackid);

                this.preview.play().then(() => {
                    this.interval = setInterval(() => {
                    this.preview.volume += 0.01;
                    if(this.preview.volume >= 0.9) clearInterval(this.interval);
                }, 30);
                })
                .catch(err => {
                    if(err.name === 'NotAllowedError'){
                        this.$store.dispatch('ADD_MSG', {category: 'Permission Error', msg: 'Autoplay is disabled in browser'})
                    }
                    else if (err.name === 'AbortError'){
                        this.$store.dispatch('ADD_MSG', {category: 'Error', msg: 'Preview did not have enough time to load before pausing'})
                    }
                });
            }
            
        },
        stopPreview() {
            if (this.preview) {
                clearInterval(this.interval);
                this.preview.pause();
                this.preview = null;     
                this.clicked = [];
            }
        },
        load() {
            let load = this.$store.getters.getLoading;
            if (!load) this.populateData();
            else this.enableList = false;
            return load;
        },
        isClicked(trackid){
            if(this.clicked.includes(trackid)) return true;
            else return false;
        }
    },
    computed: {
        /**
         * Watches if the load status changes. Poplulates data if
         * change occur i.e, loading status set to false
         */
        loading() {
            return this.load();
        },
        searchExists(){
            let search = this.$store.getters.getRecommendations;
            
            if (! search) return false;
            return Object.keys(search).length > 0;
        }
    },
    beforeUnmount() {
        if(this.preview) this.preview.pause();  
    },
};
</script>

<style scoped >
* {
    margin: 0;
    padding: 0;
}
.list {
    height: 100%;
    width: 100%;
}
.searchResult {
    text-align: center;
    color:white;
}
.genres {
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.genre {
    margin: 5px;
}
.attribute {
    display: none;
    justify-content: center;
    align-items: center;
}
.attributes {
    color:white;
    text-align: center;
    cursor: pointer;
}
.attributes:hover .attribute{
    display: flex;
}
.songNumber {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
}
.songCard {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 8px;
    grid-row-gap: 0px; 

    overflow: hidden;
    border-radius: 6px;
    background: linear-gradient(
        90deg,
        rgba(247, 247, 247, 1) 0%,
        rgb(218, 206, 255) 100%
    );
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
}
.image {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.image img {
    width: 128px;
    height: 128px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
}
.play{
    cursor: pointer;
}
.pause{
    font-size: 1rem;
    cursor: pointer;
}
.playin{
    grid-area: 1 / 7 / 2 / 9;
    display: flex;
    justify-content: right;
    align-items: center;
    margin: 10px;
}
.playin img{
    size: 150%;
}

@media (max-width: 600px) {
    .image img {
        width: 64px;
        height: 64px;
        
    }
    h2 {
        font-size: 1rem;
    }
    h3 {
        font-size: 0.8rem;
    }
    .explicit {
        font-size: 0.8rem;
    }
    a{
        font-size: 0.6rem;
    }
}
.songInfo {
    grid-area: 1 / 3 / 2 / 7;
    margin: 1rem;
}
.songInfo h2 {
    padding-bottom: 0.5rem;
}
.songInfo h3 {
    padding-bottom: 0.5rem;
}
.explicitContainer{
    grid-area: 1 / 7 / 2 / 8;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.explicit {
    /* height: 15px; */
    border-radius: 8px;
    font-size: 1rem;
    font-style: italic;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.36);
    background-color: darkgray;
}
.noselect {
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
}
.preview {
    grid-area: 1 / 8 / 2 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
}
.songDuration {
    grid-area: 1 / 9 / 2 / 10;
    display: flex;
    justify-content: center;
    align-items: center;
}
a {
  background-color: #4CAF50;
  color: white;
  padding: 6px;
  text-decoration: none;
  text-transform: uppercase;
  transition: filter 300ms;
}

a:hover {
  filter: brightness(1.3);
}

a:active {
  background-color: #3ad43f;
}

a:visited {
  background-color: #ccc;
}

.noResult{
    color: white;
    padding-top: 15px;
    text-align: center;
}
</style>