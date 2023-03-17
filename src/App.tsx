import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  NavLink,
  HashRouter
} from "react-router-dom";
import Configure from "./Configure";
import View from "./View";
import Schedule from "./Schedule";

function App() {
  return (
    <HashRouter>
      <div className="App">
        {/* <h1>RaaP Portal</h1> */}
        <div className="header">
          <div><NavLink to="/configure">Configure</NavLink></div>
          <div><NavLink to="/view">View</NavLink></div>
          <div><NavLink to="/schedule">Schedule</NavLink></div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/configure" Component={Configure}/>
            <Route path="/view" Component={View}/>
            <Route path="/schedule" Component={Schedule}/>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
