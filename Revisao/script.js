function enviarFormulario(event) {
    // Travar envio do formulário do HTML
    event.preventDefault();

    // Capturar valores do HTML
    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let telefone = document.getElementById('telefone').value;
    let cargo = document.getElementById('cargo').value;

    // Capturar os elementos das mensagens de erro
    let erroNome = document.getElementById('erroNome');

    // Exibir os valores
    console.log(nome);

    // Validação dos campos
    if (!nome) {
        Swal.fire({
            title: "Atenção!",
            text: "Campo nome obrigatório!",
            icon: "error"
        });

        // Colocar mensagem em vermelho no campo
        document.getElementById('nome').classList.add('campo-erro');
        erroNome.textContent = 'Campo nome é obrigatório!';
        document.getElementById('nome').focus();
        return;
    }

    if (!cpf) {
        Swal.fire({
            title: "Atenção!",
            text: "Campo CPF obrigatório!",
            icon: "error"
        });

        return;
    }

    if (!telefone) {
        Swal.fire({
            title: "Atenção!",
            text: "Campo telefone obrigatório!",
            icon: "error"
        });

        return;
    }

    if (!cargo) {
        Swal.fire({
            title: "Atenção!",
            text: "Campo cargo obrigatório!",
            icon: "error"
        });

        return;
    }

    Swal.fire({
        title: "Sucesso!",
        text: "Dados enviados!",
        icon: "success"
    });
}