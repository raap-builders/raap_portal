import React from 'react';

import Buttons from '../Buttons'
import '../../styles/configure.css'
import ConfiguratorTable from "../Table"
import DisplayTypes from "../DisplayTypes"
import ConfiguratorDisplay from "../ConfiguratorDisplay"
import Notes from "../Notes"
import Slider from '../Slider'
import { useState } from 'react';
import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'

const OldLayout = () => {
  const [traditionalBuildTime, setTraditionalBuildTime] = useState(25);
  const [raapBuildTime, setRaapBuildTime] = useState(18);
  const [traditionalCost, setTraditionalCost] = useState(8);
  const [raapIncrementalRevenue, setRaapIncrementalRevenue] = useState(calculateIncrementalRevenue(data.rooms.total));


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
  )
}

export default OldLayout;