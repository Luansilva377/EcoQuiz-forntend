import { userInformacoes } from "../informacoesParticipantes/userParticipantes.js";
import { websockat } from "../modalidades/modalidades.js";
import { hiderContainerQuiz,  appearerContainerloob, appearerContainerQuiz , hiderContainerModalidades, hiderfeedbackSituacao, appearerfeedbackSituacao, hiderQuestoesQuiz, appearerContainerEntrarServidor, hiderContainerloob, appearerIconDescricao, appearerQuestoesQuiz, appearerMensagemjogadorVencedor, hiderMensagemFimQuiz} from "../UI/ui.js";


  const ExibirMensagemServidor = document.getElementById("feedback-esperando-jogadores");
  const conometro = document.getElementById("cronometro");


  export const ReceberInformacoesParticipantes = ({ data }) => {
    const dados = JSON.parse(data);
    console.log(dados);

    
    if (dados.tipo === "erro") {
      servidorCheio.innerText = dados.mensagem;
      return;
    }
    hiderContainerModalidades();
    appearerContainerloob();
    
    if (Array.isArray(dados)/* verifica se è um array */) {
      
      processarParticipante(dados);
      interacaoJogadores(dados);
 
      if (dados.length >= 2) {
        appearerContainerQuiz();
        hiderQuestoesQuiz();
        hiderfeedbackSituacao();
        ExibirMensagemServidor.innerText = "";
      }else{
        hiderContainerQuiz();
        appearerfeedbackSituacao();
        hiderQuestoesQuiz();
        ExibirMensagemServidor.innerText = "Esperando Jogadores...";
      }

    }

    if (dados.tipo === 'cronometro') {
      iniciarCronometro(dados.tempo);
    } 



   if (dados.tipo === "fim") {
    conometro.innerText = "";
   FimMensagem(dados)
    userInformacoes.score = 0;
    setTimeout(() => {
      hiderContainerQuiz();
      hiderContainerloob();
      hiderQuestoesQuiz();
      appearerContainerEntrarServidor();
      appearerIconDescricao();
      conometro.innerText = "tempo restante: 0"
      conometro.style.color = "white";
    }, 5000); 
   }
  };
function FimMensagem(dados){
  conometro.style.color = "red";
  conometro.innerText = dados.mensagem;
  if (dados.vencedor) {
    appearerQuestoesQuiz();
    appearerMensagemjogadorVencedor();
    hiderMensagemFimQuiz();
    document.getElementById("jogador-vencedor").innerText = `${dados.vencedor.name} venceu com ${dados.vencedor.score} pontos!`;
  }
}
 function iniciarCronometro(dados) {
      const tempoRestante = dados; // tempo em segundos

      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;

      // Formata com dois dígitos
      const minutosFormatados = String(minutos).padStart(2, '0');
      const segundosFormatados = String(segundos).padStart(2, '0');

      conometro.innerText = `Tempo restante: ${minutosFormatados}:${segundosFormatados}`;
     
    }
  
 function processarParticipante(data) {
    const JogadorLoob = document.querySelector(".jogador-loob");
    JogadorLoob.innerHTML = "";
  
    data.forEach((dados) => {
      const div = document.createElement("div");
      div.classList.add("informacoes-loob");
      div.setAttribute("data-id", dados.id); 

      const pApelido = document.createElement("p");
      pApelido.classList.add("apelido");
      pApelido.innerText = dados.name;
  
      const pPontuacao = document.createElement("p");
      pPontuacao.classList.add("pontuacao");
      pPontuacao.innerText = dados.score;
  
      div.appendChild(pApelido);
      div.appendChild(pPontuacao);
      JogadorLoob.appendChild(div);

      
       // dataset acessa o data do elemento 
      if (div.dataset.id === userInformacoes.id) {
        div.style.border = "2px solid blue";
        div.style.boxShadow = "0px 1.5px 5px blue"
      }
    });
  }





 function interacaoJogadores(informacoesJogadores) {
    const Jogadoresonline = document.querySelectorAll(".informacoes-loob");
  
    Jogadoresonline.forEach((jogadorDiv) => {
      jogadorDiv.addEventListener("click", () => {
        const idJogadorClicado = jogadorDiv.getAttribute("data-id"); //pega o id 
        const jogadorInfo = informacoesJogadores.find(j => j.id === idJogadorClicado);
        if (idJogadorClicado !== userInformacoes.id) {
        if (jogadorInfo && jogadorInfo.score >= 10 && userInformacoes.score >= 5) {
          userInformacoes.score -= 5;
          jogadorInfo.score -= 10; 

          // Enviar a pontuação atualizada para o servidor
          websockat.send(
            JSON.stringify({
              tipo: "atacar",
              atacante: {
                id: userInformacoes.id,
                score: userInformacoes.score,
              },
              alvo: {
                id: jogadorInfo.id,
                score: jogadorInfo.score,
              },
            })
          );
          
        }
      }
      });
    });
  }