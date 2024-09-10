// import {
//   Alert,
//   AlertTitle,
//   Button,
//   FormControl,
//   TextField,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserStore } from "../store";
// import { fetchAPI } from "../utils/fetcher";

// let loginTimeout: number;
// interface IResponse {
//   refresh_token: string;
//   access_token: string;
// }

// function Regsiter() {
//   const navigate = useNavigate();
//   const {
//     //@ts-ignore
//     changeIsUserLoggedIn,
//   } = useUserStore((state) => state);

//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [loginError, setLoginError] = useState(false);

//   useEffect(() => {
//     clearTimeout(loginTimeout);
//     setLoginError(false);
//   }, []);

//   const onPasswordChanged = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setPassword(event.target.value);
//   };

//   const onEmailChanged = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setEmail(event.target.value);
//   };

//   const onFormSubmitted = async () => {
//     try {
//       clearTimeout(loginTimeout);

//       const response: IResponse = await fetchAPI({
//         route: "token",
//         method: "POST",
//         data: {
//           grant_type: "password",
//           username: email,
//           password,
//         },
//       });
//       if (response) {
//         const refreshToken = response.refresh_token;
//         const accessToken = response.access_token;
//         setLoginError(false);
//         changeIsUserLoggedIn(true);
//         localStorage.setItem("refresh_token", refreshToken);
//         localStorage.setItem("access_token", accessToken);
//         navigate("/landing");
//       }
//       //Redirect to protected area
//     } catch (error) {
//       setLoginError(true);
//       //@ts-ignore
//       loginTimeout = setTimeout(() => setLoginError(false), 1500);
//     }
//     // navigate("/landing");
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100%",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundImage: `url(${require("../assets/layout_pic.png")})`,
//       }}
//       className="d-flex flex-column align-items-center justify-content-center"
//     >
//       <FormControl
//         style={{
//           backgroundColor: "white",
//           width: "55%",
//           height: "70%",
//           boxShadow: "-1px 1px 0px 0px",
//         }}
//         className="d-flex flex-column align-items-center justify-content-center p-5 rounded"
//       >
//         <img
//           src={require("../assets/Header/New_RaaP_Logo.png")}
//           alt="RaaP_Logo"
//           style={{
//             width: "15%",
//             position: "absolute",
//             top: "5%",
//           }}
//         />
//         <div
//           style={{ marginTop: "15%" }}
//           className="d-flex flex-column justify-content-center align-items-center w-100"
//         >
//           <TextField
//             id="outlined-basic"
//             className="rounded"
//             value={email}
//             onChange={onEmailChanged}
//             label="Email"
//             InputLabelProps={{ shrink: true }}
//             type="email"
//             variant="outlined"
//             style={{ backgroundColor: "white", width: "50%" }}
//           />
//           <TextField
//             className="mt-5 rounded"
//             value={password}
//             onChange={onPasswordChanged}
//             id="outlined-basic"
//             InputLabelProps={{ shrink: true }}
//             type="password"
//             label="Password"
//             variant="outlined"
//             style={{ backgroundColor: "white", width: "50%" }}
//           />
//           <Button
//             onClick={onFormSubmitted}
//             className="mt-5 w-50 py-3 bg-success"
//             variant="contained"
//           >
//             Login
//           </Button>

//           {/* <p className="mt-5 h4 text-whit" style={{ color: "#777777" }}> */}
//           {/* I'd like to register. */}
//           <Link
//             className="h5 text-primary mt-3"
//             to="https://meetings.hubspot.com/rj-mahadev?uuid=b1295ee6-5b2c-41c6-87f4-f477cd7ae711"
//           >
//             I'd like to register.
//             {/* Schedule A Call To Get Set Up */}
//           </Link>
//           {/* </p> */}
//         </div>
//       </FormControl>

//       {loginError && (
//         <Alert
//           className="mt-5  position-absolute"
//           style={{
//             bottom: 100,
//             right: 40,
//           }}
//           severity="error"
//         >
//           <AlertTitle>Error</AlertTitle>
//           The information you provided is not correct
//         </Alert>
//       )}
//     </div>
//   );
// }
// export default Regsiter;
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import { fetchAPI } from "../utils/fetcher";

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

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side with informational content */}
      <div
        style={{
          flex: "0.5 0.5 1%",
          backgroundColor: '#004d2d',
          color: 'white',
          padding: '5%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
            <img className="header-titlep" style={{width:"50%"}} src={require("../assets/Header/logo 1.png")} alt="Header" />
        <br/>
        <p>
          RaaP (Rooms as a Product) has been working with Hilton and other hotel development
          partners to provide more accurate hotel construction costs very early in the project life
          cycle—even during site selection.
        </p>
        <p>
          Our estimating tool applies productization and lean construction principles to develop
          standard assemblies that are priced using our proprietary nationwide pricing index.
        </p>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'white',
            color: '#004d2d',
            alignSelf: 'start',
            marginTop: '20px',
            padding: '10px 20px',
          }}
        >
          Learn More
        </Button>
      </div>

      {/* Right side with the login and registration forms */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${require("../assets/layout_pic.png")})`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '60%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
          }}
        >
            <center>
            <h3>Welcome Back!</h3>
            </center>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              value={email}
              onChange={onEmailChanged}
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
            </FormControl>
            <center>
            <Button
              onClick={onFormSubmitted}
              variant="contained"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                marginTop: '20px',
                width: '40%',
              }}
            >
              Login
            </Button>
            </center>
          
        </div>
<hr style={{color:"white"}}/>
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '60%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
            <center>
            <h3>New Here?</h3>
            </center>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              id="full-name"
              label="Full Name"
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
            <TextField
              id="business-email"
              label="Business Email"
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
            <TextField
              id="new-password"
              label="Enter Password"
              type="password"
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              variant="outlined"
              style={{ marginBottom: '20px', width: '48%' }}
            />
          </FormControl>
          <center>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                width: '40%',
              }}
            >
              Sign Up
            </Button>
            </center>
        </div>
      </div>

      {loginError && (
        <Alert
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
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