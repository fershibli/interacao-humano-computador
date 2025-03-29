function initAfterHeaderLoad() {
  const currentPage = window.location.pathname.split("/").pop();
  const pageId = currentPage.replace(".html", "");

  // Remove classe active de todos
  $(".main-nav a").removeClass("active");

  // Adiciona ao link correto
  $(`#nav-${pageId}`).addClass("active");

  // Restante da inicialização
  carregarPokemons();
  carregarDetalhes();
  if ($("#form-pokemon").length) {
    configurarFormulario();
  }
}

// Modifique o event listener para:
$(document).ready(function () {
  // Verifica se é um redirecionamento de cadastro
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cadastro") === "sucesso") {
    alert("Pokémon cadastrado com sucesso!");
    history.replaceState(null, "", "index.html");
  }

  // Se o header já estiver carregado (página recarregada)
  if ($("#header-container").children().length > 0) {
    initAfterHeaderLoad();
  }
});

// Array para armazenar os Pokémons
let pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];

// Função para salvar no localStorage
function salvarPokemons() {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
}

// Função para carregar Pokémons na listagem
function carregarPokemons() {
  const lista = document.getElementById("lista-pokemons");

  // Verifica se estamos na página correta
  if (!lista) return;

  // Limpa o conteúdo atual
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

// Função para carregar detalhes do Pokémon
function carregarDetalhes() {
  // Verifica se estamos na página de detalhes
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

// Função para lidar com o formulário
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

    // Mostra mensagem e redireciona
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

// Inicialização segura
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se é um redirecionamento de cadastro
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cadastro") === "sucesso") {
    alert("Pokémon cadastrado com sucesso!");
    // Remove o parâmetro da URL
    history.replaceState(null, "", "index.html");
  }

  carregarPokemons();
  carregarDetalhes();
  configurarFormulario();
});
