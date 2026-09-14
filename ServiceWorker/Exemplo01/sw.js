// Executar quando o Service Worker for instalado
self.addEventListener("install", function (event){
    console.log('1 - Service Worker instalado');

    // Foçar o novo sw a ser ativo.
    event.waitUntil(self.skipWaiting());
});

// Ativando o Service Worker
self.addEventListener("active", function (event){
    console.log('2 - Service Worker ativado');

    // Faz o sw controlar as páginas dentro do escopo do projeto
    event.waitUntil(self.clients.claim());
});

// Executar o sw toda vez que um fetch for realizado
self.addEventListener("fetch", function (event){
    console.log('3 - Requisição intercepitada: ');
    console.log(event.request.url);
});