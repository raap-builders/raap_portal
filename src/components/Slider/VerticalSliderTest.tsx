import React, { useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  height: 50vh;
  position: relative;
`;

const SliderTrack = styled.div`
  background-color: #eee;
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderThumb = styled.div`
  background-color: #333;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translate(-50%, 0);
  width: 50px;
`;

interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const VerticalSliderNew = ({
  value,
  onChange,
  min,
  max,
}:VerticalSliderProps) => {
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const sliderTrack = event.currentTarget;
      const sliderTrackHeight = sliderTrack.clientHeight;
      const sliderTrackTop = sliderTrack.getBoundingClientRect().top + window.pageYOffset;
      const position = event.pageY - sliderTrackTop;
      let newValue = Math.round(((max - min) * position) / sliderTrackHeight + min);
      newValue = Math.max(min, Math.min(max, newValue));
      onChange(newValue);
    }
  };

  return (
    <SliderContainer>
      <SliderTrack onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
        <SliderThumb style={{ top: `${((value - min) / (max - min)) * 100}%` }} />
      </SliderTrack>
    </SliderContainer>
  );
};

export default VerticalSliderNew;