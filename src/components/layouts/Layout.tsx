import { useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import DisplayTypes from "../DisplayTypes"
import Buttons from '../Buttons'
import Slider from '../Slider'
import Notes from "../Notes"
import DisplayContent from "../DisplayContent"

import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'



const backgroundImage = require("../../assets/ConfiguratorBackground.png");


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


const LayoutButtons = styled.div`
  height:10vh;
  width: auto;
`

const FirstColumnDiv = styled.div`
  display:flex;
  flex-direction:column;
  border: 1.26px solid rgba(81, 146, 89, 1);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  width: 100%;
  height: 100%;
  background-color:rgba(135,135,135,0.22);
  border-radius: 16px;
  margin-right: 0.5rem;
`

const OtherBenefitsHeader = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  // line-height: 38px;
  text-decoration-line: underline;
  padding-left:0.5rem;
  color: #3D3D3D;
`

const BulletPointsDiv = styled.div`
  padding-left:0.5rem;
  font-size:0.7rem;
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
  display:flex;
  flex-direction: column;
`

const LeftTitleDiv = styled.div`
  width: 100%;
  text-align:right;
  font-size: 20px;
  height: 30%;
`

const RightTitleDiv = styled.div`
  width: 100%;
  text-align:left;
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
  border-radius: 8.90141px 0px 0px 8.90141px;
  width: 70%;
  height:1rem;
  text-align:right;
  font-size: 0.7rem;
`
const GreenDiv = styled.div`
  background: #519259;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8.90141px 0px 0px 8.90141px;
  width: 60%;
  height:1rem;
  text-align:right;
  font-size: 0.7rem;
`

const YellowDiv = styled.div`
  background: #F0BB62;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8.90141px 0px 0px 8.90141px;
  width: 40%;
  height: 1rem;
  visibility: hidden;
  font-size: 0.7rem;
`

const GrayDivRight = styled.div`
  background: #878787;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 70%;
  height:1rem;
  text-align:left;
  font-size: 0.7rem;
`
const GreenDivRight = styled.div`
  background: #519259;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 50%;
  height:1rem;
  text-align:left;
  font-size: 0.7rem;
`

const YellowDivRight = styled.div`
  background: #F0BB62;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 8.90141px 8.90141px 0px;
  width: 40%;
  height: 1rem;
  text-align:left;
  font-size: 0.7rem;
`

const BulletList = styled.ul`
  margin: 0.1em;
`

const ListItem = styled.ul`
  list-style: disc outside none;
  display: list-item;
  margin-left: 1.5em;
`

const FourDivs = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const Row = styled.div`
  display:flex;
  flex-direction: row;
  height: 100%;
  margin: 0.25rem;
`
const WhiteBox = styled.div`
  margin: 0.25rem;
  background-color:white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display:flex;
  flex-direction:column;
  justify-content: space-around;
`

const BuildingRoomsHeader = styled.div`
  text-align: center;
  font-size: 1rem;
`

const BoldText = styled.p`
  font-weight: 500;
  font-size: 0.7rem;
  line-height: 0.7rem;
  text-align:center;
`

const NormalText = styled.p`
  font-size: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  align-items:center;
`

const EmptyTitleDiv = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  font-size: 20px;
  height: 30%;
  visibility: hidden;
`

const EmptySliderDiv = styled.div`
  text-align: center;
  width: 90%;
  height:1rem;
`

const EmptyBarContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
  height: 60%;
`


const Layout = () => {
  const [traditionalBuildTime, setTraditionalBuildTime] = useState(25);
  const [raapBuildTime, setRaapBuildTime] = useState(18);
  const [traditionalCost, setTraditionalCost] = useState(8);
  const [raapIncrementalRevenue, setRaapIncrementalRevenue] = useState(calculateIncrementalRevenue(data.rooms.total));

  const [roomsMin, setRoomsMin] = useState(data.rooms.min);
  const [roomsMax, setRoomsMax] = useState(data.rooms.max);

  const [displayImage, setDisplayImage] = useState("Glimmer")
  const [layoutType, setlayoutType] = useState("Layout")

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GreenBox>
          <FirstColumnDiv>
            <OtherBenefitsHeader>Other RaaP Benefits:</OtherBenefitsHeader>
            <BulletPointsDiv>
              <BulletList>
                <ListItem>Greater Predictability</ListItem>
                <ListItem>Higher Quality</ListItem>
                <ListItem>Lower Energy Consumption</ListItem>
                <ListItem>Better Room Comfort</ListItem>
              </BulletList>
            </BulletPointsDiv>
          </FirstColumnDiv>
          <ColumnDiv>
            <LeftTitleDiv>Time to complete</LeftTitleDiv>
            <BarContainerLeft>
              <GrayDiv>25 Months</GrayDiv>
              <GreenDiv>18 Months (28% faster)</GreenDiv>
              <YellowDiv></YellowDiv>
            </BarContainerLeft>
          </ColumnDiv>
          <MiddleColumnDiv>
          <EmptyTitleDiv>Time to complete</EmptyTitleDiv>
            <EmptyBarContainer>
                <EmptySliderDiv>Traditional Construction</EmptySliderDiv>
                <EmptySliderDiv>RaaP</EmptySliderDiv>
                <EmptySliderDiv>RaaP Net Cost (less incr. rev.)</EmptySliderDiv>
            </EmptyBarContainer>
          </MiddleColumnDiv>
          <ColumnDiv>
            <RightTitleDiv>Project Cost</RightTitleDiv>
            <BarContainerRight>
              <GrayDivRight>$8M</GrayDivRight>
              <GreenDivRight>$7.6M (5% lower)</GreenDivRight>
              <YellowDivRight>$6.7M (16% lower)</YellowDivRight>
            </BarContainerRight>
          </ColumnDiv>
          <LastColumnDiv>
            <BuildingRoomsHeader>
              Building Rooms
            </BuildingRoomsHeader>
            <FourDivs>
              <Row>
                <WhiteBox>
                  <BoldText>18 Months</BoldText>
                  <NormalText>Build Time</NormalText>
                </WhiteBox>
                <WhiteBox>
                  <BoldText>$6.7M</BoldText>
                  <NormalText>Project Cost</NormalText>
                </WhiteBox>
              </Row>
              <Row>
              <WhiteBox>
                  <BoldText>$84K</BoldText>
                  <NormalText>Per Room</NormalText>
                </WhiteBox>
                <WhiteBox>
                  <BoldText>$158</BoldText>
                  <NormalText>Per sq. ft.</NormalText>
                </WhiteBox>
              </Row>
            </FourDivs>
          </LastColumnDiv>
        </GreenBox>
        <MainArea>
          <DisplayArea>
            <DisplayContent
              finishType={displayImage}
              layoutType={layoutType}
            ></DisplayContent>
            <LayoutButtons>
              <DisplayTypes
                onClickButton={(value: string)=>setlayoutType(value)}
              ></DisplayTypes>
            </LayoutButtons>
          </DisplayArea>
          <ButtonArea>
              <Buttons
                setTraditionalBuildTime={(value:number)=>setTraditionalBuildTime(value)}
                changeDisplayImage={(value: string)=>setDisplayImage(value)}
              ></Buttons>
              <Slider 
              range={{min:roomsMin, max:roomsMax}}
              setRaapIncrementalRevenue={(value:number)=>setRaapIncrementalRevenue(value)}
            ></Slider>
            <Notes
              title={data.notes.title}
              placeholderText={data.notes.placeholderText}
              submitButtonText={data.notes.submitButtonText}
            ></Notes>
          </ButtonArea>
        </MainArea>
      </Container>
    </ThemeProvider>
  )
}

export default Layout;