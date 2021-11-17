// const prueba = {
//     pokemons: [],
//     detailsPkm: [],
//     pokemonsShows: [],
// }

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_DETAILS = "GET_DETAILS"
export const SHOW_POKEMONS = "SHOW_POKEMONS"
export const FILTER_POKEMONS = "FILTER_POKEMONS"
export const GET_ONE_POKEMON = "GET_ONE_POLEMON"
export const TURN_PAGES = "TURN_PAGES"
export const GET_TYPES_POKEMONS = "GET_TYPES_POKEMONS"
export const INCREASE_ID_POKEMON = "INCREASE_ID_POKEMON"






// Obtener pokemons de API

export function getPokemons() {
  return function(dispatch) {
    return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_POKEMONS, payload: json });
      }).catch(err => console.log(err));
  };
}

//Obtener tipos de pokemons

export function getTypesPokemons() {
  return function(dispatch) {
    return fetch('http://localhost:3001/types')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_TYPES_POKEMONS, payload: json });
      }).catch(err => console.log(err));
  };
}

// Mostrar ciertos pokemons

export function showPokemons(payload) {
    return { type: SHOW_POKEMONS, payload}
}

// Añadir a favoritos

export function turnPages(payload) {
    return { type: TURN_PAGES, payload };
}


// Eliminar de favoritos

export function filterPokemons(payload) {
    return { type: FILTER_POKEMONS, payload };
}

// payload: Objeto con detalles de la pelicula seleccionada

export function getOnePokemon(payload) {
  return { type: GET_ONE_POKEMON, payload };
}

export function increaseIdPokemon(payload) {
  return { type: INCREASE_ID_POKEMON, payload };
}

