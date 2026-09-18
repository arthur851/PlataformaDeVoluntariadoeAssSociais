import { Manager, exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const email = document.querySelector("#email").value.trim()
    if(email === ""){
        exibirMensagem("EMAIL","Preencha o e-mail.")
        return
    }
    const codigo = await manager.gerarCodigo(email)
    if(!codigo){
        exibirMensagem("EMAIL","E-mail não encontrado ou não foi possível gerar o código.")
        return
    }
    exibirMensagem("ALTERAR SENHA",`Código de verificação: ${codigo.valor} gerado com sucesso.`)
    setTimeout(()=>{
        window.location.href = "http://127.0.0.1:5501/front-end/redefinir%20senha/index.html"
    },5000)
})