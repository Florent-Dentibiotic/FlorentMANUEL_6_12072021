
//CALL FUNTION NEW ARTICLE WHEN LOAD
request.onload = function() {
    var fishEyeData = request.response;
    createArticle(fishEyeData);
  }

// FUNCTION FOR EACH ARTIST TO CREATE A NEW ARTICLE WITH ALL INFOS
function createArticle(jsonObj) {

    let photographes = jsonObj['photographers'];

    for (var i = 0; i < photographes.length; i++) {
        let newArticle = document.createElement('article');
        autors.appendChild(newArticle);
        let newLink = document.createElement('a');
        newArticle.appendChild(newLink);
        let newImage = document.createElement('img');
        newLink.appendChild(newImage);
        let newH2 = document.createElement('h2');
        newArticle.appendChild(newH2);
        let newH3 = document.createElement('h3');
        newArticle.appendChild(newH3);
        let newH4 = document.createElement('h4');
        newArticle.appendChild(newH4);
        let newP = document.createElement('p');
        newArticle.appendChild(newP);
        let newUl = document.createElement('ul');
        newArticle.appendChild(newUl);

        // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
        newLink.setAttribute("href", ("photographers.html?" + photographes[i].id));
        newImage.setAttribute("src", ("./imgs/Sample Photos/Photographers ID Photos/" + photographes[i].portrait));
        newH2.textContent = photographes[i].name;
        newH3.textContent = photographes[i].city + ', ' + photographes[i].country;
        newH4.textContent = photographes[i].tagline;
        newP.textContent = photographes[i].price + '€ / jour';
        // FOR EACH TAGS A NEW LIST ELEMENT
        photographes[i].tags.forEach(element => {
            let newLi = document.createElement('li');
            newUl.appendChild(newLi);
            newLi.textContent = "#" + element;
        });
    }
  }