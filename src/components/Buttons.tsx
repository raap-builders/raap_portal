import React, { useRef } from "react";
import '../styles/buttons.css';
import data from '../data/configurator'

import DropdownButton from './DropdownButton'
import ThreeButtons from './ThreeButtons'
import styled from 'styled-components';


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


const Buttons = () => {
  const [state, setState] = React.useState(Object.keys(data.location)[0] || "")
  // console.log(data);

  const cities:any = data.location["California"];

  return (
    <ButtonsContainerDiv>
      <LocationDiv>
          <Text>Location</Text>
          <DropdownButton name="City" onClickDropdown={(value)=>{setState(value)}} options={Object.keys(data.location)}></DropdownButton>
          <DropdownButton name="State" onClickDropdown={()=>{}} options={Object.keys(cities)}></DropdownButton>
      </LocationDiv>
        <ThreeButtons name="Brand" labels={["Tru","Home2","Hampton"]}></ThreeButtons>
        <ThreeButtons name="Project Type" labels={["Bathroom Pod","Volumetric Room","Kitchen Pod"]}></ThreeButtons>
        <ThreeButtons name="Finish" labels={["Glimmer","Spark","Burst"]}></ThreeButtons>
    </ButtonsContainerDiv>
  );
}

export default Buttons;
