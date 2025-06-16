import { ProcessamentoEnvioInformacoesServidor, ProcessamentoEnvioScoreServidor} from "../informacoesParticipantes/userParticipantes.js";
import { ReceberInformacoesParticipantes} from "../ProcessamentosWebSockete/websockete.js";
import { QuizApi } from "../Quiz/Quiz.js";
import { hiderIconDescricao } from "../UI/ui.js";
export let websockat;

export function Modalidades() {
  const botaoMaisOpcoes = document.getElementById("btn-MaisOpcoes");
  const botaoSustentabilidade = document.getElementById("btn-Sustentabilidade");
  const inputApelido = document.getElementById("username");
  const servidorCheio = document.getElementById("servidor-cheio");
 
  botaoSustentabilidade.addEventListener("click", function () {
    websockat = new WebSocket("wss://ecoquiz-backend2.onrender.com");
    QuizApi(ProcessamentoEnvioScoreServidor);
    ProcessamentoEnvioInformacoesServidor();
    websockat.onmessage = ReceberInformacoesParticipantes; // quando o servidor enviar uma mensagem vai chamer essa função e enviar a mensagem para todos do servidor(o onmessage é só para que consegamos chamar a função)
    // ou seja nós tamos enviando uma mensagem altráves da função "ProcessamentoEnvioInformacoesServidor()" então o servidor recebe e reenvia para a função "EnvairMensagemApelidoUsuario() altaves do data" e fazemos aparecer altraves do " websockat.onmessage = " 
    inputApelido.value = "";
    hiderIconDescricao();
  });
  
  botaoMaisOpcoes.addEventListener("click", function () {
    servidorCheio.innerText = "Opção ainda não disponível!!!";
  });
}