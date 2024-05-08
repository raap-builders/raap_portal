import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";
import { currencyFormat } from "../utils/formatter";
import { useLocationStore, useRoomStore } from "../store";
import Sider from "../components/Sider";
import { fetchAPI } from "../utils/fetcher";

interface ProjectFactor {
  id: number;
  name: string;
  cost: string; // Assuming the cost can be represented as a string
}

interface IData {
  floors: number;
  kingOneQuantity: number;
  kingStudioQuantity: number;
  perimeter: number;
  doubleQueenQuantity: number;
  totalSqFt: number;
  adaQuantity: number;
}

interface IResult {
  data: IData;
}

interface GenericEstimationType {
  generalFactors: { generalFactorsCost: number };
  buildingFactors: { buildingCost: number };
  siteWorkFactors: { siteWorkCost: number };
  projectFactors: ProjectFactor[];
}

function GenericEstimation() {
  //@ts-ignore
  const {
    //@ts-ignore
    rooms: numberOfRooms,
    //@ts-ignore
    zipCodeObject,
    //@ts-ignore
    totalSqFt,
    //@ts-ignore
    perimeter,
    //@ts-ignore
    floors,
    //@ts-ignore
    changeTotalSqFt,
    //@ts-ignore
    changePerimeter,
    //@ts-ignore
    changeFloors,
  } = useLocationStore((state) => state);

  const {
    //@ts-ignore
    kingOneQuantity,
    //@ts-ignore
    kingStudioQuantity,
    //@ts-ignore
    ADAQuantity: adaQuantity,
    //@ts-ignore
    doubleQueenQuantity,
    //@ts-ignore
    changeDoubleQueen,
    //@ts-ignore
    changeKingOne,
    //@ts-ignore
    changeKingStudio,
    //@ts-ignore
    changeADA,
  } = useRoomStore((state) => state);

  const [genericEstimation, setGenericEstimation] =
    useState<GenericEstimationType>();

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    "building"
  );
  //@ts-ignore

  useEffect(() => {
    getEstimation();
  }, [
    numberOfRooms,
    zipCodeObject,
    floors,
    totalSqFt,
    perimeter,
    kingOneQuantity,
    doubleQueenQuantity,
    adaQuantity,
    kingStudioQuantity,
  ]);

  const getEstimation = async () => {
    const result: IResult = await fetchAPI({
      route: "estimation/generic",
      method: "POST",
      withAuth: true,
      data: {
        rooms: numberOfRooms,
        zipCode: zipCodeObject.zipCode,
        totalSqFt,
        perimeter,
        floors,
        adaQuantity,
        kingOneQuantity,
        kingStudioQuantity,
        doubleQueenQuantity,
      },
    });
    const { data } = result;
    //@ts-ignore
    setGenericEstimation(data);
    changeDoubleQueen(data.doubleQueenQuantity);
    changeKingStudio(data.kingStudioQuantity);
    changeFloors(data.floors);
    changePerimeter(data.perimeter);
    changeTotalSqFt(data.totalSqFt);
    changeKingOne(data.kingOneQuantity);
    changeADA(data.adaQuantity);
  };

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };
  return (
    <div className="d-flex flex-column align-items-center w-full">
      <div
        className="w-[100%] d-flex justify-content-around rounded-[10px] align-items-center md:mr-[6px] md:mt-2 2xl:p-[0.5%] mt-0 p-2 lg:flex-row flex-row xl:mr-6"
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
                className="text-center max-md:text-sm border-bottom-0 2xl:text-lg bg-white font-bold md:text-sm lg:text-lg"
              >
                {item.name}
              </div>
              <div
                style={{
                  color: "#4F55E7",
                  letterSpacing: "2px",
                  backgroundColor: "#DAF2DE",
                  fontSize: 24,
                }}
                className="py-3 max-md:leading-[1.25rem] font-bold text-center 2xl:text-lg text-lg md:text-sm lg:text-lg"
              >
                {item.name === "Build Time"
                  ? `${item.cost} Months`
                  : currencyFormat(parseFloat(item.cost))}
              </div>
            </div>
          ))}
      </div>
      <div className="flex w-full mt-2 h-full">
        <div className="md:block  lg:hidden 2xl:hidden flex sider-genetic-accordion-container flex-col flex-4 w-[50%] ">
          <Sider />
        </div>
        <div className="bg-white md:p-2 p-0 rounded w-full flex-6">
          <div
            style={{
              color: "#519259",
              fontWeight: "bolder",
            }}
            className="font-bold h3 text-center w-full lg:mb-[10px] xl:p-0 md:text-md 2xl:text-lg"
          >
            On-Site Construction Costs
          </div>
          <div
            style={{
              color: "#519259",
            }}
            className="text-center font-bold h4 w-full xl:p-0 md:text-sm 2xl:text-lg"
          >
            (Generic Estimate)
          </div>
          <div className="overflow-y-scroll max-h-[56vh] scrollBarStyle">
            <Accordion
              className="m-4"
              defaultExpanded
              onChange={handleChangeAccordion("building")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50 2xl:text-lg">
                  Building Cost
                </Typography>
                <Typography
                  variant="h6"
                  className="w-50 text-right pr-4 2xl:text-lg"
                >
                  {genericEstimation?.buildingFactors &&
                    currencyFormat(
                      genericEstimation.buildingFactors?.buildingCost
                    )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="px-2">
                  {genericEstimation?.buildingFactors &&
                    Object.entries(genericEstimation.buildingFactors).map(
                      (item) => (
                        <div
                          key={item[0]}
                          style={{
                            fontSize: 18,
                          }}
                          className={`border-top pt-2 ${
                            item[0] === "buildingCost" ? "d-none" : "d-flex"
                          } align-items-center justify-content-between text-secondary text-capitalize`}
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
              defaultExpanded
              onChange={handleChangeAccordion("siteWork")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50 2xl:text-lg">
                  Site Work Cost (Estimated)
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
                <Typography className="px-2 ">
                  {genericEstimation?.siteWorkFactors &&
                    Object.entries(genericEstimation.siteWorkFactors).map(
                      (item) => (
                        <div
                          key={item[0]}
                          style={{
                            fontSize: 18,
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
              onChange={handleChangeAccordion("generalConditions")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className="w-50 2xl:text-xl">
                  GC Charges (Estimated)
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
            </Accordion>
          </div>
          {/* <div className="flex justify-center items-center flex-col">
            <button className="w-[55vw] rounded text-center l text-white py-3  flex flex-col  items-center bg-[#519258] sticky bottom-0">
              Get Estimate
            </button>
          </div> */}
        </div>
      </div>
      <style>
        {`
        @media (min-width: 768px) and (max-width: 1024px)  and (max-height:340px) {
          .genetic-accordion-container {
            max-height: 100vh;
          }
        }
         @media (min-width: 768px) and (max-width: 1024px)  and (max-height:540px) {
          .genetic-accordion-container {
            max-height: 80vh;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (min-height: 540px) and (max-height:625px) {
          .genetic-accordion-container {
            max-height: 53vh;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (min-height: 625px) and (max-height:700px) {
          .genetic-accordion-container {
            max-height: 55vh;
          }
        } @media (min-width: 768px) and (max-width: 1024px) and (min-height: 700px) and (max-height:800px) {
          .genetic-accordion-container {
            max-height: 54vh;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (min-height: 800px)  {
          .genetic-accordion-container {
            max-height: 60vh;
          }
        }  @media (min-width: 768px) and (max-width: 1024px) and (min-height: 900px)  {
          .genetic-accordion-container {
            max-height: 64vh;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (min-height: 1000px) {
          .genetic-accordion-container {
            max-height: 66vh;
          }
        }@media (min-width: 768px) and (max-width: 1024px) and (min-height: 1500px) {
          .genetic-accordion-container {
            max-height: 75vh;
          }
        }


        //Laptop Screen//
        
        
        // @media (min-width: 1025px) and (max-width: 1279px)  and (max-height:300px) {
        // .genetic-accordion-container {
        //   max-height: 100vh;
        // }
      // }@media (min-width: 1025px) and (max-width: 1279px)   and (max-height:350px) {
      //   .genetic-accordion-container {
      //     max-height: 74vh;
      //   }
      // }@media (min-width: 1025px) and (max-width: 1279px)  and (max-height:450px) {
      //   .genetic-accordion-container {
      //     max-height: 66vh;
      //   }
      // }



         @media (min-width: 1024px) and (max-width: 1279px)  and (max-height:540px) {
          .genetic-accordion-container {
            max-height: 56vh;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 540px) and (max-height:625px) {
          .genetic-accordion-container {
            max-height: 40vh;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 625px) and (max-height:700px) {
          .genetic-accordion-container {
            max-height: 40vh;
          }
        } @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 700px) and (max-height:800px) {
          .genetic-accordion-container {
            max-height: 50vh;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 800px) and (max-height:900px)  {
          .genetic-accordion-container {
            max-height: 56vh;
          }
        }  @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 901px)  {
          .genetic-accordion-container {
            max-height: 60vh;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 1000px) {
          .genetic-accordion-container {
            max-height: 65vh;
          }
        }@media (min-width: 1024px) and (max-width: 1279px) and (min-height: 1100px) {
          .genetic-accordion-container {
            max-height: 67vh;
          }
        }@media (min-width: 1024px) and (max-width: 1279px) and (min-height: 1200px) {
          .genetic-accordion-container {
            max-height: 68vh;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) and (min-height: 1500px) {
          .genetic-accordion-container {
            max-height: 73vh;
          }
        }
      
        //Large  Laptop Screen//
        
        
        // @media (min-width: 1201px)    and (max-height:300px) {
        // .genetic-accordion-container {
        //   max-height: 100vh;
        // }
      // }@media (min-width: 1201px)     and (max-height:350px) {
      //   .genetic-accordion-container {
      //     max-height: 75vh;
      //   }
      // }@media (min-width: 1201px)    and (max-height:450px) {
      //   .genetic-accordion-container {
      //     max-height: 67vh;
      //   }
      // }



         @media (min-width: 1201px)    and (max-height:540px) {
          .genetic-accordion-container {
            max-height: 100vh;
          }
        }
        @media (min-width: 1201px)   and (min-height: 540px) and (max-height:625px) {
          .genetic-accordion-container {
            max-height: 59vh;
          }
        }
        @media (min-width: 1201px)   and (min-height: 625px) and (max-height:700px) {
          .genetic-accordion-container {
            max-height: 60vh;
          }
        } @media (min-width: 1201px)   and (min-height: 700px) and (max-height:800px) {
          .genetic-accordion-container {
            max-height: 65vh;
          }
        }
        @media (min-width: 1201px)   and (min-height: 800px) and (max-height:900px)  {
          .genetic-accordion-container {
            max-height: 57vh;
          }
        }  @media (min-width: 1201px)   and (min-height: 901px)  {
          .genetic-accordion-container {
            max-height: 60vh;
          }
        }
        @media (min-width: 1201px)   and (min-height: 1000px) {
          .genetic-accordion-container {
            max-height: 65vh;
          }
        }@media (min-width: 1201px)   and (min-height: 1100px) {
          .genetic-accordion-container {
            max-height: 66vh;
          }
        }@media (min-width: 1201px)   and (min-height: 1200px) {
          .genetic-accordion-container {
            max-height: 69vh;
          }
        }
        @media (min-width: 1201px)   and (min-height: 1500px) {
          .genetic-accordion-container {
            max-height: 73vh;
          }
        }
      
        
      `}
      </style>
    </div>
  );
}

export default GenericEstimation;
