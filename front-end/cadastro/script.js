const BASE_URL = "http://localhost:3000"

const cadastroForm = document.querySelector(".form-box");

const inputNome = document.querySelector("#nome")
const inputCPF = document.querySelector("#cpf")
const inputTelefone= document.querySelector("#telefone")
const inputEmail= document.querySelector("#email")
const inputSenha= document.querySelector("#senha")
const inputConfirmarSenha= document.querySelector("#confirmar-senha")

cadastroForm.addEventListener("submit", validarCadastro);

async function validarCadastro(event) {

    event.preventDefault(); 

  
    const nome = inputNome.value.trim();
    const cpf = inputCPF.value.trim();
    const telefone = inputTelefone.value.replace(/[^\d]/g, '');
    const email = inputEmail.value.trim()

    const senha = inputSenha.value.trim()
    const confirmarSenha  = inputConfirmarSenha.value.trim()
 

    if (nome === "" || cpf === "" || telefone === "" || email === ""  || senha === ""   || confirmarSenha === "" ) {
        //alterar o alet para uma função de janela propria posteriormente
        alert("Por favor, preencha todos os campos do cadastro. ");
        return; 
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido! Verifique os números digitados.");
        return; 
    }


    if (telefone.length !== 10 && telefone.length !== 11) {
        alert("Telefone inválido! Digite o DDD + número.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      alert("E-mail inválido! Digite um e-mail válido (ex: seu@email.com)");
      return;
    }
    
    if (senha !== confirmarSenha){
      alert("As senhas não conferem. Digite novamente")
      return;
    }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');


  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true; 
}




