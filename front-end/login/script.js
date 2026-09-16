import { Manager,exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const email = document.querySelector("#email").value.trim()
    const senha = document.querySelector("#senha").value
    if(email === "" || senha === ""){
        exibirMensagem("LOGIN","Preencha o e-mail e a senha.")
        return
    }
    const usuario = await manager.buscar_por_email(email)
    if(!usuario){
        exibirMensagem("LOGIN","E-mail ou senha incorretos.")
        return
    }
    if(usuario.senha !== senha){
        exibirMensagem("LOGIN","E-mail ou senha incorretos.")
        return
    }
    localStorage.setItem("usuarioLogado",JSON.stringify({
        id:usuario.id,
        email:usuario.email,
        nome:usuario.nome,
        tipo:usuario.tipo
    }))
    const lembrarSenha = document.querySelector("#lembrar-senha").checked
    if(lembrarSenha){
        localStorage.setItem("lembrarSenha","true")
    }else{
        localStorage.removeItem("lembrarSenha")
    }
    window.location.href = "http://127.0.0.1:5501/front-end/apresentacao-da-ong/index.html"
})