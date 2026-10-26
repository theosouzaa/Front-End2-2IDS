document.querySelectorAll("[data-prefetch]").forEach((botao) => {
    let solicitado = false;

    // Quando o usuário posicionar o mouse sobre o botão
    botao.addEventListener("mouseenter", () => {
        // Evita solicitar o mesmo prefetch várias vezes
        if (solicitado) {
            return;
        }

        // Obtém o nome da página correspondente
        const pagina = botao.dataset.prefetch;

        // Cria dinamicamente o elemento de prefetch
        const linkPrefetch = document.createElement("link");

        linkPrefetch.rel = "prefetch";
        linkPrefetch.href = pagina;
        linkPrefetch.as = "document";

        // Adiciona o elemento ao head do documento
        document.head.appendChild(linkPrefetch);

        solicitado = true;

        // Informa no console qual página recebeu a solicitação
        console.log(`Prefetch solicitado para ${pagina}`);
    });
});


// ============================================
// CONSULTA DE CEP UTILIZANDO A API VIACEP
// ============================================

const formCep = document.getElementById("formCep");
const resultado = document.getElementById("resultado");

if (formCep && resultado) {

    formCep.addEventListener("submit", async (event) => {

        // Impede o recarregamento da página
        event.preventDefault();

        // Obtém o CEP digitado e remove caracteres não numéricos
        const campoCep = document.getElementById("cep");
        const cep = campoCep.value.replace(/\D/g, "");

        // Verifica se o CEP possui oito números
        if (cep.length !== 8) {
            resultado.innerHTML = `
                <div class="alert alert-warning">
                    Digite um CEP válido com 8 números.
                </div>
            `;
            return;
        }

        // Informa que a consulta está sendo realizada
        resultado.innerHTML = `
            <div class="text-secondary">
                Consultando CEP...
            </div>
        `;

        try {

            // Realiza a requisição à API ViaCEP
            const resposta = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            // Verifica se a requisição foi bem-sucedida
            if (!resposta.ok) {
                throw new Error("Falha na requisição ViaCEP.");
            }

            // Converte a resposta para JSON
            const dados = await resposta.json();

            // Verifica se o CEP foi encontrado
            if (dados.erro) {
                resultado.innerHTML = `
                    <div class="alert alert-warning">
                        CEP não encontrado. Confira os números e tente novamente.
                    </div>
                `;
                return;
            }

            // Cria o elemento que apresentará os resultados
            resultado.replaceChildren();

            const caixa = document.createElement("div");
            caixa.className = "alert alert-success mb-0";

            // Apresenta a cidade
            const cidade = document.createElement("p");
            cidade.className = "mb-1";
            cidade.textContent =
                `Cidade: ${dados.localidade || "Não informada"}`;

            // Apresenta o bairro
            const bairro = document.createElement("p");
            bairro.className = "mb-1";
            bairro.textContent =
                `Bairro: ${dados.bairro || "Não informado"}`;

            // Apresenta o estado
            const estado = document.createElement("p");
            estado.className = "mb-0";
            estado.textContent =
                `Estado: ${dados.uf || "Não informado"}`;

            // Adiciona as informações ao resultado
            caixa.append(cidade, bairro, estado);
            resultado.appendChild(caixa);

        } catch (erro) {

            // Apresenta uma mensagem caso ocorra algum problema
            resultado.innerHTML = `
                <div class="alert alert-danger">
                    Não foi possível consultar o CEP.
                    Verifique sua conexão e tente novamente.
                </div>
            `;

            console.error("Erro ao consultar ViaCEP:", erro);
        }
    });
}