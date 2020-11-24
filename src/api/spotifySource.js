import apiConfig from './apiConfig.js';

const CLIENT_SECRET = apiConfig["CLIENT_SECRET"];
const CLIENT_ID = apiConfig["CLIENT_ID"];

// Client Credentials Flow
const APIcontroller = (()=> {
    //private methods
    const _getToken = async () => {
        return fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
            },
            body: "grant_type=client_credentials"
        })
        .then(res=>res.json())
        .then(JSON=>JSON.access_token)
        .catch(err=>console.log(err));
    }

    const _apiCall = async (token, query) => {
        return fetch("https://api.spotify.com/v1/" + query, {
            method: "GET",
            headers: { "Authorization" : "Bearer " + token }
        })
        .then(res=> res.json())
        .catch(err=>console.error(err));
    }
    // TODO logic for seeds, invalid object handling
    const _createQuery = (queryObject) => {
        let base = "seed_genres=" + queryObject.seed_genres + "&";
        const properties = ["acousticness",
                            "danceability", 
                            "energy",
                            "instrumentalness",
                            "liveness",
                            "loudness",
                            "popularity",
                            "speechiness",
                            "tempo",
                            "valence"];
        properties.forEach(p => {
            if(queryObject[p]){
                base += p + "=" + queryObject[p] + "&";
            } 
        })
        console.log("base string: " + base);
        return base;
    }
    const _getRecommendations = (token, queryObject) => {
        let param = "recommendations?";
        param += _createQuery(queryObject);
        console.log("param string: " + param);
        return _apiCall(token, param).then(data => data);
    }

    return {
        getToken() {
            return _getToken();
        },
        apiCall() {
            return _apiCall();
        },
        getRecommendations(token, queryObject) {
            return _getRecommendations(token, queryObject);
        }
    }
})();
export default APIcontroller;