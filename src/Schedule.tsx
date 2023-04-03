import React from 'react';
import Timeline from './components/Timeline'
import styled from 'styled-components';

const ConstructionDiv = styled.div`
  display:flex;
  flex-direction:row;
  margin:1rem;
  justify-content:space-around;
`

const LeftDiv = styled.div`
  display:flex;
  flex-direction: column;
  margin:1rem;
  align-items:center;
`

const RightDiv = styled.div`
  display:flex;
  flex-direction: column;
  margin:1rem;
  align-items:center;
`

const EmptyBox = styled.div`
  width:40vw;
  height: 40vh;
  border-radius:20px;
  border: 2px solid gray;
`

const TimelineDiv = styled.div`
  margin:1rem 5rem;
`

const LeftHeading = styled.h1`
  color:green;
  padding:0.2rem;
  font-size:1.5rem;
  font-weight:bold;
`

const RightHeading = styled.h1`
  color:orange;
  padding:0.2rem;
  font-size:1.5rem;
  font-weight:bold;
`

function App() {

  
  // const eventsAll = [
  //   { timeline: 'orange', timestamp: 2, description: 'Event 1' },
  //   { timeline: 'green', timestamp: 4, description: 'Event 2' },
  //   { timeline: 'orange', timestamp: 6, description: 'Event 3' },
  //   { timeline: 'orange', timestamp: 8, description: 'Event 4' },
  //   { timeline: 'orange', timestamp: 11, description: 'Event 5' },
  //   { timeline: 'green', timestamp: 15, description: 'Event 6' },
  //   { timeline: 'orange', timestamp: 17, description: 'Event 7' },
  //   { timeline: 'orange', timestamp: 18, description: 'Event 8' },
  //   { timeline: 'green', timestamp: 20, description: 'Event 9' },
  // ]
  return (
    <div className="schedule_container">
      {/* <h1>Schedule</h1> */}
      <ConstructionDiv>
        <LeftDiv>
          <LeftHeading>Traditional Contruction</LeftHeading>
          <p>Cost: $9M     Revenue:30 Months</p>
          <EmptyBox>

          </EmptyBox>
        </LeftDiv>
        <RightDiv>
          <RightHeading>RaaP Offsite</RightHeading>
          <p>Cost: $9M     Revenue:30 Months</p>
          <EmptyBox>

          </EmptyBox>
        </RightDiv>
      </ConstructionDiv>
      {/* <TimelineDiv>
      <Timeline 
          events={
            [
              { timeline: 'orange', timestamp: 2, description: 'Event 1' },
              { timeline: 'green', timestamp: 4, description: 'Event 2' },
              { timeline: 'orange', timestamp: 6, description: 'Event 3' },
              { timeline: 'orange', timestamp: 8, description: 'Event 4' },
              { timeline: 'orange', timestamp: 11, description: 'Event 5' },
              { timeline: 'green', timestamp: 15, description: 'Event 6' },
              { timeline: 'orange', timestamp: 17, description: 'Event 7' },
              { timeline: 'orange', timestamp: 18, description: 'Event 8' },
              { timeline: 'green', timestamp: 20, description: 'Event 9' },
            ]
          }
          width={500} 
          height={100} 
          dotSize={20} 
          cursorWidth={60} 
          cursorHeight={100} 
          orangeTitle={"Timeline 1"}
          greenTitle={"Timeline 2"}
          ></Timeline>
      </TimelineDiv> */}
      
    </div>
  );
}

export default App;
