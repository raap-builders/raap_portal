import React from 'react';
import Buttons from './components/Buttons'
import './styles/configure.css'
import ConfiguratorTable from "./components/Table"
import DisplayTypes from "./components/DisplayTypes"
import ConfiguratorDisplay from "./components/ConfiguratorDisplay"
import Notes from "./components/Notes"
import Slider from './components/Slider'



function App() {
  return (
    <div className="configure_container">
      {/* <h1>Configure</h1> */}
      <div className="configure_area">
        <div className="configure_area_left">
          <div className="configure_area_table">
              <ConfiguratorTable></ConfiguratorTable>
          </div>
          <div className="configure_area_display">
              <ConfiguratorDisplay></ConfiguratorDisplay>
          </div>
          <div className="configure_area_layout">
              <DisplayTypes></DisplayTypes>
          </div>
        </div>
        <div className="configure_area_right">
          <div className="configure_area_buttons">
              <Buttons></Buttons>
          </div>
          <div className="configure_area_rooms">
            <Slider range={{min:70, max:150}}></Slider>
          </div>
          <div className="configure_area_notes">
              <Notes></Notes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
