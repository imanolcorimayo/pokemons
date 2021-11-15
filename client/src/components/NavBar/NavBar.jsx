import React, { useState } from 'react'

import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

export default function NavBar() {
    const [search, setsearch] = useState("")

    function handleInputChange(e) {
        setsearch(e.target.value);
    }
    return (
        <div className={ styles.divPrincipal }>
                <Link to="/Principal">Principal</Link>
            <input type="text" 
                name="search" 
                onChange={ handleInputChange } 
                value={ search }
                className={ styles.input } />
            <button className={ styles.button }>Buscar Pokemon!</button>
            <button>Crear Pokemon!</button>
        </div>
    )
}
