import React, { useState } from 'react'

import styles from './Create.module.css'

import NavBar from '../NavBar/NavBar'

export default function Create() {
    const [state, setstate] = useState({
        name: "",
        lives: 0,
        strength: 0,
        speed: 0,
        defense: 0,
        height: 0,
        weight: 0
    })

    function changeInput(el) {
        setstate({
            ...state,
            [el.target.name] : el.target.value
        })
    }
    var k = 1999
    function createPokemon() {
        k++
        let body = {
            ...state,
            idpokemon: k
        }
        fetch('http://localhost:3001/pokemons', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(() => {
        return { msg: "Creado con exito!" };
        })
        .catch(error => console.error('Error:', error))
    };
    return (
        <div className={ styles.divPrincipal }>
            <NavBar></NavBar>
            <form className={ styles.form } action="">
                <label>Nombre</label>
                <input id="name" 
                name="name" 
                value={ state.name } 
                className={ styles.input } type="text"
                onChange={ changeInput } />
                <label >lives: {state.lives}</label>
                <input className={ styles.input } type="range" 
                value={ state.lives }
                name="lives"
                min="0" 
                max="100" 
                step="1"
                onChange={ changeInput }/>
                <label >strength : {state.strength}</label>
                <input className={ styles.input } type="range" 
                value={ state.strength } 
                name="strength"
                min="0" 
                max="100" 
                step="1"
                onChange={ changeInput }/>
                <label >Speed: {state.speed}</label>
                <input className={ styles.input } type="range" 
                value={ state.speed } 
                name="speed"
                min="0" 
                max="100" 
                step="1"
                onChange={ changeInput }/>
                <label >Defense: {state.defense}</label>
                <input className={ styles.input } type="range" 
                value={ state.defense } 
                name="defense"
                min="0" 
                max="100" 
                step="1"
                onChange={ changeInput }/>
                <label >height: {state.height}</label>
                <input className={ styles.input } type="number" 
                name="height"
                value={ state.height } 
                onChange={ changeInput }/>
                <label >weight: {state.weight}</label>
                <input className={ styles.input } type="number" 
                name="weight"
                value={ state.weight } 
                onChange={ changeInput }/>
                <button onClick={ createPokemon }> CREAAR </button>
            </form>
        </div>
    )
}
