function enviarFormulario(event){
    // Travar envio do formulário do HTML
    event.preventDefault();

    // Capturar valores do HTML
    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let telefone = document.getElementById('telefone').value;
    let cargo = document.getElementById('cargo').value;

    // Exibir os valores
    console.log(nome);
}