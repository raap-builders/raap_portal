//ts-check
import React, { useEffect, useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, AlertTitle, TextField } from "@mui/material";
import axios from "axios";
import { useLocationStore, useRoomStore } from "../store";
import { numberWithCommas } from "../utils/formatter";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

let queenQuantityErrorTimeout: number;
interface ZipCodes {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  label: string;
  title: string;
}
function Sider() {
  const zipCodeInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [zipCode, setZipCode] = useState("");
  const [queenQuantityError, setQueenQuantityError] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(100);
  const [openCardIndex, setOpenCardIndex] = useState(0);
  const [numberOfFLoors, setNumberOfFloors] = useState(0);
  const [doubleQueenQuantity, setDoubleQueenQuantity] = useState(0);
  const [ADAQuantity, setADAQuantity] = useState(0);
  const [kingOneQuantity, setKingOneQuantity] = useState(0);
  const [kingStudioQuantity, setKingStudioQuantity] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [totalSqFt, setTotalSqFt] = useState(0);

  //@ts-nocheck
  const {
    //@ts-ignore
    changeRooms,
    //@ts-ignore
    changeFloors,
    //@ts-ignore
    changePerimeter,
    //@ts-ignore
    changeTotalSqFt,
    //@ts-ignore
    changeZipCode,
    //@ts-ignore
    zipCodeObject,
    //@ts-ignore
    floors: floorsFromStore,
    //@ts-ignore
    totalSqFt: totalSqFtFromStore,
    //@ts-ignore
    perimeter: perimeterFromStore,
    //@ts-ignore
    rooms,
  } = useLocationStore((state) => state);

  const {
    //@ts-ignore
    changeADA,
    //@ts-ignore
    changeDoubleQueen,
    //@ts-ignore
    changeKingStudio,
    //@ts-ignore
    changeKingOne,
    //@ts-ignore
    doubleQueenQuantity: doubleQueenQuantityFromStore,
    //@ts-ignore
    kingOneQuantity: kingOneQuantityFromStore,
    //@ts-ignore
    kingStudioQuantity: kingStudioQuantityFromStore,
    //@ts-ignore
    ADAQuantity: ADAQuantityFromStore,
  } = useRoomStore((state) => state);

  useEffect(() => {
    if (!zipCodeObject || !Object.entries(zipCodeObject).length) {
      changeZipCode({
        id: 0,
        key: 0,
        zipCode: "00000",
        city: "Nationwide Price",
        state: "Nationwide Price",
        label: "Nationwide Price",
        title: "Nationwide Price",
      });
    }

    setZipCode(zipCodeObject.label);
    setNumberOfRooms(rooms);
    setDoubleQueenQuantity(doubleQueenQuantityFromStore);
    setKingOneQuantity(kingOneQuantityFromStore);
    setKingStudioQuantity(kingStudioQuantityFromStore);
    setADAQuantity(ADAQuantityFromStore);
    setNumberOfFloors(floorsFromStore);
    setPerimeter(perimeterFromStore);
    setTotalSqFt(totalSqFtFromStore);
  }, [
    zipCodeObject,
    rooms,
    doubleQueenQuantityFromStore,
    kingOneQuantityFromStore,
    kingStudioQuantityFromStore,
    ADAQuantityFromStore,
    floorsFromStore,
    perimeterFromStore,
    totalSqFtFromStore,
  ]);

  const getZipCodes = (zipCode?: string) => {
    const url = zipCode
      ? `${process.env.REACT_APP_BASE_URL}/locations/${zipCode}`
      : `${process.env.REACT_APP_BASE_URL}/locations`;

    axios
      .get(url)
      .then((zipCodes) => {
        const arr = zipCodes?.data?.data.map((item: ZipCodes) => {
          return {
            ...item,
            key: `${item.id}-${Math.random() * Math.random() + Math.random()}`,
            label: `${item.city}`,
            title: `${item.city}`,
          };
        });
        setZipCode(arr[0].label);
        changeZipCode(arr[0]);
      })
      .catch((error) => console.log("err", error));
  };

  const onZipCodeChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { target = { value: "" } } = event;
    const { value: newValue } = target;

    setZipCode(newValue);
    if (Number.isInteger(parseInt(newValue)) && newValue.length === 5)
      getZipCodes(newValue);
  };

  // const onZipCodeChanged = (event: React.ChangeEvent<{}>, newValue: string) => {
  //   setZipCode(newValue);
  //   if (Number.isInteger(parseInt(newValue)) && newValue.length === 5)
  //     getZipCodes(newValue);
  // };

  const onNumberOfRoomsChanged = (
    event: Event,
    newValue: number | number[]
  ) => {
    // @ts-ignore
    setNumberOfRooms(newValue);
    changeRooms(newValue);
  };

  const onFormSubmitted = () => {
    navigate(`generic_estimation`);
  };

  const onPerimeterChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPerimeter(parseInt(event.target.value));
    changePerimeter(parseInt(event.target.value));
  };

  const onTotalSqFtChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTotalSqFt(parseInt(event.target.value));
    changeTotalSqFt(parseInt(event.target.value));
  };

  const onKingStudioQuantityChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setKingStudioQuantity(parseInt(event.target.value));
    changeKingStudio(parseInt(event.target.value));
  };

  const onADAChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setADAQuantity(parseInt(event.target.value));
    changeADA(parseInt(event.target.value));
  };

  const onDoubleQueenQuantityChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    clearTimeout(queenQuantityErrorTimeout);
    if (parseInt(event.target.value) > Math.round(numberOfRooms * 0.4)) {
      setQueenQuantityError(
        "The quantity cannot be more than 40% of the number of the rooms"
      );
      //@ts-ignore
      queenQuantityErrorTimeout = setTimeout(
        () => setQueenQuantityError(""),
        2500
      );
    } else {
      setQueenQuantityError("");
      setDoubleQueenQuantity(parseInt(event.target.value));
      changeDoubleQueen(parseInt(event.target.value));
    }
  };

  const onKingOneQuantityChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setKingOneQuantity(parseInt(event.target.value));
    changeKingOne(parseInt(event.target.value));
  };

  const onNumberOfFloorsChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNumberOfFloors(parseInt(event.target.value));
    changeFloors(parseInt(event.target.value));
  };

  return (
    <div className="2xl:text-lg  w-[100%]  ">
      <FormControl
        className="d-flex flex-column "
        style={{
          backgroundColor: "#519258",
          borderRadius: 15,
        }}
      >
        <FormLabel
          className="w-100 text-center text-white my-3 xl:mt-0"
          id="demo-row-radio-buttons-group-label"
        >
          <span className="text-lg font-bold">
            {" "}
            Tell Us About Your Project
          </span>
        </FormLabel>
        <div
          className="flex flex-col items-center sider-accordion-container w-full max-h-screen px-[5%] pb-[4%]"
          style={{ maxHeight: "max-content" }}
        >
          <Accordion
            onChange={(e, expanded) => {
              if (expanded) {
                setOpenCardIndex(0);
              } else setOpenCardIndex(4);
            }}
            expanded={openCardIndex === 0}
            defaultExpanded
            className="rounded w-[100%] m-0 p-0"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className=" md:p-0"
            >
              <Typography>
                <span className="2xl:text-lg xl:text-md   font-medium md:text-md lg:text-md md:px-2 xl:px-0 2xl:px-0 xl:text-lg">
                  Project
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="px-3 pb-3">
                <div className="d-flex align-items-start justify-content-between md:m-w-max  2xl:text-lg mt-0">
                  <div className="w-100">
                    {/* <span
                      style={{ color: "#519259" }}
                      className="2xl:text-lg xl:text-md  lg:text-md md:text-md  "
                    >
                      Hotel Type
                    </span> */}

                    <FormControl fullWidth>
                      <InputLabel
                        className="w-100"
                        id="demo-simple-select-label"
                      >
                        Select Service
                      </InputLabel>
                      <Select
                        className="w-100"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Service"
                        value="Hilton Home2"
                      >
                        <MenuItem
                          selected
                          aria-selected
                          className="w-100"
                          value="Hilton Home2"
                        >
                          <div className="w-100 d-flex align-items-center justify-content-start gap-2">
                            <img
                              style={{
                                width: 70,
                                height: 30,
                              }}
                              src={require("../assets/hilton.png")}
                              alt="Hilton Home2"
                            />
                            <span className="text-lg">Hilton Home2</span>
                          </div>
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {/* <RadioGroup
                    {/* <RadioGroup
                      className="w-[max-content] md:mt-2 xl:text-lg "
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        className="h-[25px] xl:mb-2 xl:text-md 2xl:mb-2 "
                        disabled
                        value="selectService"
                        control={
                          <Radio size="small" style={{ color: "#878787" }} />
                        }
                        label={
                          <span className="text-[12px] 2xl:text-lg md:text-sm lg:text-md xl:text-lg">
                            Select Services
                          </span>
                        }
                      />
                      <FormControlLabel
                        className="h-[25px] xl:mb-2 2xl:mb-2 "
                        checked
                        value="extendedService"
                        control={
                          <Radio size="small" style={{ color: "#519259" }} />
                        }
                        label={
                          <span className="text-[12px] 2xl:text-lg md:text-sm lg:text-md xl:text-lg">
                            Extended Stay
                          </span>
                        }
                      />
                      <FormControlLabel
                        className="h-[25px]  "
                        disabled
                        value="fullService"
                        aria-setsize={8}
                        control={
                          <Radio size="small" style={{ color: "#878787" }} />
                        }
                        label={
                          <span
                            style={{ color: "#878787" }}
                            className="2xl:text-lg sm md:text-sm lg:text-md xl:text-lg"
                          >
                            Full Service
                          </span>
                        }
                      />
                    </RadioGroup> */}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center  xl:text-lg">
                  <div className="text-center 2xl:text-lg my-3 text-[#519259] md:text-sm lg:text-md  xl:text-lg ">
                    Site's zip code
                  </div>
                  <div className="w-full ">
                    <TextField
                      ref={zipCodeInputRef}
                      className="w-100"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Enter The Zip Code..."
                      onChange={onZipCodeChanged}
                      onFocus={(event) => event.target.select()}
                      sx={{ width: "auto" }}
                      value={zipCode}
                    />
                    {/* <Autocomplete
                      freeSolo
                      sx={{ width: "auto" }}
                      disableClearable
                      inputValue={zipCode}
                      onInputChange={onZipCodeChanged}
                      onChange={onZipCodeSelected}
                      options={zipCodes.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Zip Code..."
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />*/}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {location.pathname === "/landing" ? (
            <>
              <div className="mt-4 mb-3 w-75 d-flex flex-column align-items-center align-self-center">
                <div className="2xl:text-lg md:text-sm lg:text-md xl:mt-0 xl:text-lg text-white d-flex flex-column justify-content-center">
                  Number of Rooms
                </div>
                <Slider
                  aria-valuetext="100"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  style={{ color: "white" }}
                  defaultValue={100}
                  max={150}
                  min={80}
                  step={1}
                  value={numberOfRooms}
                  onChange={onNumberOfRoomsChanged}
                />
                <div className="text-center text-white text-md md:text-sm xl:text-lg lg:text-md 2xl:text-lg">
                  {numberOfRooms}
                </div>
              </div>
              <button
                onClick={onFormSubmitted}
                style={{ backgroundColor: "#519259", bottom: 20 }}
                className="text-white text-center border-1 rounded bottom-3 py-2 mt-2  w-75"
              >
                See Estimate
              </button>
            </>
          ) : (
            <>
              <Accordion
                onChange={(e, expanded) => {
                  if (expanded) {
                    setOpenCardIndex(1);
                  } else setOpenCardIndex(4);
                }}
                expanded={openCardIndex === 1}
                className="mt-2 w-[100%] rounded m-0"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <span className="2xl:text-lg  font-medium  md:text-md lg:text-md md:px-2 lg:px-2 xl:px-0 2xl:px-0 xl:text-lg">
                      Site
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className=" md:px-2 xl:px-4">
                    <div className="d-flex justify-content-between align-items-center md:mb-4 xl:mb-0 w-100 2xl:text-lg xl:text-lg md:text-sm lg:text-md lg:mb-8 ">
                      <span style={{ color: "#519259" }}>Parameter</span>
                      <span style={{ color: "#519259" }}>Quantity</span>
                    </div>

                    <div className="lg:mt-2 d-flex justify-content-between align-items-center w-100 xl:mb-2 md:mb-2 ">
                      <span className="text-sm w-50 2xl:text-lg md:text-sm lg:text-md xl:text-lg ">
                        {" "}
                        Number of floors
                      </span>
                      <span className="md:text-sm lg:text-md text-right w-25 xl:text-lg 2xl:text-lg">
                        {numberWithCommas(numberOfFLoors)}
                      </span>
                      {/* <TextField
                        style={{ width: "40%" }}
                        className="md:w-[30%] lg:w-[30%] xl:w-[50%] p-[8px]"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={4}
                        type="number"
                        value={numberOfFLoors}
                        onChange={onNumberOfFloorsChanged}
                      /> */}
                    </div>

                    <div className="lg:mt-2 d-flex justify-content-between align-items-center w-100 xl:mb-2 md:mb-4 ">
                      <span className="md:text-sm lg:text-md w-50 2xl:text-lg xl:text-lg">
                        Gross Sq. Ft. (w/o pool)
                      </span>
                      <span className="md:text-sm lg:text-md text-right w-25 xl:text-lg 2xl:text-lg">
                        {numberWithCommas(totalSqFt)}
                      </span>
                      {/* <TextField
                        style={{ width: "40%" }}
                        className="text-right"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        value={totalSqFt}
                        onChange={onTotalSqFtChanged}
                      /> */}
                    </div>

                    {/* <div className="mt-4 d-flex justify-content-between align-items-center w-100">
                  <span className="text-sm w-50">Building Shape</span>
                  <TextField
                    className="w-50"
                    id="outlined-basic"
                    variant="outlined"
                    defaultValue="Rectangle"
                    placeholder="Rectangle"
                  />
                </div> */}
                    <div className="lg:mt-2 d-flex justify-content-between align-items-center xl:mb-1 w-100 md:mb-3 2xl:mb-4">
                      <span className="md:text-sm lg:text-md w-50 2xl:text-lg xl:text-lg">
                        Perimeter (Ft.)
                      </span>
                      <span className="md:text-sm lg:text-md text-right w-25 xl:text-lg 2xl:text-lg">
                        {numberWithCommas(perimeter)}
                      </span>
                      {/* <TextField
                        style={{ width: "40%" }}
                        className="md:w-[30%] lg:w-[30%] xl:w-[50%]"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={598}
                        value={perimeter}
                        type="number"
                        onChange={onPerimeterChanged}
                      /> */}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                onChange={(e, expanded) => {
                  if (expanded) {
                    setOpenCardIndex(2);
                  } else setOpenCardIndex(4);
                }}
                expanded={openCardIndex === 2}
                className="mt-2 w-[100%] rounded xl:m-0"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <span className="2xl:text-lg font-medium md:text-md lg:text-md md:px-2 lg:px-2 xl:px-0 2xl:px-0 xl:text-lg">
                      Rooms
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="lg:pb-2 md:px-2 md:pb-2 xl:px-4">
                    <div className="d-flex justify-content-between align-items-center w-100 lg:mb-4 md:mb-4">
                      <span
                        style={{ color: "#519259", width: "40%" }}
                        className="text-start 2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        Room Mix
                      </span>
                      <span
                        style={{ color: "#519259", width: "30%" }}
                        className="2xl:text-lg  text-end md:text-sm lg:text-md xl:text-lg"
                      >
                        Quantity
                      </span>
                      <span
                        style={{ color: "#519259", width: "30%" }}
                        className="2xl:text-lg text-end md:text-sm lg:text-md xl:text-lg"
                      >
                        %
                      </span>
                    </div>

                    <div className="mt-2 d-flex justify-content-between align-items-center w-100">
                      <div
                        style={{ width: "40%" }}
                        className="text-start md:text-sm lg:text-md 2xl:text-lg xl:text-lg"
                      >
                        Queen Studio
                      </div>
                      {/* <div
                          className="text-left md:text-sm lg:text-md 2xl:text-lg xl:text-lg"
                          style={{ fontSize: 14 }}
                        >
                          {`(<40% rooms)`}
                        </div> */}
                      <span
                        style={{ width: "30%" }}
                        className="md:text-sm lg:text-md text-end xl:text-lg 2xl:text-lg"
                      >
                        {numberWithCommas(doubleQueenQuantity)}
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="md:text-sm lg:text-md text-end xl:text-lg 2xl:text-lg"
                      >
                        {numberWithCommas(
                          Math.round(
                            (doubleQueenQuantity / numberOfRooms) * 100
                          )
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-4 d-flex justify-content-between align-items-center w-100 md:mb-4">
                      <span
                        style={{ width: "40%" }}
                        className="text-start 2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        King Studio
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="text-sm text-end lg:text-md xl:text-lg 2xl:text-lg"
                      >
                        {numberWithCommas(kingStudioQuantity)}
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="text-sm text-end lg:text-md xl:text-lg 2xl:text-lg"
                      >
                        {Math.round((kingStudioQuantity / numberOfRooms) * 100)}
                        %
                      </span>
                    </div>

                    <div className="mt-4 d-flex justify-content-between align-items-center w-100 md:mb-4 xl:mb-4">
                      <span
                        style={{ width: "40%" }}
                        className="text-start text-sm 2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        King One
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="text-sm text-end lg:text-md xl:text-lg 2xl:text-lg"
                      >
                        {numberWithCommas(kingOneQuantity)}
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="text-sm text-end md:text-sm lg:text-md xl:text-lg 2xl:text-lg"
                      >
                        {Math.round((kingOneQuantity / numberOfRooms) * 100)}%
                      </span>
                    </div>

                    <div className="mt-4 d-flex justify-content-between align-items-center w-100  ">
                      <span
                        style={{ width: "40%" }}
                        className="text-start md:text-sm lg:text-md xl:text-lg 2xl:text-lg"
                      >
                        ADA
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="md:text-sm lg:text-md text-end xl:text-lg 2xl:text-lg"
                      >
                        {numberWithCommas(ADAQuantity)}
                      </span>
                      <span
                        style={{ width: "30%" }}
                        className="md:text-sm lg:text-md text-end xl:text-lg 2xl:text-lg"
                      >
                        {Math.round((ADAQuantity / numberOfRooms) * 100)}%
                      </span>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <div className="mt-4 mb-3 w-75 d-flex flex-column align-items-center align-self-center">
                <div className="2xl:text-lg md:text-sm lg:text-md xl:mt-0 xl:text-lg text-white d-flex flex-column justify-content-center">
                  Number of Rooms
                </div>
                <Slider
                  aria-valuetext="100"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  style={{ color: "white" }}
                  defaultValue={100}
                  max={150}
                  min={80}
                  step={1}
                  value={numberOfRooms}
                  onChange={onNumberOfRoomsChanged}
                />
                <div className="text-center text-white text-md md:text-sm xl:text-lg lg:text-md 2xl:text-lg">
                  {numberOfRooms}
                </div>
              </div>
            </>
          )}
        </div>
      </FormControl>
      <style>
        {`
        @media (max-width: 1279px)  {   
          .css-187mznn-MuiSlider-root{
            padding: 8px 0px;
          }
          .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
            font-size:1rem;
          }
        } 
        @media (min-width: 1279px) and (max-width: 1538px)   {   
              .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
                padding:8px;
              }.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
                font-size:1.125rem;
              }.css-187mznn-MuiSlider-root{
                padding: 15px 0px;
              }
        } 
         @media (min-width: 1538px)   {   
              .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
                padding:8px;
              }.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
                font-size:1.4rem;
              }.css-187mznn-MuiSlider-root{
                padding: 15px 0px;
              }
        }
        @media (min-width: 768px) and (max-width: 1024px)  {   
          .css-15v22id-MuiAccordionDetails-root{
            padding: 6px 10px 6px; 
            
          }
          .css-187mznn-MuiSlider-root{
            padding:13px 0px;
          }
          .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root{
            padding:0px 5px;
          }
          .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
            text-align:start;
            
          }
          .css-1h4kevy-MuiAutocomplete-root 
          .MuiOutlinedInput-root{
            padding:2px;
          }.css-1h4kevy-MuiAutocomplete-root 
          .MuiOutlinedInput-root
          .MuiAutocomplete-input 
          {
            padding:7px 5px 7px 5px; 
          }
          .css-eg0mwd-MuiSlider-thumb {
            width:12px;
            height:12px;
          }
          .css-n5p0mp-MuiSvgIcon-root{
            width:10px;
            margin:0.5px 2px 0px;
          }
          .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded{
            min-height:0px;
          }
       }   
       @media (min-width: 1024px) and (max-width: 1279px) and(max-height:626px) {   
          .css-15v22id-MuiAccordionDetails-root{
            padding: 7px 10px 6px; 
            
          }
          .css-187mznn-MuiSlider-root{
            padding:17px 0px;
          }
          .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root{
            padding:0px 5px;
          }
          .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
            padding:4px;
            text-align:start;
            
          }
          .css-1h4kevy-MuiAutocomplete-root 
          .MuiOutlinedInput-root{
            padding:2px;
          }.css-1h4kevy-MuiAutocomplete-root 
          .MuiOutlinedInput-root
          .MuiAutocomplete-input 
          {
            padding:10px 5px 10px 5px; 
          }
          .css-eg0mwd-MuiSlider-thumb {
            width:16px;
            height:16px;
          }
          .css-n5p0mp-MuiSvgIcon-root{
            width:10px;
            margin:0.5px 2px 0px;
          }
          .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded{
            min-height:0px;
          }
         
       }
       
      `}
      </style>
      {queenQuantityError && queenQuantityError.length && (
        <Alert
          style={{
            top: "30%",
            left: "28%",
            position: "absolute",
            zIndex: 999,
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {queenQuantityError}
        </Alert>
      )}
    </div>
  );
}

export default Sider;
