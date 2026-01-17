function renderPokemons(pokemon) {
  let imgSrc = showNormalSprites
    ? pokemon.sprites.front_default
    : pokemon.sprites.other["official-artwork"].front_default;

  return `
    <button class="pokemon-card" onclick="showPokemonDetailById(${pokemon.id})">
      <img class="pokemon-sprite"  id="sprite-${pokemon.id}" src="${imgSrc}">
      <p class="pokemonID">N°${pokemon.id}</p>
      <p class="pokemon-name-template">${capitalizeFirstLetter(pokemon.name)}</p>
      <div class="types-row">
        ${pokemonTypes(pokemon)}
      </div>
    </button>
  `;
}

function pokemonTypes(pokemon) {
  let html = "";

  for (let i = 0; i < pokemon.types.length; i++) {
    let typeName = pokemon.types[i].type.name;

    html += ` <div class="types-row">
                    <span class="btec-header btec type-${typeName}">${typeName}</span>
                        </div>`;
  }

  return html;
}
function pokemonAbilities(pokemon) {
  let html = "";

  for (let i = 0; i < pokemon.abilities.length; i++) {
    let typeName = pokemon.abilities[i].ability.name;

    if (i == 2) {
      break;
    }
    html += ` <div class="types-row">
<span class="pokemon-ability-list"> <p class="stat-badge">${capitalizeFirstLetter(typeName)}</p></span> </div>
`;
  }

  return html;
}

function pokemonStats(pokemon) {
  let html = "";
  const statLabels = ["HP", "ATK", "DEF", "SpA", "SpD", "SPD"];
  for (let i = 0; i < pokemon.stats.length; i++) {
    const label = statLabels[i];
    const base = pokemon.stats[i].base_stat;
    html += `
    <div class="stats-wrapper">
      <div class="stat-row">  
    <span class="stat-name">${label}</span>
        <span class="stat-value">${base}</span>
      </div>
      </div>
    `;
  }
  return html;
}

function renderPokemonDetail(pokemon, dexText) {

  return `
     <div >
         <div  tabindex="1" class="pokemon-detail-card">
                                 ${renderPokemonHeader(pokemon)}
                   <div class="pokemon-type-list">
                                 ${pokemonTypes(pokemon)}
                   </div>
                                 ${renderPokemonProfile(pokemon, dexText)}
                                 ${renderPokemonCombatStats(pokemon)}
                    <div class="detail-section-title">Pokémon Sound</div>
                    <audio id="pokemonAudio" controls></audio>

           </div>
       </div>
               `;
           
}

function renderPokemonHeader(pokemon) {
    let imgSrc = showNormalSprites
    ? pokemon.sprites.front_default
    : pokemon.sprites.other["official-artwork"].front_default;

  return `
  <div class="sprite-center">
    <img
      class="pokemon-detail-sprite pixelated "
    
      id="detailSprite"
      src="${imgSrc}"
      data-artwork="${pokemon.sprites.other["official-artwork"].front_default}"
      data-normal="${pokemon.sprites.front_default}"
      data-shiny="${pokemon.sprites.front_shiny}"
    >
    <p class="pokemon-detail-id">N°${pokemon.id}</p>
    <p class="pokemon-name">${capitalizeFirstLetter(pokemon.name)}</p>
    </div>
  `;
}


function renderPokemonProfile(pokemon, dexText) {
  return `
       <p class="pokedex-entry">${dexText}</p>
                       <div class="height-weight-title">
                              <p>Height</p>
                          <p>Weight</p>
                      </div>
                       <div class="height-weight">
                      <p class="stat-badge">${pokemon.height}</p>
                       <p class="stat-badge"> ${pokemon.weight}kg</p>
                      </div>
    `;
}

function renderPokemonCombatStats(pokemon) {
  return `
       <div class="detail-section-title">Abilities   </div>
               <div class="pokemon-ability-list">
                      <p>${pokemonAbilities(pokemon)}</p>               
                      </div>
                        <p class="detail-section-stats">Stats</p>
                      <div class="stats-wrapper">
                                ${pokemonStats(pokemon)}
                        </div>
   
    `;
}


function toggleAllSprites() {
  showNormalSprites = !showNormalSprites;

  renderAllPokemons();

  const detailImg = document.getElementById("detailSprite");
  if (!detailImg) return;

 
  detailImg.src = showNormalSprites
    ? detailImg.dataset.normal
    : detailImg.dataset.artwork;

 
  if (showNormalSprites) {
    detailImg.classList.add("pixelated");
  } else {
    detailImg.classList.remove("pixelated");
  }
}

function toggleShiny() {
  showNormalSprites = !showNormalSprites;

  renderAllPokemons();

  const detailImg = document.getElementById("detailSprite");
  if (!detailImg) return;
  detailImg.src = showNormalSprites
    ? detailImg.dataset.artwork
    : detailImg.dataset.shiny;


}
function renderAllPokemons() {
  let container = document.getElementById("pokemon");
  container.innerHTML = "";

  for (let i = 0; i < allPokemons.length; i++) {
    container.innerHTML += renderPokemons(allPokemons[i], i);
  }
}
function prepareAudioByPokemon(pokemon) {
  const audio = document.getElementById("pokemonAudio");
  const detailSprite = document.getElementById("detailSprite");

  
  const listSprite = document.getElementById(`sprite-${pokemon.id}`);

  if (!audio || !detailSprite) return;
  if (!pokemon?.cries?.latest) return;

  audio.src = pokemon.cries.latest;
  audio.volume = 0.1;

  audio.onplay = () => {
    detailSprite.classList.add("shake");
    if (listSprite) listSprite.classList.add("shake");  
  };

  audio.onpause = () => {
    detailSprite.classList.remove("shake");
    if (listSprite) listSprite.classList.remove("shake");
  };

  audio.onended = () => {
    detailSprite.classList.remove("shake");
    if (listSprite) listSprite.classList.remove("shake");
  };
}
