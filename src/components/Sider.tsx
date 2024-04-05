//ts-check
import React, { useEffect, useState } from "react";
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
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useLocationStore, useRoomStore } from "../store";

interface ZipCodes {
  id: number;
  zipCode: string;
  city: string;
  state: string;
  label: string;
  title: string;
}
function Sider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [zipCode, setZipCode] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(100);
  const [openCardIndex, setOpenCardIndex] = useState(0);
  const [numberOfFLoors, setNumberOfFloors] = useState(4);
  const [doubleQueenQuantity, setDoubleQueenQuantity] = useState(20);
  const [ADAQuantity, setADAQuantity] = useState(9);
  const [kingOneQuantity, setKingOneQuantity] = useState(5);
  const [kingStudioQuantity, setKingStudioQuantity] = useState(125);
  const [perimeter, setPerimeter] = useState(598);
  const [totalSqFt, setTotalSqFt] = useState(58334);
  const [zipCodes, setZipCodes] = useState<ZipCodes[]>([]);
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
  } = useRoomStore((state) => state);
  useEffect(() => {
    getZipCodes();
  }, []);

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
        setZipCodes(arr);
      })
      .catch((error) => console.log("err", error));
  };

  const onZipCodeChanged = (event: React.ChangeEvent<{}>, newValue: string) => {
    setZipCode(newValue);
    if (Number.isInteger(parseInt(newValue)) || !newValue)
      getZipCodes(newValue);
  };

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

  const onZipCodeSelected = (
    event: React.ChangeEvent<{}>,
    newValue: string
  ) => {
    const selectedObject = zipCodes.find((option) => option.label === newValue);
    changeZipCode(selectedObject?.zipCode || "");
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
    setDoubleQueenQuantity(parseInt(event.target.value));
    changeDoubleQueen(parseInt(event.target.value));
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
          marginRight: 10,
        }}
      >
        <FormLabel
          className="w-100 text-center text-white my-3 xl:mt-0"
          id="demo-row-radio-buttons-group-label"
        >
          <span className="2xl:text-xl xl:text-md md:text-sm lg:text-md font-bold">
            {" "}
            Tell Us About Your Project
          </span>
        </FormLabel>
        <div
          className="flex flex-col items-center sider-accordion-container max-h-screen px-[5%] pb-[4%]  
        
      "
          style={{ maxHeight: "max-content" }}
        >
          <Accordion
            onChange={(e, expanded) => {
              if (expanded) {
                setOpenCardIndex(0);
              } else setOpenCardIndex(4);
            }}
            expanded={openCardIndex === 0}
            className=" rounded w-[100%] m-0 p-0 "
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className=" md:p-0"
            >
              <Typography>
                {" "}
                <span className="2xl:text-lg xl:text-md   font-medium md:text-md lg:text-md md:px-2 xl:px-0 2xl:px-0 xl:text-lg">
                  {" "}
                  Project
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="px-3">
                <div className="d-flex align-items-start  justify-content-between md:m-w-max  2xl:text-lg mt-0 2xl:mb-4">
                  <div>
                    <span
                      style={{ color: "#519259" }}
                      className="2xl:text-lg xl:text-md  lg:text-md md:text-md  "
                    >
                      Hotel Type
                    </span>
                    <RadioGroup
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
                    </RadioGroup>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center  xl:text-lg">
                  <div className="text-center 2xl:text-lg  md:mb-2  text-[#519259] md:text-sm lg:text-md  xl:mb-0  xl:text-lg ">
                    Site's zip code
                  </div>
                  <div className="w-full ">
                    <Autocomplete
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
                    />
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {location.pathname === "/landing" ? (
            <button
              onClick={onFormSubmitted}
              style={{ backgroundColor: "#519259", bottom: 20 }}
              className="text-white text-center border-1 rounded bottom-3 py-2 mt-2  w-75"
            >
              See Estimate
            </button>
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
                      <span style={{ color: "#519259" }}>Default</span>
                    </div>

                    <div className="lg:mt-2 d-flex justify-content-between align-items-center w-100 xl:mb-2 md:mb-2 ">
                      <span className="text-sm w-50 2xl:text-lg md:text-sm lg:text-md xl:text-lg ">
                        {" "}
                        Number of floors
                      </span>
                      <TextField
                        className="w-30 md:w-[30%] lg:w-[30%] xl:w-[50%] p-[8px]"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={4}
                        type="number"
                        value={numberOfFLoors}
                        onChange={onNumberOfFloorsChanged}
                      />
                    </div>
                    <div className="lg:mt-2 d-flex justify-content-between align-items-center w-100 xl:mb-2 md:mb-4 ">
                      <span className="md:text-sm lg:text-md w-50 2xl:text-lg xl:text-lg">
                        Total Sq Ft (w/o pool)
                      </span>
                      <TextField
                        className="w-30 md:w-[30%] lg:w-[30%] xl:w-[50%]"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        defaultValue={58334}
                        value={totalSqFt}
                        onChange={onTotalSqFtChanged}
                      />
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
                      <TextField
                        className="w-30 md:w-[30%] lg:w-[30%] xl:w-[50%]"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={598}
                        value={perimeter}
                        type="number"
                        onChange={onPerimeterChanged}
                      />
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
                  <Typography className=" lg:pb-2 md:px-2 md:pb-2 xl:px-4">
                    <div className="d-flex justify-content-between align-items-center w-100 lg:mb-4 md:mb-4">
                      <span
                        style={{ color: "#519259" }}
                        className="2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        Room Mix
                      </span>
                      <span
                        style={{ color: "#519259" }}
                        className="2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        No.
                      </span>
                      <span
                        style={{ color: "#519259" }}
                        className="2xl:text-lg md:text-sm lg:text-md xl:text-lg"
                      >
                        %
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center w-100 md:mb-4 xl:mb-4">
                      <span className="text-sm w-50 2xl:text-lg md:text-sm lg:text-md xl:text-lg">
                        King One Bedroom
                      </span>
                      <TextField
                        className="w-25"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        defaultValue={9}
                        value={kingOneQuantity}
                        onChange={onKingOneQuantityChanged}
                      />
                      <span className="text-sm text-right w-25 md:text-sm lg:text-md xl:text-lg 2xl:text-lg">
                        8%
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center w-100 md:mb-4">
                      <span className="text-left  w-50 2xl:text-lg md:text-sm lg:text-md xl:text-lg">
                        King Studio
                      </span>
                      <TextField
                        className="w-25"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        defaultValue={9}
                        value={kingStudioQuantity}
                        onChange={onKingStudioQuantityChanged}
                      />
                      <span className="text-sm text-right w-25 lg:text-md xl:text-lg 2xl:text-lg">
                        83%
                      </span>
                    </div>

                    <div className="mt-2 d-flex justify-content-between align-items-center w-100">
                      <span className="text-left md:text-sm lg:text-md w-50 2xl:text-lg xl:text-lg">
                        Double Queen Studio
                      </span>
                      <TextField
                        className="w-25"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        defaultValue={9}
                        value={doubleQueenQuantity}
                        onChange={onDoubleQueenQuantityChanged}
                      />
                      <span className="md:text-sm lg:text-md text-right w-25 xl:text-lg 2xl:text-lg">
                        16%
                      </span>
                    </div>

                    <div className="mt-2 d-flex justify-content-between align-items-center w-100  ">
                      <span className="text-left md:text-sm lg:text-md w-50 xl:text-lg 2xl:text-lg">
                        ADA
                      </span>
                      <TextField
                        className="w-25"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        defaultValue={9}
                        value={ADAQuantity}
                        onChange={onADAChanged}
                      />
                      <span className="md:text-sm lg:text-md text-right w-25 xl:text-lg 2xl:text-lg">
                        11%
                      </span>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </div>
        <div className=" w-100">
          <div className="2xl:text-lg md:text-sm lg:text-md xl:mt-0 xl:text-lg text-white d-flex flex-column justify-content-center">
            Number of Rooms
          </div>
          <Slider
            aria-valuetext="100"
            aria-label="Default"
            valueLabelDisplay="auto"
            style={{ color: "white" }}
            defaultValue={100}
            max={120}
            min={80}
            step={1}
            value={numberOfRooms}
            onChange={onNumberOfRoomsChanged}
          />
          <div className="text-center text-md md:text-sm xl:text-lg lg:text-md 2xl:text-lg">
            {numberOfRooms}
          </div>
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
    </div>
  );
}

export default Sider;
