import { ProcessamentoEnvioInformacoesServidor, ProcessamentoEnvioScoreServidor} from "../informacoesParticipantes/userParticipantes.js";
import { ReceberInformacoesParticipantes} from "../ProcessamentosWebSockete/websockete.js";
import { QuizApi } from "../Quiz/Quiz.js";
import { hiderIconDescricao , hiderContainerModalidade, appearermensagemDeConexao, hidermensagemDeConexao} from "../UI/ui.js";
export let websockat;

export function Modalidades() {
  const botaoSustentabilidade = document.getElementById("btn-Sustentabilidade");
  const inputApelido = document.getElementById("username");
 
  botaoSustentabilidade.addEventListener("click", function () {
    websockat = new WebSocket("wss://ecoquiz-backend2.onrender.com");
    QuizApi(ProcessamentoEnvioScoreServidor);
    ProcessamentoEnvioInformacoesServidor();
    websockat.onmessage = ReceberInformacoesParticipantes; // quando o servidor enviar uma mensagem vai chamer essa função e enviar a mensagem para todos do servidor(o onmessage é só para que consegamos chamar a função)
    // ou seja nós tamos enviando uma mensagem altráves da função "ProcessamentoEnvioInformacoesServidor()" então o servidor recebe e reenvia para a função "EnvairMensagemApelidoUsuario() altaves do data" e fazemos aparecer altraves do " websockat.onmessage = " 
    hiderIconDescricao();
    hiderContainerModalidade();
    appearermensagemDeConexao();
    websockat.addEventListener("open", ()=>{
      hidermensagemDeConexao();
    })
    inputApelido.value = "";
  });
}