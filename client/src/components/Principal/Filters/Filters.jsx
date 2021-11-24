import React, { useEffect } from 'react'

import styles from './Filters.module.css'

import { connect } from 'react-redux'
import { filterPokemons, getTypesPokemons, reset } from '../../../Actions'

function Filters(props) {
    
    

    useEffect(() => {
        if (!props.types[0]) {
            async function get(){
                await props.getTypes()
            }
            get()
        }
        
        // console.log(props.types)
        // eslint-disable-next-line
    }, [])

    function filter(el) {
        props.filterPokemons(el.target.id)
    }

    function typeFilter(el) {
        props.filterPokemons(["type", props.types[el.target.id]])
    }

    function reset() {
        props.reset()
    }

    return (
        <div className={ styles.divPrincipal }>
            <h4 className={ styles.firsth4 }>Filters:</h4>
                <span id="alphabeticAsc" className={ styles.span } onClick={ filter }>Asc Alphabetic</span>
                <span id="alphabeticDesc" className={ styles.span } onClick={ filter }>Desc Alphabetic</span>
                <span id="forceAsc" className={ styles.span } onClick={ filter }>Asc Force</span>
                <span id="forceDesc" className={ styles.span } onClick={ filter }>Desc Force</span>
                <span id="created" className={ styles.span } onClick={ filter }>Created</span>
            <h4 className={ styles.h4 }>Types:</h4>
            {
                props.types.map(( el, i ) => {
                    return (
                        <span key={i} 
                        id={ i } 
                        className={ styles.span } 
                        onClick={ typeFilter }>{ el }</span>
                    )
                })
            }
            <span className={ styles.reset } onClick={ reset }>RESET</span>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      pokemons: state.pokemons,
      types: state.types
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        filterPokemons: (arr) => dispatch(filterPokemons(arr)),
        getTypes: () => dispatch(getTypesPokemons()),
        reset: () => dispatch(reset())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
