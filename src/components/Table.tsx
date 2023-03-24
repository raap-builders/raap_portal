import React from 'react';
import styled from 'styled-components';



// const Table = styled.table`
//   width: 610px;
//   height: 200px;
//   border-radius: 10px;
//   border: 2px solid green;
//   border-spacing: 0;
// `;

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border: 2px solid green;
  border-radius: 10px;
  padding: 10px;
  margin: 1rem;
  width: 40vw;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-left: 5px solid green;
  padding: 0 1rem;
`;

const Title1 = styled.h2`
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Title2 = styled.h2`
  color: orange;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  width: 100%;
`;

const RowTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const RowItem = styled.div`
  padding: 5px;
`;

const GrayBox = styled.div`
  background-color: #f2f2f2;
  padding: 2px 5px;
`;

const GrayBoxHeading = styled.h3`
  font-size: 12px;
  color: gray;
  margin: 0;
`;

const GrayBoxText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const GrayBoxContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items: baseline;
`

const GreenTriangle = styled.p`
  font-size: 1rem;
  color: green;
`

const TableComponent = () => {
  return (
    <SectionWrapper>
        <LeftSection>
          <Title1>Traditional Construction</Title1>
          <RowItem>Build Time: 25 Months</RowItem>
          <RowItem>Cost: $8M</RowItem>
          <RowItem>
            <GrayBox>
              <GrayBoxHeading>Price / Sq Ft</GrayBoxHeading>
              <GrayBoxContent><GrayBoxText>$400</GrayBoxText></GrayBoxContent>
            </GrayBox>
          </RowItem>
        </LeftSection>
        <RightSection>
          <Title2>RaaP</Title2>
          <Row>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>Build Time</GrayBoxHeading>
                <GrayBoxContent><GrayBoxText>18 Months</GrayBoxText><GreenTriangle>&#9652;25%</GreenTriangle></GrayBoxContent>
              </GrayBox>
            </RowItem>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>Incremental Revenue</GrayBoxHeading>
                <GrayBoxContent><GrayBoxText>$1.3M</GrayBoxText><GreenTriangle>&#9652;25%</GreenTriangle></GrayBoxContent>
              </GrayBox>
            </RowItem>
          </Row>
          <RowTwo>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>Price / Sq Ft</GrayBoxHeading>
                <GrayBoxContent><GrayBoxText>$400</GrayBoxText><GreenTriangle>&#9652;25%</GreenTriangle></GrayBoxContent>
              </GrayBox>
            </RowItem>
          </RowTwo>
        </RightSection>
          {/* <VerticalDivider /> */}
    </SectionWrapper>
  );
};

export default TableComponent;