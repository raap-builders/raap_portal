import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../styles/breadcrum.css";

function Breadcrum() {
  const location = useLocation();
  const steps = ["Estimate", "Optimize", "Bid"];

  const renderActiveStep = () => {
    switch (location.pathname) {
      case "/":
        return 1;
      case "/generic_estimation":
        return 2;
      default:
        return 3;
    }
  };
  return (
    <div className="lg:py-4 2xl:py-4 d-flex md:justify-content-center justify-content-end w-full align-items-end ">
      <Box className="w-[30%] md:mr-[-15px]  2xl:mt-2 lg:w-[20%] ">
        <Stepper activeStep={renderActiveStep()} alternativeLabel>
          {steps.map((label) => (
            <Step
              key={label}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#519259",
                },

                "& .MuiStepLabel-root .Mui-active": {
                  color: "gray",
                },
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}

export default Breadcrum;
