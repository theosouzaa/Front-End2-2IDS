// Capturar elementos do HTML
const btnAtivar = document.getElementById('btnAtivar');
const btnTestar = document.getElementById('btnTestar');
const mensagem = document.getElementById('mensagem');

let registroServiceWorker = null;

// Verificar se o navegador possui os recursos necessários
function verificaSuporte() {
    // Verifica o suporte do navegador ao Service worker
    if (!('serviceWorker' in navigator)) {
        mensagem.textContent = 'Este navegador não suportao Service Worker';
        return false;
    }
    // Verifica o suporte das nevegações no navegador
    if (!('Notification' in window)) {
        mensagem.textContent = 'Este navegador não suporta notificações';
        return false;
    }

    return true;
}

// Registrar o arquivo servce-sorker.js
async function registrarServiceWorker() {
    try {
        registroServiceWorker = await navigator.serviceWorker.register('./service-worker.js');
        console.log(`Service Worker registrado: ${registroServiceWorker}`);
        return registroServiceWorker;
    } catch (erro) {
        console.log(`Erro ao registrar SW ${erro}`);
        mensagem.textContent = 'Não foi possível registrar o SW';
        return null;
    }
}

// Solicitar a autorização ao usuário
async function solicitarPermissao() {
    const permissao = await Notification.requestPermission();

    if (permissao == 'granted') {
        mensagem.textContent = 'Notificações Autorizadas';
        btnTestar.disabled = false;
        return true;
    }

    if (permissao == 'denied') {
        mensagem.textContent = 'Notificações Bloqueadas';
        return false;
    }

    mensagem.textContent = 'A autorização não foi concluída.';
    return false;
}

// exibe a notificação pelo service worker
async function mostrarNotidicacao() {
    if (Notification.permission != "granted") {
        mensagem.textContent = "Primeiro autorize as notificações";
        return;
    }

    const registro = registroServiceWorker || await navigator.serviceWorker.ready;

    // Criar a notificação
    await registro.showNotification('Nova atividade publicada!', {
        body: 'A atividade de JavaScript está disponivel.',
        icon: 'icone.png',
        data: {
            url: "./index.html"
        }
    });
}

// Após a pessoa clicar no botão ativar notificações, faz a pergunta se ala cai permitir as notificações
btnAtivar.addEventListener('click', async function () {
    if (!verificaSuporte()) {
        return;
    }

    if (!registroServiceWorker) {
        await registrarServiceWorker();
    }

    await solicitarPermissao()
});

btnTestar.addEventListener('click', mostrarNotidicacao);

window.addEventListener("load", async function () {
    if (!verificaSuporte()) {
        return;
    }
    await registrarServiceWorker();
});