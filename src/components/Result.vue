<template lang="">
    <div class="list"> 

    <h1 v-if="!loading" class ="searchResult"> Search result</h1> 
    <span class="genres"> 
        <h2> Based on genres: </h2>
        <div class="genre" v-for="seed in seeds"> 
            <h2>{{(seed.id).charAt(0).toUpperCase() + (seed.id).slice(1)}} </h2>
            </div>
    </span>

    <span class="songCard" v-if="enableList" v-for="(track,index) in tracks">
        <div class="songNumber"> 
            {{index+1}}
            <div class="explicit" v-if="track.explicit">E</div>
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
</template>

<script>
export default {
    data(){
        return{
            tracks: [],
            seeds: [],
            enableList: false,
            preview: null,
        };
    },
    methods: {
        populateData(){
            this.tracks = this.$store.getters.getRecommendations.tracks;
            this.seeds = this.$store.getters.getRecommendations.seeds;
            this.enableList = true;
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
            this.preview.pause();
        },
        
    },
    computed:{
        /**
         * Watches if the load status changes. Poplulates data if
         * change occur i.e, loading status set to false
         */
        loading(){
            let load = this.$store.state.loading;
            if(!load) this.populateData();
            else this.enableList = false;
            return load; 
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
    
    height: 11rem;
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
@media (max-width: 600px){
    .songCard{
        height: 8rem;
    }
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
    font-size: 1.5rem;
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