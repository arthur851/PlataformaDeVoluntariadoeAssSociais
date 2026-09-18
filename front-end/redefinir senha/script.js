import { Manager, exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
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
    const codigoValido = await manager.verificarCodigo(email,codigo)
    if(!codigoValido){
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
    const usuarioAtualizado = await manager.atualizar_senha(usuario.id,novaSenha)
    if(!usuarioAtualizado){
        exibirMensagem("ALTERAR SENHA","Não foi possível alterar a senha.")
        return
    }
    await manager.desativarCodigo(codigoValido.id)
    
    setTimeout(()=>{
        exibirMensagem("ALTERAR SENHA","Senha alterada com sucesso!")
    },2000)
    window.location.href = "http://127.0.0.1:5501/front-end/login/index.html"
})