async function buscarDDD(params) {
    // Capturar dados do HTML
    let dddDigitado = document.getElementById('ddd').value;
    let tabela = document.getElementById('tabela');

    tabela.innerHTML = '';

    if (!dddDigitado || dddDigitado.length > 2) {
        alert('DDD inválido!');
        return;
    }

    // Fazer a solicitação para API
    try {
        const request = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddDigitado}`);

        if (!request.ok) {
            alert(`Erro ao fazer a busca! DDD inválido ou não existe!`);
            return;
        }

        const response = await request.json();

        // Andar no array construindo as cidades da API
        response.cities.forEach(function (cidade) {
            tabela.innerHTML += `
                <tr>
                    <td>${response.state}</td>
                    <td>${cidade}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}