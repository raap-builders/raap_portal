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
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-left: 5px solid green;
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

const Row = styled.tr`
  vertical-align: middle;
`;

const RowItem = styled.td`
  padding: 10px;
`;

const GrayBox = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
`;

const GrayBoxHeading = styled.h3`
  font-size: 1rem;
  color: gray;
  margin: 0;
`;

const GrayBoxText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const TableComponent = () => {
  return (
    <SectionWrapper>
        <LeftSection>
          <Title1>Title1</Title1>
          <RowItem>row1</RowItem>
          <RowItem>row2</RowItem>
          <RowItem>
            <GrayBox>
              <GrayBoxHeading>subheading</GrayBoxHeading>
              <GrayBoxText>400</GrayBoxText>
            </GrayBox>
          </RowItem>
        </LeftSection>
        <RightSection>
          <Title2>Title2</Title2>
          <Row>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>subheading</GrayBoxHeading>
                <GrayBoxText>400</GrayBoxText>
              </GrayBox>
            </RowItem>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>subheading</GrayBoxHeading>
                <GrayBoxText>400</GrayBoxText>
              </GrayBox>
            </RowItem>
          </Row>
          <Row>
            <RowItem>
              <GrayBox>
                <GrayBoxHeading>subheading</GrayBoxHeading>
                <GrayBoxText>400</GrayBoxText>
              </GrayBox>
            </RowItem>
          </Row>
        </RightSection>
          {/* <VerticalDivider /> */}
    </SectionWrapper>
  );
};

export default TableComponent;