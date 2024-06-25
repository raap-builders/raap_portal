import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import { fetchAPI } from "../utils/fetcher";
import Cookies from "js-cookie";

let loginTimeout: number;
interface IResponse {
  refresh_token: string;
  access_token: string;
}

function Register() {
  const navigate = useNavigate();
  const {
    //@ts-ignore
    changeIsUserLoggedIn,
  } = useUserStore((state) => state);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileLandscape = useMediaQuery(
    "(max-width: 768px) and (orientation: landscape)"
  );

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

      const response: IResponse = await fetchAPI({
        route: "token",
        method: "POST",
        data: {
          grant_type: "password",
          username: email,
          password,
        },
      });
      if (response) {
        const refreshToken = response.refresh_token;
        const accessToken = response.access_token;
        setLoginError(false);
        changeIsUserLoggedIn(true);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("access_token", accessToken);
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("accessToken", accessToken);
        navigate("/landing");
      }
      //Redirect to protected area
    } catch (error) {
      setLoginError(true);
      //@ts-ignore
      loginTimeout = setTimeout(() => setLoginError(false), 1500);
    }
    // navigate("/landing");
  };

  const inputSize = isMobile || isMobileLandscape ? "small" : "medium";

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${require("../assets/layout_pic.png")})`,
      }}
      className="d-flex flex-column align-items-center justify-content-center overflow-hidden"
    >
      <FormControl
        style={{
          backgroundColor: "white",
          width: "55%",
          height: "70%",
          boxShadow: "-1px 1px 0px 0px",
        }}
        className="d-flex flex-column align-items-center justify-content-center p-5 rounded max-sm:!w-3/4 !h-max max-lg:py-10"
      >
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <img
            src={require("../assets/Header/New_RaaP_Logo.png")}
            alt="RaaP_Logo"
            className="max-sm:!w-2/6"
            style={{
              width: "15%",
            }}
          />
          <TextField
            id="outlined-basic"
            className="rounded max-md:!w-full"
            value={email}
            onChange={onEmailChanged}
            label="Email"
            InputLabelProps={{ shrink: true }}
            type="email"
            variant="outlined"
            size={inputSize}
            style={{
              backgroundColor: "white",
              width: "50%",
              marginTop: "40px",
            }}
          />
          <TextField
            className="max-sm:!mt-5 rounded max-md:!w-full !mt-10"
            value={password}
            onChange={onPasswordChanged}
            id="outlined-basic"
            InputLabelProps={{ shrink: true }}
            type="password"
            label="Password"
            variant="outlined"
            size={inputSize}
            style={{ backgroundColor: "white", width: "50%" }}
          />
          <Button
            onClick={onFormSubmitted}
            className="max-md:!mt-5 w-50 sm:!py-3 bg-success !mt-10"
            variant="contained"
            size={inputSize}
          >
            Login
          </Button>

          <Link
            className="h5 text-primary mt-3 max-sm:!mt-1"
            to="https://meetings.hubspot.com/rj-mahadev?uuid=b1295ee6-5b2c-41c6-87f4-f477cd7ae711"
          >
            I'd like to register.
          </Link>
        </div>
      </FormControl>

      {loginError && (
        <Alert
          className="mt-5 position-absolute"
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

export default Register;
