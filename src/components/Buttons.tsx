import React, { useRef } from "react";
import '../styles/buttons.css';
import Button from './Button'


const Buttons = () => {

  return (
    <div className="buttons_container">
      <div className="buttons_location">
          Location
          <Button name="City" onclick={()=>{}} options={[]}></Button>
          <Button name="Location" onclick={()=>{}} options={[]}></Button>
      </div>
      <div className="buttons_property">
        <Button name="Property" onclick={()=>{}} options={[]}></Button>
      </div>
    </div>
  );
}

export default Buttons;