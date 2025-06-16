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
    hiderContainerEntrarServidor();
    if (inputApelido.innerText === "") return;
  }
  btnEntrarServidor.addEventListener("click", entrarServidor);

  inputApelido.addEventListener("keydown", function (event) {
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
