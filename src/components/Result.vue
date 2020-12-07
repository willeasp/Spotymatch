<template lang="">
    <div class="list"> 

    <h1 v-if="!loading" class ="searchResult"> Search result</h1> 
    <span class="song" v-if="enableList" v-for="(track,index) in tracks">
        <div class="songNumber"> 
            {{index+1}}
        </div>
        
        <div class="image"> 
            <img v-bind:src="track.album.images[0].url">
        </div>
        <div class="songInfo"> 
            <h2> Name: {{track.name}}</h2>
            
            <h3> Artist: {{track.artists[0].name}} </h3>
            <a :href="track.external_urls.spotify" target="_blank"> Open in Spotify</a> 
        </div>
            <h3 class="songDuration"> Duration {{(Math.floor(track.duration_ms/1000/60)).toFixed()}}:{{((track.duration_ms/1000) - ((Math.floor(track.duration_ms/1000/60).toFixed())*60)).toFixed()}}</h3>
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
        };
    },
    methods: {
        generate(){
            this.tracks = this.$store.getters.getRecommendations.tracks;
            this.seeds = this.$store.getters.getRecommendations.seeds;
            this.enableList = true;
            console.log("Result generete()")
        }
    },
    computed:{
        loading(){
            let load = this.$store.state.loading
            if(!load) this.generate()
            return load; 
        }
    }
}
</script>

<style scoped >
.searchResult{
    text-align: center;
    
}
.songNumber{
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;  
    align-items: center;
    font-size: 32px; 
} 
.list{
    height: 100%;
    width: 100%;
    /* background-color: darkgray; */
    
}
.song{
   display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
    
    border-radius: 6px;
    background-color: darkgray;
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0,0,0,0.30);
}
.image{
     grid-area: 1 / 2 / 2 / 3;
    align-content: bottom;;
}
.image img{
    display: block;
    margin-left: 10px;
    margin-right: 10px;
    width: 187px;

}
.songInfo{
   grid-area: 1 / 3 / 2 / 9;
}
.songDuration{
   grid-area: 1 / 9 / 2 / 10;
   display: flex;
    justify-content: center;  
    align-items: center;
}
</style>