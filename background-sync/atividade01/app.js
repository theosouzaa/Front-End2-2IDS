const mensagem = document.getElementById("mensagem");
const areaAlerta = document.getElementById("area-alerta");
const listaRegistros = document.getElementById("registros");
const btnSincronizar = document.getElementById("btn-sincronizar");
const btnConsultar = document.getElementById("btn-consultar");

// Mostra um alert do Bootstrap na página
function mostrarAlerta(texto, tipo = "success") {
    areaAlerta.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.setAttribute("role", "alert");
    alerta.textContent = texto;

    const fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "btn-close";
    fechar.setAttribute("data-bs-dismiss", "alert");
    fechar.setAttribute("aria-label", "Fechar");
    alerta.appendChild(fechar);

    areaAlerta.appendChild(alerta);
}

// Registra o Service Worker
async function registrarServiceWorker() {
    // O nome correto da propriedade é "serviceWorker" (com "s" minúsculo)
    if (!("serviceWorker" in navigator)) {
        mensagem.textContent = "Service Worker não suportado!";
        return;
    }

    try {
        const registro = await navigator.serviceWorker.register("sw.js");

        console.log("Service Worker registrado");
        console.log("Escopo: ", registro.scope);
    } catch (e) {
        console.log("Erro ao registrar SW: ", e);
        mostrarAlerta("Não foi possível registrar o Service Worker.", "danger");
    }
}

// Registra uma tarefa de Background Sync
async function agendarSincronizacao() {
    try {
        const registro = await navigator.serviceWorker.ready;

        if (!("sync" in registro)) {
            mostrarAlerta("Este navegador não suporta Background Sync.", "warning");
            return;
        }

        // Registrar a tarefa
        await registro.sync.register("enviar-registro");

        mostrarAlerta(
            "Sincronização agendada! O registro será enviado quando houver conexão. Veja o console.",
            "success"
        );
        mensagem.textContent = "";

        console.log("Tarefa de sincronização registrada");
    } catch (e) {
        console.log("Erro ao registrar sync: ", e);
        mostrarAlerta("Erro ao agendar a sincronização.", "danger");
    }
}

// Cria um card Bootstrap para um registro
function criarCard(post) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const corpo = document.createElement("div");
    corpo.className = "card-body";

    const id = document.createElement("span");
    id.className = "badge bg-primary mb-2";
    id.textContent = `ID ${post.id}`;

    const titulo = document.createElement("h3");
    titulo.className = "card-title h6 text-capitalize";
    titulo.textContent = post.title;

    const descricao = document.createElement("p");
    descricao.className = "card-text text-muted small mb-0";
    descricao.textContent = post.body;

    corpo.append(id, titulo, descricao);
    card.appendChild(corpo);
    col.appendChild(card);

    return col;
}

// Consulta registros na API (GET)
async function consultarRegistros() {
    mensagem.textContent = "Consultando registros...";
    btnConsultar.disabled = true;

    try {
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!resposta.ok) {
            throw new Error(`Status ${resposta.status}`);
        }

        const posts = await resposta.json();

        listaRegistros.innerHTML = "";
        posts.forEach(function (post) {
            listaRegistros.appendChild(criarCard(post));
        });

        mensagem.textContent = `${posts.length} registros carregados.`;
    } catch (e) {
        console.log("Erro ao consultar registros: ", e);
        mensagem.textContent = "";
        mostrarAlerta("Não foi possível consultar os registros. Verifique sua conexão.", "danger");
    } finally {
        btnConsultar.disabled = false;
    }
}

// Eventos dos botões
btnSincronizar.addEventListener("click", agendarSincronizacao);
btnConsultar.addEventListener("click", consultarRegistros);

// Registra o SW quando a página carregar
registrarServiceWorker();