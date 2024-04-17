// ELEMENTS
const input = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const imageDiv = document.querySelector(".image");

//CONFIG VARIABLES
// const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
// "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu"

// State variables
let range;
let pokemons;
// when data not contains the input sarch alert with "Pokémon not found"

async function getjson(url) {
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

async function init() {
  let data = await getjson(
    "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
  );
  range = data.count;
  pokemons = [...data.results];
}
init();

// async function getpokemon(pokemonUrl) {
//   let data = await getjson(pokemonUrl);
//   console.log(data);
// }

async function renderPokimon(pokemon) {
  let { id, name, url } = pokemon;
  console.log(id, name, url);

  let pokemondata = await getjson(url);
  let { weight, height, types, sprites, stats } = pokemondata;

  // extracting data as array
  stats = stats.map((stat) => [stat.stat.name, stat.base_stat]);
  types = types.map((type) => type.type.name);
  console.log(pokemondata);
  console.log(`${id}
  ${name}
  ${weight}
  ${height}
`);
  console.log(stats, types);
  console.log(sprites);

  imageDiv.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="pokemon image">`;
}

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
      return;
    }
  }

  console.log(searchVal);
  console.log(pokemon);

  renderPokimon(pokemon);
}

// EVENTLISTENERS
searchBtn.addEventListener("click", handleSearch);
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
