let slideAtual = 0
const carrossel = document.querySelector("#carrossel")
const slides = document.querySelectorAll(".slide")
function mudarSlide(direcao){
    slideAtual += direcao
    if(slideAtual >= slides.length){
        slideAtual = 0
    }
    if(slideAtual < 0){
        slideAtual = slides.length - 1
    }
    carrossel.scrollTo({
        left: slides[slideAtual].offsetLeft,
        behavior:"smooth"
    })
}