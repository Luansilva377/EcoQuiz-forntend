import { hiderContainerQuiz, appearerMensagemFimQuiz, appearerQuestoesQuiz} from "../UI/ui.js";

// quiz.js
export function QuizApi(ProcessamentoEnvioScoreServidor) {
  const feedback = document.getElementById("feedback");
  const feedbackCorreto = document.getElementById("feedback-resposta-correta");
    let pontuacao = 0;
    let perguntas = [];
    let botoesOpcoes = [];
    let perguntaAtual = 0;
    const Questoes = document.getElementById("pergunta");
  
    async function carregarPerguntas() {
      try {
        const response = await fetch(
          "./assets/js/interface/config/data.json"
        );
        const data = await response.json();
        perguntas = embaralharArray(data.questions);
        carregarPergunta();
      } catch (error) {
        Questoes.textContent = "Erro ao carregar perguntas!";
        console.error("Erro ao carregar JSON:", error);
      }
    }

    function embaralharArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
  
    function carregarPergunta() {
      if (perguntaAtual >= perguntas.length) {
        hiderContainerQuiz();
        appearerMensagemFimQuiz();
        appearerQuestoesQuiz();
        return;
      }
  
      const pergunta = perguntas[perguntaAtual];
      Questoes.textContent = pergunta.question;
  
      const opcoesContainer = document.getElementById("opcoes");
      opcoesContainer.innerHTML = "";
  
      botoesOpcoes = []; // limpa os botões anteriores
pergunta.options.forEach((opcao) => {
  const botao = document.createElement("button");
  botao.textContent = opcao;
  botao.onclick = () => verificarResposta(opcao, pergunta.answer);
  botoesOpcoes.push(botao); // guarda o botão
  opcoesContainer.appendChild(botao);
});

      feedback.textContent = "";
      feedbackCorreto.textContent = "";
    }
  
    function verificarResposta(respostaSelecionada, respostaCorreta) {
      // Desabilita todos os botões para evitar múltiplos cliques
      botoesOpcoes.forEach(botao => botao.disabled = true);
    
      if (respostaSelecionada === respostaCorreta) {
        feedback.textContent = "Correto!";
        feedback.style.color = "green";
        pontuacao += 10;
        ProcessamentoEnvioScoreServidor(pontuacao);
      } else {
        feedback.textContent = "Errado!";
        feedback.style.color = "red";
        feedbackCorreto.innerText = respostaCorreta;
      }
    
      setTimeout(() => {
        perguntaAtual++;
        carregarPergunta();
      }, 2000);
    }
    
  
    carregarPerguntas();
  }
  