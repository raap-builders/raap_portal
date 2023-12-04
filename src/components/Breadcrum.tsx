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
    <div className="py-2 d-flex justify-content-end w-100 align-items-end">
      <Box className="w-25">
        <Stepper activeStep={renderActiveStep()} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}

export default Breadcrum;
