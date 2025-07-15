const PORT = 3000;
const { WebSocketServer } = require("ws");

const MaxJogadores = 8;
const wss = new WebSocketServer({ port: PORT });

let tempo = 6 * 60; // 5 minutos (300 segundos)
let jogadores = [];
let intervalo = null;

function iniciarCronometro() {
  if (!intervalo && jogadores.length >= 2) {
    intervalo = setInterval(() => {
      if (tempo <= 0) {
        clearInterval(intervalo);
        intervalo = null;

        // Avisar que o tempo acabou
        const vencedor = jogadores.reduce((maior, atual) =>
          atual.score > maior.score ? atual : maior,
          jogadores[0]
        );
        
        const fimMensagem = JSON.stringify({
          tipo: 'fim',
          mensagem: 'Seu Tempo acabou!',
          jogadores: jogadores, // envia todos, se quiser mostrar placar
          vencedor: {
            name: vencedor.name,
            score: vencedor.score,
            id: vencedor.id
          }
        });
        wss.clients.forEach(client => {
          if (client.readyState === client.OPEN) {
            client.send(fimMensagem);
            client.close();
          }
        });

        jogadores = [];
        tempo = 6 * 60; // Reinicia o tempo para próxima partida
        return;
      }

      tempo--;
      const mensagem = JSON.stringify({ tipo: 'cronometro', tempo });

      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(mensagem);
        }
      });
    }, 1000);
  }
}

wss.on("connection", (ws) => {
  if (jogadores.length >= MaxJogadores) {
    const mensagemRejeicao = JSON.stringify({
      tipo: "erro",
      mensagem: "Limite de jogadores atingido. Tente novamente mais tarde.",
    });
    ws.send(mensagemRejeicao);
    ws.close();
    return;
  }

  let user = null;

  ws.on("message", (data) => {
    const dados = JSON.parse(data.toString()); // O WebSocket no Node.js recebe mensagens como um buffer, então você precisa converter o conteúdo para texto antes de exibir.

    // Atualiza quem está atacando
    if (dados.tipo === "atacar") {
      const atacante = jogadores.find(j => j.id === dados.atacante.id);
      const alvo = jogadores.find(j => j.id === dados.alvo.id);

      if (atacante && alvo) {
        atacante.score = dados.atacante.score;
        alvo.score = dados.alvo.score;
      }

      const listaAtualizada = JSON.stringify(jogadores);
      wss.clients.forEach(cliente => {
        if (cliente.readyState === cliente.OPEN) {
          cliente.send(listaAtualizada);// o servidor replica a mensagem para todos conectados
        }
      });

      return;
    }

    // Atualiza jogador ou adiciona novo
    user = dados;
    const index = jogadores.findIndex(j => j.id === dados.id);
    if (index !== -1) {
      jogadores[index] = {
        id: dados.id,
        name: dados.name,
        score: dados.score,
      };
    } else {
      jogadores.push({
        id: dados.id,
        name: dados.name,
        score: dados.score,
      });
    }

    const listaAtualizada = JSON.stringify(jogadores);
    wss.clients.forEach(cliente => {
      if (cliente.readyState === cliente.OPEN) {
        cliente.send(listaAtualizada);
      }
    });

    iniciarCronometro();
  });

  ws.on("close", () => {
    if (user) {
      jogadores = jogadores.filter(j => j.id !== user.id);
      const listaAtualizada = JSON.stringify(jogadores);

      wss.clients.forEach(cliente => {
        if (cliente.readyState === cliente.OPEN) {
          cliente.send(listaAtualizada);
        }
      });

      // Pausar o cronômetro se menos de 2 jogadores
      if (jogadores.length < 2 && intervalo) {
        clearInterval(intervalo);
        intervalo = null;// pausa o conometro quando tem menos de 2 jogadores
      }
      if (jogadores.length === 0) {
        tempo = 6 * 60;
      }
    }

  });

});
