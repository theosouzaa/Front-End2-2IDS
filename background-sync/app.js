const mensagem = document.getElementById("mensagem");

// Registra o Service Worker
async function registrarServiceWorker() {
    if (!("ServiceWorker" in navigator)) {
        mensagem.textContent = 'Service Worker não suportado!';
        return;
    }

    try {
        const registro = await navigator.ServiceWorker.register("sw.js");

        console.log('Service Worker registrado');
        console.log("Escopo: ", registro.scope);
    } catch (e) {
        console.log("Erro ao registrar SW: ", e);
    }
}

// Registra uma tarefa de Background Sync
async function agendarSincronizacao() {
    try {
        const registro = await navigator.serviceWorker.ready;

        if (!("sync" in registro)) {
            mensagem.textContent = 'Este navegador não suporta Background Sync';
            return;
        }

        // Registrar a tarefa
        await registro.sync.register("enviar-registro");

        mensagem.textContent = 'Sincronização registrada. veja no console';

        console.log('Tarefa de sincronização registrada')
    } catch (e) {
        console.log("Erro ao registrar sync: ", e);
    }

}

// Registra o SW quando a página carregar
registrarServiceWorker();
