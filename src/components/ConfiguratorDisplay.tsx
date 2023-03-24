import React from "react";
import styled from 'styled-components';


const layout = require('../assets/GlimmerLayout.png');

const Image = styled.img`
  height: 25vh;
  margin: auto;
`;

const DisplayContainer = styled.div`
  width: 100%;
`

const ConfiguratorDisplay = () => {
  return (
    <DisplayContainer>
      <Image src={layout} alt="Drawing" />
    </DisplayContainer>
  );
}

export default ConfiguratorDisplay;