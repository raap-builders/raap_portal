import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Regsiter() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const onPasswordChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const onUserNameChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserName(event.target.value);
  };

  const onFormSubmitted = () => {
    navigate("/landing");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("../assets/layout_pic.png")})`,
      }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <img
        src={require("../assets/Header/New_RaaP_Logo.png")}
        alt="RaaP_Logo"
        style={{
          position: "absolute",
          top: "5%",
        }}
      />
      <FormControl className="d-flex flex-column align-items-center justify-content-center w-100">
        <TextField
          id="outlined-basic"
          className="rounded"
          value={userName}
          onChange={onUserNameChanged}
          label="Username"
          variant="filled"
          style={{ backgroundColor: "white", width: "50%" }}
        />
        <TextField
          className="mt-5 rounded"
          value={password}
          onChange={onPasswordChanged}
          id="outlined-basic"
          label="Password"
          variant="filled"
          style={{ backgroundColor: "white", width: "50%" }}
        />
        <Button
          onClick={onFormSubmitted}
          className="mt-5 w-50 py-3 bg-success"
          variant="contained"
        >
          Contained
        </Button>
      </FormControl>
    </div>
  );
}
export default Regsiter;
