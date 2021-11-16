import React from 'react'

import styles from './Cards.module.css'

import { connect } from 'react-redux'

function Cards(props) {
    
    return (
        <div className={ styles.divPrincipal }>

            {
                props.pokemons?.map((element, index) => {
                    return (
                        <div key={ index } className={ styles.divCard }>
                            <img src={ element.img } alt="" />
                            <h3>{ element.name }</h3>
                            <p>Description:</p>
                        </div>
                    )
                })
                
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        pokemons: state.pokemonsShows
      };
}

export default connect(
    mapStateToProps,
    null
)(Cards);