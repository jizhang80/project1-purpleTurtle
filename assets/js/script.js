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

function searchMovies(event) {
    if (event.code === 'Enter') { // input search enter key press
        const searchInput = event.target; // Get the current search input element

        if (searchInput.value === '') return; // If input is empty, do nothing

        const searchWord = searchInput.value;
        const country = document.getElementById('country').value;
        const link = `movies.html?movie=${searchWord}&country=${country}`;
        window.location.href = link;
    }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', searchMovies)

const searchInput2 = document.getElementById('search-input2');
searchInput2.addEventListener('keydown', searchMovies)

