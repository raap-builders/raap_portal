import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const Left = styled.div`
  flex: 1;
  background: url("https://source.unsplash.com/random") no-repeat center center fixed;
  background-size: cover;
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
            A
          </TabButton>
          <TabButton active={activeTab === "B"} onClick={() => handleTabClick("B")}>
            B
          </TabButton>
          <TabButton active={activeTab === "C"} onClick={() => handleTabClick("C")}>
            C
          </TabButton>
        </TabsContainer>
        <Content>
          <TabA active={activeTab === "A"}>Tab A content goes here</TabA>
          <TabB active={activeTab === "B"}>Tab B content goes here</TabB>
          <TabC active={activeTab === "C"}>Tab C content goes here</TabC>
        </Content>
      </Right>
    </Container>
  );
};

export default ViewContent;






// import { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const LeftPane = styled.div`
//   flex: 1;
//   background-image: url('your-image-url');
//   background-size: cover;
//   opacity: 0.5;
// `;

// const RightPane = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const TabsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 20px;
//   height: 80px;
//   background-color: #ffffff;
//   border: 2px solid #00aa00;
//   border-radius: 20px;
//   margin-top: 20px;
// `;

// const TabButton = styled.button`
//   padding: 10px 20px;
//   background-color: ${({ isActive }) => (isActive ? '#00aa00' : 'transparent')};
//   color: ${({ isActive }) => (isActive ? '#ffffff' : '#00aa00')};
//   border: none;
//   border-radius: 10px;
//   font-size: 16px;
//   cursor: pointer;
//   outline: none;
// `;

// const ContentContainer = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 32px;
//   color: #555555;
// `;

// const AContent = () => <ContentContainer>Content A</ContentContainer>;
// const BContent = () => <ContentContainer>Content B</ContentContainer>;
// const CContent = () => <ContentContainer>Content C</ContentContainer>;

// const ViewContent = () => {
//   const [activeTab, setActiveTab] = useState('A');

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <Container>
//       <LeftPane />
//       <RightPane>
//         <TabsContainer>
//           <TabButton isActive={activeTab === 'A'} onClick={() => handleTabClick('A')}>
//             A
//           </TabButton>
//           <TabButton isActive={activeTab === 'B'} onClick={() => handleTabClick('B')}>
//             B
//           </TabButton>
//           <TabButton isActive={activeTab === 'C'} onClick={() => handleTabClick('C')}>
//             C
//           </TabButton>
//         </TabsContainer>
//         {activeTab === 'A' && <AContent />}
//         {activeTab === 'B' && <BContent />}
//         {activeTab === 'C' && <CContent />}
//       </RightPane>
//     </Container>
//   );
// };

// export default ViewContent;