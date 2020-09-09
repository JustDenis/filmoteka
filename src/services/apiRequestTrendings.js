const API_KEY = 'a4cc8d4a15480ac80c7df65d6ff4a5ea';
const BASE_URL = 'https://api.themoviedb.org';


export default function apiRequestTrending() {
    const requestParam = `/3/trending/movie/week?api_key=`

    return fetch(BASE_URL+requestParam+API_KEY).then(resp=>resp.json()).then(data=>{
        return data.results
    })




}