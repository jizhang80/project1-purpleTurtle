//import data from '../../streaming.json' assert { type: 'json' };
var mvName = document.querySelector("#mname");
var mvYear = document.querySelector("#myear");
var mvType = document.querySelector("#mtype");
var mvDirector = document.querySelector("#mdirector")
var mvStrinfo = document.querySelector("#mvStrminfo")
var mvPG = document.querySelector("#gptype")

//get movie info from url parameters
const queryStr = window.location.search;
const urlParams = new URLSearchParams(queryStr);
const movieName = urlParams.get('movie');
const imdbid = urlParams.get('imdbid');
const country = urlParams.get('country');

// IMDB API URL
const OMDB_API_KEY = '1df79541'
const OMDB_SEARCH_API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=`
const XRapidAPIKey = '1820ec5d27mshbb8bd32f6d6558ep1124f3jsn8bae737b8b70';
const XRapidAPIKey1 = 'de5600b761mshd6c596360882e70p169510jsnd0be1294ce65';
const XRapidAPIKey2 = '48c008f518msh3634cbf6badb95dp117425jsn94e94c124522';
const STREAM_URL = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${imdbid}`

function streamData(imdbid) {
    const options = {
           method: 'GET',
           headers: {
               'X-RapidAPI-Key': XRapidAPIKey,
               'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
           }
       };
   fetch(STREAM_URL, options)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
        filterdata(data);
   });
}

//To fill the data from stream API  in to the DOM - movie details 
function filterdata(data) {
    let mDirector = data.result.directors; // return array, need list all the director
    let mTitle = data.result.originalTitle;
    let mType = data.result.genres;
    let mYear = data.result.year;
    let streamingInfo = data.result.streamingInfo

    mvDirector.textContent = mDirector.toString();//need list all the director from array
    mvName.textContent = mTitle;
    mvYear.textContent = mYear;

    let typeName = ''
    mType.forEach((item)=>{
        typeName += ' ' + item.name;
    })
    mvType.textContent = typeName;

    if (!streamingInfo[country] || (streamingInfo[country].length === 0)) {
        // no avilable streaming info in this country
        const noResultsModal = document.getElementById("noResultsModal");
        // No movie found, display the "No Search Results" modal
        noResultsModal.style.display = "block";
        const footer = document.getElementById('footer');
        footer.className = 'hidden';
    }
    let serviceBrand = [];
    for (let serviceInfo of streamingInfo[country]) {
        // get all the streaming brand
        if (!serviceBrand.includes(serviceInfo.service)) {
            serviceBrand.push(serviceInfo.service);
        }
    }
    showImage(imdbid);
    brandOn(serviceBrand);
}

function brandOn(arr) {
    // from brand list set element
    for (let b of arr) {
        setBrand(b);
    }
}

function setBrand(elementId) {
    const brandLogo = document.getElementById(elementId)
    brandLogo.className = 'stream-brand';
    brandLogo.parentElement.className = 'stream-link';
}

//To get the image from the IMDB
function showImage (imdbid) {
    fetch(OMDB_SEARCH_API_URL + imdbid)
        .then(response=>response.json())
        .then(data=>{
            const poster = document.getElementById('poster')
            poster.setAttribute('src', data.Poster);
        });
 }

streamData(imdbid);

//filterdata(data); 