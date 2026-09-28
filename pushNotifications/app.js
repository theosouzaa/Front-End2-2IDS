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