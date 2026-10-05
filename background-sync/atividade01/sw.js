// Executar a instalação do Service Worker
self.addEventListener("install", function () {
    console.log("Service Worker instalado!");

    self.skipWaiting();
});

// Executar a ativação do Service Worker
self.addEventListener("activate", function (event) {
    console.log("Service Worker ativado!");

    event.waitUntil(self.clients.claim());
});

// Criar o evento de Background Sync
self.addEventListener("sync", function (event) {
    console.log("Evento de sincronização recebido:", event.tag);

    if (event.tag === "enviar-registro") {
        event.waitUntil(enviarDados());
    }
});

// Função que envia dados para a API (API de teste)
async function enviarDados() {
    console.log("Tentando enviar os dados");

    // Dados personalizados pelo grupo
    const registro = {
        equipamento: "Impressora 3D",
        responsavel: "Maria",
        situacao: "Manutenção realizada"
    };

    const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            // Método de envio
            method: "POST",
            // Cabeçalho da requisição
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registro)
        }
    );

    if (!resposta.ok) {
        console.log("Erro ao enviar os dados...");
        // Lançar o erro faz o navegador tentar a sincronização de novo mais tarde
        throw new Error("Falha ao enviar: " + resposta.status);
    }

    const resultado = await resposta.json();

    console.log("Dados enviados com sucesso!");
    console.log(resultado);
}