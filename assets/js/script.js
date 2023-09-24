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
const STORAGE_KEY = 'purple-turtle';


function searchMovies(event) {
    if (event.code === 'Enter') { // input search enter key press
        const searchInput = event.target; // Get the current search input element

        if (searchInput.value === '') return; // If input is empty, do nothing

        const searchWord = searchInput.value;
        saveSearchHistory(searchWord);
        loadSearchHistory();
        searchMovieByWord(searchWord);
    }
}

function searchMovieByWord(word) {
    const country = document.getElementById('country').value;
    const link = `movies.html?movie=${word}&country=${country}`;
    window.location.href = link;
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', searchMovies)

const searchInput2 = document.getElementById('search-input2');
searchInput2.addEventListener('keydown', searchMovies)


function saveSearchHistory(keyword) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) data=[];
    if (data.includes(keyword)) return; // if keyword already there
    if (data.length === 5) {
        //remove the first one
        data.splice(0,1);
    }
    data.push(keyword); // add to the last one
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadSearchHistory() {
    const searchHistoryDiv = document.getElementById('search-history');
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return;
    for (let i of data) {
        searchHistoryDiv.appendChild(makeBtn(i));
    }
}

function makeBtn(word) {
    const btn = document.createElement('button');
    btn.className = 'searchHistory';
    btn.innerHTML = word;
    btn.setAttribute('data-movie', word);
    return btn;
}

function searchMoviesByBtn(e) {
    const movie = e.target.dataset.movie;
    if (!movie) return;
    searchMovieByWord(movie);
}

const searchHistoryDiv = document.getElementById('search-history');
searchHistoryDiv.addEventListener('click', searchMoviesByBtn)

loadSearchHistory();