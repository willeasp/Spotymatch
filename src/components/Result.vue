<template lang="">
    <div class="list"> 

    <h1 v-if="!loading" class ="searchResult"> Search result</h1> 
    <span class="genres"> 
        <h2> Based on genres: </h2>
        <div class="genre" v-for="seed in seeds" v-bind:key="seed"> 
            <h2>{{(seed.id).charAt(0).toUpperCase() + (seed.id).slice(1)}} </h2>
            </div>
    </span>
    <div class="attributes">
            <div>
                <h2>Song attributes:</h2>
            </div>
            <div
                class="attribute"
                v-for="property in attributes"
                :key="property"
            >
                <h2>
                    {{ property}}
                </h2>
            </div>
        </div>
    <div v-if="enableList"> 
        <span class="songCard"  v-for="(track,index) in tracks" v-bind:key="track">
            <div class="songNumber"> 
                {{index+1}}
                <div class="explicit" v-if="track.explicit">Explicit</div>
            </div>
            
            <div class="image"> 
                <img v-bind:src="track.album.images[0].url" @mouseover="playPreview(track.preview_url)" @mouseleave="stopPreview()">
            </div>
            
            <div class="songInfo"> 
                <h2>{{track.name}} </h2>
                <h3> {{track.album.name}} </h3>
                <h3> {{track.artists[0].name}} </h3>
                <a :href="track.external_urls.spotify" target="_blank">Open in Spotify</a>
            </div>
            <div class="preview" v-if="track.preview_url">Hover album cover for preview</div>
            <h3 class="songDuration"> Duration {{formatMilliseconds(track.duration_ms)}}</h3>
        </span>
    </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            tracks: [],
            seeds: [],
            attributes: [],
            enableList: false,
            preview: null,
        };
    },
    props: {
        mode: {
            type: String,
            validator: function (val) {
                return ['search', 'history'].indexOf(val) !== -1;
            }
        }
    },
    methods: {
        populateData(){
            let data;
            if(this.mode === 'search'){
                console.log("search data")
                data = this.$store.getters.getRecommendations;
            }
            else if(this.mode === 'history'){
                data = this.$store.getters.getViewingHistory;
            }
            
            if(data){
                this.tracks = data.res.tracks;
                this.seeds = data.res.seeds;
                let h = data.queryObject;
                for (let key in h) {
                    if (key !== "seed_genres") this.attributes.push(key + " " + h[key]);
                }
                this.enableList = true;
            }
        },
        formatMilliseconds(milliseconds){
            let hours = Math.floor(milliseconds/1000/60/60);
            let minutes = Math.floor((milliseconds/1000/60) % 60);
            let seconds = Math.floor(milliseconds/1000) % 60;
            
            hours = (hours < 10) ? "0" + hours: hours;
            seconds = (seconds < 10) ? "0" + seconds: seconds;
            
            if(hours !== "00") {
                minutes = (minutes < 10) ? "0" + minutes: minutes;
                return hours + ":" + minutes + ":" + seconds;
            }
            else return minutes + ":" + seconds;
        },
        playPreview(link){
            if(link){
                this.preview = new Audio(link);      
                this.preview.play();
            }
        },
        stopPreview(){
            if(this.preview){
                this.preview.pause();
                this.preview = null;
            }
        },
        load(){
            console.log(this.loading);
            let load = this.$store.state.loading;
            if(!load) this.populateData();
            else this.enableList = false;
            return load; 
        }
        
    },
    computed:{
        /**
         * Watches if the load status changes. Poplulates data if
         * change occur i.e, loading status set to false
         */
        loading(){
           return this.load();
        }
    }
}
</script>

<style scoped >
* {
    margin: 0;
    padding: 0;
}
.list{
    height: 100%;
    width: 100%;
}
.searchResult{
    text-align: center;
    
}
.genres{
    display: flex;
    justify-content: center;
    align-items: center;
}
.genre{
    margin: 5px;
}
.attribute{
    display: flex;
    justify-content: center;
    align-items: center;
}
.attributes{
    text-align: center;
}
.songNumber{
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;  
    align-items: center;
    font-size: 32px; 
} 
.songCard{
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 8px;
    grid-row-gap: 0px; 

    overflow: hidden;
    border-radius: 6px;
    background: linear-gradient(90deg, rgba(247,247,247,1) 0%, rgb(218, 206, 255) 100%);
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0,0,0,0.30);
}
.image{
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.image img{
    width: 128px;
    height: 128px;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.30);
    
}
.imgOverlay {
  
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #008CBA;
}
@media (max-width: 600px){
    
    .image img{
        width: 64px;
        height: 64px;
    }
    h2{
        font-size: 1rem;    
    }
    h3{
        font-size: 0.8rem;
    }
    .explicit{
        font-size: 0.8rem;
        
    }
}
.songInfo{
    grid-area: 1 / 3 / 2 / 7;
    margin: 1rem;
}
.songInfo h2{
    padding-bottom: 0.5rem; 
}
.songInfo h3{
    padding-bottom: 0.5rem;
}
.explicit{
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-left: 8px;
    border-radius: 8px;
    font-size: 1rem;
    font-style: italic;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.36);
    background-color: darkgray;
}
.preview{
    grid-area: 1 / 7 / 2 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
}
.songDuration{
   grid-area: 1 / 9 / 2 / 10;
   display: flex;
    justify-content: center;  
    align-items: center;
}
</style>