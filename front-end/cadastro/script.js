import { Usuario, Manager } from "../../back-end/model.js"
const manager = new Manager()
const formulario = document.querySelector(".form-box")
formulario.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const nome = document.querySelector("#nome").value.trim()
    const cpf = document.querySelector("#cpf").value.trim()
    const telefone = document.querySelector("#telefone").value.trim()
    const email = document.querySelector("#email").value.trim()
    const senha = document.querySelector("#senha").value
    const confirmarSenha = document.querySelector("#confirmar-senha").value
    const usuario = new Usuario(
        null,email,senha,nome,cpf,telefone,"doador"
    )
    if(!usuario.validarDados(confirmarSenha)){
        return
    }
    const emailExistente = await manager.buscar_por_email(email)
    if(emailExistente){
        exibirMensagem("EMAIL","Este e-mail já está cadastrado.")
        return
    }
    const cpfExistente = await manager.buscar_por_cpf(cpf.replace(/[^\d]/g,'')) 
    if(cpfExistente){
        exibirMensagem("CPF","Este CPF já está cadastrado.")
        return
    }
    const novoUsuario = await manager.adicionar_user(usuario)
    if(novoUsuario){
        exibirMensagem("CADASTRO","Cadastro realizado com sucesso!")
        formulario.reset()
    }
})