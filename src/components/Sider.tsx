import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";

function Sider() {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(80);

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
    navigate("/view", { replace: true });
  };

  return (
    <FormControl
      style={{
        overflow: "hidden",
      }}
      className="h-100 col-4"
    >
      <div
        style={{ backgroundColor: "#519259" }}
        className="d-flex flex-column justify-content-center align-items-center p-4"
      >
        <svg
          width="96"
          height="94"
          viewBox="0 0 96 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3332_2953)">
            <path
              d="M96 76C96 70.4 91.6 66 86 66C80.4 66 76 70.4 76 76C76 80.8 79.4 84.8 84 85.8V90H76V94H96V90H88V85.8C92.6 84.8 96 80.8 96 76ZM80 76C80 72.6 82.6 70 86 70C89.4 70 92 72.6 92 76C92 78.6 90.4 80.8 88 81.6V78H84V81.6C81.6 80.8 80 78.6 80 76ZM36 30H44C45.2 30 46 29.2 46 28V20C46 18.8 45.2 18 44 18H36C34.8 18 34 18.8 34 20V28C34 29.2 34.8 30 36 30ZM38 22H42V26H38V22ZM52 30H60C61.2 30 62 29.2 62 28V20C62 18.8 61.2 18 60 18H52C50.8 18 50 18.8 50 20V28C50 29.2 50.8 30 52 30ZM54 22H58V26H54V22ZM36 46H44C45.2 46 46 45.2 46 44V36C46 34.8 45.2 34 44 34H36C34.8 34 34 34.8 34 36V44C34 45.2 34.8 46 36 46ZM38 38H42V42H38V38ZM52 46H60C61.2 46 62 45.2 62 44V36C62 34.8 61.2 34 60 34H52C50.8 34 50 34.8 50 36V44C50 45.2 50.8 46 52 46ZM54 38H58V42H54V38ZM36 62H44C45.2 62 46 61.2 46 60V52C46 50.8 45.2 50 44 50H36C34.8 50 34 50.8 34 52V60C34 61.2 34.8 62 36 62ZM38 54H42V58H38V54ZM52 62H60C61.2 62 62 61.2 62 60V52C62 50.8 61.2 50 60 50H52C50.8 50 50 50.8 50 52V60C50 61.2 50.8 62 52 62ZM54 54H58V58H54V54ZM70 8H26C24.8 8 24 8.8 24 10V92C24 93.2 24.8 94 26 94H70C71.2 94 72 93.2 72 92V10C72 8.8 71.2 8 70 8ZM56 78V90H50V82H46V90H40V78H56ZM68 90H60V78H64V74H32V78H36V90H28V12H68V90ZM80 62H76V58H80V62ZM84 58H88V62H84V58ZM80 54H76V50H80V54ZM84 50H88V54H84V50ZM80 46H76V42H80V46ZM88 46H84V42H88V46ZM96 36V62H92V38H76V34H84V30H88V34H94C95.2 34 96 34.8 96 36ZM20 76C20 70.4 15.6 66 10 66C4.4 66 0 70.4 0 76C0 80.8 3.4 84.8 8 85.8V90H0V94H20V90H12V85.8C16.6 84.8 20 80.8 20 76ZM4 76C4 72.6 6.6 70 10 70C13.4 70 16 72.6 16 76C16 78.6 14.4 80.8 12 81.6V78H8V81.6C5.6 80.8 4 78.6 4 76ZM16 58H20V62H16V58ZM8 58H12V62H8V58ZM16 50H20V54H16V50ZM8 50H12V54H8V50ZM16 42H20V46H16V42ZM12 46H8V42H12V46ZM12 34H20V38H4V62H0V36C0 34.8 0.8 34 2 34H8V30H12V34ZM34 4H30V0H34V4ZM42 4H38V0H42V4ZM50 4H46V0H50V4ZM58 4H54V0H58V4ZM66 4H62V0H66V4Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3332_2953">
              <rect width="96" height="94" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-center text-white mt-2 font-weight-bold">
          Site Information
        </span>
      </div>

      <div
        className="p-4 h-100"
        style={{
          backgroundColor: "#EFEFF3",
        }}
      >
        <FormLabel
          style={{ color: "#519259" }}
          className="w-100 text-center"
          id="demo-row-radio-buttons-group-label"
        >
          Project Type
        </FormLabel>
        <RadioGroup
          row
          className="mt-2"
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="selectService"
            control={<Radio size="small" />}
            label={<span style={{ fontSize: 12 }}>Select Service</span>}
          />
          <FormControlLabel
            value="extendedService"
            control={<Radio size="small" />}
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
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <p className="text-center" style={{ color: "#519259" }}>
            Number of Rooms
          </p>
          {/* <input
            value={zipCode}
            onChange={onZipCodeChanged}
            className="border-1 border-gray rounded pl-2 align-center m-auto"
            placeholder="zip code"
          /> */}
          <div className="w-100 d-flex align-items-center justify-content-around">
            80
            <Slider
              aria-valuetext="100"
              aria-label="Default"
              valueLabelDisplay="auto"
              style={{ color: "#519259" }}
              defaultValue={80}
              max={120}
              min={80}
              step={1}
              className="mx-2"
              value={numberOfRooms}
              onChange={onNumberOfRoomsChanged}
            />
            120
          </div>
          <span
            className="text-center  d-flex align-items-center justify-content-center align-middle bg-white"
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              border: "1px solid #519259",
            }}
          >
            {numberOfRooms}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            onClick={(_) => onFormSubmitted()}
            style={{ backgroundColor: "#519259" }}
            className="mt-5 w-75 p-1 rounded text-white align-middle text-center m-auto"
          >
            Enter
          </button>
        </div>
      </div>
    </FormControl>
  );
}

export default Sider;
