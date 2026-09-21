// 1. Elementos HTML
const formulario = document.getElementById("formAnotacao");
const campoTitulo = document.getElementById("titulo");
const campoTexto = document.getElementById("descricao");
const lista = document.getElementById("listaAnotacoes");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");


// 2. Chave utilizada no LocalStorage
const CHAVE = "minhas_anotacoes";


// 3. Recuperar anotações salvas
function carregarAnotacoes() {

    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE)
        );

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {
        return [];
    }

}


// 4. Array com todas as anotações
let anotacoes = carregarAnotacoes();


// 5. Salvar array no LocalStorage
function salvarLocalStorage() {

    localStorage.setItem(
        CHAVE,
        JSON.stringify(anotacoes)
    );

}


// 6. Mostrar mensagens ao usuário
function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className =
        "alert alert-" + tipo + " py-2";

}


// 7. Exibir todas as anotações
function listarAnotacoes() {

    // Limpa a lista antes de reconstruí-la
    lista.innerHTML = "";

    // Atualiza o contador
    contador.textContent = anotacoes.length;


    // Verifica se existem anotações
    if (anotacoes.length === 0) {

        lista.innerHTML = `
            <div class="alert alert-light text-center">
                Nenhuma anotação cadastrada.
            </div>
        `;

        return;
    }


    // Percorre o array
    anotacoes.forEach(function(anotacao) {

        // Cria o card
        const card = document.createElement("div");
        card.className = "card border mb-3";

        const corpo = document.createElement("div");
        corpo.className = "card-body";

        const titulo = document.createElement("h5");
        titulo.textContent = anotacao.titulo;

        const texto = document.createElement("p");
        texto.className = "texto-anotacao";
        texto.textContent = anotacao.texto;

        const data = document.createElement("small");
        data.className = "text-muted";
        data.textContent = anotacao.data;

        const botao = document.createElement("button");

        botao.className =
            "btn btn-outline-danger btn-sm";

        botao.textContent = "Excluir";

        // Identifica qual anotação será excluída
        botao.dataset.id = anotacao.id;


        // Monta o card
        corpo.appendChild(titulo);
        corpo.appendChild(texto);
        corpo.appendChild(data);

        const rodape = document.createElement("div");
        rodape.className = "mt-3";
        rodape.appendChild(botao);

        corpo.appendChild(rodape);
        card.appendChild(corpo);

        // Adiciona à página
        lista.appendChild(card);

    });

}


// 8. Evento de envio do formulário
formulario.addEventListener("submit", function(evento) {

    // Impede o recarregamento da página
    evento.preventDefault();


    // Recupera os valores digitados
    const titulo = campoTitulo.value.trim();
    const texto = campoTexto.value.trim();


    // Validação com JavaScript
    if (titulo.length < 3) {

        mostrarMensagem(
            "O título precisa ter pelo menos 3 caracteres.",
            "danger"
        );

        campoTitulo.focus();
        return;

    }


    if (texto.length < 5) {

        mostrarMensagem(
            "A descrição precisa ter pelo menos 5 caracteres.",
            "danger"
        );

        campoTexto.focus();
        return;

    }


    // Cria um objeto com os dados
    const novaAnotacao = {

        id: Date.now(),

        titulo: titulo,

        texto: texto,

        data: new Date().toLocaleString("pt-BR")

    };


    // Adiciona ao array
    anotacoes.unshift(novaAnotacao);


    // Salva no navegador
    salvarLocalStorage();


    // Atualiza a página sem recarregar
    listarAnotacoes();


    // Limpa o formulário
    formulario.reset();


    // Mensagem de sucesso
    mostrarMensagem(
        "Anotação cadastrada com sucesso!",
        "success"
    );

    campoTitulo.focus();

});


// 9. Evento para excluir anotações
lista.addEventListener("click", function(evento) {

    // Verifica se clicou no botão de excluir
    const botao = evento.target.closest("button[data-id]");

    if (!botao) {
        return;
    }


    // Recupera o identificador da anotação
    const id = Number(botao.dataset.id);


    // Confirma a exclusão
    if (!confirm("Deseja excluir esta anotação?")) {
        return;
    }


    // Remove a anotação do array
    anotacoes = anotacoes.filter(function(anotacao) {

        return anotacao.id !== id;

    });


    // Atualiza o LocalStorage
    salvarLocalStorage();


    // Atualiza a interface
    listarAnotacoes();

});


// 10. Carrega as anotações ao abrir a página
listarAnotacoes();