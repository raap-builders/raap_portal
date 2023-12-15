import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { currencyFormat } from "../utils/formatter";
import { useLocationStore } from "../store";

interface GenericEstimationType {
  generalFactors: object;
  buildingFactors: object;
  siteWorkFactors: object;
}
const projectFactors = [
  { id: 1, name: "Total Project Cost", cost: "$13,030,048" },
  { id: 2, name: "Cost Per Key", cost: "$121,776" },
  { id: 3, name: "Cost Per Square Foot", cost: "$262" },
  { id: 4, name: "Build Time", cost: "14 Months" },
];

function GenericEstimation() {
  //@ts-ignore
  const { rooms: numberOfRooms, zipCode } = useLocationStore((state) => state);
  const [genericEstimation, setGenericEstimation] =
    useState<GenericEstimationType>();
  //@ts-ignore

  useEffect(() => {
    console.log("number", numberOfRooms, zipCode);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/estimation/generic`, {
        rooms: numberOfRooms,
        zipCode: zipCode,
      })
      .then((result) => {
        setGenericEstimation(result.data.data);
      });
  }, [numberOfRooms, zipCode]);

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div
        className="w-100 d-flex justify-content-around align-items-center p-5 rounded-top-5"
        style={{
          backgroundColor: "#519259",
        }}
      >
        {projectFactors.map((item) => (
          <div key={item.id} className="rounded bg-dark w-25 mx-3 border-1">
            <div
              style={{ color: "#519259" }}
              className="text-center border-bottom-0 bg-white font-bold py-2"
            >
              {item.name}
            </div>
            <div
              style={{
                color: "#4F55E7",
                fontSize: 24,
                letterSpacing: "2px",
                backgroundColor: "#DAF2DE",
              }}
              className="py-4 font-bold text-center"
            >
              {item.cost}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ overflowY: "scroll", height: 300 }}
        className="bg-white mt-5 p-2 rounded w-75"
      >
        <div
          style={{
            color: "#519259",
            fontWeight: "bolder",
          }}
          className="font-bold h3 text-center w-100"
        >
          On-Site Construction Costs
        </div>
        <div
          style={{
            color: "#519259",
          }}
          className="text-center font-bold h4 w-100"
        >
          OUTPUTS (MasterFormat)
        </div>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className="w-50">
              Building Cost
            </Typography>
            <Typography variant="h6" className="w-50 text-right pr-4">
              $8,961,190
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {genericEstimation?.buildingFactors &&
                Object.entries(genericEstimation.buildingFactors).map(
                  (item) => (
                    <div
                      key={item[0]}
                      style={{
                        fontSize: 14,
                      }}
                      className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                    >
                      <div>{item[0]}</div>
                      <div>{currencyFormat(item[1])}</div>
                    </div>
                  )
                )}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className="w-50">
              Site Work Cost
            </Typography>
            <Typography variant="h6" className="w-50 text-right pr-4">
              $1,462,715
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {genericEstimation?.siteWorkFactors &&
                Object.entries(genericEstimation.siteWorkFactors).map(
                  (item) => (
                    <div
                      key={item[0]}
                      style={{
                        fontSize: 14,
                      }}
                      className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                    >
                      <div>{item[0]}</div>
                      <div>{currencyFormat(item[1])}</div>
                    </div>
                  )
                )}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className="w-50">
              General Conditions & Fees
            </Typography>
            <Typography variant="h6" className="w-50 text-right pr-4">
              $141,474
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {genericEstimation?.generalFactors &&
                Object.entries(genericEstimation.generalFactors).map((item) => (
                  <div
                    key={item[0]}
                    style={{
                      fontSize: 14,
                    }}
                    className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                  >
                    <div>{item[0]}</div>
                    <div>{currencyFormat(item[1])}</div>
                  </div>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div
        style={{ position: "sticky", bottom: 0 }}
        className="w-100 d-flex justify-content-center align-items-center py-3"
      >
        <button
          style={{
            backgroundColor: "#4F55E7",
          }}
          className="w-75 rounded text-center text-white py-3"
        >
          Get Estimate
        </button>
      </div>
    </div>
  );
}

export default GenericEstimation;
