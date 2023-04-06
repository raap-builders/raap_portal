import { useState } from "react";
import styled from "styled-components";

import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'
import "./slider.css";
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#519259',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    secondary: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    secondary?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true;
  }
}

const Value = styled.input`
  text-align:center;
  padding-left:0.8vw;
  margin-left:0.5vw;
  width: 4vw;
  height: 1.5vw;
  font-size: 1.1vw;
  color: ${props => props.theme.colors.figmaGreen};
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.figmaGreen};
`;

interface VerticalSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

interface Props {
  range: { min: number; max: number },
  setRaapIncrementalRevenue: (arg0: number) => any,
}

const VerticalSlider = ({ range, setRaapIncrementalRevenue }: Props) => {
  const [value, setValue] = useState(data.rooms.total);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    let incrementalRevenue = calculateIncrementalRevenue(newValue)
    setRaapIncrementalRevenue(incrementalRevenue)
    setValue(newValue);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue)
    let incrementalRevenue = calculateIncrementalRevenue(newValue as number)
    setRaapIncrementalRevenue(incrementalRevenue)
    setValue(newValue as number);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="verticalSlider_container">
      <div className="verticalSlider__background">
        <div className="verticalSlider__container">
          <div className="verticalSlider__minmax">{range.max}</div>
            <Slider
              style={{paddingLeft: 0}}
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              orientation="vertical"
              min={range.min}
              max={range.max}
              step={1}
              value={value}
              onChange={handleChange}
              color="secondary"
            />
          
        <div className="verticalSlider__minmax">{range.min}</div>
        {/* <div>Rooms</div> */}
        </div>
      </div>
      <div className="verticalSlider__label">#Rooms
            <Value
              type="number"
              min={range.min}
              max={range.max}
              value={value}
              onChange={handleNumberChange}
              className="slider"
            /></div>
      </div>
    </MuiThemeProvider>
  );
};

export default VerticalSlider;