import React from 'react'

import styles from './Cards.module.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import height from '../../../img/height.png'
import weight from '../../../img/weight-scale.png'
import comprobado from '../../../img/comprobado.png'
import interrogacion from '../../../img/interrogacion.png'

function Cards(props) {
    
    return (
        <div className={ styles.divPrincipal }>

            {
                props.pokemons?.map((element, index) => {
                    return (
                        <Link className={ styles.link } to={"/Details/pokemons/" + element.id}>
                            <div key={ index } className={ styles.divCard }>
                                { 
                                    element.img ? (<img className={ styles.img } src={ element.img } alt="" />):
                                    (<img className={ styles.img } src={ interrogacion } alt="Not found" />)
                                } 
                                <div className={ styles.divTexto }>
                                    <h3 className={ styles.h3 }>{ element.name }</h3>
                                    <p className={ styles.p }>Types </p> 
                                    {
                                        element.types?.map(el => {
                                            return (<>
                                                <span key={ el + props.pokemons.length } className={ styles.detalles + " " + styles.span }>
                                                    <img src={ comprobado } className={ styles.imgTypes } alt="" />
                                                    { el } 
                                                </span>
                                            </>)
                                        })
                                    }
                                    <span className={ styles.height }>
                                        <img src={height} className={ styles.imgDetails } alt="" />
                                            height: { element.height } 
                                    </span>
                                    <span className={ styles.weight  }>
                                        <img src={weight} className={ styles.imgDetails } alt="" />
                                        weight: { element.weight } 
                                    </span>
                                </div>
                            </div>
                        </Link>
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