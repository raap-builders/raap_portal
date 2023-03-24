// import React, { useState } from 'react';

// interface TimelineEvent {
//   timeline: 'orange' | 'green';
//   timestamp: number;
//   description: string;
// }

// interface TimelineProps {
//   events: TimelineEvent[];
//   width: number;
//   height: number;
//   dotSize: number;
//   cursorWidth: number;
//   cursorHeight: number;
// }

// const Timeline: React.FC<TimelineProps> = ({
//   events,
//   width,
//   height,
//   dotSize,
//   cursorWidth,
//   cursorHeight,
// }) => {
//   const [cursorPosition, setCursorPosition] = useState(0);

//   const handleCursorMove = (event: React.MouseEvent<SVGRectElement>) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const timelineWidth = width - cursorWidth;
//     const newCursorPosition = Math.min(Math.max(0, mouseX - cursorWidth / 2), timelineWidth);
//     setCursorPosition(newCursorPosition);
//   };

//   return (
//     <svg width={width} height={height}>
//       <rect
//         x={cursorPosition}
//         y={0}
//         width={cursorWidth}
//         height={cursorHeight}
//         fill="#ccc"
//         onMouseMove={handleCursorMove}
//       />
//       {events.map((event) => {
//         const timelineY = event.timeline === 'orange' ? 20 : 60;
//         const eventX = (event.timestamp / 12) * (width - cursorWidth);
//         const isEventVisible = eventX < cursorPosition;
//         return (
//           <g key={`${event.timeline}-${event.timestamp}`}>
//             {isEventVisible && (
//               <text x={eventX + dotSize + 5} y={timelineY} fontSize="12">
//                 {event.description}
//               </text>
//             )}
//             <circle cx={eventX} cy={timelineY} r={dotSize} fill={event.timeline} />
//           </g>
//         );
//       })}
//     </svg>
//   );
// };




import React, { useState } from 'react';

interface TimelineEvent {
  timeline: 'orange' | 'green';
  timestamp: number;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  width: number;
  height: number;
  dotSize: number;
  cursorWidth: number;
  cursorHeight: number;
  orangeTitle: string;
  greenTitle: string;
}

const Timeline: React.FC<TimelineProps> = ({
  events,
  width,
  height,
  dotSize,
  cursorWidth,
  cursorHeight,
  orangeTitle,
  greenTitle,
}) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const timelineWidth = 2000;

  const handleCursorMove = (event: React.MouseEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const timelineWidthx = width - cursorWidth;
    const newCursorPosition = Math.min(Math.max(0, mouseX - cursorWidth / 2), timelineWidthx);
    setCursorPosition(newCursorPosition);
  };

  const orangeEvents = events.filter((event) => event.timeline === 'orange');
  const greenEvents = events.filter((event) => event.timeline === 'green');

  return (
    <svg width={width} height={height}>
      <text x={0} y={15} fontSize="12">
        {orangeTitle}
      </text>
      <rect
        x={0}
        y={20}
        width={timelineWidth}
        height={dotSize * 2}
        fill="#f0e68c"
      />
      {orangeEvents.map((event) => {
        const eventX = (event.timestamp / 12) * timelineWidth;
        const isEventVisible = eventX < cursorPosition;
        return (
          <g key={`${event.timeline}-${event.timestamp}`}>
            {isEventVisible && (
              <text x={eventX + dotSize + 5} y={30} fontSize="12">
                {event.description}
              </text>
            )}
            <circle cx={eventX} cy={30} r={dotSize} fill="#f0e68c" />
          </g>
        );
      })}

      <text x={0} y={60} fontSize="12">
        {greenTitle}
      </text>
      <rect
        x={0}
        y={65}
        width={timelineWidth}
        height={dotSize * 2}
        fill="#90ee90"
      />
      {greenEvents.map((event) => {
        const eventX = (event.timestamp / 12) * timelineWidth;
        const isEventVisible = eventX < cursorPosition;
        return (
          <g key={`${event.timeline}-${event.timestamp}`}>
            {isEventVisible && (
              <text x={eventX + dotSize + 5} y={75} fontSize="12">
                {event.description}
              </text>
            )}
            <circle cx={eventX} cy={75} r={dotSize} fill="#90ee90" />
          </g>
        );
      })}

      <rect
        x={cursorPosition}
        y={20}
        width={cursorWidth}
        height={cursorHeight}
        fill="#ccc"
        onMouseMove={handleCursorMove}
      />
    </svg>
  );
};

export default Timeline;