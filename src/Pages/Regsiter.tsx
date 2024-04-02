import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          email,
          password,
        }
      );
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.token
      ) {
        const token = response.data.data.token;
        setLoginError(false);
        changeIsUserLoggedIn(true);
        localStorage.setItem("token", token);
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
          value={email}
          onChange={onEmailChanged}
          label="Email"
          type="email"
          variant="filled"
          style={{ backgroundColor: "white", width: "50%" }}
        />
        <TextField
          className="mt-5 rounded"
          value={password}
          onChange={onPasswordChanged}
          id="outlined-basic"
          type="password"
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
