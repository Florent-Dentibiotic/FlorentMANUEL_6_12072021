const contactModal = document.querySelector('.contact__modal');
const openModal = document.querySelector('.open__modal');
const quitModal = document.querySelector('.quit__modal');

openModal.addEventListener('click', function launchModal(){
    contactModal.style.display = "block";
})

quitModal.addEventListener('click', function closeModal(){
    contactModal.style.display = "none";
})