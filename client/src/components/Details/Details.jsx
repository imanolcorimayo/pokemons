import React, { useEffect, useState } from 'react'

import styles from './Details.module.css'

import NavBar from '../NavBar/NavBar'
import { connect } from 'react-redux'
import { useParams } from 'react-router'

function Details(props) {
    let { idpkm } = useParams();
    console.log("que es esto:", idpkm)
    const [pokemon, setstate] = useState([])
    setstate(props.pokemons.filter((el) => {
        const { id } = el
        console.log(id, parseInt(idpkm))
        return id === parseInt(idpkm)
    })) 
    useEffect(() => {
        
        // eslint-disable-next-line
    }, [])
    console.log(idpkm, pokemon, props.pokemons)
    return (
        <div className={ styles.divPrincipal }>
            <NavBar></NavBar>
            <div className={ styles.divContenedor }>
                <h1>{ pokemon[0].name }</h1>
                <div className={ styles.divImagen }>
                    <img src={ pokemon[0].img } alt="" />
                </div>
                <div className={ styles.divData }>
                    <span>Datos</span>
                    <br />
                    <span>{ pokemon[0].lives }</span>
                    <br />
                    <span>{ pokemon[0].defense }</span>
                    <br />
                    <span>{ pokemon[0].speed }</span>
                    <br />
                    <span>{ pokemon[0].force }</span>
                    <br />
                    <span>{ pokemon[0].lives }</span>
                    <br />
                    <span>Estadisticas</span>
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
