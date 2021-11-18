import React, { useState } from 'react'

import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

import { getOnePokemon } from '../../Actions'
import { connect } from 'react-redux'

function NavBar(props) {
    const [search, setsearch] = useState("")

    function handleInputChange(e) {
        setsearch(e.target.value);
    }

    function searchFunction() {
        props.getOne(search)
    }

    return (
        <div className={ styles.divPrincipal }>
            <Link className={ styles.link } to="/Principal">Principal</Link>
            <input type="text" 
                name="search" 
                onChange={ handleInputChange } 
                value={ search }
                className={ styles.input } />
            <button className={ styles.button } onClick={ searchFunction }>Buscar Pokemon!</button>
            <Link className={ styles.link } to="/Create">Crear Pokemon</Link>
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
        getOne: (name) => dispatch(getOnePokemon(name)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);

