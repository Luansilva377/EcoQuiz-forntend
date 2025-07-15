import {
  appearerContainerEntrarServidor,
  appearerContainerModalidade,
  hiderContainerEntrarServidor,
  hiderContainerModalidade,
} from "../UI/ui.js";
export function InteracaoEnatrarServidor() {
  const btnEntrarServidor = document.getElementById("Entrar-sevidor");
  const btnRetornar = document.querySelector(".botao-retornar");
  const inputApelido = document.getElementById("username");

  function entrarServidor() {
    appearerContainerModalidade();
    if (inputApelido.value === ""){
      inputApelido.value = "jogador";
    };
      hiderContainerEntrarServidor();
  }
  btnEntrarServidor.addEventListener("click", entrarServidor);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      entrarServidor();
    }
  });

  btnRetornar.addEventListener("click", function () {
    inputApelido.value = "";
    hiderContainerModalidade();
    appearerContainerEntrarServidor();
  });
}
