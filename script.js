// ELEMENTS
const input = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const imageDiv = document.querySelector("#sprite-container");

const typesEl = document.querySelector("#types");
const pokemonNameEl = document.querySelector("#pokemon-name");
const pokemonIdEl = document.querySelector("#pokemon-id");
const weightEl = document.querySelector("#weight");
const heightEl = document.querySelector("#height");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const specialAttackEl = document.querySelector("#special-attack");
const specialDefenceEl = document.querySelector("#special-defense");
const speedEl = document.querySelector("#speed");

//CONFIG VARIABLES
const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// STATE VARIABLES
let range;
let pokemons;
let intervalId;

// -------------------------------------------------
// HELPER FUNCTIONS
async function getjson(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    alert("Pokémon not found");
  }
}

//------------------------------------------------
// iNITIALIZING FUNCTION
async function init() {
  try {
    let data = await getjson(apiUrl);
    range = data.count;
    pokemons = [...data.results];
  } catch (error) {
    alert("Pokémon not found");
  }
}
init();

// ----------------------------------------------
// DATA RENDERING
async function renderPokemonData(pokemon) {
  let { id, name, url } = pokemon;

  // get inner data
  let pokemondata = await getjson(url);
  let { weight, height, types, sprites, stats } = pokemondata;

  // destructuring data
  let statsObj = {};
  for (let stat of stats) statsObj[stat.stat.name] = stat.base_stat;
  types = types.map((type) => type.type.name);
  console.log(sprites);

  // periodically changing images
  if (intervalId) clearInterval(intervalId);
  let imagesArr = Object.values(sprites);
  let currentFrame = 0;
  function changeFrame() {
    imageDiv.innerHTML = `<img id="sprite" src="${imagesArr[currentFrame]}" alt="pokemon image">`;
    currentFrame++;
    if (currentFrame >= imagesArr.length) currentFrame = 0;
  }
  //
  imageDiv.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="pokemon image">`;
  intervalId = setInterval(changeFrame, 500);
  setInterval(() => {
    clearInterval(intervalId);
    imageDiv.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="pokemon image">`;
  }, 15000);

  // other rendering
  pokemonNameEl.textContent = name.toLowerCase();
  pokemonIdEl.textContent = id;
  weightEl.textContent = weight;
  heightEl.textContent = height;
  hpEl.textContent = statsObj.hp;
  attackEl.textContent = statsObj.attack;
  defenseEl.textContent = statsObj.defense;
  specialDefenceEl.textContent = statsObj["special-defense"];
  specialAttackEl.textContent = statsObj["special-attack"];
  speedEl.textContent = statsObj.speed;
  typesEl.innerHTML = types
    .map((type) => `<span class="type">${type}</span>`)
    .join("");
}

// RESETTING UI
const resetUi = () => {
  // const sprite = document.getElementById("sprite");
  // if (sprite) sprite.remove();

  // RESET UI
  imageDiv.innerHTML = `<img src="./assets/poke-ball.png" alt="" class="pokemon-ball" />`;
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

// ---------------------------------------
// CORE LOGIC
function handleSearch() {
  let searchVal = input.value;
  let pokemon;

  // invalid inputs
  if (!searchVal) alert("Enter a valid id or name of the pokemon");
  if (Number(searchVal) < 1 || Number(searchVal) > range)
    alert(`Enret the id starting from 1 to ${range}`);

  // if id was given as input
  if (Number(searchVal)) {
    searchVal = Math.floor(searchVal);
    pokemon = pokemons[Number(searchVal - 1)];
  } else {
    // if name was given as input
    searchVal = searchVal.toLowerCase();
    pokemon = pokemons.find((pokemon) => pokemon.name === searchVal);
    if (!pokemon) {
      alert("Pokémon not found");
      resetUi();
      return;
    }
  }
  renderPokemonData(pokemon);
}

// EVENTLISTENERS
searchBtn.addEventListener("click", handleSearch);
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
