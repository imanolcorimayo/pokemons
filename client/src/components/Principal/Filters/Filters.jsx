import React, { useEffect } from 'react'

import styles from './Filters.module.css'

import { connect } from 'react-redux'
import { filterPokemons, getTypesPokemons } from '../../../Actions'

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


    return (
        <div className={ styles.divPrincipal }>
            <h4 className={ styles.firsth4 }>Filters:</h4>
                <span id="alphabetic" className={ styles.span } onClick={ filter }>alphabetic</span>
                <span id="force" className={ styles.span } onClick={ filter }>Force</span>
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
        getTypes: () => dispatch(getTypesPokemons())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
