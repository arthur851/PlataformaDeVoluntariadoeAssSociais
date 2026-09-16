import { Manager, exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
const emailSalvo = sessionStorage.getItem("emailRedefinicao")
if(!emailSalvo){
    exibirMensagem("ALTERAR SENHA","Nenhuma solicitação de alteração de senha foi encontrada.")
}
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const email = document.querySelector("#email").value.trim()
    const codigo = document.querySelector("#Vcode").value.trim()
    const novaSenha = document.querySelector("#nova-senha").value
    const confirmarSenha = document.querySelector("#confirmar-senha").value
    if(email === "" || codigo === "" || novaSenha === "" || confirmarSenha === ""){
        exibirMensagem("ALTERAR SENHA","Preencha todos os campos.")
        return
    }
    if(email !== emailSalvo){
        exibirMensagem("EMAIL","O e-mail informado não corresponde à solicitação.")
        return
    }
    const codigoSalvo = sessionStorage.getItem("codigoVerificacao")
    if(codigo !== codigoSalvo){
        exibirMensagem("CÓDIGO","Código de verificação inválido.")
        return
    }
    if(novaSenha.length < 12){
        exibirMensagem("SENHA","A senha deve possuir pelo menos 12 caracteres.")
        return
    }
    if(novaSenha !== confirmarSenha){
        exibirMensagem("SENHA","As senhas não conferem.")
        return
    }
    const usuario = await manager.buscar_por_email(email)
    if(!usuario){
        exibirMensagem("ALTERAR SENHA","Usuário não encontrado.")
        return
    }
    usuario.senha = novaSenha
    const usuarioAtualizado = await manager.atualizar_user(usuario.id,usuario)
    if(!usuarioAtualizado){
        exibirMensagem("ALTERAR SENHA","Não foi possível alterar a senha.")
        return
    }
    sessionStorage.removeItem("codigoVerificacao")
    sessionStorage.removeItem("emailRedefinicao")
    exibirMensagem("ALTERAR SENHA","Senha alterada com sucesso!")
    setTimeout(()=>{
        window.location.href = "../login/login.html"
    },2000)
})