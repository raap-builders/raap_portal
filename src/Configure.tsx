import React from 'react';
import Button from './components/Button'
import './styles/configure.css'

function App() {
  return (
    <div className="configure_container">
      <h1>Configure</h1>
      <div className="buttons_container">
        <Button name="City" onclick={()=>{}}></Button>
        <Button name="Location" onclick={()=>{}}></Button>
        <Button name="Property" onclick={()=>{}}></Button>
      </div>
    </div>
  );
}

export default App;
