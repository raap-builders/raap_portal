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

const backgroundImage = require("../../assets/RoomLayout/pic1.png");
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
  width: 270px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 3px;
  padding: 6px 0px
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
    props.barAlign == "right" ? props.barWidth / 1.4 + "vw" : props.barWidth * 1.6 + "vw"//(props.barWidth-3)*100/8 : (props.barWidth-10)*100/40
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
  height: 5vh;
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

  const marks = [
    {
      value: 1,
      label: <div className="SliderMark"></div>,
    },
    {
      value: 2,
      label: <div className="SliderMark"></div>,
    },
    {
      value: 3,
      label: <div className="SliderMark"></div>,
    },
    {
      value: 4,
      label: <div className="SliderMark"></div>,
    },
    {
      value: 5,
      label: <div className="SliderMark"></div>,
    },
    {
      value: 6,
      label: <div className="SliderMark"></div>,
    },
  ];
  const marksRaap = [
    {
      value: 1,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 2,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 3,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 4,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 5,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 6,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 7,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 8,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
    {
      value: 9,
      label: <div className="SliderMarkRaap SliderMark"></div>,
    },
  ];

  const onDataReceived = (data: number) => {
    setAverageValue(data);
  }

  const [displayImage, setDisplayImage] = useState("Glimmer")
  const [projectType, setProjectType] = useState("Bathroom Pod")
  const [layoutType, setlayoutType] = useState("Layout")
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [sliderValue2, setSliderValue2] = useState<number>(0);
  const trad1 = require("../../assets/Progress/Traditional/pic1.jpg");
  const trad2 = require("../../assets/Progress/Traditional/pic2.jpg");
  const trad3 = require("../../assets/Progress/Traditional/pic3.jpg");
  const trad4 = require("../../assets/Progress/Traditional/pic4.jpg");
  const trad5 = require("../../assets/Progress/Traditional/pic5.jpg");
  const pic1 = require("../../assets/Progress/raap/pic1.jpg");
  const pic2 = require("../../assets/Progress/raap/pic2.jpg");
  const pic3 = require("../../assets/Progress/raap/pic3.jpg");
  const pic4 = require("../../assets/Progress/raap/pic4.jpg");
  const pic5 = require("../../assets/Progress/raap/pic5.jpg");
  const pic6 = require("../../assets/Progress/raap/pic6.jpg");
  const pic7 = require("../../assets/Progress/raap/pic7.jpg");
  const pic8 = require("../../assets/Progress/raap/pic8.jpg");
  const pic9 = require("../../assets/Progress/raap/pic9.jpg");

  const handleSliderChange = (event: any, value: number | number[]) => {
    setSliderValue(value as number);
  };
  const handleSliderChange2 = (event: any, value: number | number[]) => {
    setSliderValue2(value as number);
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

  console.log()
  function formatNumber(num: number): string {
    if (num < 0) {
      num = 0;
    }

    // Extract the non-decimal part of the number
    const nonDecimalPart = Math.floor(num);

    if (nonDecimalPart >= 1000000) {
      const roundedNum = Math.round(nonDecimalPart / 1000000);
      return roundedNum.toFixed(0) + 'M';
    } else if (nonDecimalPart >= 1000) {
      const roundedNum = Math.round(nonDecimalPart / 1000);
      return roundedNum.toFixed(0) + 'K';
    } else {
      return nonDecimalPart.toString();
    }
  }

  const [formattedValue, setFormattedValue] = useState('');
  const [numericValue, setNumericValue] = useState(0);

  useEffect(() => {
    const formatted = formatNumber(siteTotal);
    setFormattedValue(formatted);

    const splitArray = formatted.split(/[A-Za-z]+/);
    const newNumericValue = parseInt(splitArray[0]);
    setNumericValue(newNumericValue);
    console.log('siteTotal', newNumericValue)
  }, [siteTotal]);
  const [state, setState] = useState("State")
  const [city, setCity] = useState("City")

  const [stateList, setStateList] = useState(Object.keys(data.location))
  const [cityList, setCityList] = useState(Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"])))

  const setNewCity = (value: string, average: number) => {
    setCity(value)
    setAverageValue(average)
    onDataReceived(average)
    // setTraditionalBuildTime(average)
    console.log("average for " + value + " is " + average)
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
      setNewCity(newCityList[0], cityAverage)
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
    setNewCity(value, cityAverage)
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
              <ColoredBar barAlign="right" barColor="gray" barWidth={traditionalBuildTime - 5}>{traditionalBuildTime} Months</ColoredBar>
              <ColoredBar barAlign="right" barColor="green" barWidth={raapBuildTime}>{raapBuildTime} Months (28% faster)</ColoredBar>
              <ColoredBar style={{ visibility: "hidden" }} barAlign="right" barColor="yellow" barWidth={4}></ColoredBar>
            </BarContainerLeft>
          </ColumnDiv>
          <MiddleColumnDiv>
            <div className="configurator__barHeader" style={{ visibility: "hidden" }}>Time to complete</div>
            <EmptyBarContainer className="configurator__middleText">
              <EmptySliderDiv>
                <div style={{ width: '100%', borderBottom: '2px solid #878787' }}></div>
                <span style={{ whiteSpace: 'nowrap' }}>Traditional Construction</span>
                <div style={{ width: '100%', borderBottom: '2px solid #878787' }}></div>
              </EmptySliderDiv>
              <EmptySliderDiv>
                <div style={{ width: '100%', borderBottom: '2px solid #519259' }}></div>
                <span style={{ whiteSpace: 'nowrap' }}>RaaP</span>
                <div style={{ width: '100%', borderBottom: '2px solid #519259' }}></div>
              </EmptySliderDiv>
              <EmptySliderDiv>RaaP Net Cost (less incr. rev.)</EmptySliderDiv>
            </EmptyBarContainer>
          </MiddleColumnDiv>
          <ColumnDiv style={{ width: "24vw" }}>
            <div className="configurator__barHeader" style={{ textAlign: "left", paddingLeft: "3.6vw" }}>Project Cost</div>
            <BarContainerRight>
              <ColoredBar barAlign="left" barColor="gray" barWidth={numericValue - 3.2}>${formatNumber(siteTotal)}</ColoredBar>
              <ColoredBar barAlign="left" barColor="green" barWidth={numericValue - 3.6}>${formatNumber(raapTotalCost)} (5% lower)</ColoredBar>
              <ColoredBar barAlign="left" barColor="yellow" barWidth={7.6 - raapIncrementalRevenue}>${formatNumber(raapTotalNetCost)} (16% lower)</ColoredBar>
            </BarContainerRight>
          </ColumnDiv>
          <LastColumnDiv>
            <BuildingRoomsHeader>
              Hotel
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
                  <BoldText>${formatNumber(Math.round(total))}</BoldText>
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

            <div>
              <div className="RoomsContent">
                <div className="imageBoxes">
                  <ConstructionDiv>
                    <LeftDiv>
                      <LeftHeading>Traditional Contruction</LeftHeading>
                      {/* <p>Cost: $9M     Revenue:30 Months</p> */}
                      <EmptyBox style={{ borderColor: '#519259' }}>
                        <img
                          className='emptyImageBox'
                          src={
                            sliderValue == 0 ?
                              trad1 : sliderValue == 1 ?
                                trad1 : sliderValue == 2 ?
                                  trad2 : sliderValue == 3 ?
                                    trad2 : sliderValue == 4 ?
                                      trad3 : sliderValue == 5 ?
                                        trad4 : sliderValue == 6 ?
                                          trad5 : null
                          }
                        />
                      </EmptyBox>
                    </LeftDiv>
                    <RightDiv>
                      <RightHeading>RaaP Offsite</RightHeading>
                      {/* <p>Cost: $9M     Revenue:30 Months</p> */}
                      <EmptyBox style={{ borderColor: '#F6AA2A' }}>
                        <img
                          className='emptyImageBox'
                          src={
                            sliderValue2 == 0 ?
                              pic1 : sliderValue2 == 1 ?
                                pic1 : sliderValue2 == 2 ?
                                  pic2 : sliderValue2 == 3 ?
                                    pic3 : sliderValue2 == 4 ?
                                      pic4 : sliderValue2 == 5 ?
                                        pic5 : sliderValue2 == 6 ?
                                          pic6 : sliderValue2 == 7 ?
                                            pic7 : sliderValue2 == 8 ?
                                              pic8 : sliderValue2 == 9 ?
                                                pic9 : null
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
                      <Notes
                        title={data.notes.title}
                        placeholderText={data.notes.placeholderText}
                        submitButtonText={data.notes.submitButtonText}
                        isUpper={true}
                      ></Notes>
                    </div>
                  </div>
                </div>
                <VerticalSlider
                  onData={handleDataFromChild}
                  range={{ min: roomsMin, max: roomsMax }}
                  setRoomsValue={setRoomValue}
                  setRaapIncrementalRevenue={(value: number) => {
                    setRoomValue(value)
                    setRaapIncrementalRevenue(value)
                  }}
                ></VerticalSlider>
              </div>
              <div style={{ display: 'flex', gridGap: 20, alignItems: 'center' }}>
                <div className="bottomSlider" style={{ marginLeft: 30 }}>
                  <div style={{ justifyContent: 'space-between', marginBottom: 10 }} className="sliderTitles">

                    <div className="titleFlex">
                      <h2>Day 0</h2>
                      <p>Start</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 2</h2>
                      <p>Schematics</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 7</h2>
                      <p>Pre-construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 12</h2>
                      <p>Permits & Loans</p>
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
                        marks={marks}
                        step={1}
                        min={1}
                        max={6}
                        sx={{
                          color: '#404040', // specify your custom color here
                          '& .MuiSlider-thumb': {
                            color: '#a6a6a6', // apply the same color to the thumb
                            padding: 1,
                            border: '6px solid #404040'
                          }
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', alignItems: 'flex-start', }}>
                      <Slider
                        value={sliderValue2}
                        onChange={handleSliderChange2}
                        defaultValue={1}
                        step={1}
                        marks={marksRaap}
                        min={1}
                        max={9}
                        sx={{
                          color: '#404040',
                          '& .MuiSlider-thumb': {
                            color: '#519259',
                            padding: 1,
                            border: '6px solid #404040',
                            marginBottom: 0
                          },
                        }}
                      />
                      <div style={{
                        borderBottom: '3px solid',
                        borderStyle: 'dashed',
                        width: '100%',
                        marginTop: 14,
                        borderColor: '#a6a6a6'
                      }}></div>
                    </div>
                  </Box>
                  <div style={{ justifyContent: 'space-between', marginRight: 130 }} className="sliderTitles">
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Day 0</h2>
                      <p>Start</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 2</h2>
                      <p>Schematics</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 5</h2>
                      <p>Pre-construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 9</h2>
                      <p>Permits & Loans</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 15</h2>
                      <p>Foundation</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 21</h2>
                      <p>Delivery</p>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  position: "relative",
                  bottom: 45,
                  gridGap: 28,
                  marginBottom: 18
                }}>
                  <h2 style={{ width: 90, fontWeight: 700, marginBottom: 10 }}>Traditional</h2>
                  <h2 style={{ color: '#edaa38', width: 90, fontWeight: 700 }}>RaaP</h2>
                </div>
              </div>
            </div>
            :
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

              <div className="controls_container">
                <div className="buttons_area">
                  <LocationDiv>
                    <DropdownButton name={city} onClickDropdown={updateState} options={cityList}></DropdownButton>
                    <DropdownButton name={state} onClickDropdown={updateCityList} options={stateList}></DropdownButton>
                  </LocationDiv>
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
                <div>
                  <Notes
                    isUpper={false}
                    title={data.notes.title}
                    placeholderText={data.notes.placeholderText}
                    submitButtonText={data.notes.submitButtonText}
                  ></Notes>
                </div>
              </div>
            </MainArea>
        }
      </Container>
    </ThemeProvider >
  )
}

export default Layout;