import React from 'react'

import styles from './Filters.module.css'

import { connect } from 'react-redux'
import { filterPokemons } from '../../../Actions'

function Filters(props) {
    
    function alphabetic(el) {
        props.filterPokemons(el.target.id)
    }
    return (
        <div className={ styles.divPrincipal }>
            <h4 className={ styles.firsth4 }>Filtros:</h4>
                <span id="alphabetic" className={ styles.span } onClick={ alphabetic }>alphabetic</span>
                <span id="force" className={ styles.span } onClick={ alphabetic }>Force</span>
                <span id="created" className={ styles.span } onClick={ alphabetic }>Created</span>
            <h4 className={ styles.h4 }>Tipo:</h4>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      pokemons: state.pokemons
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        filterPokemons: (arr) => dispatch(filterPokemons(arr)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
