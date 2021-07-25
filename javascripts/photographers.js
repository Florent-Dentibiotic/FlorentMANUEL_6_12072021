// ID EXTRACTION
const url_id = window.location.search.slice(1);
const intro = document.querySelector('.intro');
const presentation = document.querySelector('.presentation');
const picture = document.querySelector('.intro__picture');
const photos = document.querySelector('.photos');

//CALL FUNTION NEW ARTICLE WHEN LOAD
request.onload = function() {
    var fishEyeData = request.response;
    createIntro(fishEyeData);
    addPictures(fishEyeData);
  }


// FUNCTION TO CREATE A NEW INTRODUCTION OF THE SELECTED ARTIST
function createIntro(jsonObj) {
    //FINDING THE GOOD PHOTOGRAPHER WITH IS ID
    let photographes = jsonObj['photographers'];
    const found = photographes.findIndex(element => element.id == url_id);
    const thisPhotographe = photographes[found];

    //CREATING NEW ELEMENTS OF INTRO
    let newH1 = document.createElement('h1');
    presentation.appendChild(newH1);
    let newH2 = document.createElement('h2');
    presentation.appendChild(newH2);
    let newP = document.createElement('p');
    presentation.appendChild(newP);
    let newUl = document.createElement('ul');
    presentation.appendChild(newUl);

    // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
    newH1.textContent = thisPhotographe.name;
    newH2.textContent = thisPhotographe.city + ', ' + thisPhotographe.country;
    newP.textContent = thisPhotographe.tagline;
    // FOR EACH TAGS A NEW LIST ELEMENT
    thisPhotographe.tags.forEach(element => {
        let newLi = document.createElement('li');
        newUl.appendChild(newLi);
        newLi.textContent = "#" + element;
    });
    //PHOTOGRAPHER PORTRAIT
    picture.setAttribute("src", ("./imgs/Sample Photos/Photographers ID Photos/" + thisPhotographe.portrait));
}

//FUNCTION TO ADD PICTURES OF THE SELECTED ARTIST
function addPictures(jsonObj){
    let media = jsonObj['media'];
    const foundPictures = media.filter(element => element.photographerId == url_id);
    console.log(foundPictures);

    //FINDING THE GOOD PHOTOGRAPHER WITH IS ID
    let photographes = jsonObj['photographers'];
    const found = photographes.findIndex(element => element.id == url_id);
    const thisPhotographe = photographes[found];

    for (var i = 0; i < foundPictures.length; i++) {
        //IF ITS A VIDEO
        if(foundPictures[i].image === undefined){
            let newArticle = document.createElement('article');
            photos.appendChild(newArticle);
            let newVideo = document.createElement('video');
            newArticle.appendChild(newVideo);
            let newSource = document.createElement('source');
            newVideo.appendChild(newSource);
            let newDiv = document.createElement('div');
            newArticle.appendChild(newDiv);
            let newH3 = document.createElement('h3');
            newDiv.appendChild(newH3);
            let newH3bis = document.createElement('h3');
            newDiv.appendChild(newH3bis);
            let newI = document.createElement('i');
            newH3bis.appendChild(newI);

            // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
            newDiv.classList.add('img-label');
            newVideo.setAttribute("controls", "");
            newSource.setAttribute("src", ("./imgs/Sample Photos/" + thisPhotographe.name + "/" + foundPictures[i].video));
            newSource.setAttribute("video", "video/mp4");
            newH3.textContent = foundPictures[i].title;
            newI.classList.add('fas');
            newI.classList.add('fa-heart');

        //ELSE IF ITS A PHOTO
        } else {
            let newArticle = document.createElement('article');
            photos.appendChild(newArticle);
            let newImage = document.createElement('img');
            newArticle.appendChild(newImage);
            let newDiv = document.createElement('div');
            newArticle.appendChild(newDiv);
            let newH3 = document.createElement('h3');
            newDiv.appendChild(newH3);
            let newI = document.createElement('i');
            newDiv.appendChild(newI);

            // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
            newDiv.classList.add('img-label');
            newImage.setAttribute("src", ("./imgs/Sample Photos/" + thisPhotographe.name + "/" + foundPictures[i].image));
            newH3.textContent = foundPictures[i].title;
            newI.classList.add('fas');
            newI.classList.add('fa-heart');
        }
    }
}