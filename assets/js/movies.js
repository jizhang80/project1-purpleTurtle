const apiurl = 'http://www.omdbapi.com/?apikey=1df79541&s=Harry'
fetch(apiurl)
.then(response=>response.json())
.then(data=>console.log(JSON.stringify(data)))