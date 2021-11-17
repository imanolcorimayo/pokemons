import React, { useEffect, useState } from 'react'

import styles from './Create.module.css'

import NavBar from '../NavBar/NavBar'
import { connect } from 'react-redux'
import { increaseIdPokemon } from '../../Actions'

function Create(props) {

    const [namesPokemons, setnamesPokemons] = useState([])
    const [exists, setexists] = useState(false)
    const [state, setstate] = useState({
        name: "",
        lives: 0,
        strength: 0,
        speed: 0,
        defense: 0,
        height: 0,
        weight: 0,
        types: []
    })


    useEffect(() => {
        setnamesPokemons(props.pokemons.map((el) => el.name))
        // eslint-disable-next-line
    }, [])

    //Controlo que el valor name no se repita
    useEffect(() => {
        if(namesPokemons.includes(state.name)){
            return setexists(true)
        } else {
            setexists(false)
        }
        // eslint-disable-next-line
    }, [state.name])

    //Seteo el estado de los inputs
    function changeInput(el) {
        if(el.target.name.includes("types")) {
            let aux = state.types;
            aux.push(el.target.value)
            setstate({
                ...state,
                types: aux
            })
        }
        setstate({
            ...state,
            [el.target.name] : el.target.value
        })
    }

    //Creo el pokemon
    function createPokemon(event) {
        //Decido hacerlo con un estado global para que no se reinicie cada vez que se destruye el componenete
        props.increase() 
        let body = {
            ...state,
            idpokemon: props.id
        }
        fetch('http://localhost:3001/pokemons', {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(() => {
        return { msg: "Creado con exito!" };
        })
        .catch(error => console.error('Error:', error))
        event.preventDefault();
    };
    return (
        <div className={ styles.divPrincipal }>
            <NavBar></NavBar>
            <form className={ styles.form } onSubmit={ createPokemon }>
                <label>Nombre</label>
                <input id="name" name="name" 
                value={ state.name } className={ styles.input } type="text"
                onChange={ changeInput } />
                <label >lives: {state.lives}</label>
                <input className={ styles.input } type="range" 
                value={ state.lives } name="lives"
                min="0" max="100" 
                step="1" onChange={ changeInput }/>
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
                {
                    props.types.map((el, i) => {
                        return (<>
                            <span key={ i }>{ el }</span>
                            <input key={ i + props.types.length } className={ styles.input2 } 
                                    type="checkbox" onChange={ changeInput } 
                                    name={ "types" + el } value= { i + 1} />
                        </>)
                    })
                }
                <input type="submit" value="CREAR"/>
            </form>
            {
                exists ? <h1 className={ styles.h1mal }>MALLLL</h1> : <h1 className={ styles.h1ok }>ok</h1>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        pokemons: state.pokemons,
        types: state.types,
        id: state.idPokemon
    }
}

function mapDispatchToProps(dispatch){
    return {
        increase: () => dispatch(increaseIdPokemon())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);