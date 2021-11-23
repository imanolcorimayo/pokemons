import React, { useEffect, useState } from 'react'

import styles from './Details.module.css'

import NavBar from '../NavBar/NavBar'
import { connect } from 'react-redux'
import { useParams } from 'react-router'

import interrogacion from '../../img/interrogacion.png'
import weight from '../../img/weight-scale.png'
import height from '../../img/height.png'

function Details(props) {
    let { idpkm } = useParams();
    const [pokemon, setstate] = useState([])
    
    useEffect(() => {
        setstate(props.pokemons.filter(el => {
            const { id } = el
            return id === parseInt(idpkm)
        }))
        // eslint-disable-next-line
    }, [])

    return (
        <div className={ styles.divPrincipal }>
            <NavBar></NavBar>
            <div className={ styles.divContenedor }>
                <h1 className={ styles.h1 }>{ pokemon[0]?.name }</h1>
                <span className={ styles.spanStats }> Stats </span>
                <div className={ styles.divImagen }>
                    {
                        pokemon[0]?.img ? (
                            <img className={ styles.img } src={ pokemon[0]?.img } alt="" />
                        ) : (
                            <img className={ styles.img } src={ interrogacion } alt="Not found" />
                        )
                    }
                </div>
                <div className={ styles.divData }>
                    <div class="progress">
                        <p className={ styles.p }>Lives: </p>
                        <progress id="lives" max="100" value={ pokemon[0]?.lives }></progress>
                        <span className={ styles.span }> { pokemon[0]?.lives } </span>
                    </div>
                    <div class="clear"></div>
                    <div class="progress">
                        <p className={ styles.p }>Defense: </p>
                        <progress id="defense" max="100" value={ pokemon[0]?.defense }></progress>
                        <span className={ styles.span }> { pokemon[0]?.defense } </span>
                    </div>

                    <div class="progress">
                        <p className={ styles.p }>Speed: </p>
                        <progress id="python" max="100" value={ pokemon[0]?.speed }></progress>
                        <span className={ styles.span }>{ pokemon[0]?.speed }</span>
                    </div>
                    <div class="clear"></div>

                    <div class="progress">
                        <p className={ styles.p }>Force: </p>
                        <progress id="javascript" max="100" value={ pokemon[0]?.force }></progress>
                        <span className={styles.span}>{pokemon[0]?.force}</span>
                    </div>

                    <span className={styles.height}>
                        <img src={ height } className={styles.imgDetails} alt="" />
                        height: { pokemon[0]?.height }
                    </span>
                    <span className={styles.weight}>
                        <img src={ weight } className={styles.imgDetails} alt="" />
                        weight: { pokemon[0]?.weight }
                    </span>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
    }
}

export default connect(mapStateToProps, null)(Details)
