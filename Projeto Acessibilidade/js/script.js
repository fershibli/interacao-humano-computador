// Array para armazenar os Pokémons
let pokemons = [];

// Função para carregar Pokémons
function carregarPokemons() {
  const lista = document.getElementById("lista-pokemons");

  if (pokemons.length === 0) {
    lista.innerHTML = '<p role="alert">Nenhum Pokémon cadastrado ainda.</p>';
    return;
  }

  lista.innerHTML = "";

  pokemons.forEach((pokemon, index) => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.setAttribute("role", "listitem");
    card.innerHTML = `
            <h3>${pokemon.nome}</h3>
            <p>Nível: ${pokemon.nivel}</p>
            <a href="detalhes.html?id=${index}" aria-label="Ver detalhes de ${pokemon.nome}">Ver detalhes</a>
        `;
    lista.appendChild(card);
  });
}

// Carrega os Pokémons quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarPokemons);
