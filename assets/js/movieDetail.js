// import data from '../../streaming.json' assert { type: 'json' };
//get movie info from url parameters
const queryStr = window.location.search;
console.log(queryStr);
const urlParams = new URLSearchParams(queryStr);
const imdbid = urlParams.get('imdbid');
const country = urlParams.get('country');

//get movie detail div
const movieDetailDiv = document.getElementById('movie-detail');

// wait for the imdbid and country search
console.log(imdbid, country)