// JSON embutido com todas as palavras
const dados = {
  "palavras": [
    { "de": "Satt", "pt": "Satisfeito" },
    { "de": "Brot", "pt": "pão" },
    { "de": "das", "pt": "aquele, esse, isto" },
    { "de": "Schnitzel", "pt": "Schnitzel" },
    { "de": "Kasë", "pt": "queijo" },
    { "de": "Salat", "pt": "salada" },
    { "de": "der", "pt": "de, o, ao" },
    { "de": "frish", "pt": "fresco" },
    { "de": "Pizza", "pt": "pizza" },
    { "de": "Wurst", "pt": "salsicha" },
    { "de": "lecker", "pt": "saborosa" },
    { "de": "die", "pt": "os, os quais, as" },
    { "de": "das Restaurant", "pt": "restaurante" },
    { "de": "bilig", "pt": "barato" },
    { "de": "hungrig", "pt": "faminto" },
    { "de": "gut", "pt": "Boa, bons, bom" },
    { "de": "ist", "pt": "está, está situado" },
    { "de": "nett", "pt": "legal" },
    { "de": "Tochter", "pt": "filha" },
    { "de": "Sohn", "pt": "filho" },
    { "de": "Papa", "pt": "papai" },
    { "de": "Bruder", "pt": "irmao" },
    { "de": "das ist", "pt": "esta é" },
    { "de": "Schwester", "pt": "irmã" },
    { "de": "Mama", "pt": "mãe" },
    { "de": "mein", "pt": "meu" },
    { "de": "meine", "pt": "minha" },
    { "de": "freut mich", "pt": "prazer em conhecer" },
    { "de": "und du", "pt": "e você" },
    { "de": "ich", "pt": "eu" },
    { "de": "bin", "pt": "sou" },
    { "de": "tshüss", "pt": "tchau" },
    { "de": "und", "pt": "e" },
    { "de": "kekse", "pt": "biscoito" },
    { "de": "Wasser", "pt": "água" },
    { "de": "danke", "pt": "obrigado" },
    { "de": "mit", "pt": "com" },
    { "de": "Milch", "pt": "leite" },
    { "de": "Zucker", "pt": "açucar" },
    { "de": "hallo", "pt": "oi" },
    { "de": "oder", "pt": "ou" },
    { "de": "bitte", "pt": "por favor" },
    { "de": "Kaffe", "pt": "café" },
    { "de": "Tee", "pt": "chá" },
    { "de": "schön", "pt": "bonito" },
    { "de": "groB", "pt": "grande" },
    { "de": "alt", "pt": "velho, antigo" },
    { "de": "Stadt", "pt": "cidade" }

  ]
};

let qtdeBotoes = 5;
let palavras = dados.palavras;
let ladoEsquerdo = "de";
let ladoDireito = "pt";
let selecionadaEsquerda = null;
let acertos = 0, erros = 0;
let tempoRestante = 60;
let intervalo = null;
let selecionados = [];

function iniciarJogo() {
  acertos = 0;
  erros = 0;
  atualizarPontuacao();
  tempoRestante = parseInt(document.getElementById("tempo").value);
  qtdeBotoes = parseInt(document.getElementById("palavras").value);
  document.getElementById("cronometro").textContent = "Tempo: " + tempoRestante;

  const escolhidas = palavras.sort(() => 0.5 - Math.random()).slice(0, qtdeBotoes);

  const esquerdaDiv = document.getElementById("esquerda");
  const direitaDiv = document.getElementById("direita");
  esquerdaDiv.innerHTML = "";
  direitaDiv.innerHTML = "";

  escolhidas.forEach(p => {
    const btnEsq = document.createElement("button");
    btnEsq.textContent = p[ladoEsquerdo];
    btnEsq.dataset.word = JSON.stringify(p);
    btnEsq.onclick = () => selecionarEsquerda(btnEsq, p);
    esquerdaDiv.appendChild(btnEsq);
  });

  const direitaPalavras = [...escolhidas].sort(() => 0.5 - Math.random());
  direitaPalavras.forEach(p => {
    const btnDir = document.createElement("button");
    btnDir.textContent = p[ladoDireito];
    btnDir.dataset.word = JSON.stringify(p);
    btnDir.onclick = () => selecionarDireita(btnDir, p);
    direitaDiv.appendChild(btnDir);
  });
}

function selecionarEsquerda(botao, palavra) {
  if (!intervalo) iniciarCronometro();
  document.querySelectorAll("#esquerda button").forEach(b => b.style.backgroundColor = "");
  botao.style.backgroundColor = "lightblue";
  selecionadaEsquerda = { botao, palavra };
}

function selecionarDireita(botao, palavra) {
  if (!selecionadaEsquerda) return;

  if (palavra === selecionadaEsquerda.palavra) {
    botao.style.backgroundColor = "lightgreen";
    acertos++;
    //substituirPar(selecionadaEsquerda.botao, botao);
    //embaralharDireita();
    //embaralharEsquerda();
  } else {
    botao.style.backgroundColor = "red";
    erros++;
    //substituirBotao(selecionadaEsquerda.botao, ladoEsquerdo);
    //substituirBotao(botao, ladoDireito);

    //const corretaDireita = [...document.querySelectorAll("#direita button")]
    //  .find(b => JSON.parse(b.dataset.word)[ladoDireito] === selecionadaEsquerda.palavra[ladoDireito]);
    //if (corretaDireita) substituirBotao(corretaDireita, ladoDireito);
    //
    //const correspondenteEsq = [...document.querySelectorAll("#esquerda button")]
    //  .find(b => JSON.parse(b.dataset.word)[ladoEsquerdo] === palavra[ladoEsquerdo]);
    //if (correspondenteEsq) substituirBotao(correspondenteEsq, ladoEsquerdo);
    //
    //embaralharDireita();
    //embaralharEsquerda();
  }
  atualizarPontuacao();
  
  inativarBotao(botao);
  selecionados.push(botao);
  if(selecionados.length == qtdeBotoes)
  {
      substituirTodos();
  }
  //selecionadaEsquerda = null;
}

function inativarBotao(botao){
    botao.disabled = true
}
function ativarBotao(botao){
    botao.disabled = false
}

function substituirTodos(){    
    debugger;
    let esquerda = document.getElementById('esquerda');
    selecionados.forEach(function(b, i)
    {
        ativarBotao(b);    
        substituirPar(esquerda.childNodes[i], b);
    });
    embaralharDireita();
    embaralharEsquerda();
    selecionados = [];
}

// embaralha os botões da direita
function embaralharDireita() {
  const direitaDiv = document.getElementById("direita");
  const botoes = Array.from(direitaDiv.children);
  botoes.sort(() => Math.random() - 0.5);
  direitaDiv.innerHTML = "";
  botoes.forEach(b => direitaDiv.appendChild(b));
}

// embaralha os botões da esquerda
function embaralharEsquerda() {
  const esquerdaDiv = document.getElementById("esquerda");
  const botoes = Array.from(esquerdaDiv.children);
  botoes.sort(() => Math.random() - 0.5);
  esquerdaDiv.innerHTML = "";
  botoes.forEach(b => esquerdaDiv.appendChild(b));
}


function substituirPar(botaoEsq, botaoDir) {
  const nova = escolherNovaPalavra();
  atualizarBotao(botaoEsq, nova, ladoEsquerdo);
  atualizarBotao(botaoDir, nova, ladoDireito);
}

function substituirBotao(botao, lado) {
  const nova = escolherNovaPalavra();
  atualizarBotao(botao, nova, lado);
}

function atualizarBotao(botao, palavra, lado) {
  botao.textContent = palavra[lado];
  botao.dataset.word = JSON.stringify(palavra);
  botao.style.backgroundColor = "";
  botao.onclick = () => {
    if (lado === ladoEsquerdo) {
      selecionarEsquerda(botao, palavra);
    } else {
      selecionarDireita(botao, palavra);
    }
  };
}

// escolhe palavra que não esteja já visível
function escolherNovaPalavra() {
  const visiveis = [
    ...document.querySelectorAll("#esquerda button"),
    ...document.querySelectorAll("#direita button")
  ].map(b => JSON.parse(b.dataset.word).de);
  let candidatos = palavras.filter(p => !visiveis.includes(p.de));
  if (candidatos.length === 0) candidatos = palavras; // fallback
  return candidatos[Math.floor(Math.random() * candidatos.length)];
}

function embaralharDireita() {
  const direitaDiv = document.getElementById("direita");
  const botoes = Array.from(direitaDiv.children);
  botoes.sort(() => Math.random() - 0.5);
  direitaDiv.innerHTML = "";
  botoes.forEach(b => direitaDiv.appendChild(b));
}

function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = `Acertos: ${acertos} | Erros: ${erros}`;
}

function iniciarCronometro() {
  intervalo = setInterval(() => {
    tempoRestante--;
    document.getElementById("cronometro").textContent = "Tempo: " + tempoRestante;
    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      alert("Tempo esgotado! Acertos: " + acertos + " | Erros: " + erros);
    }
  }, 1000);
}

document.getElementById("reset").onclick = () => {
  clearInterval(intervalo);
  intervalo = null;
  iniciarJogo();
};

document.getElementById("inverter").onclick = () => {
  [ladoEsquerdo, ladoDireito] = [ladoDireito, ladoEsquerdo];
  iniciarJogo();
};

iniciarJogo();
