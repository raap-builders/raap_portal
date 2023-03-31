import { useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'
import "./slider.css";


interface Props {
  range: { min: number; max: number },
  setRaapIncrementalRevenue: (arg0: number) => any,
}

const VerticalSlider = ({ range, setRaapIncrementalRevenue }: Props) => {
  const [value, setValue] = useState(data.rooms.total);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    let incrementalRevenue = calculateIncrementalRevenue(newValue)
    setRaapIncrementalRevenue(incrementalRevenue)
    setValue(newValue);
  };
  return (
    <div className="verticalSlider__background">

    </div>
  )
}

export default VerticalSlider;