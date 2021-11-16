import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Principal from './components/Principal/Principal';
import Presentation from './components/Presentation/Presentation';
import Create from './components/Create/Create';

function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Presentation/> }></Route>
        <Route path="/Principal" element={ <Principal/>}></Route>
        <Route path="/Create" element={ <Create/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
