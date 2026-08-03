// Buscar os dados que já estão salvos no localStorage
let ferramentas = JSON.parse(localStorage.getItem("ferramentas")) || [];

// Função de cadastro
function cadastrarFerramenta(){
    // Pega os valores dos campos
    const nome = document.getElementById('nome').value;
    const setor = document.getElementById('setor').value;
    const quantidade = document.getElementById('quantidade').value;

    if (!nome || !setor || !quantidade) {
        alert('Preencha todos os campos');
        return;
    }

    // Criar objeto com os dados da ferramenta
    const ferramenta = {
        nome: nome,
        setor: setor,
        quantidade: quantidade
    }

    // Adicionando o objeto no array
    ferramentas.push(ferramenta);

    // Salvar os dados no localStorage
    localStorage.setItem('ferramentas', JSON.stringify(ferramentas));
}

// Função responsavel por exibir as ferramentas
function exibirFerramentas(){
    const tabela = document.getElementById('tabelaFerramentas');

    // Limpa a tabela antes de criar as linhas novamente 
    tabela.innerHTML = '';

    // Correr array montando a tabela
    ferramentas.forEach (function (ferramenta, indice){
        tabela.innerHTML += `
            <tr>
                <td>${ferramenta.nome}</td>
            </tr>
        `;
    });
}