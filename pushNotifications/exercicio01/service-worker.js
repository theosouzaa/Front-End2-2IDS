self.addEventListener("notificationclick", function (event) {
    // Fechar notificação
    event.notification.close();

    // Recuperar a URL definida no objeto data
    const urlDestino = (event.notification.data && event.notification.data.url) 
        ? event.notification.data.url 
        : './detalhes.html';

    // Manter o Service Worker ativo enquanto a página é aberta/focada
    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (janelas) {
            // Procurar uma página do sistema que já esteja aberta
            for (const janela of janelas) {
                if ("focus" in janela) {
                    return janela.focus();
                }
            }

            // Abrir detalhes.html quando nenhuma página estiver aberta
            if (clients.openWindow) {
                return clients.openWindow(urlDestino);
            }
        })
    );
});