import React, { useState } from "react";
import styled from "styled-components";
import "./radioButtons.css"

interface Props {
  labels: string[];
  name: string;
  onClickButton?: (arg0: string) => any,
};

// const StyledButton = styled.button<{ selected: boolean }>`
//   background-color:  ${(props) =>
//     props.selected ? "green" : "transparent"};
//   color:  ${(props) =>
//     props.selected ? "white" : "green"};
//   border: 1px solid green;
//   border-radius: 10px;
//   // padding: 10px 30px;
//   padding: 1vw;
//   width: 10vw;
//   height: 5vh;
//   font-size: 2vh;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   &:hover {
//     opacity: 0.8;
//   }
// `;

const StyledButton = styled.button<{ selected: boolean }>`
  background-color:  ${(props) =>
    props.selected ? "#519259;" : "transparent"};
  color:  ${(props) =>
    props.selected ? "white" : "black"};
  // border: 1px solid green;
  border-radius: 1vw;
  width: 100%;
  height: 100%;
  font-size: 0.9vw;
  line-height: 1vw;
  cursor: pointer;
  text-align: center;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const RadioButton = ({ labels, name, onClickButton }: Props) => {
  const [selectedButton, setSelectedButton] = useState<string>(labels[0]);

  const handleButtonClick = (label: string) => {
    setSelectedButton(label);
    if(onClickButton){
      onClickButton(label);
    }
  };
  
  return (
    <div className="radioButton__container">
      <div className="radioButton__label">{name}</div>
      <div className="radioButton__background">
        {labels.map((label) => (
          <StyledButton
            key={label}
            selected={selectedButton === label}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </StyledButton>
        ))}
      </div>
    </div>
  )
}

export default RadioButton;