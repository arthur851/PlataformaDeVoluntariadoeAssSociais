/* deixa o navbar rolando junto com a pagina
adiciona a classe "scrolled" quando a rolagem utrapassa 30px
*/
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll",()=>{
    if(window.scrollY>30){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});