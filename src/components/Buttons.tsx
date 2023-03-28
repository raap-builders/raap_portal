import React, { useRef } from "react";
import '../styles/buttons.css';
import data from '../data/configurator'

import DropdownButton from './DropdownButton'
import ThreeButtons from './ThreeButtons'
import styled from 'styled-components';


interface Props {
  setTraditionalBuildTime: (arg0: number) => any,
  changeDisplayImage: (arg0: string) => any
}

const LocationDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

const Text = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: black;
`;

const ButtonsContainerDiv = styled.div`
  margin:0.1rem 3rem;
`


const Buttons = ({setTraditionalBuildTime, changeDisplayImage}:Props) => {
  const [state, setState] = React.useState("State")
  const [city, setCity] = React.useState("City")

  const [stateList, setStateList] = React.useState(Object.keys(data.location))
  const [cityList, setCityList] = React.useState(Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"])))

  const setNewCity = (value:string, average:number) => {
    setCity(value)
    setTraditionalBuildTime(average)
    console.log("average for "+value+" is "+average)
  }

  const updateCityList = (value: string) => {
    let newCityList = cityList;
    if(value==="California"){
      newCityList = Object.keys(data.location["California"])
    }
    else if(value==="Arizona"){
      newCityList = Object.keys(data.location["Arizona"])
    }
    else{
      newCityList = Object.keys(data.location["California"]).concat(Object.keys(data.location["Arizona"]))
    }
    if(!(newCityList.includes(city))){
      let cityAverage = (data.location as any)[value][newCityList[0]]
      setNewCity(newCityList[0],cityAverage)
    }
    setState(value)
    setCityList(newCityList)
  }

  const updateState = (value: string) => {
    let cityAverage = (data.location as any)["average"]
    if(Object.keys(data.location["Arizona"]).includes(value)){
      setState("Arizona")
      cityAverage = (data.location["Arizona"] as any)[value];
    }
    else if(Object.keys(data.location["California"]).includes(value)){
      setState("California")
      cityAverage = (data.location["California"] as any)[value];
    }
    else{
      setState("State")
    }
    setNewCity(value,cityAverage)
  }

  const onChangeFinish = (value: string) => {
    changeDisplayImage(value)
  }

  return (
    <ButtonsContainerDiv>
      <LocationDiv>
          <Text>Location</Text>
          <DropdownButton name={city} onClickDropdown={updateState} options={cityList}></DropdownButton>
          <DropdownButton name={state} onClickDropdown={updateCityList} options={stateList}></DropdownButton>
      </LocationDiv>
        <ThreeButtons name="Brand" labels={data.brand}></ThreeButtons>
        <ThreeButtons name="Project Type" labels={data.projectTypes}></ThreeButtons>
        <ThreeButtons name="Finish" labels={data.finishTypes} onClickButton={onChangeFinish}></ThreeButtons>
    </ButtonsContainerDiv>
  );
}

export default Buttons;
