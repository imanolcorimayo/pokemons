import React, { useEffect, useState } from 'react'

import Cards from './Cards/Cards'
import NavBar from '../NavBar/NavBar'
import Filters from './Filters/Filters'
import Loading from './Loading/Loading'

import styles from './Principal.module.css'

import { getPokemons, turnPages } from '../../Actions'

import { connect } from 'react-redux'

function Principal(props) {

    // let gPkm = props.getPokemons 

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // setLoading(true)
        //Comprobamos si props.pokemons tiene algo

        if(!props.pokemons[0]) {
            setLoading(true)
            async function wait() {
                await props.getPokemons()
            }
            wait()
                // props.getPokemons()
            setLoading(false)
        }
        
        // async function getPokemons(){
        //     await gPkm().then(() => {
        //         setLoading(false)
        //     }).catch(()=>console.log("errorrrr"))
        // }
        // getPokemons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let span = []

    for(let j = 0; j < props.numberOfPages ; j++) {
        span.push(
            (
                <span key={ j } 
                      className={ styles.span }
                      id={j}
                      onClick={fPages}>{j + 1}</span>
            )
        )
    }
    
    function fPages(el){
        console.log(el.target.id)
        let arr = [el.target.id * 9, el.target.id * 9 + 8];
        props.tPages(arr);
    }

    return (
        <div>
            <NavBar></NavBar>
            <div>
                { span }
            </div>
            { loading ? <Loading className={ styles.loading } />:<Cards/> }
            <Filters></Filters>
        </div>
    )
}
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
