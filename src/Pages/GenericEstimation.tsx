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

interface ProjectFactor {
  id: number;
  name: string;
  cost: string; // Assuming the cost can be represented as a string
}

interface GenericEstimationType {
  generalFactors: { generalFactorsCost: number };
  buildingFactors: { buildingCost: number };
  siteWorkFactors: { siteWorkCost: number };
  projectFactors: ProjectFactor[];
}

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
    <div className=" align-items-center ">
      <div
        className="w-[100%] d-flex justify-content-around rounded-[10px] align-items-center md:mr-[6px] 2xl:p-[0.5%] mt-0 md:p-2 flex-col lg:flex-row md:flex-row "
        style={{
          backgroundColor: "#519259",
        }}
      >
        {genericEstimation &&
          genericEstimation?.projectFactors.map((item) => (
            <div
              key={item.id}
              className="rounded bg-dark rounder mx-2  border-1 w-full md:text-sm lg:text-lg"
            >
              <div
                style={{ color: "#519259" }}
                className="text-center border-bottom-0 2xl:text-lg bg-white font-bold   md:text-sm lg:text-lg"
              >
                {item.name}
              </div>
              <div
                style={{
                  color: "#4F55E7",
                  letterSpacing: "2px",
                  backgroundColor: "#DAF2DE",
                }}
                className="py-3 font-bold text-center 2xl:text-lg text-lg md:text-sm lg:text-lg"
              >
                {currencyFormat(parseFloat(item.cost))}
              </div>
            </div>
          ))}
      </div>
      <div className=" lg:flex mt-2 md:grid md:grid-cols-6">
        <div className=" lg:hidden 2xl:hidden flex sider-genetic-accordion-container md:col-span-2 ">
          <Sider />
        </div>
        <div className="bg-white md:p-2 p-0 rounded w-full flex-6 md:col-span-4">
          <div
            style={{
              color: "#519259",
              fontWeight: "bolder",
            }}
            className="font-bold h3 text-center w-full lg:mb-[10px] xl:p-0 md:text-md 2xl:text-lg font"
          >
            On-Site Construction Costs
          </div>
          <div
            style={{
              color: "#519259",
            }}
            className="text-center font-bold h4 w-full xl:p-0 md:text-sm 2xl:text-lg font"
          >
            (MasterFormat)
          </div>
          <div className="">
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
                <Typography variant="h6" className="w-50 2xl:text-lg smallfont">
                  Building Cost
                </Typography>
                <Typography
                  variant="h6"
                  className="w-50 text-right pr-4 2xl:text-lg "
                >
                  {genericEstimation?.buildingFactors &&
                    currencyFormat(
                      genericEstimation.buildingFactors?.buildingCost
                    )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="px-2 overflow-y-auto max-h-56 lg:max-h-40 xl:max-h-64 2xl:max-h-96 height textfont mb-3">
                  {genericEstimation?.buildingFactors &&
                    Object.entries(genericEstimation.buildingFactors).map(
                      (item) => (
                        <div
                          key={item[0]}
                          style={{
                            fontSize: 14,
                          }}
                          className={`border-top pt-2 ${
                            item[0] === "buildingCost" ? "d-none" : "d-flex"
                          } align-items-center justify-content-between text-secondary`}
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
                <Typography variant="h6" className="w-50 2xl:text-lg smallfont">
                  Site Work Cost
                </Typography>
                <Typography
                  variant="h6"
                  className="w-50 text-right pr-4 2xl:text-lg"
                >
                  {genericEstimation?.siteWorkFactors &&
                    currencyFormat(
                      genericEstimation.siteWorkFactors?.siteWorkCost
                    )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="px-2 overflow-y-auto max-h-56 lg:max-h-40 xl:max-h-64 2xl:max-h-96 height textfont mb-3">
                  {genericEstimation?.siteWorkFactors &&
                    Object.entries(genericEstimation.siteWorkFactors).map(
                      (item) => (
                        <div
                          key={item[0]}
                          style={{
                            fontSize: 14,
                          }}
                          className={`border-top pt-2 ${
                            item[0] === "siteWorkCost" ? "d-none" : "d-flex"
                          } align-items-center justify-content-between text-secondary`}
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
                <Typography variant="h6" className="w-50 2xl:text-xl smallfont">
                  GC Charges
                </Typography>
                <Typography
                  variant="h6"
                  className="w-50 text-right pr-4 2xl:text-xl"
                >
                  {genericEstimation?.generalFactors &&
                    currencyFormat(
                      genericEstimation.generalFactors?.generalFactorsCost
                    )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="px-2 2xl:text-xl overflow-y-auto max-h-56 lg:max-h-40 xl:max-h-64 2xl:max-h-96 height textfont mb-3">
                  {genericEstimation?.generalFactors &&
                    Object.entries(genericEstimation.generalFactors).map(
                      (item) => (
                        <div
                          key={item[0]}
                          style={{
                            fontSize: 14,
                          }}
                          className={`border-top pt-2 ${
                            item[0] === "generalFactorsCost"
                              ? "d-none"
                              : "d-flex"
                          } align-items-center justify-content-between text-secondary`}
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
          <div className="flex justify-end items-center flex-col">
            <button className="w-[55vw] rounded text-center l text-white py-3 textfont flex flex-col  items-center bg-[#519258] sticky bottom-0">
              Get Estimate
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
         @media (min-width: 1441)    and (max-height:540px) {
          .genetic-accordion-container {
            height: 100vh ;
          }
        }    @media (min-width: 2001px)  {
          .height{
            max-height: 55rem ;
          }.font{
            font-size:40px;
          }.smallfont{
            font-size:30px;
          }.textfont{
            font-size:25px;
          }
        }
        
      
        
      `}
      </style>
    </div>
  );
}

export default GenericEstimation;