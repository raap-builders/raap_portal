import React from 'react';
import Buttons from './components/Buttons'
import './styles/configure.css'
import ConfiguratorTable from "./components/Table"
import DisplayTypes from "./components/DisplayTypes"
import ConfiguratorDisplay from "./components/ConfiguratorDisplay"
import Notes from "./components/Notes"
import Slider from './components/Slider'
import { useState } from 'react';



function App() {
  const [traditionalBuildTime, setTraditionalBuildTime] = React.useState(25);
  const [raapBuildTime, setRaapBuildTime] = React.useState(18);
  const [traditionalCost, setTraditionalCost] = React.useState(8);
  const [raapIncrementalRevenue, setRaapIncrementalRevenue] = React.useState(1.3);


  return (
    <div className="configure_container">
      {/* <h1>Configure</h1> */}
      <div className="configure_area">
        <div className="configure_area_left">
          <div className="configure_area_table">
              <ConfiguratorTable
                traditionalBuildTime={traditionalBuildTime}
                raapBuildTime={raapBuildTime}
                traditionalCost={traditionalCost}
                raapIncrementalRevenue={raapIncrementalRevenue}
              ></ConfiguratorTable>
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
              <Buttons
                setTraditionalBuildTime={(value:number)=>setTraditionalBuildTime(value)}
              ></Buttons>
          </div>
          <div className="configure_area_rooms">
            <Slider 
              range={{min:70, max:150}}
              setRaapIncrementalRevenue={(value:number)=>setRaapIncrementalRevenue(value)}
            ></Slider>
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
