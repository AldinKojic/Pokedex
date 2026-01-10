let bakset = [];

async function fetchData() {
  try {
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonName2 = document.getElementById("pokeName");
    if (!response.ok) throw new Error("geht nicht");

    let data = await response.json();
    const pokemonSprite = data.sprites.front_shiny;
    const imgElement = document.getElementById("pokemonSprite");
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

    const test2 = data.name;
    const test4 = data.stats;
    console.log(test2);

    templateStats(test2, test4);
  } catch (error) {
    console.error(error);
  }
}

function templateStats(name, stats) {
  document.getElementById("pokeStats").innerHTML = `<p>${name}</p>`;

  for (let index = 0; index < stats.length; index++) {
    const statDiv = document.getElementById(`stat-${index}`);

    const statName = stats[index].stat.name;
    const baseStat = stats[index].base_stat;

    statDiv.innerHTML = `
      <p>${statName}: ${baseStat}</p>
    `;
  }
}

async function loadSinglePokemon(url) {
  let response = await fetch(url);
  return await response.json();
}

async function init() {
  try {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );

    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      let pokemonUrl = data.results[i].url;
      let pokemon = await loadSinglePokemon(pokemonUrl);

      let container = document.getElementById(`pokemon`);
      if (!container) continue;

      container.innerHTML += renderPokemons(pokemon);
    }
  } catch (error) {
    console.error(error);
  }
}

function pokemonTypes(pokemon) {
  let html = "";

  for (let i = 0; i < pokemon.types.length; i++) {
    let typeName = pokemon.types[i].type.name;

    html += ` <div class="types-row">
<span class="btec type-${typeName}">${typeName}</span> </div>`;
  }

  return html;
}

function renderPokemons(pokemon) {
  return `
              <div >
                     <div class="pokemon-card">
                  <img class="pokemon-sprite" src="${
                    pokemon.sprites.front_shiny
                  }">
                  <p class="pokemonID">N°${pokemon.id}</p>
                  <p>${pokemon.name}</p>
                   <div class="types-row">
                 <p>${pokemonTypes(pokemon)}</p>
                      </div>
                 </div>
                </div>
               `;
}

function addToBasket(pokemon) {
  const render = pokemon[pokemon];
  render.push;
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
init2();
async function init2() {
  try {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1&offset=0"
    );

    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      let pokemonUrl = data.results[i].url;
      let pokemon = await loadSinglePokemon(pokemonUrl);
      let species = await loadPokemonSpecies(pokemon.id);
      let dexText = getDexText(species);
      let container = document.getElementById(`pokemonTest`);
      if (!container) continue;

      container.innerHTML += renderPokemons2(pokemon, dexText);
    }
  } catch (error) {
    console.error(error);
  }
}

function renderPokemons2(pokemon, dexText) {
  return `
              <div >
                     <div class="pokemon-card2">
                  <img class="pokemon-sprite2" src="${
                    pokemon.sprites.front_shiny
                  }">
                  <p class="pokemonID2">N°${pokemon.id}</p>
                  <p>${pokemon.name}</p>
                   <div class="types-row2">
                        <p>${pokemonTypes(pokemon)}</p>
                      </div>
                         <p class="pokedex-entry">${dexText}</p>
                       <div class="height-weight">
                              <p>Height</p>
                          <p>Weight</p>
                      </div>
                       <div class="height-weight">
                      <p>${pokemon.height}</p>
                       <p>${pokemon.weight}</p>
                      </div>

                     <div class="Abilities">Abilities   </div>
               <div class="abili">
                      <p>${pokemonAbilities(pokemon)}</p>
                     
                      </div>
                      <div class="Abilities">Stats   </div>
                      <div class="abili-wrapper"
                      <p>HP</p>

                        <p>ATK</p>

                          <p>DEF</p>

                            <p>SpA</p>

                              <p>SpD</p>

                                <p>SPD</p>

                                  <p>TOT</p>

                                  </div>
<div class="Abilities">Evolution   </div>
                 </div>
                </div>
               `;
}

function pokemonAbilities(pokemon) {
  let html = "";

  for (let i = 0; i < pokemon.abilities.length; i++) {
    let typeName = pokemon.abilities[i].ability.name;

    html += ` <div class="types-row">
<span class="abili ${typeName}">${typeName}</span> </div>`;
  }

  return html;
}
