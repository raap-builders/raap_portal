import React, { useRef } from "react";
import '../styles/buttons.css';
import data from '../data/configurator'

import DropdownButton from './DropdownButton'


const Buttons = () => {
  const [state, setState] = React.useState(Object.keys(data.location)[0] || "")
  // console.log(data);

  const cities:any = data.location["California"];

  return (
    <div className="buttons_container">
      <div className="buttons_location">
          Location
          <DropdownButton name="City" onClickDropdown={(value)=>{setState(value)}} options={Object.keys(data.location)}></DropdownButton>
          <DropdownButton name="State" onClickDropdown={()=>{}} options={Object.keys(cities)}></DropdownButton>
      </div>
      <div className="buttons_property">
        {/* <Button name="Property" onClickDropdown={()=>{}} options={[]}></Button> */}
      </div>
    </div>
  );
}

export default Buttons;
