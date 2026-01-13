
let shinyMode = false;
let allPokemons = [];

async function loadSinglePokemon(url) {
  let response = await fetch(url);
  return await response.json();
}

async function init() {
  try {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    );
    let data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
      let pokemonUrl = data.results[i].url;
      let pokemon = await loadSinglePokemon(pokemonUrl);

      let container = document.getElementById(`pokemon`);
      if (!container) continue;

      container.innerHTML += renderPokemons(pokemon);
    }
    const randomId = getRandomId(200);
    await showPokemonDetailById(randomId);
  } catch (error) {
    console.error(error);
  }
}

async function loadPokemonSpecies(id) {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );
  return await response.json();
}

function getDexText(species) {
  for (let i = 0; i < species.flavor_text_entries.length; i++) {
    return species.flavor_text_entries[i].flavor_text.replace(/\f|\n|\r/g, " ");
  }
}

async function showPokemonDetailById(id) {
  const pokemon = await loadSinglePokemon(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  const species = await loadPokemonSpecies(id);
  const dexText = getDexText(species);

  const detail = document.getElementById("detailView");
  if (!detail) return;
  detail.innerHTML = renderPokemonDetail(pokemon, dexText);
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}


async function fetchData() {
  const input = document.getElementById("pokemonName");
  const pokemonName = input.value.trim().toLowerCase();

  if (!pokemonName) return;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!response.ok) {
    document.getElementById("pokemonSprite").innerHTML = "<p>Pokémon nicht gefunden</p>";
    return;
  }

  const pokemon = await response.json();

  document.getElementById("pokemonSprite").innerHTML = renderPokemons(pokemon);
}


function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const icon = document.getElementById("themeIcon");
  if (document.body.classList.contains("dark-mode")) {
    icon.textContent = "☀️";
  } else {
    icon.textContent = "🌙";
  }
}
