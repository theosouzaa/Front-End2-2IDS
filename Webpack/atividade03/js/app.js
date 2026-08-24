import { calcularMedia, verificar } from "./media.js";

// Utilizando uma função do media.js
const media = calcularMedia(6, 9);
const situacao = verificar(media);

console.log(media);

if (situacao === "Aprovado") {
  console.log(
     "Parabéns, você foi APROVADO! 🎉"
  );
} else {
  console.log(
    "Reprovado. Não desista, tente novamente! 😕"
  );
}