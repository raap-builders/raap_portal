import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  NavLink,
  // HashRouter,
  BrowserRouter
} from "react-router-dom";
import styled from 'styled-components';

import Configure from "./Configure";
import View from "./View";
import Schedule from "./Schedule";

const raapLogo = require('./assets/logo.png');

const MainContainer = styled.div`
  // max-width: 800px;
  // margin: 0 auto;
  // padding: 1rem;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;

  & a {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.02em; //0.1em
    margin-right: 2rem;
    color: #4a5568;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #48bb78;
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 3px;
      bottom: -5px;
      left: 50%;
      background-color: #48bb78;
      transition: all 0.2s ease-out;
      transform: translateX(-50%);
    }

    &.active {
      color: #48bb78;
    }

    &.active:after {
      width: calc(100% - 10px); //width: calc(100% - 20px)
    }
  }
`;

const NavTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #2acfcf;
  }
  &.active {
    color: #2acfcf;
  }
`;

const Logo = styled.img`
  height: 50px;
  // width: 50px;
  margin-right: 2rem;
`;

const LogoEmpty = styled.img`
  visibility: hidden;
  height: 50px;
  width: 50px;
  margin-right: 2rem;
`;

function App() {
  return (
    <>
    <BrowserRouter>
      <NavbarContainer>
        <NavLinkContainer>
          <Logo src={raapLogo} alt="Company Logo" />
          {/* <NavTitle>My App</NavTitle> */}
        </NavLinkContainer>
        <NavLinkContainer>
          <NavItem to="/">Configure</NavItem>
          <NavItem to="/view">View</NavItem>
          <NavItem to="/schedule">Schedule</NavItem>
        </NavLinkContainer>
        <NavLinkContainer><LogoEmpty src={raapLogo} alt="Company Logo" /></NavLinkContainer>
      </NavbarContainer>
      <MainContainer>
        <Routes>
          <Route path="/" Component={Configure} />
          <Route path="/view" Component={View} />
          <Route path="/schedule" Component={Schedule} />
        </Routes>
      </MainContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
