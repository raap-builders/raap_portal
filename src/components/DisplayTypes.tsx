import React, { useState } from 'react';
import styled from 'styled-components';

const raapLogo = require('../assets/logo.png');


type ItemProps = {
  title: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
};

const ItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  padding: 2rem;
  margin-left: 5rem;
  margin-right: 5rem;
`

const ItemWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  padding: 10px;
  background-color: ${props => (props.isSelected ? 'rgba(0, 255, 0, 0.1)' : 'transparent')};
  border-bottom: ${props => (props.isSelected ? '2px solid green' : 'none')};
  transition: background-color 0.2s ease-in-out, border-bottom 0.2s ease-in-out;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const DisplayTypes: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    if (index === selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  return (
    <ItemsContainer>
      <ItemWrapper isSelected={selectedItem === 0} onClick={() => handleItemClick(0)}>
        <Image src="https://via.placeholder.com/150" alt="Item 1" />
        <Title>Item 1</Title>
      </ItemWrapper>
      <ItemWrapper isSelected={selectedItem === 1} onClick={() => handleItemClick(1)}>
        <Image src="https://via.placeholder.com/150" alt="Item 2" />
        <Title>Item 2</Title>
      </ItemWrapper>
      <ItemWrapper isSelected={selectedItem === 2} onClick={() => handleItemClick(2)}>
        <Image src="https://via.placeholder.com/150" alt="Item 3" />
        <Title>Item 3</Title>
      </ItemWrapper>
    </ItemsContainer>
  );
};

export default DisplayTypes;

//src={raapLogo}