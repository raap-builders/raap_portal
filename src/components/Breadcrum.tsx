import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../styles/breadcrum.css";

function Breadcrum() {
  const steps = ["Estimate", "Optimize", "Bid"];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step
            sx={{
              "& .MuiStepIcon-root": {
                color: label !== "Bid" ? "#519259" : "",
              },
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Breadcrum;
