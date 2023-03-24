import React, { useState } from "react";
import styled from "styled-components";

const backgroundImage = require("../assets/DesignBackground.png");


const Container = styled.div`
  display: flex;
  height: 85vh;
`;

const Left = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center center fixed;
  // background-size: cover;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid green;
  margin: 20px;
  width: 500px;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "green" : "transparent")};
  color: ${(props) => (props.active ? "white" : "green")};
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: green;
    color: white;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const DetailViewer =  styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
`

const ViewerDiv =  styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  align-items:center;
`

const DownloadButtons = styled.div`
  display:flex;
  flex-direction:column;
`

const GrayBox = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 20px;
  background-color:lightgray;
  margin: 1rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0.5rem;
`

const BoxCaption = styled.p`
  color:darkgray;
`

const DownloadButton = styled.button`
  width: 200px;
  height: 60px;
  background: rgba(81, 146, 89, 0.2);
  color:darkgreen;
  border-radius: 10px;
`

type TabProps = {
  active: boolean;
};

const TabA = styled.div<TabProps>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const TabB = styled.div<TabProps>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const TabC = styled.div<TabProps>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const ViewContent = () => {
  const [activeTab, setActiveTab] = useState("A");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Left />
      <Right>
        <TabsContainer>
          <TabButton active={activeTab === "A"} onClick={() => handleTabClick("A")}>
            Layout
          </TabButton>
          <TabButton active={activeTab === "B"} onClick={() => handleTabClick("B")}>
            Structure
          </TabButton>
          <TabButton active={activeTab === "C"} onClick={() => handleTabClick("C")}>
            MEP
          </TabButton>
        </TabsContainer>
        <Content>
          <TabA active={activeTab === "A"}>
            <DetailViewer>
              <h2>Detail Viewer</h2>
              <ViewerDiv>
                <GrayBox></GrayBox>
                <BoxCaption>Detail A8.712: Connection Module to On Site</BoxCaption>
              </ViewerDiv>
            </DetailViewer>
            <DownloadButtons>
              <ButtonRow>
                <DownloadButton>Design Files & Drawings</DownloadButton>
                <DownloadButton>Installation Guide</DownloadButton>
              </ButtonRow>
              <ButtonRow>
                <DownloadButton>Product Documentation</DownloadButton>
                <DownloadButton>Installation Videos</DownloadButton>
              </ButtonRow>
            </DownloadButtons>
          </TabA>
          <TabB active={activeTab === "B"}>Tab B content goes here</TabB>
          <TabC active={activeTab === "C"}>Tab C content goes here</TabC>
        </Content>
      </Right>
    </Container>
  );
};

export default ViewContent;