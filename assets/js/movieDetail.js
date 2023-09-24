import data from '../../streaming.json' assert { type: 'json' };
var mvName = document.querySelector("#mname");
var mvYear = document.querySelector("#myear");
var  mvType = document.querySelector("#mtype");
var mvDirector = document.querySelector("#mdirector")
var mvStrinfo = document.querySelector("#mvStrminfo")
var mvPG = document.querySelector("#gptype")

//get movie info from url parameters
const queryStr = window.location.search;
console.log(queryStr);
const urlParams = new URLSearchParams(queryStr);
const movieName = urlParams.get('movie');
const imdbid = urlParams.get('imdbid');
const country = urlParams.get('country');

//get movie detail div
const movieDetailDiv = document.getElementById('movie-detail');

// wait for the imdbid and country search
// console.log(imdbid, country)

// IMDB API URL
const OMDB_API_KEY = '1df79541'
const OMDB_SEARCH_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=`


var streamInfo = [];

function streamData (imdbid) {

    streamInfo.length = 0;

    // var imid = imdbid;

    const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${imdbid}`;
    const options = {
           method: 'GET',
           headers: {
               'X-RapidAPI-Key': '1820ec5d27mshbb8bd32f6d6558ep1124f3jsn8bae737b8b70',
               'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
           }
       };
   
   var mainArray = [];
   
   
//    fetch(url, options)
//        .then(function (response) {
//          return response.json();
//        })
//        .then(function (data) {
            
//            mainArray = data;
//        //   var callDetails = data;
//            console.log(mainArray);
        // filterdata(data);
   
//    });
   
   // console.log(mainArray);
   
}

var mTitle

//To fill the data from stream API  in to the DOM - movie details 
function filterdata(data) {
    // console.log(data);
    var filteredArray = data;
    var mDirector = filteredArray.result.directors[0];
    mTitle = filteredArray.result.originalTitle;
    var mType = filteredArray.result.genres;
    var mYear = filteredArray.result.year;
    var mStreaming = filteredArray.result.streamingInfo
 
    // console.log(mDirector)
    // console.log(mTitle); 
    // console.log(mType[0]); 
    // console.log(mYear); 
    //  console.log(mStreaming); 

    mvDirector.textContent = mDirector;
    mvName.textContent = mTitle;
    mvYear.textContent = mYear;
    mvType.textContent = mType[0].name;
    mvPG.textContent = mType[0].id;
    
    streaming (mStreaming);
    getimage (mTitle);

}

function streaming (array, country) {

 var streamingData = array; 
 var stCountry = country;  

 stCountry = 'ca' //Erase this

 var stprovider = streamingData[stCountry];
 

for (var i=0; i < stprovider.length; i++ ) {
    
    streamInfo.push(stprovider[i].service);

}


const mvStreamfinal = streamInfo.filter((value, index, self) => self.indexOf(value) === index);

//  console.log(stprovider)
// console.log(mvStreamfinal)

// const prime = "./assets/images/Prime.png"
 

const stList = document.createElement('ul')

mvStreamfinal.forEach(function(stText) {
    
    // const imgElement = document.createElement('img');
    
    // if (stText === 'prime') {
    //     imgElement.src = './assets/'
    //     imgElement.atl = 'Image Prime'
    //     stList.appendChild(imgElement);
    //     console.log("image")
    // }
    const stlistItem = document.createElement('li');
    stlistItem.textContent = stText;
    stList.appendChild(stlistItem);

});

mvStrinfo.appendChild(stList);
// streamInfo.length = 0;
}

//To get the image from the IMDB
function getimage (mTitle) {
    // console.log(mTitle)
    fetch(OMDB_SEARCH_API_URL + mTitle)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
             
           var imdbArray = data;
        //    console.log(imdbArray);
         
         imageData(imdbArray)
    
    });

    function imageData (imdbArray) {

        var tempArray = imdbArray.Search
        var movieImageUrl
        var imdbid = 'tt0120338' //Erase this

        // console.log(tempArray)

        // console.log(tempArray[0].Poster)

        for (var x=0; x < tempArray.length; x++) {

           if (tempArray[x].imdbID === imdbid) {

                 movieImageUrl = tempArray[x].Poster
            }
            // console.log(tempArray[x].imdbID)
            // console.log(tempArray.Poster)
        }
        
        document.querySelector(".mimage").src = movieImageUrl

        // console.log(movieImageUrl)

    }

 }

streamData ();
getimage ()  
filterdata(data); 