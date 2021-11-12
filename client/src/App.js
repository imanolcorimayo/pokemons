import './App.css';

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import Principal from './components/Principal/Principal';

function App() {

  function hidenButton() {
    document.querySelector('#principal_button').style.display = "none"
  }
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={}></Route> */}
        <Route path="/Principal" element={ <Principal/>}></Route>
      </Routes>
      <Link to="/Principal">
          <button id="principal_button" onClick={ hidenButton }>
            Go to Principal
          </button>
      </Link>
    </div>
  );
}

export default App;
