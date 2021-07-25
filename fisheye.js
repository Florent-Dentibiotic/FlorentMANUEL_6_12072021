//DOM Elements
const autors = document.querySelector(".autors");
const newArticle = document.querySelector(".btn__secondary");


// JSON REQUEST
var requestJSON = 'FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET', requestJSON);
request.responseType = 'json';
request.send();
