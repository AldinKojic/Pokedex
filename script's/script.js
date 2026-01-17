
let shinyMode = false;
  
let pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
let pokemonList = [];
let allPokemons=[];
let showNormalSprites = false;




async function loadSinglePokemon(url) {
  let response = await fetch(url);
  return await response.json();
}

async function init() {
  try {
    let response = await fetch(pokemonListUrl);
    let data = await response.json();
    pokemonListUrl = data.next;
      for (let i = 0; i < data.results.length; i++) {
        pokemonList.push(data.results[i]);
     } 

     
     
       for (let i = 0; i < data.results.length; i++) {
     let pokemonUrl = data.results[i].url;
     let pokemon = await loadSinglePokemon(pokemonUrl);
 allPokemons.push(pokemon);
 console.log(pokemon);
     let container = document.getElementById(`pokemon`);
      if (!container) continue;

   container.innerHTML += renderPokemons(pokemon, i);

    }
    const randomId = getRandomId(200);
    await showPokemonDetailById(randomId);


  } catch (error) {
    console.error(error);
  }
}

 async function loadSinglePokemon2(){
   for(pokemonIndex=0; pokemonIndex < pokemonList.length;pokemonIndex++ ){
  let singlePokemon = await fetch(pokemonList[pokemonIndex].url);
  let singlePokeonAsJson = await singlePokemon.json();
  allPokemons.push(singlePokeonAsJson)
   }
}




 async function loadPokemonSpecies(id) {
   let response = await fetch(
     `https://pokeapi.co/api/v2/pokemon-species/${id}/`
);
   return await response.json();
 }

// async function loadPokemonChain(url) {
//   let res = await fetch(url);
//   return await response.json();

// }

async function pokemonEvoChain() {
  const chain = await loadPokemonChain(id);
  for (let i = 0; i < chain.id.length; i++) {
    const chainID = chain
  }

}
function getDexText(species) {
  for (let i = 0; i < species.flavor_text_entries.length; i++) {
    let entry = species.flavor_text_entries[i];

    if (entry.language.name === "en") {
      return entry.flavor_text.replace(/\f|\n|\r/g, " ");
    }
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
  prepareAudioByPokemon(pokemon);
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


function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
