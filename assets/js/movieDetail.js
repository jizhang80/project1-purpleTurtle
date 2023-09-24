import data from '../../streaming.json' assert { type: 'json' };


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




function streamData (imdbid) {

    var imid = imdbid;

    const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${imid}`;
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


function filterdata(data) {
    console.log(data);

    var filteredArray = data;

    var mDirector = filteredArray.result.directors;
    mTitle = filteredArray.result.originalTitle;
    var mType = filteredArray.result.genres;
    var mYear = filteredArray.result.year;
    var mStreaming = filteredArray.result.streamingInfo
 

    console.log(mDirector[0]); 
    console.log(mTitle); 
    console.log(mType[0]); 
    console.log(mYear); 
    console.log(mStreaming); 

    streaming (mStreaming);
    getimage (mTitle);

}

function streaming (array, country) {

 var streamingData = array; 
 var stCountry = country;  

 stCountry = 'ca'
 var stprovider = streamingData[stCountry];
 var streamInfo = [];

for (var i=0; i < stprovider.length; i++ ) {
    
    streamInfo.push(stprovider[i].service, stprovider[i].quality);

}


//  console.log(stprovider)
//  console.log(streamInfo)


}

// console.log(mTitle)
function getimage (mTitle) {
    console.log(mTitle)
    fetch(OMDB_SEARCH_API_URL + mTitle)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
             
           var imdbArray = data;
        //   var callDetails = data;
            console.log(imdbArray);
         // filterdata(data);

         imageData(imdbArray)
    
    });

    function imageData (imdbArray) {

        var tempArray = imdbArray.Search
        var movieImageUrl
        var imdbid = 'tt0120338' //Erase this

        console.log(tempArray)

        // console.log(tempArray[0].Poster)

        for (var x=0; x < tempArray.length; x++) {

           if (tempArray[x].imdbID === imdbid) {

                 movieImageUrl = tempArray[x].Poster
            }

            // console.log(tempArray[x].imdbID)
            // console.log(tempArray.Poster)

        }

        console.log(movieImageUrl)

    }

 }


 
streamData ();
getimage ()  
filterdata(data); 