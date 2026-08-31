function validarNome() {
    let nome = document.getElementById("nome").value;
    let material = document.getElementById("material").value;
    let quantidade = document.getElementById("quantidade").value;
    let notaFiscal = document.getElementById("notaFiscal").value;

    console.log(nome);
    console.log(material);
    console.log(quantidade);
    console.log(notaFiscal);

    if (!nome || !material || quantidade || notaFiscal) {
        alert("Os campos são obrigatórios!");
    }

}

// Capturar elementos HTML
const formulario = document.querySelector("#formCep");
const campoCep = document.querySelector("#cep");
const mensagem = document.querySelector("#mensagem");
const resultado = document.querySelector("#resultado");

// Criando a acção no click do formulário
formulario.addEventListener("submit", consultarCep);

// Criar função que busca as informações do CEP
async function consultarCep(event) {
    // Travar envio do HTML
    event.preventDefault();

    // console.log('entrou na função!')

    // Remove tudo que não for num.
    const cep = campoCep.value.replace(/\D/g, "");

    // Verificar se o CEP tem 8 números
    if (cep.length != 8) {
        mensagem.textContent = "Digite um CEP com 8 números!";
        return;
    }

    // Fazer consulta na API do ViaCep
    try {
        // Faz a busca
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        // Verifica se a solicitação deu certo
        if (!resposta.ok) {
            console.log('Erro ao buscar CEP');
            return;
        }

        // Pega a resposta da API e transforma em JSON
        const endereco = await resposta.json();

        if (endereco.erro) {
            console.log('CEP inválido');
            mensagem.textContent = 'CEP não encontrado!';
            return;
        }

        console.log(endereco);

        // Mostrar na tela os dados da API que foram buscados
        document.getElementById("logradouro").textContent = endereco.logradouro

        document.getElementById("bairro").textContent = endereco.bairro

        document.getElementById("cidade").textContent = endereco.localidade

        document.getElementById("estado").textContent = endereco.estado

        // Retirar o hidden do campo
        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado!"

    } catch (error) {
        mensagem.textContent = error.mensage;
        console.log(error);
    }

}