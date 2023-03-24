// import React, { useEffect } from "react";

// const Viewer = () => {
//   useEffect(() => {
//     const options = {
//       env: "AutodeskProduction",
//       api: "derivativeV2",
//       getAccessToken: (onTokenReady) => {
//         // Use your server-side authentication API to generate an access token
//         const accessToken = "<your_access_token>";
//         const expireTimeSeconds = 60 * 30;
//         onTokenReady(accessToken, expireTimeSeconds);
//       },
//     };

//     Autodesk.Viewing.Initializer(options, () => {
//       const viewerDiv = document.getElementById("viewerDiv");
//       const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
//       const documentId = "<your_document_id>";

//       Autodesk.Viewing.Document.load(documentId, (doc) => {
//         const defaultModel = doc.getRoot().getDefaultGeometry();
//         viewer.loadDocumentNode(doc, defaultModel);
//       });
//     });
//   }, []);

//   return <div id="viewerDiv" style={{ height: "500px" }}></div>;
// };

// export default Viewer;

export {}