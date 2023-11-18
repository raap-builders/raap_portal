import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sider() {
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
    axios
      .post("http://localhost:3003/api/v1/notifications", {
        // @ts-ignore
        rooms: numberOfRooms,
      })
      .then((res) => {
        console.log("res------------------->>>", res);
        // navigate("/view", { replace: true });
      });
  };

  return (
    <FormControl
      className="col-3 d-flex flex-column align-items-center"
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
      <div className="bg-white rounded border-1 m-4 p-3 w-75 d-flex align-items-center justify-content-around">
        <div className="col-9 d-flex flex-column align-items-center justify-content-start">
          <span style={{ color: "#519259" }}>Hotel Type</span>
          <div>
            <RadioGroup
              className="mt-2"
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="selectService"
                control={<Radio size="small" style={{ color: "#519259" }} />}
                label={<span style={{ fontSize: 12 }}>Select Service</span>}
              />
              <FormControlLabel
                value="extendedService"
                control={<Radio size="small" style={{ color: "#519259" }} />}
                label={<span style={{ fontSize: 12 }}>Extedned Service</span>}
              />
              <FormControlLabel
                disabled
                aria-setsize={8}
                control={<Radio size="small" style={{ color: "#878787" }} />}
                label={
                  <span style={{ fontSize: 12, color: "#878787" }}>
                    Full Service
                  </span>
                }
              />
            </RadioGroup>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center mt-5">
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
        </div>
        <div className="h-100 col-3 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-2">Rooms</div>
          <div className="h-75">
            <Slider
              aria-valuetext="100"
              aria-label="Default"
              valueLabelDisplay="auto"
              style={{ color: "#519259" }}
              defaultValue={100}
              max={120}
              min={80}
              step={1}
              className="mx-2"
              orientation="vertical"
              value={numberOfRooms}
              onChange={onNumberOfRoomsChanged}
            />
          </div>
          <div
            className="text-center d-flex align-items-center justify-content-center align-middle bg-white"
            style={{
              width: 35,
              height: 35,
              top: 5,
              left: 5,
              position: "relative",
              borderRadius: 100,
              border: "1px solid #519259",
            }}
          >
            {numberOfRooms}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center w-75">
        <button
          onClick={(_) => onFormSubmitted()}
          style={{ backgroundColor: "#519259" }}
          className="mt-5 w-75 py-2 rounded text-white align-middle text-center m-auto"
        >
          See Estimate
        </button>
      </div>
    </FormControl>
  );
}

export default Sider;
