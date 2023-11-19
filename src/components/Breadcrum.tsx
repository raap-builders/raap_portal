import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../styles/breadcrum.css";

function Breadcrum({ step = 1 }) {
  const steps = ["Estimate", "Optimize", "Bid"];

  return (
    <div className="w-100 py-2 bg-white d-flex flex-column justify-content-center align-items-center">
      <Box className="w-50">
        <Stepper activeStep={step} alternativeLabel>
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
