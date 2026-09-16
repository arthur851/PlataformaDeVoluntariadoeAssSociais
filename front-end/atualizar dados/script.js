import { Manager, exibirMensagem } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
let atualizando = false
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    if(atualizando){
        return
    }
    atualizando = true
    const nome = document.querySelector("#nome").value.trim()
    const email = document.querySelector("#email").value.trim()
    const confirmarEmail = document.querySelector("#confirmar-email").value.trim()
    const cpf = document.querySelector("#cpf").value.trim()
    const telefone = document.querySelector("#telefone").value.trim()
    const senha = document.querySelector("#senha").value
    const confirmarSenha = document.querySelector("#confirmar-senha").value
    try{
        if(email === ""){
            exibirMensagem("EMAIL","Digite o e-mail do usuário.")
            return
        }
        const usuario = await manager.buscar_por_email(email)
        if(!usuario){
            exibirMensagem("EMAIL","Nenhum usuário foi encontrado com este e-mail.")
            return
        }
        if(nome === "" || confirmarEmail === "" || cpf === "" || telefone === ""){
            exibirMensagem("ATUALIZAR DADOS","Preencha todos os campos obrigatórios.")
            return
        }
        if(email !== confirmarEmail){
            exibirMensagem("EMAIL","Os e-mails não conferem.")
            return
        }
        usuario.cpf = cpf
        if(!usuario.validarCPF()){
            exibirMensagem("CPF","CPF inválido! Verifique os números digitados.")
            return
        }
        const telefoneLimpo = telefone.replace(/[^\d]/g,"")
        if(telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11){
            exibirMensagem("TELEFONE","Telefone inválido! Digite o DDD + número.")
            return
        }
        if(senha !== "" || confirmarSenha !== ""){
            if(senha.length < 12){
                exibirMensagem("SENHA","A senha deve possuir pelo menos 12 caracteres.")
                return
            }
            if(senha !== confirmarSenha){
                exibirMensagem("SENHA","As senhas não conferem.")
                return
            }
            usuario.senha = senha
        }
        usuario.nome = nome
        usuario.email = email
        usuario.cpf = cpf
        usuario.telefone = telefoneLimpo
        const usuarioAtualizado = await manager.atualizar_user(usuario.id,usuario)
        if(usuarioAtualizado){
            exibirMensagem("ATUALIZAR DADOS","Dados atualizados com sucesso!")
            formulario.reset()
        }else{
            exibirMensagem("ERRO","Não foi possível atualizar os dados.")
        }
    }catch(erro){
        console.error(erro)
        exibirMensagem("ERRO","Ocorreu um erro ao atualizar os dados.")
    }finally{
        atualizando = false
    }
})