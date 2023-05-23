import React, { useRef } from "react";
import '../styles/buttons.css';
import data from '../data/configurator'

import DropdownButton from './DropdownButton'
import RadioButton from './RadioButtons/RadioButton'
import styled from 'styled-components';


interface Props {
  setTraditionalBuildTime: (arg0: number) => any,
  changeDisplayImage: (arg0: string) => any
  onDataReceived: (data: number) => void;
  showButton: boolean;
}

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

// const ButtonsContainerDiv = styled.div`
//   margin:0.1rem 3rem;
// `

const Buttons = ({ setTraditionalBuildTime, changeDisplayImage, onDataReceived, showButton }: Props) => {
  const [state, setState] = React.useState("State")
  const [city, setCity] = React.useState("City")
  const [averageValue, setAverageValue] = React.useState(0)
  // const [locationAverage, setLocationAverage] = React.useState<number>(0)

  const [stateList, setStateList] = React.useState(Object.keys(data.location))
  const [cityList, setCityList] = React.useState(Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"])))
  const sendDataToParent = () => {
    onDataReceived(averageValue); // Call the callback function with the data to send to the parent
  }
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

  const onChangeFinish = (value: string) => {
    changeDisplayImage(value)
  }

  return (
    <div className="scrollable_buttons">
      <div className="location__container">
        <>{sendDataToParent}</>
        <div className="location__label">Location</div>
        <LocationDiv>
          <DropdownButton name={city} onClickDropdown={updateState} options={cityList}></DropdownButton>
          <DropdownButton name={state} onClickDropdown={updateCityList} options={stateList}></DropdownButton>
        </LocationDiv>
      </div>
      <RadioButton name="Brand" labels={data.brand}></RadioButton>
      {
       showButton ?
       <>
       <RadioButton name="Project Type" labels={data.projectTypes} onClickButton={onChangeFinish}></RadioButton>
       <RadioButton name="Finish" labels={data.finishTypes} onClickButton={onChangeFinish}></RadioButton>
       </>
        :
        null
      }
    </div>
  );
}

export default Buttons;
