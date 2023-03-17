import React, { useRef } from "react";
import '../styles/button.css';


interface buttonOnClickFunction {
  name: string,
  onclick: () => void,
  options: string[],
}

// interface buttonOptionsProps {
//   options: string[],
// }

// const ButtonOptions = (props: buttonOptionsProps) => {
//   return props.options.map((item)=>{
//     <div>{item}</div>
//   })
// }

const Button = (props: buttonOnClickFunction) => {
  // const myContainer = React.useRef<HTMLInputElement>(null)
  const [showResults, setShowResults] = React.useState(false)

  function showDropdown() {
    setShowResults(!showResults)
    // myContainer.current.classList.toggle("show");
  }

  return (
    <div className="button_container">
      <div><button onClick={showDropdown}>{props.name}</button></div>
      {showResults && 
        <div className="button_dropdown_container">
          <div>a</div>
          <div>b</div>
          <div>c</div>
          {/* <ButtonOptions options={props.options}></ButtonOptions> */}
        </div>
      }
    </div>
  );
}

export default Button;
