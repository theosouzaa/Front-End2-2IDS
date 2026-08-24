export function mostrarUsuarios(usuarios) {
    const lista = document.getElementById('lista-usuarios');

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const card = document.createElement('div');

        card.innerHTML = `
            <h2>${usuario.name}</h2>
            <p>E-mail: ${usuario.email}</p>
            <p>Telefone: ${usuario.phone}</p>
            <p>Cidade: ${usuario.address.city}</p>
            <p>Empresa: ${usuario.company.name}</p>
        `;

        lista.appendChild(card);
    }
}
