import { FILTER_POKEMONS, 
    GET_DETAILS, GET_POKEMONS, 
    SHOW_POKEMONS, 
    GET_ONE_POKEMON, 
    TURN_PAGES, 
    GET_TYPES_POKEMONS,
    INCREASE_ID_POKEMON} from "../Actions";

const initialState = {
    pokemons: [],
    detailsPkm: [],
    pokemonsShows: [],
    numberOfPages: 0,
    types: [],
    idPokemon: 1999,
};

function rootReducer(state = initialState, action) {

    if (action.type === GET_DETAILS) {
        return {
            ...state,
            pokemons: action.payload
        }
    }
    if (action.type === GET_POKEMONS) {
        let number = Math.floor((action.payload.length - 9) / 12 + 1)
        let shows = action.payload.slice(0, 9)
        return {
            ...state,
            numberOfPages: number,
            pokemonsShows: shows,
            pokemons: action.payload
        };
    }
    if (action.type === SHOW_POKEMONS) {
        return {
            ...state,
            moviesLoaded: action.payload.Search
        };
    }
    if (action.type === FILTER_POKEMONS) {
        let response
        //Filtrado por orden alfabetico
        if (action.payload === "alphabetic") {
            let aux = state.pokemons.map((el) => el.name)
            aux.sort()
            response = aux.map((el) => {
                for(let i = 0; i < state.pokemons.length; i++) {
                    if (state.pokemons[i].name === el) {
                        let a = state.pokemons[i]
                        state.pokemons.splice(i,1)
                        return a
                    }
                }
                return {}
            })
            //Modifico tambien los mostrados
            let shows = response.slice(0, 9)
            return {
                ...state,
                pokemonsShows: shows,
                pokemons: response
            };

        //Filtrado por fuerza
        } else if(action.payload === "force") {
            let aux = state.pokemons.map((el) => el.force)
            aux.sort((a,b) => {
                return a-b
            })
            response = aux.map((el) => {
                for(let i = 0; i < state.pokemons.length; i++) {
                    if (state.pokemons[i].force === el) {
                        let a = state.pokemons[i]
                        state.pokemons.splice(i,1)
                        return a
                    }
                }
                return {}
            })

            //Modifico tambien los mostrados
            let shows = response.slice(0, 9)
            

            return {
                ...state,
                pokemonsShows: shows,
                pokemons: response
            };
        
        //Filtrado por creados

        } else if (action.payload === "created") {
            let shows = state.pokemons.filter((el) => {
                return (el.id > 1000)
            })
            return {
                ...state,
                pokemonsShows: shows,
            }

        // filtrado por tipos

        } else if (action.payload[0] === "type") {
            let shows = state.pokemons.filter((el) => {
                return el.types.includes(action.payload[1])
            })
            return {
                ...state,
                pokemonsShows: shows,
            }
        } else {
            return state
        }
        
    }
    if (action.type === GET_ONE_POKEMON) {
        let response = state.pokemons.filter((el) => el.name === action.payload)
        return {
            ...state,
            pokemonsShows: response
        }
    }
    if (action.type === TURN_PAGES) {
        let response = state.pokemons.slice(action.payload[0], action.payload[1])
        return {
            ...state,
            pokemonsShows: response
        }
    }
    if (action.type === GET_TYPES_POKEMONS) {
        return {
            ...state,
            types: action.payload
        }
    }
    if (action.type === INCREASE_ID_POKEMON) {
        let aux = state.idPokemon + 1
        return {
            ...state,
            idPokemon: aux
        }
    }




    return state;
}

export default rootReducer;