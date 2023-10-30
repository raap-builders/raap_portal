import React from "react";
import "../styles/breadcrum.css";
function Breadcrum() {
  return (
    <ul id="bd" className="breadcrumb">
      <li>
        <a href="/">Summary</a>
      </li>
      <li>
        <a href="/">ON-Site</a>
      </li>
      <li>
        <a href="/">Prefab</a>
      </li>
      <li>
        <a href="/">Schedule</a>
      </li>
      <li>
        <a href="/">Supplier</a>
      </li>
    </ul>
  );
}

export default Breadcrum;
