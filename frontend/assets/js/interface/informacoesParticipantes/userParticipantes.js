import { websockat } from "../modalidades/modalidades.js";
export const userInformacoes = {
    id:"", 
    name:"",
    score: 0,

    };
 export function ProcessamentoEnvioInformacoesServidor() {
    const inputApelido = document.getElementById("username");
    userInformacoes.name= inputApelido.value;
    userInformacoes.id = crypto.randomUUID();
    websockat.onopen = () => {
    websockat.send(JSON.stringify(userInformacoes));      
    };
    
  }

