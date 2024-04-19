const idEl = document.getElementById("pokemon-id");
const nameEl = document.getElementById("pokemon-name");
const imageDiv = document.getElementById("sprite-container");

const typesEl = document.getElementById("types");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEL = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEL = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");
const searchBtn = document.getElementById("search-button");
const inputEl = document.getElementById("search-input");

const getPokemon = async () => {
  try {
    const nameOrId = inputEl.value.toLowerCase();
    let intervalId;
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    );
    const data = await response.json();

    // ADD IMAGE
    imageDiv.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

    // SET TYPES ELEMENT
    typesEl.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join("");

    // RENDER THE DETAILS OF POKEMON
    nameEl.textContent = `${data.name.toUpperCase()}`;
    idEl.textContent = `#${data.id}`;
    weightEl.textContent = `${data.weight}`;
    heightEl.textContent = `${data.height}`;

    // RENDER STATS
    hpEl.textContent = data.stats[0].base_stat;
    attackEl.textContent = data.stats[1].base_stat;
    defenseEL.textContent = data.stats[2].base_stat;
    specialAttackEl.textContent = data.stats[3].base_stat;
    specialDefenseEL.textContent = data.stats[4].base_stat;
    speedEl.textContent = data.stats[5].base_stat;
  } catch (err) {
    resetUi();
    alert("Pokémon not found");
    console.error(err);
  }
};

const resetUi = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // RESET UI
  typesEl.innerHTML = "";
  nameEl.textContent = "";
  idEl.textContent = "";
  heightEl.textContent = "";
  weightEl.textContent = "";
  hpEl.textContent = "";
  attackEl.textContent = "";
  defenseEL.textContent = "";
  specialAttackEl.textContent = "";
  specialDefenseEL.textContent = "";
  speedEl.textContent = "";
};

searchBtn.addEventListener("click", () => {
  getPokemon();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getPokemon();
});
