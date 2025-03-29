document.addEventListener("DOMContentLoaded", function () {
  function applyColorMode(mode) {
    document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
    if (mode !== "reset") {
      document.body.classList.add(mode);
    }
    announceToScreenReader(
      mode === "reset"
        ? "Cores resetadas para o padrão"
        : `Modo ${mode} ativado`
    );
  }

  function announceToScreenReader(message) {
    const liveRegion =
      document.getElementById("live-region") || createLiveRegion();
    liveRegion.textContent = message;
    setTimeout(() => (liveRegion.textContent = ""), 1000);
  }

  function createLiveRegion() {
    const liveRegion = document.createElement("div");
    liveRegion.id = "live-region";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.style.position = "absolute";
    liveRegion.style.overflow = "hidden";
    liveRegion.style.clip = "rect(0 0 0 0)";
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#btn-daltonismo")) {
      const dropdown = document.querySelector(".dropdown-menu");
      const isExpanded = dropdown.style.display === "block";
      dropdown.style.display = isExpanded ? "none" : "block";
      e.target.setAttribute("aria-expanded", String(!isExpanded));
    }

    if (e.target.closest(".dropdown-menu button")) {
      const mode = e.target.dataset.mode;
      applyColorMode(mode);
      document.querySelector(".dropdown-menu").style.display = "none";
      document
        .getElementById("btn-daltonismo")
        .setAttribute("aria-expanded", "false");
    }
  });

  const btnLeitor = document.getElementById("btn-leitor");
  if (btnLeitor) {
    btnLeitor.addEventListener("click", function () {
      if ("speechSynthesis" in window) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();

        utterance.text = document.querySelector("main").textContent;
        utterance.lang = "pt-BR";

        synthesis.cancel();
        synthesis.speak(utterance);

        this.classList.toggle("active");
        this.setAttribute(
          "aria-label",
          this.classList.contains("active")
            ? "Desativar leitor de voz"
            : "Ativar leitor de voz"
        );
      } else {
        alert("Leitor de voz não suportado neste navegador.");
      }
    });
  }
});
