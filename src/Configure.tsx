import React from 'react';
import Buttons from './components/Buttons'
import './styles/configure.css'

function App() {
  return (
    <div className="configure_container">
      {/* <h1>Configure</h1> */}
      <div className="configure_area">
        <div className="configure_area_left">
          <div className="configure_area_table">
              Table
          </div>
          <div className="configure_area_display">
              Display
          </div>
          <div className="configure_area_layout">
              Layout | Photo | Drawing
          </div>
        </div>
        <div className="configure_area_right">
          <div className="configure_area_buttons">
              <Buttons></Buttons>
          </div>
          <div className="configure_area_rooms">
              Rooms
          </div>
          <div className="configure_area_notes">
              Notes
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
