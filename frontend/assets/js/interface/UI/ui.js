    export function appearerContainerQuiz() {
        const InterfaceMeuQuiz = document.querySelector(".quiz-container");
        InterfaceMeuQuiz.classList.remove("hider");
      }
      
      export function hiderContainerModalidades() {
        const InterfaceServidor = document.querySelector(
          ".User-interface-criar-servidor"
        );
        InterfaceServidor.classList.add("hider");
      }
      
      export function appearerContainerloob() {
        const Interfaceloob = document.querySelector(".container-loob");
        Interfaceloob.classList.remove("hider");
      }
      export function hiderContainerQuiz() {
        const InterfaceMeuQuiz = document.querySelector(".quiz-container");
        InterfaceMeuQuiz.classList.add("hider");
      }
      export function appearerQuestoesQuiz() {
      const InterfaceSecaoQuiz = document.querySelector(".sesao-quiz_perguntas");
      InterfaceSecaoQuiz.classList.remove("hider");
    }
    export function hiderQuestoesQuiz() {
        const InterfaceSecaoQuiz = document.querySelector(".sesao-quiz_perguntas");
        InterfaceSecaoQuiz.classList.add("hider");
      }
      export function hiderfeedbackSituacao() {
        const feedbackSituacao = document.querySelector(".feedback-situacao-jogo");
        feedbackSituacao.classList.add("hider");
      }
    
      export function appearerfeedbackSituacao() {
        const feedbackSituacao = document.querySelector(".feedback-situacao-jogo");
        feedbackSituacao.classList.remove("hider");
      }
      export function appearerContainerEntrarServidor() {
        const ContainerEntrarServidor = document.querySelector(".User-Interface");
        ContainerEntrarServidor.classList.remove("hider");
      }
    
      export function hiderContainerloob() {
        const Interfaceloob = document.querySelector(".container-loob");
        Interfaceloob.classList.add("hider");
      }
    
      export function appearerMensagemFimQuiz() {
        const MensagemFimQuiz = document.getElementById("fim-do-quiz");
        MensagemFimQuiz.classList.remove("hider");
      }
      export function hiderMensagemFimQuiz() {
        const MensagemFimQuiz = document.getElementById("fim-do-quiz");
        MensagemFimQuiz.classList.remove("hider");
      }
      export function appearerMensagemjogadorVencedor() {
        const MensagemJogadorvencedor = document.getElementById("fim-jogador-venvedor");
        MensagemJogadorvencedor.classList.remove("hider");
      }

     export function appearerContainerModalidade(){
        const InterfaceServidor = document.querySelector(".User-interface-criar-servidor");
        InterfaceServidor.classList.remove("hider");
    };
    export function hiderContainerModalidade(){
        const InterfaceServidor = document.querySelector(".User-interface-criar-servidor");
        InterfaceServidor.classList.add("hider");
    };
    export function hiderContainerEntrarServidor(){
        const ContainerEntrarServidor = document.querySelector(".User-Interface");
        ContainerEntrarServidor.classList.add("hider")
    };
    export function hiderIconDescricao() {
      const IconDescricao = document.querySelector(".descricao-plataforma");
      IconDescricao.classList.add("hider");
    }
    export function appearerIconDescricao() {
      const IconDescricao = document.querySelector(".descricao-plataforma");
      IconDescricao.classList.remove("hider");
    }
    export function hiderContainerDescricao() {
      const IconDescricao = document.querySelector(".interface-descricao");
      IconDescricao.classList.add("hider");
    }
    export function appearerContainerDescricao() {
      const IconDescricao = document.querySelector(".interface-descricao");
      IconDescricao.classList.remove("hider");
    }
