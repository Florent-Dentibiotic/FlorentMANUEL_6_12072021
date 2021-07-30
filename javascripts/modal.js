const contactModal = document.querySelector('.contact__modal');
const openModal = document.querySelector('.open__modal');
const quitModal = document.querySelector('.quit__modal');
const photoModal = document.querySelector('.photos__modal');
const quitPhotoModal = document.querySelector('.quit__photo__modal');
const mediaDiv = document.querySelector('.media');
const previousMedia = document.querySelector('.fa-chevron-left');
const nextMedia = document.querySelector('.fa-chevron-right');

openModal.addEventListener('click', function launchModal(){
    contactModal.style.display = "block";
})
quitModal.addEventListener('click', function closeModal(){
    contactModal.style.display = "none";
})

// PHOTO MODAL EVENT LISTENER
quitPhotoModal.addEventListener('click', closePhotoModal);
previousMedia.addEventListener('click', launchPreviousMedia);
nextMedia.addEventListener('click', launchNextMedia);

function openPhotosModal(){
    //mediaDiv.removeChild(mediaDiv.children);
    if(mediaDiv.childNodes[0].localName == "img" || mediaDiv.childNodes[0].localName == "video"){
        mediaDiv.removeChild(mediaDiv.childNodes[0]);
        photoModal.firstElementChild.removeChild(photoModal.firstElementChild.lastElementChild);
    }
    photoModal.style.display = 'block';
    mediaDiv.innerHTML = this.outerHTML;
    let newH3 = document.createElement('h3');
    photoModal.firstElementChild.appendChild(newH3);
    newH3.textContent = this.parentElement.children[1].firstChild.innerHTML;
    if(mediaDiv.firstChild.localName == "video"){
        mediaDiv.firstChild.setAttribute("controls", "");
    }
};

function closePhotoModal(){
    photoModal.style.display = 'none';
};

function launchPreviousMedia(){
    if(mediaDiv.firstChild.localName == "video"){
        mediaDiv.firstChild.removeAttribute("controls", "");
    }
    let mediaIndex = allMedias.findIndex(element => element.outerHTML == mediaDiv.innerHTML)
    if((mediaIndex-1) >= 0){
        mediaDiv.innerHTML = allMedias[mediaIndex-1].outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[mediaIndex-1].parentElement.children[1].firstChild.innerHTML;
        if(mediaDiv.firstChild.localName == "video"){
            mediaDiv.firstChild.setAttribute("controls", "");
        }
    } else {
        photoModal.style.display = 'none';
    }
};

function launchNextMedia(){
    if(mediaDiv.firstChild.localName == "video"){
        mediaDiv.firstChild.removeAttribute("controls", "");
    }
    let mediaIndex = allMedias.findIndex(element => element.outerHTML == mediaDiv.innerHTML)
    if((mediaIndex+1) < allMedias.length){
        mediaDiv.innerHTML = allMedias[mediaIndex+1].outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[mediaIndex+1].parentElement.children[1].firstChild.innerHTML;
        if(mediaDiv.firstChild.localName == "video"){
            mediaDiv.firstChild.setAttribute("controls", "");
        }
    } else {
        photoModal.style.display = 'none';
    }
};