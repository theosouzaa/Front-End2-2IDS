self.addEventListener("notificationclick", function (event) {
    // Fechar notificação
    event.notification.close();
    // Recuperar a URL da notificação
    const urlDestino = event.notification.data.url || './';
    // Manter o Service Worker ativo enquanto a página é aberta
    event.waitUntil(clients.matchAll({
        type: "window",
        includeUncontrolled: true
    }).then(function (janelas) {
        // Procurar uma janela que já está aberta
        for (const janela of janelas) {
            if (janela.url.includes(urlDestino) && "focus" in janela) {
                return janela.focus();
            }
        }

        // Abre uma nova janela quando necessário
        if (clients.openWindow) {
            return clients.openWindow(urlDestino);
        }
    }))
});