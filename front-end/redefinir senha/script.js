import { Manager,exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const email = document.querySelector("#usuario").value.trim()
    if(email === ""){
        exibirMensagem("REDEFINIR SENHA","Digite seu e-mail.")
        return
    }
    const usuario = await manager.buscar_por_email(email)
    if(!usuario){
        exibirMensagem("REDEFINIR SENHA","Usuário não encontrado.")
        return
    }
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()
    sessionStorage.setItem("codigoVerificacao",codigo)
    sessionStorage.setItem("emailRedefinicao",usuario.email)
    console.log("Código de verificação:",codigo)
    exibirMensagem("REDEFINIR SENHA",`Código de verificação gerado: ${codigo}`)
    setTimeout(()=>{
        window.location.href = "../alterar-senha/index.html"
    },2000)
})