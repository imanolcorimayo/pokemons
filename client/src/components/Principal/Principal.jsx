import React, { useEffect } from 'react'

import Cards from './Cards/Cards'
import NavBar from '../NavBar/NavBar'
import Filters from './Filters/Filters'

import { getPokemons } from '../../Actions'

import { connect } from 'react-redux'

function Principal(props) {

    let gPkm = props.getPokemons 

    useEffect(() => {
        async function getPokemons(){
            await gPkm().catch(()=>console.log("errorrrr"))
        }
        getPokemons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            <Cards></Cards>
            <Filters></Filters>
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Principal);
