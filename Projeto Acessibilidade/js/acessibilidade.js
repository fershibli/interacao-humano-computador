document.addEventListener("DOMContentLoaded", function () {
  // Leitor de Voz
  const btnLeitor = document.getElementById("btn-leitor");

  if (btnLeitor) {
    btnLeitor.addEventListener("click", function () {
      if ("speechSynthesis" in window) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        // Configurações da voz
        utterance.text = document.querySelector("main").textContent;
        utterance.lang = "pt-BR";
        utterance.rate = 1.0;

        // Para qualquer fala em andamento antes de começar
        synthesis.cancel();
        synthesis.speak(utterance);

        // Feedback visual
        btnLeitor.classList.toggle("active");
        if (btnLeitor.classList.contains("active")) {
          btnLeitor.setAttribute("aria-label", "Desativar leitor de voz");
        } else {
          synthesis.cancel();
          btnLeitor.setAttribute("aria-label", "Ativar leitor de voz");
        }
      } else {
        alert("Leitor de voz não suportado neste navegador.");
      }
    });
  }

  // Modos de Daltonismo
  const btnDaltonismo = document.getElementById("btn-daltonismo");

  if (btnDaltonismo) {
    const dropdown = document.querySelector(".dropdown-menu");

    dropdown.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", function () {
        const mode = this.getAttribute("data-mode");
        document.body.className = mode;

        // Atualiza estado do dropdown
        btnDaltonismo.setAttribute("aria-expanded", "false");
        dropdown.style.display = "none";

        // Feedback para usuários de leitor de tela
        const feedback = document.createElement("div");
        feedback.setAttribute("aria-live", "polite");
        feedback.style.position = "absolute";
        feedback.style.overflow = "hidden";
        feedback.style.clip = "rect(0 0 0 0)";
        feedback.style.height = "1px";
        feedback.style.width = "1px";
        feedback.style.margin = "-1px";
        feedback.style.padding = "0";
        feedback.style.border = "0";

        let message = "";
        if (mode === "reset") {
          message = "Cores resetadas para o padrão.";
        } else {
          message = `Modo de daltonismo ${mode} ativado.`;
        }

        feedback.textContent = message;
        document.body.appendChild(feedback);
        setTimeout(() => document.body.removeChild(feedback), 1000);
      });
    });
  }
});
