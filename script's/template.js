function renderPokemons(pokemon) {
  return `
    <button class="pokemon-card" onclick="showPokemonDetailById(${pokemon.id})">
      <img class="pokemon-sprite" src="${pokemon.sprites.front_default}">
      <p class="pokemonID">N°${pokemon.id}</p>
      <p class="pokemon-name-template">${pokemon.name}</p>
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
<span class="pokemon-ability-list"> <p class="stat-badge">${typeName}</p></span> </div>
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
                    <div class="detail-section-title">Evolution</div>
           </div>
       </div>
               `;
}

function renderPokemonHeader(pokemon) {
  return `
     <img class="pokemon-detail-sprite " src="${pokemon.sprites.front_default}">
                  <p class="pokemon-detail-id ">N°${pokemon.id}</p>
                  <p class="pokemon-name">${pokemon.name}</p>
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
