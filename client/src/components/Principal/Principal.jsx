import React, { useEffect, useState } from 'react'

import Cards from './Cards/Cards'
import NavBar from '../NavBar/NavBar'
import Filters from './Filters/Filters'
import Loading from './Loading/Loading'

import styles from './Principal.module.css'

import { getPokemons, turnPages } from '../../Actions'

import { connect } from 'react-redux'

function Principal(props) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        //Comprobamos si props.pokemons tiene algo
        if(!props.pokemons[0]) {
            async function wait() {
                await props.getPokemons()
                setLoading(false)

            }
            wait()
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    let span = []

    for(let j = 0; j < props.numberOfPages ; j++) {
        span.push(
            (
                <span key={ j } 
                      className={ styles.span }
                      id={j}
                      onClick={fPages}>{j + 1}
                </span>
            )
        )
    }
    
    function fPages(el){
        console.log()
        if("" + el.target.id === "0") {
            props.tPages([0, 9]);
        } else {
            let arr = [(el.target.id - 1) * 12 + 9, (el.target.id - 1) * 12 + 12 + 9];
            console.log(arr)
            props.tPages(arr);
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <div>
                { span }
            </div>
            { loading ? <Loading/>:<Cards/> }
            <Filters></Filters>
        </div>
    )
}

//Redux
function mapStateToProps(state) {
    return {
      numberOfPages: state.numberOfPages,
      pokemons: state.pokemons
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        tPages: (pages) => dispatch(turnPages(pages))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Principal);
