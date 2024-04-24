import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";

let loginTimeout: number;

function Regsiter() {
  const navigate = useNavigate();
  const {
    //@ts-ignore
    changeIsUserLoggedIn,
  } = useUserStore((state) => state);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    clearTimeout(loginTimeout);
    setLoginError(false);
  }, []);

  const onPasswordChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const onEmailChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  const onFormSubmitted = async () => {
    try {
      clearTimeout(loginTimeout);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/token`,
        {
          grant_type: "password",
          username: email,
          password,
        }
      );
      if (response && response.data) {
        const refreshToken = response.data.refresh_token;
        const accessToken = response.data.access_token;
        setLoginError(false);
        changeIsUserLoggedIn(true);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("access_token", accessToken);
        navigate("/landing");
      }
      // Redirect to protected area
    } catch (error) {
      setLoginError(true);
      //@ts-ignore
      loginTimeout = setTimeout(() => setLoginError(false), 1500);
    }
    // navigate("/landing");
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
      <FormControl
        style={{
          backgroundColor: "white",
          width: "55%",
          height: "70%",
          boxShadow: "-1px 1px 0px 0px",
        }}
        className="d-flex flex-column align-items-center justify-content-center p-5 rounded"
      >
        <img
          src={require("../assets/Header/New_RaaP_Logo.png")}
          alt="RaaP_Logo"
          style={{
            width: "15%",
            position: "absolute",
            top: "5%",
          }}
        />
        <div
          style={{ marginTop: "15%" }}
          className="d-flex flex-column justify-content-center align-items-center w-100"
        >
          <TextField
            id="outlined-basic"
            className="rounded"
            value={email}
            onChange={onEmailChanged}
            label="Email"
            type="email"
            variant="outlined"
            style={{ backgroundColor: "white", width: "50%" }}
          />
          <TextField
            className="mt-5 rounded"
            value={password}
            onChange={onPasswordChanged}
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            style={{ backgroundColor: "white", width: "50%" }}
          />
          <Button
            onClick={onFormSubmitted}
            className="mt-5 w-50 py-3 bg-success"
            variant="contained"
          >
            Login
          </Button>

          {/* <p className="mt-5 h4 text-whit" style={{ color: "#777777" }}> */}
          {/* I'd like to register. */}
          <Link
            className="h5 text-primary mt-3"
            to="https://meetings.hubspot.com/rj-mahadev?uuid=b1295ee6-5b2c-41c6-87f4-f477cd7ae711"
          >
            I'd like to register.
            {/* Schedule A Call To Get Set Up */}
          </Link>
          {/* </p> */}
        </div>
      </FormControl>

      {loginError && (
        <Alert
          className="mt-5  position-absolute"
          style={{
            bottom: 100,
            right: 40,
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          The information you provided is not correct
        </Alert>
      )}
    </div>
  );
}
export default Regsiter;
