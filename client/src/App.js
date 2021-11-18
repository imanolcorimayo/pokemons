import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Principal from './components/Principal/Principal';
import Presentation from './components/Presentation/Presentation';
import Create from './components/Create/Create';
import Details from './components/Details/Details';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Presentation/> }></Route>
        <Route path="/Principal" element={ <Principal/>}></Route>
        <Route path="/Create" element={ <Create/>}></Route>
        {/* <Route path="/Details/:id"
        element={(({match}) => <Details
        id={ match.params.id }
      />)}></Route> */}
        <Route path="/Details/:idpkm"
          element={ <Details/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
