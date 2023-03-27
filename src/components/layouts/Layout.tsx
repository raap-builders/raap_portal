import { useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import DisplayTypes from "../DisplayTypes"
import Buttons from '../Buttons'
import Slider from '../Slider'
import Notes from "../Notes"

import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'



const backgroundImage = require("../../assets/ConfiguratorBackground.png");
const GlimmerLayout = require("../../assets/GlimmerLayout.png");


const GreenBox = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  height:22vh;
  width:100%;
  background: rgba(81, 146, 89, 0.22);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); //, inset 0px 4px 4px rgba(0, 0, 0, 0.25)
`

const MainArea = styled.div`
  display:flex;
  flex-direction:row;
  height: 100%;
  width: 100%;
`

const DisplayArea = styled.div`
  width: 46vw;
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-around;
`

const ButtonArea = styled.div`
  // background-color:pink;
  height:100%;
  width: 54vw;
  padding: 0 4vw;
  padding-top:1rem;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  display:flex;
  flex-direction:column;
`

const PlaceholderImage = styled.img`
  height: 50vh;
  width: auto;
`

const LayoutButtons = styled.div`
  height:10vh;
  width: auto;
`

const FirstColumnDiv = styled.div`
  border: 1.26px solid rgba(81, 146, 89, 1);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  width: 100%;
  height: 100%;
  background-color:rgba(135,135,135,0.22);
  border-radius: 16px;
  margin-right: 0.5rem;
`

const ColumnDiv = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 0.5rem;
`
const MiddleColumnDiv = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 0.5rem;
`

const LastColumnDiv = styled.div`
  border: 1.26px solid rgba(81, 146, 89, 1);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 16px;
  width: 100%;
  height: 100%;
  margin-left: 0.5rem;
`

const TitleDiv = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  font-size: 20px;
  height: 30%;
`
const BarContainerLeft = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:end;
  height: 70%;
`

const BarContainerRight = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:start;
  height: 70%;
`

const GrayDiv = styled.div`
  background: #878787;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  transform: rotate(-180deg);
  width: 70%;
  height:1rem;
`
const GreenDiv = styled.div`
  background: #519259;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 30%;
  height:1rem;
  transform: rotate(-180deg);
`

const YellowDiv = styled.div`
  background: #F0BB62;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 40%;
  height: 1rem;
  transform: rotate(-180deg);
  visibility: hidden;
`

const GrayDivRight = styled.div`
  background: #878787;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 70%;
  height:1rem;
`
const GreenDivRight = styled.div`
  background: #519259;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 30%;
  height:1rem;
`

const YellowDivRight = styled.div`
  background: #F0BB62;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 40%;
  height: 1rem;
`

const Layout = () => {
  const [traditionalBuildTime, setTraditionalBuildTime] = useState(25);
  const [raapBuildTime, setRaapBuildTime] = useState(18);
  const [traditionalCost, setTraditionalCost] = useState(8);
  const [raapIncrementalRevenue, setRaapIncrementalRevenue] = useState(calculateIncrementalRevenue(data.rooms.total));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GreenBox>
          <FirstColumnDiv></FirstColumnDiv>
          <ColumnDiv>
            <TitleDiv>Time to complete</TitleDiv>
            <BarContainerLeft>
              <GrayDiv></GrayDiv>
              <GreenDiv></GreenDiv>
              <YellowDiv></YellowDiv>
            </BarContainerLeft>
          </ColumnDiv>
          <MiddleColumnDiv></MiddleColumnDiv>
          <ColumnDiv>
            <TitleDiv>Project Cost</TitleDiv>
            <BarContainerRight>
              <GrayDivRight></GrayDivRight>
              <GreenDivRight></GreenDivRight>
              <YellowDivRight></YellowDivRight>
            </BarContainerRight>
          </ColumnDiv>
          <LastColumnDiv></LastColumnDiv>
        </GreenBox>
        <MainArea>
          <DisplayArea>
            <PlaceholderImage src={GlimmerLayout}></PlaceholderImage>
            <LayoutButtons>
              <DisplayTypes></DisplayTypes>
            </LayoutButtons>
          </DisplayArea>
          <ButtonArea>
              <Buttons
                setTraditionalBuildTime={(value:number)=>setTraditionalBuildTime(value)}
              ></Buttons>
              <Slider 
              range={{min:70, max:150}}
              setRaapIncrementalRevenue={(value:number)=>setRaapIncrementalRevenue(value)}
            ></Slider>
            <Notes></Notes>
          </ButtonArea>
        </MainArea>
      </Container>
    </ThemeProvider>
  )
}

export default Layout;