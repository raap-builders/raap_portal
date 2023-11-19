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
    <div className="w-100 py-2 bg-white d-flex flex-column justify-content-center align-items-center">
      <Box className="w-50">
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
