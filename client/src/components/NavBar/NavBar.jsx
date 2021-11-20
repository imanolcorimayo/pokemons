import React, { useState } from 'react'

import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

import { getOnePokemon } from '../../Actions'
import { connect } from 'react-redux'

import add from '../../img/page.png'
import home from '../../img/home.png'
import loupe from '../../img/loupe.png'

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
            <Link className={ styles.link } to="/Principal">
                <img className={ styles.img } src={ home } alt="" />
                Home
            </Link>
            <div>
                <input type="text" 
                    name="search" 
                    onChange={ handleInputChange } 
                    value={ search }
                    className={ styles.input }
                    placeholder=" Search pokemon"/>
                <button className={ styles.button } onClick={ searchFunction }>
                    <img src={ loupe } className={ styles.img } alt="" />
                </button>
            </div>
            <Link className={ styles.link } to="/Create"> 
                <img className={ styles.img } src={ add } alt="" />
                Create Pokemon
            </Link>
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

