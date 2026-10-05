// Executar a instalação do Service Worker
self.addEventListener("install", function () {
    console.log('Service Worker instalado!');

    self.skipWaiting();
});

// Executar a ativação do Service Worker
self.addEventListener("activate", function (event) {
    console.log('Service Worker ativado!');

    event.waitUntil(self.clients.claim());
});

// Criar o evento de Background Sync
self.addEventListener("sync", function (event) {
    console.log('Evento de sincroização recebido:',
        event.tag
    );

    if (event.tag === "enviar-registro") {
        event.waitUntil(enviarDados());
    }
});

// Finção que envia dados para API (API de teste)
async function enviarDados() {
    console.log('Tentando enviar os dados');

    const registro = {
        equipamento: "Torno CNC",
        responsalvel: "Théo",
        situacao: "Concluído"
    };

    const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            // Method de envio
            method: "POST",
            // Cabeçalho da request
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registro)
        }
    );

    if (!resposta.ok) {
        console.log("Erro ao enviar os dados...");
        return;
        // throw new Error();
    }

    const resultado = await resposta.json();

    console.log("Dados enviados com sucesso!")
    console.log(resultado);
}