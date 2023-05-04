import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import DisplayTypes from "../DisplayTypes"
import Buttons from '../Buttons'
import VerticalSlider from '../Slider/VerticalSlider'
import Notes from "../Notes"
import DisplayContent from "../DisplayContent"
import "../../styles/layouts.css"

import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data, { getValues } from '../../data/configurator'
import RadioButton from "../RadioButtons/RadioButton";
import DropdownButton from '../DropdownButton'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, Bs4CircleFill, Bs5CircleFill, Bs6CircleFill } from 'react-icons/bs';

const backgroundImage = require("../../assets/ConfiguratorBackground.png");

interface BarDivProps {
  barWidth: number;
  barColor: string;
  barAlign: string;
}
function valuetext(value: number) {
  return `${value}°C`;
}
const GreenBox = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  // padding: 1rem;
  min-height:22vh;
  max-height:22vh;
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
  width: 45.5vw;
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
  // background-color:blue;
  display:flex;
  flex-direction:column;
  border: 1.26px solid rgba(81, 146, 89, 1);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  width: 16vw;//100%;
  height: 100%;
  background-color:rgba(135,135,135,0.22);
  border-radius: 16px;
  // margin-right: 1vw;
  padding-top:0.4vw;
`

const OtherBenefitsHeader = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 1.3vw;
  text-decoration-line: underline;
  padding-left:1vw;
  padding-top:1vh;
  color: #3D3D3D;
`

const BulletPointsDiv = styled.div`
  padding-left:0.5vw;
  overflow:hidden;
`

const ColumnDiv = styled.div`
  // background-color:red;
  height: 100%;
  margin: 0 0.5vw;
  overflow:hidden;
  // width: 20vw;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  padding-bottom:1.5vh;
`
const MiddleColumnDiv = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  height: 100%;
  width: 18.4vw; //100%;
  margin: 0 0.5vw;
  overflow:hidden;
  // background-color:green;
  padding-bottom:1.7vh;
`

const LastColumnDiv = styled.div`
  // margin-left: 4vw;
  padding: 0.5vw;
  display:flex;
  flex-direction: column;
  border: 1.26px solid rgba(81, 146, 89, 1);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 16px;
  width: 15.9vw//100%;
  height: 100%;
  overflow: hidden;
  // background-color:purple;
`

const LeftTitleDiv = styled.div`
  width: 100%;
  text-align:right;
  // font-size: 2vmin;
  // line-height: 2.5vmin;
  // font-weight:500;
  // height: 20%;
`

const RightTitleDiv = styled.div`
  width: 100%;
  text-align:left;
  // font-size: 2vmin;
  // line-height: 2.5vmin;
  // font-weight:500;
  // height: 20%;
`

const BarContainerLeft = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:end;
  height: 11.7vh//80%;
`

const BarContainerRight = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:start;
  height: 11.7vh//80%;
`

const BulletList = styled.ul`
  margin: 0.1em;
  // font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 1vw;
  line-height: 1.5vw;

  color: #000000;
`

const ListItem = styled.ul`
  list-style: disc outside none;
  display: list-item;
  margin-left: 1.5em;
`

const FourDivs = styled.div`
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
`

const Row = styled.div`
  display:flex;
  flex-direction:row;
  height: 100%;
  margin:0.2vh;
`

const WhiteBox = styled.div`
  background-color:white;
  width: 90%;
  height: 80%;
  border-radius: 10px;
  display:flex;
  flex-direction:column;
  justify-content: space-around;
  margin: 0.4vw;
`

const BuildingRoomsHeader = styled.div`
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content:space-around;
  margin-left:1vw;
  margin-right:1vw;
  font-size: 1vw;
  height:6vh;
`

const BoldText = styled.p`
  font-weight: 500;
  font-size: 1.8vmin;
  text-align:center;
`

const NormalText = styled.p`
  font-size: 1.5vmin;
  text-align: center;
  align-items:center;
`

const EmptySliderDiv = styled.div`
  text-align: center;
  width: 100%;
`

const EmptyBarContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  height: 11.7vh//80%;
`

const ColoredBar = styled.div<BarDivProps>`
  justify-content:${props => props.barAlign == "right" ? "right" : "left"};
  font-style: normal;
  font-weight: 600;
  // font-size: 24px;
  // line-height: 33px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: ${props => props.barColor == "yellow" ? "#000000" : "#FFFFFF"};

  background: ${props => props.theme.barColors[props.barColor]};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${props => props.barAlign == "right" ? "0.4vw 0px 0px 0.4vw" : "0px 0.4vw 0.4vw 0px"};
  padding: 0 0.4vw;
  
  font-size: 0.9vw;//1.7vmin;
  overflow:hidden;
  // height:3vmin;
  height: 3vh;
  width: ${(props) =>
    props.barAlign == "right" ? props.barWidth / 1.4 + "vw" : props.barWidth * 2.1 + "vw"//(props.barWidth-3)*100/8 : (props.barWidth-10)*100/40
  }
  }};
`
const ConstructionDiv = styled.div`
  display:flex;
  flex-direction:row;
  margin:1rem;
  justify-content:space-around;
`

const LeftDiv = styled.div`
  display:flex;
  flex-direction: column;
  margin:1rem;
  align-items:center;
`

const RightDiv = styled.div`
  display:flex;
  flex-direction: column;
  margin:1rem;
  align-items:center;
`

const EmptyBox = styled.div`
  width:23vw;
  height: 14vw;
  border-radius:20px;
  border: 2px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LeftHeading = styled.h1`
  color:green;
  padding:0.2rem;
  font-size:1.3rem;
  font-weight:bold;
`

const RightHeading = styled.h1`
  color:orange;
  padding:0.2rem;
  font-size:1.5rem;
  font-weight:bold;
`
const LocationDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  background: #D9D9D9;
  border-radius: 1.5vmin;
  width: 21vw;
  height: 3.5vw;
  padding: 0.3vw;

  // filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25));
`
const Containers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width:100%;
  margin-bottom: 15px;
`;
const Textbox = styled.textarea`
  width: 21.3vw;
  height: 11.5vh;
  border-radius: 10px;
  border: 2px solid green;
  padding: 0.2vw;
  font-size: 0.8vw;
  color: gray;

  &:focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  background-color: #519259;
  height: 7vh;
  color: white;
  font-size: 1vw;
  border-radius: 10px;
  cursor: pointer;
  width: 12vw;
  margin-top: 3.5vh;
`;

const NotesLabel = styled.div`
  /* font-family: 'Open Sans'; */
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 27px;
    text-align: right;

    color: #000000;
    display:flex;
    justify-content: right;
    width: 8vw;
    padding-right:1.5vw;
`

// todo: move styled components to css file

const Layout = () => {
  const [traditionalBuildTime, setTraditionalBuildTime] = useState(25);
  const [toggleMain, setToggleMain] = useState(true)
  const [raapBuildTime, setRaapBuildTime] = useState(18);
  const [traditionalCost, setTraditionalCost] = useState(0);
  const [raapTotalCost, setRaapTotalCost] = useState(0);
  const [raapIncrementalRevenue, setRaapIncrementalRevenue] = useState(calculateIncrementalRevenue(data.rooms.total));
  const [raapTotalNetCost, setRaapTotalNetCost] = useState(0);
  const [perRoom, setPerRoom] = useState(0);
  const [perSqft, setPerSqr] = useState(0);
  const total = raapTotalNetCost;
  const siteTotal = traditionalCost;
  const room = perRoom;
  const square = Math.floor(perSqft);
  const [roomsMin, setRoomsMin] = useState(data.rooms.min);
  const [roomsMax, setRoomsMax] = useState(data.rooms.max);
  const [roomValue, setRoomValue] = useState(70)
  const [averageValue, setAverageValue] = useState(0)
  const [siteCompTime, setSiteCompTime] = useState(0)
  const [receivedData, setReceivedData] = useState('');


  const onDataReceived = (data: number) => {
    setAverageValue(data);
  }

  const [displayImage, setDisplayImage] = useState("Glimmer")
  const [layoutType, setlayoutType] = useState("Layout")
  const [sliderValue, setSliderValue] = useState<number>(0);
  const pic1 = require("../../assets/pic1.jpg");
  const pic2 = require("../../assets/pic2.jpg");
  const pic3 = require("../../assets/pic3.jpg");
  const pic4 = require("../../assets/pic4.jpg");
  const pic5 = require("../../assets/pic5.jpg");
  const pic6 = require("../../assets/pic6.jpg");
  const pic7 = require("../../assets/pic7.jpg");

  const handleSliderChange = (event: any, value: number | number[]) => {
    setSliderValue(value as number);
  };
  const [dataFromChild, setDataFromChild] = useState<number>(0);

  const handleDataFromChild = (data: number) => {
    setDataFromChild(data);
    const resp = getValues(roomValue, averageValue)

    setRaapTotalNetCost(resp.netTotalCost ?? 0)
    setRaapTotalCost(resp.raapTotalCost)
    setPerRoom(resp.raapNetPerRoom ?? 0)
    setPerSqr(resp.raapNetPerSqft ?? 0)
    setTraditionalCost(resp.siteTotalCost ?? 0)
    setRaapBuildTime(resp.raapComplete)
    setTraditionalBuildTime(resp.siteComplete)
  };

  useEffect(() => {
    const resp = getValues(roomValue, averageValue)

    setRaapTotalNetCost(resp.netTotalCost)
    setRaapTotalCost(resp.raapTotalCost)
    setPerRoom(resp.raapNetPerRoom)
    setPerSqr(resp.raapNetPerSqft)
    setTraditionalCost(resp.siteTotalCost)
    setRaapBuildTime(resp.raapComplete)
    setTraditionalBuildTime(resp.siteComplete)
  }, [roomValue, averageValue])


  function formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  }

  const [state, setState] = useState("State")
  const [city, setCity] = useState("City")

  const [stateList, setStateList] = useState(Object.keys(data.location))
  const [cityList, setCityList] = useState(Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"])))

  const setNewCity = (value: string) => {
    setCity(value)
  }
  const updateCityList = (value: string) => {
    let newCityList = cityList;
    if (value === "California") {
      newCityList = Object.keys(data.location["California"])
    }
    else if (value === "Arizona") {
      newCityList = Object.keys(data.location["Arizona"])
    }
    else {
      newCityList = Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"]))
    }
    if (!(newCityList.includes(city))) {
      let cityAverage = (data.location as any)[value][newCityList[0]]
      setNewCity(newCityList[0])
    }
    setState(value)
    setCityList(newCityList)
  }

  const updateState = (value: string) => {
    let cityAverage = (data.location as any)["average"]
    if (Object.keys(data.location["Arizona"]).includes(value)) {
      setState("Arizona")
      cityAverage = (data.location["Arizona"] as any)[value];
    }
    else if (Object.keys(data.location["California"]).includes(value)) {
      setState("California")
      cityAverage = (data.location["California"] as any)[value];
    }
    else {
      setState("State")
    }
    console.log('the speial value', value)
    setNewCity(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GreenBox style={{ padding: "0.7vh 0.4vw 0.7vh 0.4vw" }}>
          <FirstColumnDiv style={{ margin: "0 0.07vh" }}>
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
          <ColumnDiv style={{ width: "24vw" }}>
            <div className="configurator__barHeader" style={{ textAlign: "right", paddingRight: "2vw" }}>Time to complete</div>
            <BarContainerLeft>
              <ColoredBar barAlign="right" barColor="gray" barWidth={traditionalBuildTime}>{traditionalBuildTime} Months</ColoredBar>
              <ColoredBar barAlign="right" barColor="green" barWidth={raapBuildTime}>{raapBuildTime} Months (28% faster)</ColoredBar>
              <ColoredBar style={{ visibility: "hidden" }} barAlign="right" barColor="yellow" barWidth={4}></ColoredBar>
            </BarContainerLeft>
          </ColumnDiv>
          <MiddleColumnDiv>
            <div className="configurator__barHeader" style={{ visibility: "hidden" }}>Time to complete</div>
            <EmptyBarContainer className="configurator__middleText">
              <EmptySliderDiv>Traditional Construction</EmptySliderDiv>
              <EmptySliderDiv>RaaP</EmptySliderDiv>
              <EmptySliderDiv>RaaP Net Cost (less incr. rev.)</EmptySliderDiv>
            </EmptyBarContainer>
          </MiddleColumnDiv>
          <ColumnDiv style={{ width: "24vw" }}>
            <div className="configurator__barHeader" style={{ textAlign: "left", paddingLeft: "3.6vw" }}>Project Cost</div>
            <BarContainerRight>
              <ColoredBar barAlign="left" barColor="gray" barWidth={traditionalCost}>${formatNumber(siteTotal)}</ColoredBar>
              <ColoredBar barAlign="left" barColor="green" barWidth={7.6}>${formatNumber(raapTotalCost)} (5% lower)</ColoredBar>
              <ColoredBar barAlign="left" barColor="yellow" barWidth={7.6 - raapIncrementalRevenue}>${formatNumber(raapTotalNetCost)} (16% lower)</ColoredBar>
            </BarContainerRight>
          </ColumnDiv>
          <LastColumnDiv>
            <BuildingRoomsHeader>
              Building
              <label className="toggle__switch">
                <input type="checkbox"></input>
                <span onClick={() => setToggleMain(toggleMain ? false : true)} className="toggle__slider toggle__round"></span>
              </label>
              Rooms
            </BuildingRoomsHeader>
            <FourDivs>
              <Row>
                <WhiteBox>
                  <BoldText>{raapBuildTime} Months</BoldText>
                  <NormalText>Build Time</NormalText>
                </WhiteBox>
                <WhiteBox>
                  <BoldText>${formatNumber(total)}</BoldText>
                  <NormalText>Project Cost</NormalText>
                </WhiteBox>
              </Row>
              <Row>
                <WhiteBox>
                  <BoldText>${formatNumber(room)}</BoldText>
                  <NormalText>Per Room</NormalText>
                </WhiteBox>
                <WhiteBox>
                  <BoldText>${formatNumber(square)}</BoldText>
                  <NormalText>Per sq. ft.</NormalText>
                </WhiteBox>
              </Row>
            </FourDivs>
          </LastColumnDiv>
        </GreenBox>
        {
          toggleMain ?
            <MainArea>
              <DisplayArea>
                <DisplayContent
                  finishType={displayImage}
                  layoutType={layoutType}
                ></DisplayContent>
                <LayoutButtons>
                  <DisplayTypes
                    onClickButton={(value: string) => setlayoutType(value)}
                  ></DisplayTypes>
                </LayoutButtons>
              </DisplayArea>
              {/* <ButtonArea>
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
          </ButtonArea> */}
              <div className="controls_container">
                <div className="buttons_area">
                  <Buttons
                    setTraditionalBuildTime={(value: number) => setTraditionalBuildTime(value)}
                    changeDisplayImage={(value: string) => setDisplayImage(value)}
                    onDataReceived={onDataReceived}
                  ></Buttons>
                  <VerticalSlider
                    onData={handleDataFromChild}
                    range={{ min: roomsMin, max: roomsMax }}
                    setRoomsValue={setRoomValue}
                    setRaapIncrementalRevenue={(value: number) => {
                      setRoomValue(value)
                      setRaapIncrementalRevenue(value)
                    }}
                  ></VerticalSlider>
                  {/* <VerticalSlider></VerticalSlider> */}
                </div>
                <div className="notes_container">
                  <Notes
                    title={data.notes.title}
                    placeholderText={data.notes.placeholderText}
                    submitButtonText={data.notes.submitButtonText}
                  ></Notes>
                </div>
              </div>
            </MainArea>
            :
            <div>
              <div className="RoomsContent">
                <div className="imageBoxes">
                  <ConstructionDiv>
                    <LeftDiv>
                      <LeftHeading>Traditional Contruction</LeftHeading>
                      {/* <p>Cost: $9M     Revenue:30 Months</p> */}
                      <EmptyBox>
                        <img
                          className='emptyImageBox'
                          src={
                            sliderValue == 1 ?
                              pic1 : sliderValue == 2 ?
                                pic2 : sliderValue == 3 ?
                                  pic3 : sliderValue == 4 ?
                                    pic4 : sliderValue == 5 ?
                                      pic5 : sliderValue == 6 ?
                                        pic6 : sliderValue == 7 ?
                                          pic7 : null
                          }
                        />
                      </EmptyBox>
                    </LeftDiv>
                    <RightDiv>
                      <RightHeading>RaaP Offsite</RightHeading>
                      {/* <p>Cost: $9M     Revenue:30 Months</p> */}
                      <EmptyBox>
                        <img
                          className='emptyImageBox'
                          src={
                            sliderValue == 1 ?
                              pic1 : sliderValue == 2 ?
                                pic3 : sliderValue == 3 ?
                                  pic4 : sliderValue == 4 ?
                                    pic5 : sliderValue == 5 ?
                                      pic6 : sliderValue == 6 ?
                                        pic7 : sliderValue == 7 ?
                                          pic7 : null
                          }
                        />
                      </EmptyBox>
                    </RightDiv>
                  </ConstructionDiv>
                </div>
                <div style={{ marginTop: 20, width: '94%' }}>
                  <div style={{ height: 'auto', width: 'auto' }} className="scrollable_buttons">
                    <div className="location__container">
                      <div className="location__label">Location</div>
                      <LocationDiv>
                        <DropdownButton name={city} onClickDropdown={updateState} options={cityList}></DropdownButton>
                        <DropdownButton name={state} onClickDropdown={updateCityList} options={stateList}></DropdownButton>
                      </LocationDiv>
                    </div>
                    <RadioButton name="Brand" labels={data.brand}></RadioButton>
                    <div style={{ marginLeft: 0 }} className="notes_container">
                      {/* <Notes
                        title={data.notes.title}
                        placeholderText={data.notes.placeholderText}
                        submitButtonText={data.notes.submitButtonText}
                      ></Notes> */}
                      <NotesLabel>Notes</NotesLabel>
                      <Containers>
                        <Textbox placeholder="Anything Other Customization" />
                        <SubmitButton>Send me this estimate</SubmitButton>
                        <SubmitButton>Send Scheduele Docs</SubmitButton>
                      </Containers>
                    </div>
                  </div>
                </div>
                <VerticalSlider
                  onData={handleDataFromChild}
                  range={{ min: roomsMin, max: roomsMax }}
                  setRaapIncrementalRevenue={(value: number) => setRaapIncrementalRevenue(value)}
                ></VerticalSlider>
              </div>
              <div style={{ display: 'flex', gridGap: 20, alignItems: 'center' }}>
                <div className="bottomSlider" style={{ marginLeft: 30 }}>
                  <div style={{ justifyContent: 'space-between', marginBottom: 10 }} className="sliderTitles">
                    <div className="titleFlex">
                      <h2>Day 0</h2>
                      <p>Start Hotel Projct</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 6</h2>
                      <p>Pre Construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 12</h2>
                      <p>Design</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 18</h2>
                      <p>Foundation</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 30</h2>
                      <p>Delivery</p>
                    </div>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <div >
                      <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        // marks={marks}
                        step={1}
                        min={1}
                        max={5}
                        sx={{
                          color: '#a6a6a6', // specify your custom color here
                          '& .MuiSlider-thumb': {
                            color: '#a6a6a6', // apply the same color to the thumb
                            padding: 1,
                            border: '6px solid #404040'
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        defaultValue={1}
                        step={1}
                        marks
                        min={1}
                        max={6}
                        sx={{
                          color: '#519259', // specify your custom color here
                          '& .MuiSlider-thumb': {
                            color: '#519259', // apply the same color to the thumb
                            padding: 1,
                            border: '6px solid #404040'
                          },
                        }}
                      />
                    </div>
                  </Box>
                  <div style={{ justifyContent: 'space-between' }} className="sliderTitles">
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Day 0</h2>
                      <p>Start Hotel Projct</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 6</h2>
                      <p>Pre Construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 12</h2>
                      <p>Design</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 18</h2>
                      <p>Foundation</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 16</h2>
                      <p>Build Rooms</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 21</h2>
                      <p>Delivery</p>
                    </div>
                  </div>
                </div>
                <div style={{
                  position: "relative",
                  bottom: 130
                }}>
                  <h2 style={{ width: 90, fontWeight: 700, marginBottom: 10 }}>Traditional</h2>
                  <h2 style={{ color: '#edaa38', width: 90, fontWeight: 700 }}>RaaP</h2>
                </div>
              </div>
            </div>

        }
      </Container>
    </ThemeProvider>
  )
}

export default Layout;