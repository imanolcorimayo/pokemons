// const prueba = {
//     pokemons: [],
//     detailsPkm: [],
//     pokemonsShows: [],
// }

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_DETAILS = "GET_DETAILS"
export const SHOW_POKEMONS = "SHOW_POKEMONS"
export const FILTER_POKEMONS = "FILTER_POKEMONS"
// export const GET_POKEMONS = "GET_POKEMONS"
// export const GET_POKEMONS = "GET_POKEMONS"






// https://www.omdbapi.com/?i=tt3896198&apikey=e8966be6&t=Harry

export function getPokemons() {
    return function(dispatch) {
      return fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_POKEMONS, payload: json });
        }).catch(err => console.log(err));
    };
  }

// Mostrar ciertos pokemons

export function showPokemons(payload) {
    return { type: SHOW_POKEMONS, payload}
}

// Añadir a favoritos

export function addMovieFavorite(payload) {
    return { type: "ADD_MOVIE_FAVORITE", payload };
}


// Eliminar de favoritos

export function filterPokemons(payload) {
    return { type: FILTER_POKEMONS, payload };
}

// payload: Objeto con detalles de la pelicula seleccionada

export function getMovieDetail(payload) {
    return { type: "GET_MOVIE_DETAIL", payload };
}