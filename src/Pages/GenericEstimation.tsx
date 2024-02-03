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
import Sider from "../components/Sider";

interface GenericEstimationType {
  generalFactors: { generalFactorsCost: number };
  buildingFactors: { buildingCost: number };
  siteWorkFactors: { siteWorkCost: number };
}
const projectFactors = [
  { id: 1, name: "Total Project Cost", cost: "$13,030,048" },
  { id: 2, name: "Cost Per Key", cost: "$121,776" },
  { id: 3, name: "Cost Per Square Foot", cost: "$262" },
  { id: 4, name: "Build Time", cost: "14_Months" },
];

function GenericEstimation() {
  //@ts-ignore
  const { rooms: numberOfRooms, zipCode } = useLocationStore((state) => state);
  const [genericEstimation, setGenericEstimation] =
    useState<GenericEstimationType>();
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    "building"
  );
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
  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };
  return (
    <div className=" d-flex flex-column align-items-center sm:ml-2 w-full ">
      <div
        className="w-[100%] d-flex justify-content-around rounded-[20px] align-items-center md:mr-[6px] md:mt-2 p-4 rounded-top-5 flex-col lg:flex-row md:flex-row xl:mr-6 lg:ml-8 "
        style={{
          backgroundColor: "#519259",
        }}
      >
        {projectFactors.map((item) => (
          <div key={item.id} className="rounded bg-dark  mx-3 border-1 w-full ">
            <div
              style={{ color: "#519259" }}
              className="text-center border-bottom-0 bg-white font-bold py-2"
            >
              {item.name}
            </div>
            <div
              style={{
                color: "#4F55E7",

                letterSpacing: "2px",
                backgroundColor: "#DAF2DE",
              }}
              className="py-3 font-bold text-center text-2xl "
            >
              {item.cost}
            </div>
          </div>
        ))}
      </div>
      <div className="flex  w-100  ">
        <div className=" md:block w-[100%] lg:hidden md:mr-12 md:mt-14 2xl:hidden flex overflow-y-auto  scrollbar-hide ">
          <Sider />
        </div>
        <div className="bg-white md:mt-12  p-2 rounded w-full " style={{}}>
          <div
            style={{
              color: "#519259",
              fontWeight: "bolder",
            }}
            className="font-bold h3 text-center w-[full]"
          >
            On-Site Construction Costs
          </div>
          <div
            style={{
              color: "#519259",
            }}
            className="text-center font-bold h4 w-full"
          >
            (MasterFormat)
          </div>
          <div className="md:max-h-full genetic-accordion-container xl:max-h-full overflow-y-auto scrollbar-hide max-h-screen">
            <Accordion
              className="m-4"
              expanded={expandedAccordion === "building"}
              onChange={handleChangeAccordion("building")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50">
                  Building Cost
                </Typography>
                <Typography variant="h6" className="w-50 text-right pr-4">
                  {genericEstimation?.buildingFactors &&
                    currencyFormat(
                      genericEstimation.buildingFactors?.buildingCost
                    )}
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

            <Accordion
              className="m-4"
              expanded={expandedAccordion === "siteWork"}
              onChange={handleChangeAccordion("siteWork")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50">
                  Site Work Cost
                </Typography>
                <Typography variant="h6" className="w-50 text-right pr-4">
                  {genericEstimation?.siteWorkFactors &&
                    currencyFormat(
                      genericEstimation.siteWorkFactors?.siteWorkCost
                    )}
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

            <Accordion
              className="m-4"
              expanded={expandedAccordion === "generalConditions"}
              onChange={handleChangeAccordion("generalConditions")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50">
                  General Conditions & Fees
                </Typography>
                <Typography variant="h6" className="w-50 text-right pr-4">
                  {genericEstimation?.generalFactors &&
                    currencyFormat(
                      genericEstimation.generalFactors?.generalFactorsCost
                    )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {genericEstimation?.generalFactors &&
                    Object.entries(genericEstimation.generalFactors).map(
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
          </div>
          <button className="w-75 rounded text-center text-white py-3 mt-1 md:ml-16 2xl:ml-64 lg:ml-32 items-center bg-[#519258] sticky">
            Get Estimate
          </button>
        </div>
      </div>
      <style>
        {`
        .genetic-accordion-container{
        }
        @media (min-width: 768px) and (max-width: 1023px) and (min-height: 626px) and (max-height: 700px) {
          .genetic-accordion-container {
            max-height: 39vh; 
          }
        }
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:701px) and (max-height:754px){
          .genetic-accordion-container {
            max-height: 48vh; 
          }
        }
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:754px) and (max-height:840px){
          .genetic-accordion-container {
            max-height: 48vh; 
          }
        }
      
        @media (min-width: 768px) and (max-width: 1023px)  and (min-height:840px){
          .genetic-accordion-container {
            max-height: 57vh; 
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 626px) and (max-height: 741px)
        {
          .genetic-accordion-container {
            max-height: 35vh; 
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 741px) and (max-height: 800px)
        {
          .genetic-accordion-container {
            max-height: 46vh; 
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 800px) and (max-width:900px)
        {
          .genetic-accordion-container {
            max-height: 48vh; 
          }
        }@media (min-width: 1024px) and (max-width: 1279px) 
        and (min-height: 900px)
        {
          .genetic-accordion-container {
            max-height: 54vh; 
          }
        }
        @media(min-width:1279px) and (max-width:1440px)and (min-height:626px) and (max-height:701px){
          .genetic-accordion-container {
            max-height: 45vh;
          }
        }
        @media(min-width:1279px) and (max-width:1440px) and (min-height:701px){
          .genetic-accordion-container {
            max-height: 40vh;
          }
        }
        @media(min-width:1440px) and (max-width:2560px) and(min-height:626px)and (max-height:750px){
          .genetic-accordion-container {
            max-height: 53vh;
          }
        }
        @media (min-width: 1440px) and (max-width: 2560px)  and (min-height:750px) and (max-height:789px){
          .genetic-accordion-container {
            max-height: 46vh;
          }
        }
        @media (min-width: 1440px) and (max-width: 2560px)  and (min-height:789px){
          .genetic-accordion-container {
            max-height: 48vh; 
          }
        }
        @media (min-width:2560px){
          .genetic-accordion-container {
            max-height:67vh;
          }
        }
      `}
      </style>
    </div>
  );
}

export default GenericEstimation;
