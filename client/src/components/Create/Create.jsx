import React, { useEffect, useState } from 'react'

import styles from './Create.module.css'

import { Link } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import { connect } from 'react-redux'
import { getPokemons, increaseIdPokemon } from '../../Actions'

import comprobado from '../../img/comprobado.png'

function Create(props) {

    const [namesPokemons, setnamesPokemons] = useState([])
    const [exists, setexists] = useState(false)
    const [formSent, setformSent] = useState(false)
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
        return () =>{
            props.getpkm()
        }
        // eslint-disable-next-line
    }, [])

    //Controlo que el valor name no se repita
    useEffect(() => {
        if(namesPokemons.includes(state.name)){
            return setexists(true)
        } else if (!state.name[0]) {
            return setexists(true)
        }
         else {
            setexists(false)
        }
        // eslint-disable-next-line
    }, [state.name])

    //Seteo el estado de los inputs
    function changeInput(el) {
        console.log(el.target.name)
        if(el.target.name.includes("types")) {
            let aux = state.types;
            if (aux.includes(el.target.value)) {
                let aux2 = aux.filter((element) => {
                    console.log(element, el.target.value)
                    return element+"" !== el.target.value+""
                })
                console.log(aux2)
                setstate({
                    ...state,
                    types: aux2
                })
            } else {
                aux.push(el.target.value)
                setstate({
                    ...state,
                    types: aux
                })
            }
            
            console.log(state)
        } else {
            setstate({
                ...state,
                [el.target.name] : el.target.value
            })
        }
        
    }

    //Creo el pokemon
    function createPokemon(event) {
        //Me fijo si los datos del name son correctos
        if(namesPokemons.includes(state.name)){
            event.preventDefault()
            return alert("Something is wrong with your form")
        }
        setformSent(true)
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
        .catch(error => {
            return console.error('Error:', error)
        })
        //Pido de nuevo un get para que se actualicen los pokemons
        event.preventDefault();
    };

    function another() {
        setstate({
            name: "",
            lives: 0,
            strength: 0,
            speed: 0,
            defense: 0,
            height: 0,
            weight: 0,
            types: []
        })
        setformSent(false)
    }




    return (
        <div className={ styles.divPrincipal }>
            <NavBar></NavBar>
            <form className={ styles.form } onSubmit={ createPokemon }>
                <div className={ styles.first }>
                    <label className={ styles.label }>Pokemon name</label>
                    <input id="name" name="name" 
                    value={ state.name } className={ styles.input } type="text"
                    onChange={ changeInput } required />
                    {
                        exists ? <span className={ styles.spanValidateWrong }>Warning: change name</span> : 
                        <span className={ styles.spanValidateOk }>Right name</span>
                    }
                    <label className={ styles.label } >lives: {state.lives}</label>
                    <input className={ styles.input } type="range" 
                    value={ state.lives } name="lives"
                    min="0" max="100" 
                    step="1" onChange={ changeInput }/>
                    <label className={ styles.label } >strength : {state.strength}</label>
                    <input className={ styles.input } type="range" 
                    value={ state.strength } 
                    name="strength"
                    min="0" 
                    max="100" 
                    step="1"
                    onChange={ changeInput }/>
                    <label className={ styles.label } >Speed: {state.speed}</label>
                    <input className={ styles.input } type="range" 
                    value={ state.speed } 
                    name="speed"
                    min="0" 
                    max="100" 
                    step="1"
                    onChange={ changeInput }/>
                    <label className={ styles.label } >Defense: {state.defense}</label>
                    <input className={ styles.input } type="range" 
                    value={ state.defense } 
                    name="defense"
                    min="0" 
                    max="100" 
                    step="1"
                    onChange={ changeInput }/>
                    <label className={ styles.label } >height: {state.height}</label>
                    <input className={ styles.input } type="number" 
                    name="height"
                    value={ state.height } 
                    onChange={ changeInput }/>
                    <label className={ styles.label } >weight: {state.weight}</label>
                    <input className={ styles.input } type="number" 
                    name="weight"
                    value={ state.weight } 
                    onChange={ changeInput }/>
                </div>
                
                <div className={ styles.divTypesPadre }>
                    {
                        props.types.map((el, i) => {
                            return (
                            <div className={ styles.divTypes }>
                                <img key={ i } className={ styles.img } src={ comprobado } alt="" />
                                <span key={ i + props.types.length  }>{ el }</span>
                                <input key={ i + 2 * props.types.length } className={ styles.input2 } 
                                        type="checkbox" onChange={ changeInput } 
                                        name={ "types" + el } value= { i + 1} />
                            </div>)
                        })
                    }
                </div>
                <input className={ styles.button } type="submit" value="CREAR"/>
            </form>
            {
                formSent ? (
                    <div className={ styles.divMessageFather }>
                        <div className={ styles.divMessage }>
                            <h2>Pokemon created</h2>
                            <span className={ styles.congrats }>Congratulations!!</span>
                            <button className={ styles.buttonAnother } onClick={ another }>
                                Create another
                            </button>
                            <Link to="/Principal">
                                <button className={ styles.buttonToHome }>
                                    Go to home
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (<></>)
                
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
        increase: () => dispatch(increaseIdPokemon()),
        getpkm: () => dispatch(getPokemons())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);