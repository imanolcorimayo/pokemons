import React, { useEffect } from 'react'

import styles from './Presentation.module.css'
import { connect } from 'react-redux'
import { getPokemons, getTypesPokemons } from '../../Actions'

import { Link } from 'react-router-dom'

function Presentation(props) {

    useEffect(() => {
        props.getPokemons()
        props.getTypes()
    })

    return (

        <div>
            <div className={ styles.div1 }></div>
            <div className={ styles.divPrincipal }>
                <h2 className={ styles.h2 }>Bienvenidos a la app de Pokemons!</h2>
                <p className={ styles.p }>aquí encontrarás algunos de tus pokemons favoritos</p>
                <Link className={ styles.link } to="/Principal">
                    <button className={ styles.button }>
                        Quiero ver!
                    </button>
                </Link>
            </div>
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
        getPokemons: () => dispatch(getPokemons()),
        getTypes: () => dispatch(getTypesPokemons())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation);
