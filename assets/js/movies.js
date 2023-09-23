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
    year.innerHTML = `Release Year: ${movie.Year}`;

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
    // search
    fetch(OMDB_SEARCH_API_URL + movieName)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // If search result is empty
            if (data.Response === 'True') {
                const moviesDiv = document.getElementById('movies');
                // Clear previous search results
                moviesDiv.innerHTML = "";   
                // Append search results to moviesDiv
                for (let movie of data.Search) {
                    moviesDiv.appendChild(createCard(movie));
                }   
                //add click event listener for all the movie cards div
                const movieDivs = document.getElementsByClassName('movie-card');
                for (let m of movieDivs) {
                    m.addEventListener('click', movieCardClickHandler);
                }
            } else {
                // no movie found, modal here
                console.log(data.Response, data.Error)
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

