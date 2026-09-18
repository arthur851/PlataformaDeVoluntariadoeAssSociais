const BASE_URL = "http://localhost:3001"
export class Usuario{
    constructor(id,email,senha,nome,cpf,telefone,tipo = "doador"){
        this.id = id
        this.email = email
        this.senha = senha
        this.nome = nome
        this.cpf = cpf
        this.telefone = telefone
        this.tipo = tipo
        this.Doacoes = []
    }
    validarDados(confirmarSenha){
        if(this.nome === "" || this.cpf === "" || this.telefone === "" || this.email === "" || this.senha === "" || confirmarSenha === ""){
            exibirMensagem("CADASTRO","Por favor, preencha todos os campos do cadastro.")
            return false
        }
        if(!this.validarCPF()){
            exibirMensagem("CPF","CPF inválido! Verifique os números digitados.")
            return false
        }
        if(this.telefone.length !== 10 && this.telefone.length !== 11){
            exibirMensagem("TELEFONE","Telefone inválido! Digite o DDD + número.")
            return false
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regexEmail.test(this.email)){
            exibirMensagem("EMAIL","E-mail inválido! Digite um e-mail válido.")
            return false
        }
        if(this.senha.length < 12){
            exibirMensagem("SENHA","A senha deve possuir pelo menos 12 caracteres.")
            return false
        }
        if(this.senha !== confirmarSenha){
            exibirMensagem("CONFIRMAR SENHA","As senhas não conferem. Digite novamente.")
            return false
        }
        return true
    }
    validarCPF(){
        let cpf = this.cpf.replace(/[^\d]/g,'')
        if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)){
            return false
        }
        let soma = 0
        let resto
        for(let i = 1; i <= 9; i++){
            soma += parseInt(cpf.substring(i - 1,i)) * (11 - i)
        }
        resto = (soma * 10) % 11
        if(resto === 10 || resto === 11){
            resto = 0
        }
        if(resto !== parseInt(cpf.substring(9,10))){
            return false
        }
        soma = 0
        for(let i = 1; i <= 10; i++){
            soma += parseInt(cpf.substring(i - 1,i)) * (12 - i)
        }
        resto = (soma * 10) % 11
        if(resto === 10 || resto === 11){
            resto = 0
        }
        if(resto !== parseInt(cpf.substring(10,11))){
            return false
        }
        return true
    }
}
export class Doacao{
    constructor(id,valor,dataDoacao,formaPagamento,status,idDoador){
        this.id = id
        this.valor = valor
        this.dataDoacao = dataDoacao
        this.formaPagamento = formaPagamento
        this.status = status
        this.idDoador = idDoador
    }
}
export class Acao{
    constructor(id,titulo,descricao,data_acao,status,idPerfilCriador,imagens){
        this.id = id
        this.titulo = titulo
        this.descricao = descricao
        this.data_acao = data_acao
        this.status = status
        this.idPerfilCriador = idPerfilCriador
        this.imagens = imagens
    }
}
export class Manager{
    constructor(){
        this.Acoes = []
        this.Usuarios = []
        this.emailRedefinicao = null
        this.codigoVerificacao = null
    }
    async gerarCodigo(email){
        await this.carregar_users()
        const usuario = this.Usuarios.find(usuario => usuario.email === email)
        if(!usuario){
            return null
        }
        const codigo = Math.floor(100000 + Math.random() * 900000)
        try{
            const response = await fetch(`${BASE_URL}/codigos`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    valor:codigo,
                    ativo:true
                })
            })
            if(!response.ok){
                throw new Error("Erro ao salvar código de verificação")
            }
            const codigoSalvo = await response.json()
            console.log("Código de verificação:",codigoSalvo.valor)
            return codigoSalvo
        }catch(erro){
            console.error(erro)
            return null
        }
    }
    async verificarCodigo(email,codigo){
        try{
            const response = await fetch(`${BASE_URL}/codigos?email=${encodeURIComponent(email)}&ativo=true`)
            if(!response.ok){
                throw new Error("Erro ao buscar códigos de verificação")
            }
            const codigos = await response.json()
            const codigoEncontrado = codigos.find(codigoSalvo => Number(codigoSalvo.valor) === Number(codigo))
            if(!codigoEncontrado){
                return null
            }
            return codigoEncontrado
        }catch(erro){
            console.error(erro)
            return null
        }
    }
    async desativarCodigo(id){
        try{
            const response = await fetch(`${BASE_URL}/codigos/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ativo:false
                })
            })
            if(!response.ok){
                throw new Error("Erro ao desativar código")
            }
            return true
        }catch(erro){
            console.error(erro)
            return false
        }
    }
    async carregar_users(){
        try{
            const response = await fetch(`${BASE_URL}/usuarios`)
            if(!response.ok){
                throw new Error("Erro ao carregar usuários")
            }
            const usuarios = await response.json()
            this.Usuarios = []
            usuarios.forEach(usuario => {
                const novoUsuario = new Usuario(
                    usuario.id,
                    usuario.email,
                    usuario.senha,
                    usuario.nome,
                    usuario.cpf,
                    usuario.telefone,
                    usuario.tipo
                )
                this.Usuarios.push(novoUsuario)
            })
            return this.Usuarios
        }catch(erro){
            console.error(erro)
        }
    }
    async adicionar_user(user){
        try{
            const response = await fetch(`${BASE_URL}/usuarios`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:user.email,
                    senha:user.senha,
                    nome:user.nome,
                    cpf:user.cpf,
                    telefone:user.telefone,
                    tipo:user.tipo
                })
            })
            if(!response.ok){
                throw new Error("Erro ao adicionar usuário")
            }
            const usuario = await response.json()
            const novoUsuario = new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
            this.Usuarios.push(novoUsuario)
            return novoUsuario
        }catch(erro){
            console.error(erro)
        }
    }
    async buscar_user(id){
        try{
            const response = await fetch(`${BASE_URL}/usuarios/${id}`)
            if(!response.ok){
                throw new Error("Usuário não encontrado")
            }
            const usuario = await response.json()
            return new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
        }catch(erro){
            console.error(erro)
        }
    }
    async buscar_por_email(email){
        try{
            const response = await fetch(`${BASE_URL}/usuarios?email=${encodeURIComponent(email)}`)
            if(!response.ok){
                throw new Error("Erro ao buscar usuário")
            }
            const usuarios = await response.json()
            if(usuarios.length === 0){
                return null
            }
            const usuario = usuarios[0]
            return new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
        }catch(erro){
            console.error(erro)
            return null
        }
    }
    async buscar_por_cpf(cpf){
        try{
            const response = await fetch(`${BASE_URL}/usuarios?cpf=${encodeURIComponent(cpf)}`)
            if(!response.ok){
                throw new Error("Erro ao buscar usuário")
            }
            const usuarios = await response.json()
            if(usuarios.length === 0){
                return null
            }
            const usuario = usuarios[0]
            return new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
        }catch(erro){
            console.error(erro)
            return null
        }
    }
    async atualizar_user(id,user){
        try{
            const response = await fetch(`${BASE_URL}/usuarios/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:user.email,
                    senha:user.senha,
                    nome:user.nome,
                    cpf:user.cpf,
                    telefone:user.telefone,
                    tipo:user.tipo
                })
            })
            if(!response.ok){
                throw new Error("Erro ao atualizar usuário")
            }
            const usuario = await response.json()
            const novoUsuario = new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
            const index = this.Usuarios.findIndex(usuario => usuario.id == id)
            if(index !== -1){
                this.Usuarios[index] = novoUsuario
            }
            return novoUsuario
        }catch(erro){
            console.error(erro)
        }
    }async atualizar_senha(id,novaSenha){
        try{
            const response = await fetch(`${BASE_URL}/usuarios/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    senha:novaSenha
                })
            })
            if(!response.ok){
                throw new Error("Erro ao atualizar senha")
            }
            const usuario = await response.json()
            const novoUsuario = new Usuario(
                usuario.id,
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.tipo
            )
            const index = this.Usuarios.findIndex(usuario => usuario.id == id)
            if(index !== -1){
                this.Usuarios[index] = novoUsuario
            }
            return novoUsuario
        }catch(erro){
            console.error(erro)
            return null
        }
    }

    async atualizarLista(){
        await this.carregar_users()
    }
}
export function exibirMensagem(titulo,texto){
    const alerta = document.querySelector("alerta-mensagem")
    const mensagem = document.querySelector("mensagem")
    if(alerta){
        alerta.exibir(titulo,texto)
    }
    if(mensagem){
        mensagem.exibir(titulo,texto)
    }
}