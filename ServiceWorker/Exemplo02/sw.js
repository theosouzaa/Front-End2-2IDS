// Nome do cache que será utilizado pelo Service Worker
const CACHE = 'offline-v1';

// Evento executado quando o sw vai ser instalado
self.addEventListener('install', event => {
    // Guardar o arquivo offline.html no cache
    event.waitUntil(
        // Abrir o cache para salvar
        caches.open(CACHE).then(cache =>
            // Salva a página offline no cache
            cache.add('./offline.html')
        )
    );

    self.skipWaiting();
});

// Evento de ativação do sw.js
self.addEventListener('active', event => {
    event.waitUntil(self.clients.claim());
});

// Evento executado sempre que for feito um request
self.addEventListener('fetch', event => {
    // Verifica se a requisição é entre páginas
    if (event.request.mode == 'navigate') {
        // Intercepta a requisição
        event.respondWith(
            // Tenta acessar normalmente pela rede
            fetch(event.request)
                // Caso a requisição falhe
                .catch(() =>
                    // Abre a página de offline.html
                    caches.match('./offline.html')
                )
        )
    }
});