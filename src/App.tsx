import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  Routes,
  NavLink,
  // HashRouter,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";

import Configure from "./Configure";
import View from "./View";
import Schedule from "./Schedule";
// import { Login } from '@microsoft/mgt-react';
import axios from "axios";
import * as xlsx from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "./components/Breadcrum";
import Sider from "./components/Sider";
import Landing from "./Pages/Landing";
// Define the URL of the xlsx file
// const url = 'https://sharepoint-site.com/path/to/file.xlsx';
const url =
  "https://artsunitymovement-my.sharepoint.com/personal/rj_mahadev_aiota_solutions/_layouts/15/download.aspx?e=11mpJE&share=EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw";

// Make an HTTP GET request to fetch the file
const fetchDataFromExcel = async () => {
  axios
    .get(url, {
      headers: {
        // Add any required authentication headers here
      },
      responseType: "arraybuffer",
    })
    .then((response) => {
      // Parse the file data using the xlsx library
      const workbook = xlsx.read(response.data, { type: "array" });

      // Do something with the parsed data, e.g. log the first sheet
      // console.log("before workbook")
      console.log(workbook.Sheets[workbook.SheetNames[2]]);
      // let worksheets:any = {};
      // console.log("before sheets")
      let count = 0;
      // for(const sheetName of workbook.SheetNames){
      // worksheets[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
      // console.log(workbook.Sheets[workbook.SheetNames[count]]);
      // count+=1
      // console.log("json:\n", JSON.stringify(worksheets[sheetName]),"\n\n")
      // }
      // console.log("after workbook")
    })
    .catch((error) => {
      console.error(error);
    });
};

fetchDataFromExcel();

// console.log("after axios")
const raapLogo = require("./assets/Header/pic1.png");
const hiltonLogo = require("./assets/Header/pic2.png");

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
  height: 10.5vh;

  & a {
    font-family: "Inter", sans-serif;
    font-size: 3vmin;
    font-weight: 500;
    letter-spacing: 0.02em; //0.1em
    margin-right: 2%;
    color: #4a5568;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #48bb78;
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 3px;
      bottom: -2vh;
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
  font-family: "Poppins", sans-serif;
`;

const NavLinkContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  margin-left: 2%;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #2acfcf;
  }
  &.active {
    color: #2acfcf;
  }

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  text-align: center;

  color: #000000;
`;

const Logo = styled.img`
  height: 3vw;
  // width: 50px;
  margin-right: 2vw;
`;

const LogoHilton = styled.img`
  width: 6vw;
  // width: 50px;
  margin-right: 2vw;
`;

const LogoEmpty = styled.img`
  visibility: hidden;
  height: 50px;
  width: 50px;
  margin-right: 2rem;
`;

function App() {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 786) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="AppMain">
      <BrowserRouter>
        <Header />
        <div className="w-100 p-4 d-flex justify-content-center align-items-center">
          <Breadcrumb />
        </div>
        <Routes>
          <Route
            path="/"
            Component={(_) => (
              <>
                <div className="d-flex" style={{ height: window.outerHeight }}>
                  <Sider />
                  <Landing />
                </div>
              </>
            )}
          />
          <Route path="/view" Component={View} />
        </Routes>

        {/* <NavbarContainer>
            <Logo src={raapLogo} alt="Company Logo" />
            <NavLinkContainer>
              <NavItem to="/">Configuration</NavItem>
              <NavItem to="/view">Design Docs</NavItem>
              <NavItem to="/schedule">Construction Docs</NavItem>
            </NavLinkContainer>
            <LogoHilton src={hiltonLogo} alt="Hilton Logo" />
          </NavbarContainer> */}
        <MainContainer>
          {/* <Login /> */}
          {/* <Routes>
              <Route path="/" Component={Configure} />
              <Route path="/view" Component={View} />
              <Route path="/schedule" Component={Schedule} />
            </Routes> */}
        </MainContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
