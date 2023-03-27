import { useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { calculateIncrementalRevenue } from "../utils/configuratorUtils";
import data from '../data/configurator'

interface Props {
  range: { min: number; max: number },
  setRaapIncrementalRevenue: (arg0: number) => any,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin:0 3rem;
`;

const Slider = styled.input.attrs({ type: "range" })`
  flex-grow: 1;
  margin: 0 20px;
  -webkit-appearance: none;
  height: 4px;
  background-color: ${props => props.theme.colors.darkGreen};
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme.colors.darkGreen};
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -2.5px;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme.colors.darkGreen};
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -2.5px;
  }
`;

const Value = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGreen};
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.green};
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: black;
`;

const LabelContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
`

const LabelSlider = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  margin: 0.2rem 1rem;
`

const RangeSlider = ({ range, setRaapIncrementalRevenue }: Props) => {
  const [value, setValue] = useState(data.rooms.total);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    let incrementalRevenue = calculateIncrementalRevenue(newValue)
    setRaapIncrementalRevenue(incrementalRevenue)
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LabelContainer>
          <Text>#Rooms</Text>
          {/* <Value>{value}</Value> */}
          <Value
            type="number"
            min={70}
            max={150}
            value={value}
            onChange={handleChange}
            className="slider"
          />
        </LabelContainer>
        <Slider
          min={range.min}
          max={range.max}
          value={value}
          onChange={handleChange}
        />
        <LabelSlider>
         <div className="slider-min">{range.min}</div>
         <div className="slider-max">{range.max}</div>
       </LabelSlider>
      </Container>
    </ThemeProvider>
  );
};

export default RangeSlider;
