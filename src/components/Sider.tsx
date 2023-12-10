import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import axios from "axios";

interface ZipCodes {
  id: number;
  zipCode: string;
  city: string;
  state: string;
}
function Sider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [zipCode, setZipCode] = useState("");
  const [selectedZipCode, setSelectedZipCode] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(100);
  const [openCardIndex, setOpenCardIndex] = useState(0);
  const [zipCodes, setZipCodes] = useState<ZipCodes[]>([]);

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
        setZipCodes(zipCodes.data.data);
      })
      .catch((error) => console.log("err", error));
  };

  const onZipCodeChanged = (event: React.ChangeEvent<{}>, newValue: string) => {
    setZipCode(newValue);
    if (Number.isInteger(parseInt(newValue))) getZipCodes(newValue);
  };

  const onNumberOfRoomsChanged = (
    event: Event,
    newValue: number | number[]
  ) => {
    // @ts-ignore
    setNumberOfRooms(newValue);
  };

  const onFormSubmitted = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/estimation/generic`,
      {
        rooms: numberOfRooms,
        zipCode: selectedZipCode,
      }
    );
    if (result) navigate("/generic_estimation");
  };

  const onZipCodeSelected = (
    event: React.ChangeEvent<{}>,
    newValue: string
  ) => {
    setSelectedZipCode(newValue);
  };

  return (
    <FormControl
      className="d-flex flex-column align-items-center h-100"
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
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
              <div className="text-center" style={{ color: "#519259" }}>
                Site's zip code
              </div>
              <Autocomplete
                freeSolo
                sx={{ width: 300 }}
                id="free-solo-2-demo"
                disableClearable
                inputValue={zipCode}
                value={selectedZipCode}
                onInputChange={onZipCodeChanged}
                onChange={onZipCodeSelected}
                options={zipCodes.map(
                  (option) =>
                    `${option.city}, ${option.state} ${option.zipCode}`
                )}
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
              <div className="text-center font-bold h5">{numberOfRooms}</div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {location.pathname === "/" ? (
        <button
          onClick={onFormSubmitted}
          style={{ backgroundColor: "#519259", bottom: 20 }}
          className="text-white text-center border-1 rounded position-absolute border-white p-3 mt-4 w-75"
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
