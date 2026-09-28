// Capturar elementos do HTML
const btnAtivar = document.getElementById('btnAtivar');
const formChamado = document.getElementById('formChamado');
const mensagem = document.getElementById('mensagem');
const statusChamado = document.getElementById('statusChamado');

let registroServiceWorker = null;

// Verificar se o navegador possui os recursos necessários
function verificaSuporte() {
    // Verifica o suporte do navegador ao Service Worker
    if (!('serviceWorker' in navigator)) {
        mensagem.textContent = 'Este navegador não suporta Service Worker.';
        return false;
    }
    // Verifica o suporte a notificações no navegador
    if (!('Notification' in window)) {
        mensagem.textContent = 'Este navegador não suporta notificações.';
        return false;
    }

    return true;
}

// Registrar o arquivo service-worker.js
async function registrarServiceWorker() {
    try {
        registroServiceWorker = await navigator.serviceWorker.register('./service-worker.js');
        console.log(`Service Worker registrado com sucesso:`, registroServiceWorker);
        return registroServiceWorker;
    } catch (erro) {
        console.log(`Erro ao registrar SW: ${erro}`);
        mensagem.textContent = 'Não foi possível registrar o Service Worker.';
        return null;
    }
}

// Atualizar o estado inicial do botão de permissão se já concedido
function atualizarStatusPermissao() {
    if (Notification.permission === 'granted') {
        mensagem.textContent = 'Notificações Autorizadas';
        btnAtivar.disabled = true;
    } else if (Notification.permission === 'denied') {
        mensagem.textContent = 'Notificações Bloqueadas';
    } else {
        mensagem.textContent = 'A autorização ainda não foi definida.';
    }
}

// Solicitar a autorização ao usuário
async function solicitarPermissao() {
    const permissao = await Notification.requestPermission();

    if (permissao === 'granted') {
        mensagem.textContent = 'Notificações Autorizadas';
        btnAtivar.disabled = true;
        return true;
    }

    if (permissao === 'denied') {
        mensagem.textContent = 'Notificações Bloqueadas';
        return false;
    }

    mensagem.textContent = 'A autorização não foi concluída.';
    return false;
}

// Exibe a notificação pelo Service Worker quando o chamado for de prioridade alta
async function mostrarNotificacao(chamado) {
    if (Notification.permission !== "granted") {
        mensagem.textContent = "Aviso: Autorize as notificações para receber os alertas de emergência.";
        return;
    }

    const registro = registroServiceWorker || await navigator.serviceWorker.ready;

    // Criar a notificação
    await registro.showNotification(`⚠️ Chamado Urgente: ${chamado.equipamento}`, {
        body: `Setor: ${chamado.setor}\nProblema: ${chamado.descricao}`,
        icon: 'icone.png',
        tag: 'chamado-urgente', // Evita notificações duplicadas
        data: {
            url: './detalhes.html'
        }
    });
}

// Evento ao clicar no botão "Ativar notificações"
btnAtivar.addEventListener('click', async function () {
    if (!verificaSuporte()) {
        return;
    }

    if (!registroServiceWorker) {
        await registrarServiceWorker();
    }

    await solicitarPermissao();
});

// Evento ao submeter/registrar o formulário de chamado
formChamado.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Validação dos campos obrigatórios
    if (!formChamado.checkValidity()) {
        event.stopPropagation();
        formChamado.classList.add('was-validated');
        return;
    }

    // Criar objeto JavaScript representando o chamado
    const chamado = {
        equipamento: document.getElementById('equipamento').value.trim(),
        setor: document.getElementById('setor').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        prioridade: document.getElementById('prioridade').value
    };

    console.log("Objeto Chamado Criado:", chamado);

    // Mensagem de confirmação na tela
    statusChamado.innerHTML = `
        <div class="alert alert-success shadow-sm">
            <strong>✅ Chamado Registrado com Sucesso!</strong><br>
            <strong>Equipamento:</strong> ${chamado.equipamento} | <strong>Setor:</strong> ${chamado.setor}<br>
            <strong>Prioridade:</strong> <span class="badge ${chamado.prioridade === 'alta' ? 'bg-danger' : chamado.prioridade === 'media' ? 'bg-warning text-dark' : 'bg-secondary'}">${chamado.prioridade.toUpperCase()}</span>
        </div>
    `;

    // Se a prioridade for alta, dispara a notificação
    if (chamado.prioridade === 'alta') {
        await mostrarNotificacao(chamado);
    }

    // Resetar o formulário
    formChamado.reset();
    formChamado.classList.remove('was-validated');
});

// Ao carregar a página, verifica o suporte, registra o SW e checa as permissões
window.addEventListener("load", async function () {
    if (!verificaSuporte()) {
        return;
    }
    await registrarServiceWorker();
    atualizarStatusPermissao();
});