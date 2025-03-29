function initAfterHeaderLoad() {
  const currentPage = window.location.pathname.split("/").pop();
  const pageId = currentPage.replace(".html", "");

  $(".main-nav a").removeClass("active");

  $(`#nav-${pageId}`).addClass("active");

  carregarPokemons();
  carregarDetalhes();
  if ($("#form-pokemon").length) {
    configurarFormulario();
  }
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cadastro") === "sucesso") {
    alert("Pokémon cadastrado com sucesso!");
    history.replaceState(null, "", "index.html");
  }

  if ($("#header-container").children().length > 0) {
    initAfterHeaderLoad();
  }
});

let pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

function salvarPokemons() {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
}

function carregarPokemons() {
  const lista = document.getElementById("lista-pokemons");

  if (!lista) return;

  lista.innerHTML = "";

  if (pokemons.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.setAttribute("role", "alert");
    mensagem.textContent = "Nenhum Pokémon cadastrado ainda.";
    lista.appendChild(mensagem);
    return;
  }

  pokemons.forEach((pokemon, index) => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.setAttribute("role", "listitem");
    card.innerHTML = `
            <h3>${pokemon.nome}</h3>
            <p>Tipo: ${pokemon.tipo}</p>
            <p>Nível: ${pokemon.nivel}</p>
            <a href="detalhes.html?id=${index}" aria-label="Ver detalhes de ${pokemon.nome}">Ver detalhes</a>
        `;
    lista.appendChild(card);
  });
}

function carregarDetalhes() {
  if (!window.location.pathname.includes("detalhes.html")) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id === null || id >= pokemons.length) {
    window.location.href = "index.html";
    return;
  }

  const pokemon = pokemons[id];

  document.getElementById("pokemon-nome").textContent = pokemon.nome;
  document.getElementById("pokemon-tipo").textContent = pokemon.tipo;
  document.getElementById("pokemon-nivel").textContent = pokemon.nivel;
  document.getElementById("pokemon-hp").textContent = pokemon.hp || "N/A";
  document.getElementById("pokemon-ataque").textContent =
    pokemon.ataque || "N/A";
  document.getElementById("pokemon-defesa").textContent =
    pokemon.defesa || "N/A";
  document.getElementById("pokemon-descricao").textContent =
    pokemon.descricao || "Nenhuma descrição fornecida.";

  if (pokemon.shiny) {
    document.querySelector(".shiny-badge").style.display = "block";
  }
}

function configurarFormulario() {
  $("#form-pokemon").on("submit", function (e) {
    e.preventDefault();

    const novoPokemon = {
      nome: $("#nome").val(),
      tipo: $("#tipo").val(),
      nivel: $("#nivel").val(),
      shiny: $("#shiny").is(":checked"),
      hp: $("#hp").val(),
      ataque: $("#ataque").val(),
      defesa: $("#defesa").val(),
      descricao: $("#descricao").val(),
    };

    pokemons.push(novoPokemon);
    salvarPokemons();

    showSuccessMessage();
  });
}

function showSuccessMessage() {
  const $msg = $(`
      <div class="success-message" role="alert" aria-live="assertive">
          Pokémon cadastrado com sucesso! Redirecionando para a listagem...
      </div>
  `);

  $("body").append($msg);
  $msg.fadeIn(300);

  setTimeout(function () {
    $msg.fadeOut(300, function () {
      $(this).remove();
      window.location.href = "index.html";
    });
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cadastro") === "sucesso") {
    alert("Pokémon cadastrado com sucesso!");
    history.replaceState(null, "", "index.html");
  }

  carregarPokemons();
  carregarDetalhes();
  configurarFormulario();
});
