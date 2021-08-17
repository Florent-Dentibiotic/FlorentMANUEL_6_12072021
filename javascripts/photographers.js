// JSON REQUEST
var requestJSON = 'FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET', requestJSON);
request.responseType = 'json';
request.send();

class MediaFactory {

    static generateTag(media, photographe, button) {
        if (media.image === undefined) { // It's a video
            let newVideo = document.createElement('video');
            button.appendChild(newVideo);
            let newSource = document.createElement('source');
            newVideo.appendChild(newSource);
            newSource.setAttribute("src", ("./imgs/Sample_Photos/" + photographe.name.split(" ").join("_") + "/" + media.video));
            newVideo.setAttribute("poster", ("./imgs/Sample_Photos/" + photographe.name.split(" ").join("_") + "/" + media.poster));
            newSource.setAttribute("type", "video/mp4");
            newSource.setAttribute("data-date", media.date);
            newSource.setAttribute("data-price", media.price);
        } else { // ELSE IF ITS A PHOTO
            let newImage = document.createElement('img');
            button.appendChild(newImage);
            newImage.setAttribute("src", ("./imgs/Sample_Photos/" + photographe.name.split(" ").join("_") + "/" + media.image));
            newImage.setAttribute("alt", media.title + ", closeup view");
            newImage.setAttribute("data-date", media.date);
            newImage.setAttribute("data-price", media.price);
        }
    }

}

// ID EXTRACTION
const url_id = window.location.search.slice(1);

// DOM ELEMENTS
const presentation = document.querySelector('.presentation');
const picture = document.querySelector('.intro__picture');
const contactTitle = document.querySelector('.contact__modal__box__title');
const photos = document.querySelector('.photos');
const likes__infos = document.querySelector('.likes');
const contactForm = document.querySelector('.form-contact');
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
let allMedias = [];
let totalLikes = 0;
let photographPrice = 0;

// REGEX
const regexFirst = /^[a-zA-Z]+[a-zA-Z-]?[a-zA-Z]+$/;
const regexLast = /^[a-zA-Z]+[a-zA-Z'-]?[a-zA-Z]+$/;
const regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;

// List elements for classification
const classifyOptions = document.querySelector('.classify__options');
let options = document.querySelectorAll('.options');
let thematicBreak = document.querySelectorAll('hr');
let chevron = document.querySelector('.chevron');
let optionsArray = Array.from(options);
let optionsSelected = [];

//***EVENT LISTENER FOR CLASSIFYING PICTURES***
classifyOptions.addEventListener('mouseover', radioBtnVisible);
classifyOptions.addEventListener('mouseout', radioBtnInvisible);
classifyOptions.addEventListener('focusin', radioBtnVisible);
//options[2].addEventListener('focusout', radioBtnInvisible);
optionsArray.forEach(element => element.addEventListener('click', changeAriaSelectedValue));

function radioBtnVisible() {
    options.forEach(element => element.classList.replace("d-none", "d-block"));
    thematicBreak.forEach(element => element.classList.replace("d-none", "d-block"));
    chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
}

function radioBtnInvisible() {
    let optionsNotSelected = optionsArray.filter(element => element.attributes[2].value != "true");
    optionsNotSelected.forEach(element => element.classList.replace("d-block", "d-none"));
    thematicBreak.forEach(element => element.classList.replace("d-block", "d-none"));
    chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
}

function changeAriaSelectedValue() {
    optionsSelected = optionsArray.filter(element => element.attributes[2].value == "true");
    this.attributes[2].value = "true";
    if (this != optionsSelected[0]) {
        optionsSelected[0].attributes[2].value = "false";
    }
    radioBtnInvisible();
    reloadPhotosSection();
}

function reloadPhotosSection() {
    const allArticles = document.querySelectorAll('.article');
    allArticles.forEach(element => element.remove());
    var fishEyeData = request.response;
    addPictures(fishEyeData);
}

//CALL FUNTION NEW ARTICLE WHEN LOAD
request.onload = function() {
    var fishEyeData = request.response;
    createIntro(fishEyeData);
    addPictures(fishEyeData);
    addAsideLikes();
}

//***FUNCTION TO CREATE A NEW INTRODUCTION OF THE SELECTED ARTIST***
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
        let newA = document.createElement('a');
        newLi.appendChild(newA);
        newA.textContent = "#" + element;
        newA.setAttribute("href", ('index.html?' + element));
    });
    //PHOTOGRAPHER PORTRAIT
    picture.setAttribute("src", ("./imgs/Sample_Photos/Photographers_ID_Photos/" + thisPhotographe.portrait));
    picture.setAttribute("alt", thisPhotographe.name);

    //CONTACT FORM NAME
    contactTitle.childNodes[1].innerHTML = `Contactez-moi <br>${thisPhotographe.name}`;
}

//***FUNCTION TO ADD PICTURES OF THE SELECTED ARTIST***
function addPictures(jsonObj) {
    let media = jsonObj['media'];
    const foundMedia = media.filter(element => element.photographerId == url_id);

    // SORTING BY POPULARITY/DATE/TITLE
    if (options[0].attributes[2].value == "true") {
        foundMedia.sort((a, b) => b.likes - a.likes);
    } else if (options[1].attributes[2].value == "true") {
        foundMedia.sort(function(a, b) {
            let aValue = Date.parse(a.date);
            let bValue = Date.parse(b.date);
            return aValue - bValue;
        });
    } else if (options[2].attributes[2].value == "true") {
        foundMedia.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    }

    //FINDING THE GOOD PHOTOGRAPHER WITH IS ID
    let photographes = jsonObj['photographers'];
    const found = photographes.findIndex(element => element.id == url_id);
    const thisPhotographe = photographes[found];

    //ADDING PHOTOS AND VIDEOS IN PHOTOGRAPHES PAGE
    for (const medium of foundMedia) {
        let newArticle = document.createElement('div');
        photos.appendChild(newArticle);
        newArticle.classList.add('article');
        let newButton = document.createElement('button');
        newArticle.appendChild(newButton);

        MediaFactory.generateTag(medium, thisPhotographe, newButton);

        let newDiv = document.createElement('div');
        newArticle.appendChild(newDiv);
        let newH3 = document.createElement('h2');
        newDiv.appendChild(newH3);
        let newH3bis = document.createElement('h3');
        newDiv.appendChild(newH3bis);
        // FOR EACH PHOTOS DISPLAYING ALL INFORMATIONS
        newDiv.classList.add('img-label');
        newH3.textContent = medium.title;
        newH3bis.textContent = medium.likes + " ";
        //newH3bis.setAttribute("tabindex", 0);

        // ADDING THE HEART FOR LIKES
        let newI = document.createElement('button');
        newH3bis.appendChild(newI);
        newI.classList.add('fas');
        newI.classList.add('fa-heart');
        newI.setAttribute("aria-label", "likes");
    }

    // PREPARING ASIDE INNER HTML
    const allFas = document.querySelectorAll('.fa-heart');
    let hearts = Array.from(allFas);
    hearts.forEach(element => element.addEventListener("click", addALike));
    for (const heart of hearts) {
        let someLikes = parseInt(heart.previousSibling.textContent, 10);
        totalLikes = totalLikes + someLikes;
    }
    photographPrice = thisPhotographe.price;

    // EVENT LISTENER FOR OPENING MODAL
    let allImages = document.querySelectorAll('.img-label');
    allMedias = (Array.from(allImages)).map(x => x.previousElementSibling);
    allMedias.forEach(element => element.addEventListener('click', openPhotosModal));
}

// ADDING TOTAL OF LIKES FOR ASIDE ELEMENT
function addAsideLikes() {
    let newP = document.createElement('h2');
    likes__infos.appendChild(newP);
    let newPBis = document.createElement('h3');
    likes__infos.appendChild(newPBis);
    newP.innerHTML = totalLikes + ' <span class="fas fa-heart"></span>';
    newPBis.textContent = photographPrice + '€ / jour';
}

function addALike() {
    let thisLikes = parseInt(this.previousSibling.textContent, 10);
    let addLike = thisLikes + 1;
    this.previousSibling.textContent = addLike + " ";

    var fishEyeMedia = request.response['media'];
    const findMediaIndex = fishEyeMedia.findIndex(element => element.title == this.parentElement.parentElement.firstChild.textContent);
    fishEyeMedia[findMediaIndex].likes = addLike;
    let newLike = parseInt(likes__infos.firstElementChild.innerText) + 1;
    likes__infos.firstElementChild.innerHTML = newLike + ' <i class="fas fa-heart"></i>';
}

// ******* // MODAL  // **** //
//DOM ELEMENTS
const contactModal = document.querySelector('.contact__modal');
const openModal = document.querySelector('.open__modal');
const quitModal = document.querySelector('.quit__modal');
const photoModal = document.querySelector('.photos__modal');
const quitPhotoModal = document.querySelector('.quit__photo__modal');
const mediaDiv = document.querySelector('.media');
const previousMedia = document.querySelector('.fa-chevron-left');
const nextMedia = document.querySelector('.fa-chevron-right');

// CONTACT MODAL
function closeContactModal() { contactModal.style.display = "none"; }
openModal.addEventListener('click', function launchModal() { contactModal.style.display = "block"; });
quitModal.addEventListener('click', closeContactModal);

// PHOTO MODAL EVENT LISTENER
quitPhotoModal.addEventListener('click', closePhotoModal);
previousMedia.addEventListener('click', launchPreviousMedia);
nextMedia.addEventListener('click', launchNextMedia);
document.addEventListener('keydown', event => {
    if (event.code == "ArrowRight") {
        if (photoModal.style.display == 'block') {
            launchNextMedia();
        }
    } else if (event.code == "ArrowLeft") {
        if (photoModal.style.display == 'block') {
            launchPreviousMedia();
        }
    } else if (event.code == "Escape") {
        if (photoModal.style.display == 'block') {
            closePhotoModal();
        }
        if (contactModal.style.display == "block") {
            closeContactModal();
        }
    }
});


// PHOTO MODAL OPEN/QUIT/CHANGE MEDIA
function openPhotosModal() {
    if (mediaDiv.firstChild.localName != undefined && (mediaDiv.firstChild.localName == "img" || mediaDiv.firstChild.localName == "video")) {
        photoModal.firstElementChild.removeChild(photoModal.firstElementChild.lastElementChild);
    }
    photoModal.style.display = 'block';
    mediaDiv.innerHTML = this.firstChild.outerHTML;
    let newH3 = document.createElement('h3');
    photoModal.firstElementChild.appendChild(newH3);
    newH3.textContent = this.parentElement.children[1].firstChild.innerHTML;
    if (mediaDiv.firstChild.localName == "video") {
        mediaDiv.firstChild.setAttribute("controls", "");
        mediaDiv.firstChild.play();
    }
}

function closePhotoModal() {
    photoModal.style.display = 'none';
}

function launchPreviousMedia() {
    launchMedia(-1);
}

function launchNextMedia() {
    launchMedia(1);
}

function launchMedia(direction) {
    if (mediaDiv.firstChild.localName == "video") {
        mediaDiv.firstChild.removeAttribute("controls", "");
    }
    let mediaIndex = allMedias.findIndex(element => element.firstChild.outerHTML == mediaDiv.innerHTML)
    let nextMedia = mediaIndex + direction;
    if (nextMedia < allMedias.length && nextMedia > 0) {
        mediaDiv.innerHTML = allMedias[nextMedia].firstChild.outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[nextMedia].parentElement.children[1].firstChild.innerHTML;
        if (mediaDiv.firstChild.localName == "video") {
            mediaDiv.firstChild.setAttribute("controls", "");
            mediaDiv.firstChild.play();
        }
    } else if (nextMedia >= 0 && nextMedia < allMedias.length) {
        mediaDiv.innerHTML = allMedias[nextMedia].firstChild.outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[nextMedia].parentElement.children[1].firstChild.innerHTML;
        if (mediaDiv.firstChild.localName == "video") {
            mediaDiv.firstChild.setAttribute("controls", "");
            mediaDiv.firstChild.play();
        }
    } else {
        if (mediaDiv.firstChild.localName == "video") {
            mediaDiv.firstChild.setAttribute("controls", "");
            mediaDiv.firstChild.play();
        }
    }
}

// **** CONTACT MODAL DATAS ****
const submitForm = document.querySelector('#submit-form');
submitForm.addEventListener('click', sendData);

function sendData() {
    let firstNameTest = regexFirst.test(firstName.value);
    let lastNameTest = regexLast.test(lastName.value);
    let emailTest = regexEmail.test(email.value);
    if(firstNameTest == true && lastNameTest == true && emailTest == true){
        let inputs = document.querySelectorAll("input");
        let contactFields = {
            "first-name": inputs[0].value, 
            "last-name": inputs[1].value, 
            "email": inputs[2].value, 
            "message": inputs[3].value };
        console.log(contactFields);
        inputs.forEach(element => element.value = "");
        contactForm.innerHTML = `<h2>Votre message sera traité rapidement. Merci pour votre attention.</h2>`;
        setTimeout(function(){ closeContactModal(); }, 2000);
        
    }
}