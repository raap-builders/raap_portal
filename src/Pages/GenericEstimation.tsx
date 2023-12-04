import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const projectFactors = [
  { id: 1, name: "Total Project Cost", cost: "$13,030,048" },
  { id: 2, name: "Cost Per Key", cost: "$121,776" },
  { id: 3, name: "Cost Per Square Foot", cost: "$262" },
  { id: 4, name: "Build Time", cost: "14 Months" },
];

const buildingFactors = [
    {
      id: 1,
      name: "03 Concrete",
      cost: "$346,084",
    },
    {
      id: 2,
      name: "04 Masonary",
      cost: "$3,120,971",
    },
    {
      id: 3,
      name: "05 Metal",
      cost: "$141,474",
    },
    {
      id: 4,
      name: "06 Wood & Plastics",
      cost: "$346,084",
    },
    {
      id: 5,
      name: "07 Thermal & Moisture Protection",
      cost: "$3,120,971",
    },
    {
      id: 6,
      name: "08 Openings",
      cost: "$141,474",
    },
    {
      id: 7,
      name: "09 Finishes",
      cost: "$346,084",
    },
    {
      id: 8,
      name: "10 Specialties",
      cost: "$3,120,971",
    },
    {
      id: 9,
      name: "11 Equipment",
      cost: "$ 141,474",
    },
    {
      id: 10,
      name: "12 Furnishing",
      cost: "$346,084",
    },
    {
      id: 11,
      name: "13 Special Construction",
      cost: "$3,120,971",
    },
    {
      id: 12,
      name: "14 Conveying Equipment",
      cost: "$141,474",
    },
    {
      id: 13,
      name: "21 Fire",
      cost: "$346,084",
    },
    {
      id: 14,
      name: "22 Plumbing",
      cost: "$3,120,971",
    },
    {
      id: 15,
      name: "23 HVAC",
      cost: "$141,474",
    },
    {
      id: 16,
      name: "26 Electrical",
      cost: "$346,084",
    },
  ],
  siteWorkFactors = [
    {
      id: 1,
      name: "31 Earthwork",
      cost: "$141,474",
    },
    {
      id: 2,
      name: "32 Exterior Improvements",
      cost: "$346,084",
    },
    {
      id: 3,
      name: "33 Utilities",
      cost: "$3,120,971",
    },
  ],
  generalFactors = [
    {
      id: 1,
      name: "01 General Requirements",
      cost: "$346,084",
    },
    {
      id: 2,
      name: "Soft Charges & Fees",
      cost: "$3,120,971",
    },
  ];

function GenericEstimation() {
  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div
        className="w-100 d-flex justify-content-around align-items-center p-5 rounded-top-5"
        style={{
          backgroundColor: "#519259",
        }}
      >
        {projectFactors.map((item) => (
          <div key={item.id} className="rounded bg-dark w-25 mx-5 border-1">
            <div
              style={{ color: "#519259" }}
              className="text-center border-bottom-0 bg-white font-bold py-2"
            >
              {item.name}
            </div>
            <div
              style={{
                color: "#4F55E7",
                fontSize: 20,
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
        style={{ overflow: "scroll", maxHeight: 500 }}
        className="bg-white mt-5 p-2 rounded w-75"
      >
        <div
          style={{
            color: "#519259",
          }}
          className="text-center h4 w-100"
        >
          OUTPUTS (Multiformat)
        </div>
        <div
          style={{
            color: "#519259",
          }}
          className="font-bold h3 text-center w-100"
        >
          On-Site
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
              {buildingFactors.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: 14,
                  }}
                  className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                >
                  <div>{item.name}</div>
                  <div>{item.cost}</div>
                </div>
              ))}
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
              {siteWorkFactors.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: 14,
                  }}
                  className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                >
                  <div>{item.name}</div>
                  <div>{item.cost}</div>
                </div>
              ))}
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
              {generalFactors.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: 14,
                  }}
                  className="border-top pt-2 d-flex align-items-center justify-content-between text-secondary"
                >
                  <div>{item.name}</div>
                  <div>{item.cost}</div>
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
        <button className="w-75 rounded bg-success text-center text-white py-3 mt-3">
          Get Estimate
        </button>
      </div>
    </div>
  );
}

export default GenericEstimation;
