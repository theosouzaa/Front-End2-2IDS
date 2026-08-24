export async function buscarUsuarios() {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
    return resposta.json();
}
