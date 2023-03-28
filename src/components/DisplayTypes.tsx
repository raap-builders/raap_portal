import React, { useState } from 'react';
import styled from 'styled-components';

// const raapLogo = require('../assets/logo.png');

const layout = require('../assets/Layout.png');
const photo = require('../assets/Photo.png');
const drawing = require('../assets/Drawing.png');


interface Props{
  onClickButton: (arg0: string) => any
}

const ItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  // padding: 1rem;
  // margin-left: 10rem;
  // margin-right: 12rem;
`

const ItemWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  padding: 10px;
  background-color: ${props => (props.isSelected ? 'rgba(0, 255, 0, 0.1)' : 'transparent')};
  border-bottom: ${props => (props.isSelected ? '2px solid green' : '2px solid rgba(255, 255, 255, 0)')};
  transition: background-color 0.2s ease-in-out, border-bottom 0.2s ease-in-out;
`;

const Title = styled.h2`
  font-weight: bold;
  // margin-top: 10px;
  margin-top: 5px;
  text-align: center;
`;

const Image = styled.img`
  // max-width: 100%;
  //width: auto;
  height:4vh;
  width: auto;
`;

const ImageContainer = styled.div`
  height: 80%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const DisplayTypes = ({onClickButton}:Props) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    if (index === selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }

    //to be refactored
    let layoutType = "Layout"
    if(index == 1){
      layoutType = "Photo"
    }
    if(index ==2 ){
      layoutType = "Drawing"
    }
    onClickButton(layoutType)
  };

  return (
    <ItemsContainer>
      <ItemWrapper isSelected={selectedItem === 0} onClick={() => handleItemClick(0)}>
        <ImageContainer><Image src={layout} alt="Layout" /></ImageContainer>
        <Title>Layout</Title>
      </ItemWrapper>
      <ItemWrapper isSelected={selectedItem === 1} onClick={() => handleItemClick(1)}>
        <ImageContainer><Image src={photo} alt="Photo" /></ImageContainer>
        <Title>Photo</Title>
      </ItemWrapper>
      <ItemWrapper isSelected={selectedItem === 2} onClick={() => handleItemClick(2)}>
      <ImageContainer><Image src={drawing} alt="Drawing" /></ImageContainer>
        <Title>Drawing</Title>
      </ItemWrapper>
    </ItemsContainer>
  );
};

export default DisplayTypes;

//src={raapLogo}