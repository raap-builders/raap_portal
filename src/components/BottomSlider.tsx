import { Slider } from "antd";
import React, { useRef } from "react";

const Buttons = () => {

  return (
    <div className="scrollable_buttons">
        {/* <div style={{ display: 'flex', gridGap: 20, alignItems: 'center' }}>
                <div className="bottomSlider" style={{ marginLeft: 30 }}>
                  <div style={{ justifyContent: 'space-between', marginBottom: 10 }} className="sliderTitles">
                    <div className="titleFlex">
                      <h2>Day 0</h2>
                      <p>Start Hotel Projct</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 6</h2>
                      <p>Pre Construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 12</h2>
                      <p>Design</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 18</h2>
                      <p>Foundation</p>
                    </div>
                    <div className="titleFlex">
                      <h2>Month 30</h2>
                      <p>Delivery</p>
                    </div>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <div >
                      <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        // marks={marks}
                        step={1}
                        min={1}
                        max={7}
                        sx={{
                          color: '#a6a6a6', // specify your custom color here
                          '& .MuiSlider-thumb': {
                            color: '#a6a6a6', // apply the same color to the thumb
                            padding: 1,
                            border: '6px solid #404040'
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        defaultValue={1}
                        step={1}
                        marks
                        min={1}
                        max={6}
                        sx={{
                          color: '#519259', // specify your custom color here
                          '& .MuiSlider-thumb': {
                            color: '#519259', // apply the same color to the thumb
                            padding: 1,
                            border: '6px solid #404040'
                          },
                        }}
                      />
                    </div>
                  </Box>
                  <div style={{ justifyContent: 'space-between' }} className="sliderTitles">
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Day 0</h2>
                      <p>Start Hotel Projct</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 6</h2>
                      <p>Pre Construction</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 12</h2>
                      <p>Design</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 18</h2>
                      <p>Foundation</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 16</h2>
                      <p>Build Rooms</p>
                    </div>
                    <div className="titleFlex">
                      <h2 style={{ color: '#edaa38' }}>Month 21</h2>
                      <p>Delivery</p>
                    </div>
                  </div>
                </div>
                <div style={{
                  position: "relative",
                  bottom: 45
                }}>
                  <h2 style={{ width: 90, fontWeight: 700, marginBottom: 10 }}>Traditional</h2>
                  <h2 style={{ color: '#edaa38', width: 90, fontWeight: 700 }}>RaaP</h2>
                </div>
              </div> */}
    </div>
  );
}

export default Buttons;
