// Client Credentials Flow
const APIcontroller = (()=> {

    //private methods
    _getToken = async () => {
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

    const _apiCall = async (token) => {
        return fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            method: "GET",
            headers: { "Authorization" : "Bearer " + token }
        })
        .then(res=> res.json())
        .catch(err=>console.error(err));
    }

    const _createQuery = (objectWithQueryThings) => {

    }

    return {
        getToken() {
            return _getToken();
        },
        apiCall() {
            return _apiCall();
        },
        getRecommendations(token, query) {
            return _getRecommendations(token, query);
        }
    }
})();