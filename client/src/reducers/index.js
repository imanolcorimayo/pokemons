import { FILTER_POKEMONS, GET_DETAILS, GET_POKEMONS, SHOW_POKEMONS } from "../Actions";

const initialState = {
    pokemons: [],
    detailsPkm: [],
    pokemonsShows: [],
};

function rootReducer(state = initialState, action) {

    if (action.type === GET_DETAILS) {
        return {
            ...state,
            pokemons: action.payload
        }
    }
    if (action.type === GET_POKEMONS) {
        return {
            ...state,
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

        //Filtrado por orden alfabetico
        if (action.payload === "alphabetic") {
            let aux = state.pokemons.map((el) => el.name)
            aux.sort()
            var response1 = aux.map((el) => {
                for(var i = 0; i < state.pokemons.length; i++) {
                    if (state.pokemons[i].name === el) return state.pokemons[i]
                }
                return state.pokemons[i].name
            })
            return {
                ...state,
                pokemons: response1
            };

        //Filtrado por fuerza
        } else if(action.payload === "force") {
            let aux = state.pokemons.map((el) => el.force)
            aux.sort((a,b) => {
                return a-b
            })
            var response = aux.map((el) => {
                for(var i = 0; i < state.pokemons.length; i++) {
                    if (state.pokemons[i].force === el) return state.pokemons[i]
                }
                return state.pokemons[i]
            })
            return {
                ...state,
                pokemons: response
            };
        } else if (action.payload === "created") {
            return state

        } else {
            return state
        }
        
    }


    return state;
}

export default rootReducer;