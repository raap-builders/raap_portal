import React from "react";
import ConfiguratorTable from "./components/Table";
import ViewContent from "./components/ViewContent";
import styled from "styled-components";

const ViewContainer = styled.div`
  width: 80vw;
  margin-left: 10vw;
  margin-right: 10vw;
`;

function App() {
  return (
    <ViewContainer>
      <ViewContent></ViewContent>
    </ViewContainer>
  );
}

export default App;
