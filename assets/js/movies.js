
//get parameters from url
const queryStr = window.location.search;
console.log(queryStr);
const urlParams = new URLSearchParams(queryStr);
const movieName = urlParams.get('movie');
const country = urlParams.get('country');

// define const variable
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

function createCard(movie) {
    // create card element for search result
    const movieCardDiv = document.createElement('div');
    movieCardDiv.className = 'movie-card';

    const img = document.createElement('img');
    img.className = 'card-img'
    img.setAttribute('src', movie.Poster);

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.innerHTML = movie.Title;

    const year = document.createElement('h3');
    year.className = 'card-year';
    year.innerHTML = movie.Year;

    movieCardDiv.appendChild(img);
    movieCardDiv.appendChild(title);
    movieCardDiv.appendChild(year);

    //setup movieCardDiv dataset for saving the movie info
    movieCardDiv.setAttribute('data-title', movie.Title);
    movieCardDiv.setAttribute('data-year', movie.Year);
    movieCardDiv.setAttribute('data-imdbid', movie.imdbID);

    return movieCardDiv;
}
// edited so that both search bars now search 
function searchMovies(movieName) {
    // Search
    fetch(OMDB_SEARCH_API_URL + movieName)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Get the "No Search Results" modal
            const noResultsModal = document.getElementById("noResultsModal");
            if (data.Response === 'True') {
                const moviesDiv = document.getElementById('movies');
                moviesDiv.innerHTML = "";
                for (let movie of data.Search) {
                    moviesDiv.appendChild(createCard(movie));
                }
                const movieDivs = document.getElementsByClassName('movie-card');
                for (let m of movieDivs) {
                    m.addEventListener('click', movieCardClickHandler);
                }
            } else {
                // No movie found, display the "No Search Results" modal
                console.log("noResultsModal:", noResultsModal);
                noResultsModal.style.display = "block";
                // Log the error
                console.log(data.Response, data.Error);
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
}
function movieCardClickHandler() {
    console.log(this.dataset.imdbid);
    // waiting for anthony's function
    const link = `movieDetail.html?imdbid=${this.dataset.imdbid}&country=${country}`;
    window.location.href = link;
}

searchMovies(movieName);

