<template>
    <!-- Most code in this template was authored by Victor Pettersson -->
    <div class="historyShow" v-if="historyExists">
        <div class="genres header">
            <h2>Based on genres:</h2>
            <span class="genre" v-for="seed in getSeedGenres()" :key="seed">
                <h2>{{ seed.charAt(0).toUpperCase() + seed.slice(1) }}</h2>
            </span>
        </div>
        <div class="genres header">
            <div class="genre">
                <h2>Song properties:</h2>
            </div>
            <div
                class="songProperties"
                v-for="property in getSeeds()"
                :key="property"
            >
                <h2>
                    {{ property.charAt(0).toUpperCase() + property.slice(1) }}
                </h2>
            </div>
        </div>

        <span class="song" v-for="(track, index) in getTracks()" :key="index">
            <div class="songNumber">
                {{ index + 1 }}
                <div class="explicit" v-if="track.explicit">E</div>
            </div>

            <div class="image">
                <img v-bind:src="track.album.images[0].url" />
            </div>

            <div class="songInfo">
                <h2>{{ track.name }}</h2>
                <h3>{{ track.album.name }}</h3>
                <h3>{{ track.artists[0].name }}</h3>
                <a :href="track.external_urls.spotify" target="_blank"
                    >Open in Spotify</a
                >
            </div>
            <h3 class="songDuration">
                Duration {{ getDuration(track.duration_ms) }}
            </h3>
        </span>
    </div>
    <div class="historyShow" v-else>Please choose a history entry to view.</div>
</template>

<script>
export default {
    name: "HistoryShow",

    data() {
        return {
            tracks: [],
            seeds: [],
            seed_genres: [],
        };
    },

    computed: {
        historyExists() {
            if (!this.$store.getters.getViewingHistory["key"]) return false;
            return true;
        },
        history() {
            return this.$store.getters.getViewingHistory;
        },
    },
    methods: {
        getTracks() {
            return this.history["songs"];
        },
        getSeeds() {
            let listSeeds = [];
            let h = this.history["seeds"];
            for (let key in h) {
                if (key !== "seed_genres") listSeeds.push(key + " " + h[key]);
            }
            return listSeeds;
        },
        getSeedGenres() {
            return this.history["seeds"]["seed_genres"];
        },
        /**
         * Author: Victor Pettersson
         */
        getDuration(milliseconds) {
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
    },
};
</script>

<style scoped>
.historyShow {
    text-align: center;
}
* {
    margin: 0;
    padding: 0;
}
.list {
    height: 100%;
    width: 100%;
}

.genres {
    display: flex;
    justify-content: center;
    align-items: center;
}
.genre {
    margin: 5px;
}
.header {
    display: grid;
    grid-column-gap: 8px;
    grid-row-gap: 0px;

    height: auto;
    border-radius: 6px;
    color: rgb(238, 238, 238);
    background-color: rgb(238, 238, 238, 0.3);
    margin: 1rem;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
}
.songNumber {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
}
.song {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 8px;
    grid-row-gap: 0px;

    height: 11rem;
    border-radius: 6px;
    background-color: rgb(238, 238, 238, 0.85);
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
@media screen and (max-width: 600px) {
    .song {
        height: 8rem;
    }
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
}
.songInfo {
    grid-area: 1 / 3 / 2 / 6;
    margin: 1rem;
}
.songInfo h2 {
    padding-bottom: 1rem;
    align-self: center;
}
.songInfo h3 {
    padding-bottom: 1rem;
}
.explicit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    border-radius: 8px;
    font-size: 1.5rem;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.36);
    background-color: darkgray;
}
.songDuration {
    grid-area: 1 / 9 / 2 / 10;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>