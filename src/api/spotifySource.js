import apiConfig from './apiConfig.js';

const CLIENT_SECRET = apiConfig["CLIENT_SECRET"];
const CLIENT_ID = apiConfig["CLIENT_ID"];

// Client Credentials Flow
const APIcontroller = (()=> {
    /**
     * Retrieves the auth token used in all searches
     * saves it to store
     */
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
        .then(JSON => JSON.access_token); 
    }
    /**
     * Base API call function 
     * @param {*} token auth token 
     * @param {*} query query to be executed
     */
    const _apiCall = (token, query) => {
        return fetch("https://api.spotify.com/v1/" + query, {
            method: "GET",
            headers: { "Authorization" : "Bearer " + token }
        });
    }
    
    /**
     * Creates a recommendation query based on object
     * used in the _apiCall()
     * TODO make it more advanced
     * @param {*} queryObject 
     */
    const _createQuery = (queryObject) => {
        if (queryObject == {}) throw Error("API: Empty queryObject"); 

        let base ="";

        const max_seed_count = 5;
        if(queryObject["seed_genres"]){
            base += "seed_genres="
            for(let i = 0; i < max_seed_count && i < queryObject["seed_genres"].length; i++){
                base += queryObject["seed_genres"][i] + ",";
            }
            base = base.slice(0, base.length-1);
            base += "&";
        }else{
            base = "seed_genres=[]&";
        }
        console.log("base seed_generation " + base);

        const properties = ["acousticness","danceability","energy",
                            "instrumentalness","liveness","loudness",
                            "popularity","speechiness","tempo","valence"];
        properties.forEach(p => {
            if(queryObject[p]){
                base += p + "=" + queryObject[p] + "&";
            } 
        })
        console.log("base string: " + base);
        return base;
    }
    /**
     * Retrieves recommendations from the spotify API based on 
     * given query
     * @param {*} token 
     * @param {*} queryObject 
     */
    const _getRecommendations = (token, queryObject) => {
        let param = "recommendations?";
        param += _createQuery(queryObject);
        console.log("param string: " + param);
        return _apiCall(token, param);
    }

    return {
        getToken() {
            return _getToken();
        },
        getRecommendations(token, queryObject) {
            return _getRecommendations(token, queryObject);
        }
    }
})();
export default APIcontroller;