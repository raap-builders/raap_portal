import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import { Providers } from '@microsoft/mgt-element';
// import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
// import { Providers } from "@microsoft/mgt";

// console.log(process.env.REACT_APP_MICROSOFT_APPLICATION_ID)

// Providers.globalProvider = new Msal2Provider({
//       clientId: process.env.REACT_APP_MICROSOFT_APPLICATION_ID || ""
// });

// async function Test() {
//   console.log("awaiting access token...")
//   const accessToken = await Providers.globalProvider.getAccessToken({ scopes: ['User.Read', 'Files.Read'] })
//   console.log("accessToken:")
//   console.log(accessToken) // Returns token!
// }

// Test()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

