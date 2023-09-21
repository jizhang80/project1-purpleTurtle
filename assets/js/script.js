/*
This file is part of the Carlton University Bootcamp (2023-07 to 2024-01) Group project 1

Copyright 2023 
Author: 
    Anthony Gooneratne
    Tyler Bested
    Ji Zhang

This file is licensed under the MIT License. (https://opensource.org/license/mit/)
*/

/*
script.js - main logical javascript file
*/

const OMDB_API_KEY = '1df79541'
const OMDB_SEARCH_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=`

/*
 define the object for search movies
{
      "Title": "Harry Potter and the Deathly Hallows: Part 2",
      "Year": "2011",
      "imdbID": "tt1201607",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    }
*/
let moviesObj = {} 

function createCard(moviesObj) {
    // create card element for search result
    const movieCardDiv = document.createElement('div');
    movieCardDiv.className = 'movie-card';
    const img = document.createElement('img');
    img.setAttribute('src', moviesObj.Poster);
    movieCardDiv.appendChild(img);
    return movieCardDiv;
}

function searchMovies(event) {
    console.log(event.code);
    if (event.code === 'Enter') { // input search enter key press
        const searchInput = document.getElementById('search-input');
        if (searchInput.value === '') return; // if input empty, do nothing
        const searchWord = searchInput.value;
        // search
        fetch(OMDB_SEARCH_API_URL+searchWord)
        .then(response=>response.json())
        .then(data=>{
            //show movies cards to moviesDiv
            showDivMovies(true);
            showDivIndex(false);
            showDivMovieDetail(false);
            //if search result is empty
            const moviesDiv = document.getElementById('movies');
            if (data.Search.length === 0) {
                //show nothing found
                moviesDiv.innerHTML = "No related result found"
            }
            
            for (let movie of data.Search) {
                moviesDiv.appendChild(createCard(movie))
            }
        })
        }
}

function showDivIndex(display) {
    const divIndex = document.getElementById('index');
    if (display) {
        divIndex.style.display = 'block';
    } else {
        divIndex.style.display = 'none';
    }
}

function showDivMovies(display) {
    const divMovies = document.getElementById('movies');
    if (display) {
        divMovies.style.display = 'block';
    } else {
        divMovies.style.display = 'none';
    }
}

function showDivMovieDetail(display) {
    const divMovieDetail = document.getElementById('movie-detail');
    if (display) {
        divMovieDetail.style.display = 'block';
    } else {
        divMovieDetail.style.display = 'none';
    }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', searchMovies)