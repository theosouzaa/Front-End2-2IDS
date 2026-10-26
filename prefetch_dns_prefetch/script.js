const form = document.getElementById("formCep");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtém o CEP e remove caracteres não numéricos
    const cep = document.getElementById("cep").value.replace(/\D/g, "");

    if (cep.length !== 8) {
        resultado.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    resultado.textContent = "Consultando CEP...";

    try {
        // Requisição HTTP para o servidor do ViaCEP
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na requisição.");
        }

        // Converte a resposta JSON para objeto JavaScript
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.textContent = "CEP não encontrado.";
            return;
        }

        // Apresenta os dados retornados pela API
        resultado.textContent =
            `Rua: ${dados.logradouro} |
                Bairro: ${dados.bairro} |
                Cidade: ${dados.localidade} |
                Estado: ${dados.uf}`;

    } catch (erro) {
        resultado.textContent = "Erro ao consultar o CEP.";
        console.error(erro);
    }
});

const botao = document.getElementById('btnRelatorio');
let prefetchRealizado = false;

// Quando o usuário passar o mouse no botão
botao.addEventListener('mouseenter', function () {
    // Impede de criar o mesmo prefetch Várias vezes
    if (prefetchRealizado) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'relatorio.html';
    link.as = 'document';

    document.head.appendChild(link);
    prefetchRealizado = true;
    console.log('Prefetch solicitado para relatorio.html');
});

botao.addEventListener('click', function () {
    window.location.href = 'relatorio.html';
});