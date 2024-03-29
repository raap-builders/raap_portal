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
import { useLocationStore } from "../store";
import { Store } from "antd/es/form/interface";
import { fullBlack } from "material-ui/styles/colors";

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
  const [selectedZipCode, setSelectedZipCode] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(100);
  const [openCardIndex, setOpenCardIndex] = useState(0);
  const [zipCodes, setZipCodes] = useState<ZipCodes[]>([]);
  //@ts-ignore
  const { changeRooms, changeZipCode } = useLocationStore((state) => state);
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
    setSelectedZipCode(selectedObject?.zipCode || "");
    changeZipCode(selectedObject?.zipCode || "");
  };

  return (
    <div className="2xl:text-xl xl:text-lg w-[100%]">
      <FormControl
        className="d-flex flex-column min-h-[max-content] max-h-full"
        style={{
          backgroundColor: "#519258",
          borderRadius: 15,
          marginRight: 10,
        }}
      >
        <FormLabel
          className="w-100 text-center info text-white mt-2  2xl:my-2 xl:mt-0 margin"
          id="demo-row-radio-buttons-group-label"
        >
          <span className="text-4xl max-[2500px]:text-3xl max-[2000px]:text-2xl max-[1550px]:text-xl max-[1300px]:text-lg max-[1200px]:text-sm">
            {" "}
            Select the following to get started
          </span>
        </FormLabel>
        <FormLabel
          className="w-100 xl:my-2 my-1 text-center text-white 2xl:text-xl xl:text-lg margin"
          id="demo-row-radio-buttons-group-label"
        >
          <span className="text-4xl max-[2500px]:text-3xl max-[2000px]:text-2xl max-[1550px]:text-xl max-[1300px]:text-lg max-[1200px]:text-sm">
            Project Information
          </span>
          
        </FormLabel>
        <FormLabel  className="text-left 2xl:my-2 xl:my-2 md:my-0 text-white 2xl:text-xl xl:text-lg mx-6"
        >
        <div className=" w-100 ">
                  <div className="text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1500px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                    Number of Rooms
                  </div>
                  {/* 519259 */}
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
                  <div className="mb-2 text-center text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                    {numberOfRooms}
                  </div>
                </div>
        </FormLabel>
        <div
          className="flex flex-col items-center sider-accordion-container max-h-screen px-[5%] xl:gap-2 2xl;gap-3 md:gap-1 pb-[4%]  
        
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
                <span className="font-semibold text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-sm md:px-2 xl:px-0">
                  {" "}
                  Project
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="px-3">
                <div className="d-flex align-items-start justify-content-between mt-0 ">
                  <div>
                    <span
                      style={{ color: "#519259" }}
                      className="text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]"
                    >
                      Hotel Type
                    </span>
                    <RadioGroup
                      className="w-[max-content] mt-8 max-[1350px]:mt-5 md:gap-3 2xl:gap-4 space"
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group "
                    >
                      <FormControlLabel
                        className="h-[25px] lg:h-[28%] 2xl:h-[30%]"
                        disabled
                        value="selectService"
                        control={
                          <Radio size="small" style={{ color: "#878787" }} />
                        }
                        label={
                          <span className="text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
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
                          <span className="text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
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
                            className="text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]"
                          >
                            Full Service
                          </span>
                        }
                      />
                    </RadioGroup>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center gap-2 justify-content-center mt-6 min-[2000px]:my-8">
                  <div className="min-[2000px]:mb-8 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px] 2xl:my-2 text-[#519259] xl:mb-0">
                    Site's zip code
                  </div>
                  <div className="w-full ">
                    <Autocomplete
                      freeSolo
                      sx={{ width: "auto" }}
                      disableClearable
                      inputValue={zipCode}
                      value={selectedZipCode}
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

                <div className=" w-100 ">
                  <div className=" 2xl:text-lg md:text-sm lg:text-md xl:mt-0 xl:text-lg">
                    Number of Rooms
                  </div>
                  <Slider
                    aria-valuetext="100"
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    style={{ color: "#519259" }}
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
              </Typography>
            </AccordionDetails>
          </Accordion>
          {location.pathname === "/" ? (
            <button
              onClick={onFormSubmitted}
              style={{ backgroundColor: "#519259", bottom: 20 }}
              className="text-white text-center border-1 rounded bottom-3 md:py-2 xl:py-3 md:mt-4 xl:mt-6 w-75 md:mb-2 xl:mb-0 2xl:mb-0 textfont margin"
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
                    <span className="font-semibold text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-sm md:px-2 lg:px-2 xl:px-0 2xl:px-0">
                      Site
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className=" md:px-2 xl:px-4">
                    <div className="d-flex justify-content-between align-items-center md:mb-4 xl:mb-0 w-100 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px] lg:mb-8 ">
                      <span style={{ color: "#519259" }}>Parameter</span>
                      <span style={{ color: "#519259" }}>Default</span>
                    </div>

                    <div className="lg:mt-2  grid grid-cols-3  justify-content-between align-items-center w-100 xl:mb-2 md:mb-2 ">
                      <span className="col-span-2 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                        {" "}
                        Number of floors
                      </span>
                      <TextField
                        className="w-30 w-full"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={4}
                        placeholder="4"
                      />
                    </div>
                    <div className="lg:mt-2 grid grid-cols-3  justify-content-between align-items-center w-100 xl:mb-2 md:mb-4 ">
                      <span className="grid col-span-2 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                        Total Sq Ft (w/o pool)
                      </span>
                      <TextField
                        className="w-30 w-full"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={58334}
                        placeholder="58,334"
                      />
                    </div>
                    <div className="lg:mt-2  grid grid-cols-3  justify-content-between align-items-center w-100 xl:mb-2 md:mb-4 2xl:mb-4">
                      <span className="col-span-2 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                        Story Height (Ft.)
                      </span>
                      <TextField
                        className="w-30 w-full"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={10}
                        placeholder="10"
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
                    <div className="lg:mt-2  grid grid-cols-3 justify-content-between align-items-center xl:mb-1 w-100 md:mb-3 2xl:mb-4">
                      <span className="col-span-2 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                        Perimeter (Ft.)
                      </span>
                      <TextField
                        className="w-30 w-full"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={598}
                        placeholder="598"
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
                className="mt-2 w-[100%] rounded xl:m-0 mb-2"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <span className="font-semibold text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-sm md:px-2 xl:px-0md:px-2 lg:px-2 xl:px-0 2xl:px-0">
                      Rooms
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className=" lg:pb-2 md:px-2 md:pb-2 xl:px-4">
                    <div className="grid grid-cols-7 justify-content-between align-items-center w-100 lg:mb-4 md:mb-4 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                      <span
                        style={{ color: "#519259" }}
                        className="col-span-4"
                      >
                        Room Mix
                      </span>
                      <span
                        style={{ color: "#519259" }}
                        className="col-span-2 text-center"
                      >
                        No.
                      </span>
                      <span
                        style={{ color: "#519259" }}
                        className="col-span-1 text-right"
                      >
                        %
                      </span>
                    </div>

                    <div className="grid grid-cols-7 justify-content-between align-items-center w-100 md:mb-4 xl:mb-4 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                      <span className="col-span-4">
                        King One Bedroom
                      </span>
                      <TextField
                        className="w-[100%] col-span-2"
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={9}
                        placeholder="9"
                      />
                      <span className="col-span-1 text-right">
                        8%
                      </span>
                    </div>

                    <div className="grid grid-cols-7 justify-content-between align-items-center w-100 md:mb-4 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                      <span className="col-span-4">
                        King Studio
                      </span>
                      <span className="col-span-2 ml-2 my-2 text-left">
                        89
                      </span>
                      <span className="col-span-1 text-right">
                        83%
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-7 justify-content-between align-items-center w-100 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                      <span className="col-span-4">
                        Double Queen Studio
                      </span>
                      <span className="col-span-2  ml-2 my-2 text-left">
                        17
                      </span>
                      <span className="col-span-1 text-right">
                        16%
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-7 justify-content-between align-items-center w-100 text-3xl max-[2500px]:text-2xl max-[2000px]:text-xl max-[1550px]:text-lg max-[1300px]:text-md max-[1200px]:text-sm max-[1170px]:text-[15px]">
                      <span className="col-span-4">
                        ADA
                      </span>
                      <span className="col-span-2 ml-2 my-2 text-left">
                        12
                      </span>
                      <span className="col-span-1 text-right">
                        11%
                      </span>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </div>
      </FormControl>
      <style>{`
      @media(min-width:2001px){
        .css-1h4kevy-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input{
          padding:16.5px 5px !important;
        }.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root{
          font-size:2rem !important;
        }input{
          font-size:2rem !important;
        }.space{
          gap:3rem !important;
        }.textfont{
          font-size:30px !important;
        }.margin{
          margin:25px 0px !important;
        }
      }
      .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input{
        padding:6px;
      }
      @media(max-width:1279px){
      .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root{
        padding:4px !important;
      }
     .css-2ulfj5-MuiTypography-root{
        padding-left:10px;
      }
      .css-yw020d-MuiAccordionSummary-expandIconWrapper{
        padding:10px;
      }
    }
      `
      }
      </style>
    </div>
  );
}

export default Sider;
