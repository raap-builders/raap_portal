import React, { useRef } from "react";
import '../styles/button.css';


interface buttonOnClickFunction {
  name: string,
  onclick: () => void;
}

const Button = (props: buttonOnClickFunction) => {
  // const myContainer = React.useRef<HTMLInputElement>(null)
  const [showResults, setShowResults] = React.useState(false)

  function showDropdown() {
    setShowResults(!showResults)
    // myContainer.current.classList.toggle("show");
  }

  return (
    <div className="button_container">
      <button onClick={/*props.onclick*/showDropdown} className="dropbtn">{props.name}</button>
      {showResults && <div id="myDropdown" className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>}
    </div>
  );
}

export default Button;
