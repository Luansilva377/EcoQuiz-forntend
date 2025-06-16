import { InteracaoEnatrarServidor } from "./EntrarServidor/EntrarServidor.js";
import { Modalidades } from "./modalidades/modalidades.js";
import { appearerContainerDescricao, hiderContainerDescricao, hiderIconDescricao, appearerIconDescricao} from "./UI/ui.js";
Modalidades();
InteracaoEnatrarServidor();

const IconDescricao = document.querySelector(".descricao-plataforma");
IconDescricao.addEventListener("click", function(){
    appearerContainerDescricao();
    hiderIconDescricao();
});
const btnVoltarDescricao = document.getElementById("voltar-descricao");
btnVoltarDescricao.addEventListener("click", function(){
    appearerIconDescricao();
    hiderContainerDescricao();
})