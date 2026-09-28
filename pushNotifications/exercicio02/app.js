// Capturar elementos do HTML
const btnAtivar = document.getElementById('btnAtivar');
const btnTestar = document.getElementById('btnTestar');
const btnReuniao = document.getElementById('btnReuniao'); // NOVO: Botão de reunião
const mensagem = document.getElementById('mensagem');

let registroServiceWorker = null;

// Verificar se o navegador possui os recursos necessários
function verificaSuporte() {
    // Verifica o suporte do navegador ao Service worker
    if (!('serviceWorker' in navigator)) {
        mensagem.textContent = 'Este navegador não suporta o Service Worker';
        return false;
    }
    // Verifica o suporte das navegações no navegador
    if (!('Notification' in window)) {
        mensagem.textContent = 'Este navegador não suporta notificações';
        return false;
    }

    return true;
}

// Registrar o arquivo service-worker.js
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
        btnReuniao.disabled = false; // NOVO: Habilita botão de reunião
        return true;
    }

    if (permissao == 'denied') {
        mensagem.textContent = 'Notificações Bloqueadas';
        return false;
    }

    mensagem.textContent = 'A autorização não foi concluída.';
    return false;
}

// exibe a notificação de atividade pelo service worker (Mantida a original)
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

// NOVO: exibe a notificação de reunião pelo service worker
async function mostrarNotificacaoReuniao() {
    if (Notification.permission != "granted") {
        mensagem.textContent = "Primeiro autorize as notificações";
        return;
    }

    const registro = registroServiceWorker || await navigator.serviceWorker.ready;

    // Criar a notificação de reunião com título, mensagem, ícone e link do SENAI
    await registro.showNotification('Reunião Agendada!', {
        body: 'Você possui uma reunião agendada no SENAI. Clique para acessar o portal.',
        icon: 'icone-reuniao.png',
        data: {
            url: "https://www.sp.senai.br"
        }
    });
}

// Após a pessoa clicar no botão ativar notificações, faz a pergunta se ela vai permitir as notificações
btnAtivar.addEventListener('click', async function () {
    if (!verificaSuporte()) {
        return;
    }

    if (!registroServiceWorker) {
        await registrarServiceWorker();
    }

    await solicitarPermissao();
});

btnTestar.addEventListener('click', mostrarNotidicacao);
btnReuniao.addEventListener('click', mostrarNotificacaoReuniao); // NOVO: Evento do botão de reunião

window.addEventListener("load", async function () {
    if (!verificaSuporte()) {
        return;
    }
    await registrarServiceWorker();

    // Habilita os botões caso o usuário já tenha concedido a permissão anteriormente
    if (Notification.permission === 'granted') {
        btnTestar.disabled = false;
        btnReuniao.disabled = false;
        mensagem.textContent = 'Notificações Autorizadas';
    }
});