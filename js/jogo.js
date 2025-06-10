// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função auxiliar para remover imagem por ID (se existir)
function removerImagemPorId(id) {
  const img = document.getElementById(id);
  if (img) img.remove();
}

// Função auxiliar para criar imagem e adicionar a uma div
function adicionarImagem(obj, id, src) {
  const img = new Image(100);
  img.id = id;
  img.src = src;
  obj.appendChild(img);
}

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  const idsParaResetar = [0, 1, 2];

  idsParaResetar.forEach(id => {
    const div = document.getElementById(id);
    if (div) div.className = "inicial";
  });

  removerImagemPorId("imagem");
  removerImagemPorId("ruim");
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função chamada quando o jogador erra
function errou(obj) {
  obj.className = "errou";
  adicionarImagem(obj, "ruim", "https://i.pinimg.com/474x/72/9f/98/729f98996d9218e84ec5e4070640d86d.jpg");
}

// Função executada quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  adicionarImagem(obj, "imagem", "https://media.tenor.com/gyuqx70UjmEAAAAe/emoji-feliz-ficando-triste-emoticon-feliz-ficando-triste.png");
}

// Função que sorteia número e verifica se o jogador acertou
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === 4) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }

  const sorteado = Math.floor(Math.random() * 3);

  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    errou(obj);
    acertou(document.getElementById(sorteado));
  }

  atualizaPlacar(acertos, tentativas);
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

/* tipos de igualdades js

= atribuição
== testando se o valor é igual
=== testa se o tipo de variável é igual também, exatamente igual

*/