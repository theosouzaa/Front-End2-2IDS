import { buscarUsuarios } from './api.js';
import { mostrarUsuarios } from './usuarios.js';

const botao = document.getElementById('botao-buscar');
const mensagem = document.getElementById('mensagem');
const lista = document.getElementById('lista-usuarios');

async function buscar() {
    mensagem.textContent = 'Carregando usuários...';
    lista.innerHTML = '';

    try {
        const usuarios = await buscarUsuarios();
        mostrarUsuarios(usuarios);
        mensagem.textContent = '';
    } catch (error) {
        mensagem.textContent = 'Erro ao buscar usuários.';
    }
}

botao.addEventListener('click', buscar);
