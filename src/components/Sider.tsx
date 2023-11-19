import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextField } from "@mui/material";

interface MyComponentProps {
  step: number;
  changeStep: (nextStep: number) => void;
}

function Sider({ step, changeStep }: MyComponentProps) {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(100);

  const onZipCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setZipCode(event.target.value);
  };

  const onNumberOfRoomsChanged = (
    event: Event,
    newValue: number | number[]
  ) => {
    // @ts-ignore
    setNumberOfRooms(newValue);
  };

  const onFormSubmitted = () => {
    console.log("number of the rooms", numberOfRooms);
    changeStep(2);
    navigate("/generic_estimation");
    // axios
    //   .post("http://localhost:3003/api/v1/notifications", {
    //     // @ts-ignore
    //     rooms: numberOfRooms,
    //   })
    //   .then((res) => {
    //     console.log("res------------------->>>", res);
    //     // navigate("/view", { replace: true });
    //   });
  };

  return (
    <FormControl
      className="h-100 d-flex flex-column align-items-center"
      style={{
        overflow: "hidden",
        backgroundColor: "#3F3F40",
      }}
    >
      <FormLabel
        className="w-100 text-center text-white mt-4"
        id="demo-row-radio-buttons-group-label"
      >
        Project Information
      </FormLabel>
      <FormLabel
        className="w-100 text-center text-white mt-4"
        id="demo-row-radio-buttons-group-label"
      >
        Select the following to get started
      </FormLabel>

      <Accordion defaultExpanded className="mt-3 w-75">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Project</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="d-flex align-items-start justify-content-between">
              <div>
                <span style={{ color: "#519259" }}>Hotel Type</span>
                <RadioGroup
                  className="mt-2"
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="selectService"
                    control={
                      <Radio size="small" style={{ color: "#519259" }} />
                    }
                    label={<span style={{ fontSize: 12 }}>Select Service</span>}
                  />
                  <FormControlLabel
                    value="extendedService"
                    control={
                      <Radio size="small" style={{ color: "#519259" }} />
                    }
                    label={
                      <span style={{ fontSize: 12 }}>Extedned Service</span>
                    }
                  />
                  <FormControlLabel
                    disabled
                    aria-setsize={8}
                    control={
                      <Radio size="small" style={{ color: "#878787" }} />
                    }
                    label={
                      <span style={{ fontSize: 12, color: "#878787" }}>
                        Full Service
                      </span>
                    }
                  />
                </RadioGroup>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="mb-2">Rooms</div>
                <Slider
                  aria-valuetext="100"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  style={{ color: "#519259", height: 110 }}
                  defaultValue={100}
                  max={120}
                  min={80}
                  step={1}
                  className="mx-2"
                  orientation="vertical"
                  value={numberOfRooms}
                  onChange={onNumberOfRoomsChanged}
                />
                <div
                  className="text-center d-flex align-items-center justify-content-center align-middle bg-white"
                  style={{
                    width: 35,
                    height: 35,
                    top: 5,
                    position: "relative",
                    borderRadius: 100,
                    border: "1px solid #519259",
                  }}
                >
                  {numberOfRooms}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
              <p className="text-center" style={{ color: "#519259" }}>
                Site's zip code
              </p>
              <Input
                value={zipCode}
                onChange={onZipCodeChanged}
                disableUnderline
                className="bg-white w-100 py-1 border-1 border-gray rounded pl-2 align-center m-auto"
                placeholder="Zip Code ..."
              />
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {step === 1 && (
        <div className="d-flex align-items-center justify-content-center w-75">
          <button
            onClick={onFormSubmitted}
            style={{ backgroundColor: "#519259" }}
            className="mt-5 w-75 py-2 rounded text-white align-middle text-center m-auto"
          >
            See Estimate
          </button>
        </div>
      )}

      {step > 1 && (
        <>
          <Accordion className="mt-3 w-75">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Site</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span style={{ color: "#519259" }}>Parameter</span>
                  <span style={{ color: "#519259" }}>Default</span>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Number of floors</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={4}
                    placeholder="4"
                  />
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Total Sq Ft (w/o pool)</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={58334}
                    placeholder="58,334"
                  />
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Story Height (Ft.)</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={10}
                    placeholder="10"
                  />
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Building Shape</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue="Rectangle"
                    placeholder="Rectangle"
                  />
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Perimeter (Ft.)</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={598}
                    placeholder="598"
                  />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="mt-3 w-75">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Rooms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span style={{ color: "#519259" }}>Room Mix</span>
                  <span style={{ color: "#519259" }}>No.</span>
                  <span style={{ color: "#519259" }}>%</span>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">King One Bedroom</span>
                  <TextField
                    className="w-25"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue={9}
                    placeholder="9"
                  />
                  <span className="text-sm text-right w-25">8%</span>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-left text-sm w-50">King Studio</span>
                  <span className="text-sm text-center text-right w-25">
                    89
                  </span>
                  <span className="text-sm text-right w-25">83%</span>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-left text-sm w-50">
                    Double Queen Studio
                  </span>
                  <span className="text-sm text-center text-right w-25">
                    17
                  </span>
                  <span className="text-sm text-right w-25">16%</span>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-left text-sm w-50">ADA</span>
                  <span className="text-sm text-center text-right w-25">
                    12
                  </span>
                  <span className="text-sm text-right w-25">11%</span>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </FormControl>
  );
}

export default Sider;
