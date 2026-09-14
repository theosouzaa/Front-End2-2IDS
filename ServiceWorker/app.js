// Verifica se o navegados possi suporte ao service worker
if ("serviceWorker" in navigator) {
    // Aguardar a pagina terminar de carregar
    window.addEventListener("load", async function () {
        try {
            // Registrar o arquivo sw.js
            const registro = await navigator.serviceWorker.register('./sw.js');
            console.log('Service Worker registrado com sucesso');
            console.log('Escopo: ', registro.scope);
        } catch (erro) {
            console.log("Erro ao registrar sw: ", erro);
        }
    });
} else {
    console.log('Este navegador não suporta o sw');
}