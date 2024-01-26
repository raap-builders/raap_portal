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
            label: `${item.city}, ${item.state} ${item.zipCode}`,
            title: `${item.city}, ${item.state} ${item.zipCode}`,
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
    <div className="w-full ">
      <FormControl
        className="d-flex flex-column pb-4 "
        style={{
          backgroundColor: "#519258",
          borderRadius: 20,
        }}
      >
        <FormLabel
          className="w-100 text-center text-white mt-4"
          id="demo-row-radio-buttons-group-label"
        >
          Select the following to get started
        </FormLabel>
        <FormLabel
          className="w-100 text-center text-white mt-2"
          id="demo-row-radio-buttons-group-label"
        >
          Project Information
        </FormLabel>
        <div
          className="flex flex-col items-center sider-accordion-container max-h-screen overflow-y-auto scrollbar-hide
      "
          // overflow-y-scroll  xl:max-h-[400px]
          style={
            {
              // overflowY:"scroll",
              // height:"60%"
            }
          }
        >
          <Accordion
            onChange={(e, expanded) => {
              if (expanded) {
                setOpenCardIndex(0);
              } else setOpenCardIndex(4);
            }}
            expanded={openCardIndex === 0}
            className="mt-1 w-75 rounded"
          >
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
                        label={
                          <span style={{ fontSize: 12 }}>Select Services</span>
                        }
                      />
                      <FormControlLabel
                        value="extendedService"
                        control={
                          <Radio size="small" style={{ color: "#519259" }} />
                        }
                        label={
                          <span style={{ fontSize: 12 }}>Extended Stay</span>
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
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center mt-3 mb-4">
                  <div
                    className="text-center"
                    style={{ color: "#519259", width: "300px", margin: "10px" }}
                  >
                    Site's zip code
                  </div>
                  <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full">
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

                <div className="mt-4 w-100">
                  <div className="mb-2">Number of rooms</div>
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
                  <div className="text-center font-bold h5">
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
              className="text-white text-center border-1 rounded position-relative border-white p-3 mt-8 w-75"
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
                className="mt-3 w-75 rounded"
              >
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
                      <span className="text-sm w-50">
                        Total Sq Ft (w/o pool)
                      </span>
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

              <Accordion
                onChange={(e, expanded) => {
                  if (expanded) {
                    setOpenCardIndex(2);
                  } else setOpenCardIndex(4);
                }}
                expanded={openCardIndex === 2}
                className="mt-3 w-75 rounded"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Rooms</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="d-flex justify-content-between align-items-center w-100 ">
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
                      <span className="text-left text-sm w-50">
                        King Studio
                      </span>
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
        </div>
      </FormControl>
      <style>
        {`
        .sider-accordion-container{
          
        }
      
        @media (min-width: 768px) and (max-width: 1023px) and (min-height: 626px) and (max-height: 700px) {
          .sider-accordion-container{
            max-height: 43vh; 
          }
        }
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:701px) and (max-height:789px){
          .sider-accordion-container{
            max-height: 48vh; 
          }
        }
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:789px) and (max-height:840px){
          .sider-accordion-container{
            max-height: 50vh; 
          }
        }
      
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:840px) {
          .sider-accordion-container{
            max-height: 57vh; 
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 626px) and (max-height: 741px)
        {
          .sider-accordion-container{
            max-height: 65vh; 
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 741px)
        {
          .sider-accordion-container{
            max-height: 70vh; 
          }
        }
        @media(min-width:1279px) and (max-width:1440px)and (min-height:626px) and (max-height:701px){
          .sider-accordion-container{
            max-height: 63vh;
          }
        }
        @media(min-width:1279px) and (max-width:1440px) and (min-height:701px){
          .sider-accordion-container{
            max-height: 67vh;
          }
        }
        @media(min-width:1440px) and (max-width:2560px) and(min-height:626px)and (max-height:701px){
          .sider-accordion-container{
            max-height: 70vh;
          }
        }
        @media (min-width: 1440px) and (max-width: 2560px)  and (min-height:701px) and (max-height:789px){
          .sider-accordion-container{
            max-height: 67vh;
          }
        }
        @media (min-width: 1440px) and (max-width: 2560px)  and (min-height:789px){
          .sider-accordion-container{
            max-height: 70vh; 
          }
        }
        @media (min-width:2560px){
          .sider-accordion-container{
            max-height:67vh;
          }
        }
      `}
      </style>
    </div>
  );
}

export default Sider;
