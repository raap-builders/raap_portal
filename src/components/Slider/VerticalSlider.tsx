// import React, { useState } from 'react';
// import VerticalSliderNew from './VerticalSliderNew';

// const VerticalSlider = () => {
//   const [value, setValue] = useState(50);

//   const handleChange = (newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <VerticalSliderNew value={value} onChange={handleChange} min={0} max={100} />
//       <p>{value}</p>
//     </div>
//   );
// };

// export default VerticalSlider;








import { useState } from "react";
import styled from "styled-components";

import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
import data from '../../data/configurator'
import "./slider.css";


// const SliderContainer = styled.div`
//   width: 10vw;
//   height: 90vh;
//   background-color: #ccc;
//   border-radius: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Slider = styled.input.attrs({
//   type: 'range',
// })`
//   width: 80%;
//   height: 3px;
//   background-color: #fff;
//   -webkit-appearance: none;
//   outline: none;
//   transform: rotateZ(270deg);

//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 20px;
//     height: 20px;
//     background-color: #fff;
//     border-radius: 50%;
//     cursor: pointer;
//   }
// `;

// const Slider = styled.input.attrs({
//   type: 'range',
// })`
//   width: 80vh;
//   height: 3px;
//   background-color: #fff;
//   -webkit-appearance: none;
//   outline: none;
//   transform: rotateZ(270deg);

//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 20px;
//     height: 20px;
//     background-color: #fff;
//     border-radius: 50%;
//     cursor: pointer;
//   }
// `;

const Slider = styled.input.attrs({ type: "range" })`
  flex-grow: 1;
  -webkit-appearance: none;
  height: 4px;
  background-color: ${props => props.theme.colors.figmaGreen};
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3vmin;
    height: 3vmin;
    background-color: ${props => props.theme.colors.figmaGreen};
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 3vmin;
    height: 3vmin;
    background-color: ${props => props.theme.colors.figmaGreen};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Value = styled.input`
  text-align:center;
  padding-left:1vw;
  margin-left:1vw;
  width: 4vw;
  height: 2vw;
  font-size: 1rem;
  color: ${props => props.theme.colors.darkGreen};
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.green};
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    let incrementalRevenue = calculateIncrementalRevenue(newValue)
    setRaapIncrementalRevenue(incrementalRevenue)
    setValue(newValue);
  };

  return (
    <div className="verticalSlider_container">
    <div className="verticalSlider__background">
      <div className="verticalSlider__container">
      <div className="verticalSlider__minmax">{range.min}</div>
        <Slider
          min={range.min}
          max={range.max}
          step={1}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="verticalSlider__minmax">{range.max}</div>
      {/* <div>Rooms</div> */}
    </div>
    <div className="verticalSlider__label">#Rooms
          <Value
            type="number"
            min={range.min}
            max={range.max}
            value={value}
            onChange={handleChange}
            className="slider"
          /></div>
    </div>
  );
};

export default VerticalSlider;

// // import { useState } from "react";
// // import styled from "styled-components";

// // import { ThemeProvider } from 'styled-components';
// // import theme from '../../theme';
// // import { calculateIncrementalRevenue } from "../../utils/configuratorUtils";
// // import data from '../../data/configurator'
// // import "./slider.css";


// // interface Props {
// //   range: { min: number; max: number },
// //   setRaapIncrementalRevenue: (arg0: number) => any,
// // }

// // const Slider = styled.input.attrs({ type: "range" })`
// //   flex-grow: 1;
// //   margin: 0 20px;
// //   transform-origin: center left;
// //   -webkit-appearance: none;
// //   height: 4px;
// //   background-color: ${props => props.theme.colors.darkGreen};
// //   outline: none;
// //   transform: rotateZ(270deg);
  
// //   &::-webkit-slider-thumb {
// //     -webkit-appearance: none;
// //     width: 20px;
// //     height: 20px;
// //     background-color: ${props => props.theme.colors.darkGreen};
// //     border: 2px solid white;
// //     border-radius: 50%;
// //     cursor: pointer;
// //     margin-top: -2.5px;
// //   }
// //   &::-moz-range-thumb {
// //     width: 20px;
// //     height: 20px;
// //     background-color: ${props => props.theme.colors.darkGreen};
// //     border: 2px solid white;
// //     border-radius: 50%;
// //     cursor: pointer;
// //     margin-top: -2.5px;
// //   }
// // `;

// // const VerticalSlider = ({ range, setRaapIncrementalRevenue }: Props) => {
// //   const [value, setValue] = useState(data.rooms.total);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     let newValue = parseInt(e.target.value);
// //     let incrementalRevenue = calculateIncrementalRevenue(newValue)
// //     setRaapIncrementalRevenue(incrementalRevenue)
// //     setValue(newValue);
// //   };

// //   return (
// //     <>
// //       <div className="verticalSlider__background">
// //       <Slider
// //         min={range.min}
// //         max={range.max}
// //         value={value}
// //         onChange={handleChange}
// //       />
// //       </div>
      
// //   </>
// //   )
// // }

// // export default VerticalSlider;