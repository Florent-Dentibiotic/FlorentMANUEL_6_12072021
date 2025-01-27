// JSON REQUEST
var requestJSON = 'FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET', requestJSON);
request.responseType = 'json';
request.send();

//DOM Elements
const autors = document.querySelector(".autors");

// ONSCROLL BTN__SECONDARY VISIBLE
const btnSecondary = document.querySelector('.btn__secondary');
document.addEventListener('scroll', btnVisible);

function btnVisible() {
    btnSecondary.style.display = "block";
    setTimeout(btnInvisible, 5000);

    function btnInvisible() {
        btnSecondary.style.display = "none";
    }
}

//CALL FUNTION NEW ARTICLE WHEN LOAD
request.onload = function() {
    var fishEyeData = request.response;
    createArticle(fishEyeData);
}

// FUNCTION FOR EACH ARTIST TO CREATE A NEW ARTICLE WITH ALL INFOS
function createArticle(jsonObj) {
    let allPhotographes = jsonObj['photographers'];
    let photographes = allPhotographes;
    // ID EXTRACTION
    const index_url_id = window.location.search.slice(1);
    if (index_url_id != "") {
        photographes = allPhotographes.filter(element => element.tags.includes(index_url_id))
    }

    for (const photographe of photographes) {
        let newArticle = document.createElement('article');
        autors.appendChild(newArticle);
        let newLink = document.createElement('a');
        newArticle.appendChild(newLink);
        let newImage = document.createElement('img');
        newLink.appendChild(newImage);
        let newH2 = document.createElement('h2');
        newLink.appendChild(newH2);
        let newH3 = document.createElement('h3');
        newArticle.appendChild(newH3);
        let newH4 = document.createElement('h4');
        newArticle.appendChild(newH4);
        let newP = document.createElement('p');
        newArticle.appendChild(newP);
        let newUl = document.createElement('ul');
        newArticle.appendChild(newUl);

        // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
        newLink.setAttribute("href", ("photographers.html?" + photographe.id));
        newImage.setAttribute("src", ("./imgs/Sample_Photos/Photographers_ID_Photos/" + photographe.portrait));
        newImage.setAttribute("alt", photographe.name.split(" ").join("_"));
        newH2.textContent = photographe.name;
        newH3.textContent = photographe.city + ', ' + photographe.country;
        newH4.textContent = photographe.tagline;
        newP.textContent = photographe.price + '€ / jour';
        // FOR EACH TAGS A NEW LIST ELEMENT
        photographe.tags.forEach(element => {
            let newLi = document.createElement('li');
            newUl.appendChild(newLi);
            newLi.textContent = "#" + element;
            newLi.classList.add('tag');
        });
    }

    // EVENT LISTENER FOR TAGS
    const tags = document.querySelectorAll('.tag');
    tags.forEach(element => element.addEventListener("click", classifyFromTag));
}

// TAG SELECTION OF AUTORS
function classifyFromTag() {
    let tag = this.innerHTML.toLowerCase();
    const articles = document.querySelectorAll('article');
    const articlesArray = Array.from(articles);
    const foundNonTagsAutors = articlesArray.filter(element => !element.textContent.includes(tag));
    const foundTagsAutors = articlesArray.filter(element => element.textContent.includes(tag));
    foundNonTagsAutors.forEach(element => element.style.display = "none");
    foundTagsAutors.forEach(element => element.style.display = "block");
}