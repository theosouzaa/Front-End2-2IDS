export function calcularMedia(nota1, nota2){
    console.log('Função de calcular média em media.js');
    return (nota1 + nota2) / 2;
}

export function verificar(media){
    if (media >= 7) {
        return 'Aprovado';
    } else {
        return 'Reprovado';
    }
}