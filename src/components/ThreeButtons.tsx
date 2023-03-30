import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  labels: string[];
  name: string;
  onClickButton?: (arg0: string) => any,
};

const ButtonsContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Button = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? "#3AC162" : "transparent"};
  color: ${(props) => (props.selected ? "#FFFFFF" : "#3AC162")};
  font-weight: bold;
  font-size: 16px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #3ac162;
    color: #ffffff;
  }
`;

const StyledButton = styled.button<{ selected: boolean }>`
  background-color:  ${(props) =>
    props.selected ? "green" : "transparent"};
  color:  ${(props) =>
    props.selected ? "white" : "green"};
  border: 1px solid green;
  border-radius: 10px;
  // padding: 10px 30px;
  padding: 1vw;
  width: 10vw;
  height: 5vh;
  font-size: 2vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 2vmin;
  color: black;
  padding: 0.5vmin 0;
`;

const ButtonGroup: React.FC<Props> = ({ labels, name, onClickButton }) => {
  const [selectedButton, setSelectedButton] = useState<string>("");

  const handleButtonClick = (label: string) => {
    setSelectedButton(label);
    if(onClickButton){
      onClickButton(label);
    }
    // console.log(`You clicked ${label}`);
  };

  return (
    <ButtonsContainer>
      <Text>{name}</Text>
      <ButtonContainer>
        {labels.map((label) => (
          <StyledButton
            key={label}
            selected={selectedButton === label}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </StyledButton>
        ))}
      </ButtonContainer>
    </ButtonsContainer>
  );
};

export default ButtonGroup;
