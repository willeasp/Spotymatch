import apiConfig from './apiConfig.js';

const CLIENT_SECRET = apiConfig["CLIENT_SECRET"];
const CLIENT_ID = apiConfig["CLIENT_ID"];

// Client Credentials Flow
const APIcontroller = (()=> {
    /**
     * Retrieves the auth token used in all searches
     * saves it to store
     * @returns authorisation token used in API calls
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
        // .then(JSON => JSON.access_token); 
        .then(JSON => {
            return {
                access_token:JSON.access_token, 
                expires_in:JSON.expires_in
            }
        }); 
    }
    /**
     * Base API call function 
     * @param {String} token auth token 
     * @param {String} query query to be executed
     * @returns promise from API
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
     * @returns a string for API
     */
    const _createQuery = (queryObject) => {
        
        if (queryObject == {}) throw Error("API: Empty queryObject"); 
        let base ="";
        const max_seed_count = 5;
        
        if(queryObject["seed_genres"]){
            base += "seed_genres=";
            
            for(let i = 0; i < max_seed_count && i < queryObject["seed_genres"].length; i++){
                base += queryObject["seed_genres"][i] + ",";
            }
            base = base.slice(0, base.length-1);
            base += "&";
        }else{
            base = "seed_genres=[]&";
        }
        
        const properties = ["acousticness","danceability","energy",
                            "instrumentalness","liveness","loudness",
                            "popularity","speechiness","tempo","valence"];
        properties.forEach(p => {
            if(queryObject[p]){
                base += p + "=" + queryObject[p] + "&";
            } 
        });
        return base;
    }
    /**
     * Retrieves recommendations from the spotify API based on 
     * given query
     * @param {String} token 
     * @param {*} queryObject 
     * @returns promise with recommended songs and used seeds
     */
    const _getRecommendations = (token, queryObject) => {
        let param = "recommendations?";
        param += _createQuery(queryObject);
        return _apiCall(token, param);
    }

    return {
        /**
        * Retrieves the auth token used in all searches
        * saves it to store
        * @returns authorisation token used in API calls
        */
        getToken() {
            return _getToken();
        },
        /**
        * Retrieves recommendations from the spotify API based on 
        * given query
        * @param {String} token 
        * @param {*} queryObject 
        * @returns promise with recommended songs and used seeds
        */
        getRecommendations(token, queryObject) {
            return _getRecommendations(token, queryObject);
        }
    }
})();
export default APIcontroller;

/*
USAGE:
import APIcontroller from './api/spotifySource.js'

-----------     TOKEN   -----------
To get and view token (not saving to store):
For debugging only.
APIcontroller.getToken().then(console.log);

To retrieve token and save to store use:
store.dispatch('requestToken');     //auto renewal every hour

----------- QueryObject example -----------
let queryObject = {
  "seed_genres": ["funky","disco"],
  "liveness": "1.0",
   "energy": "1.0",
};

----------- Retrieve recommendations -----------
Directly from API (Promise object):
    APIcontroller.getRecommendation(token, queryObject).then(bla bla bla);
In store (PROXY object):    
    store.dispatch('getRecommendation', queryObject);


*/