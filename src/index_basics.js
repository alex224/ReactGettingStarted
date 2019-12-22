import React, { useState } from "react";
import ReactDOM from "react-dom";

function Button(props) {
  return (
    <button onClick={() => props.clickHandler(props.increment)}>
      {" "}
      + {props.increment}
    </button>
  );
}

function Display(props) {
  return <div>{props.message}</div>;
}

function App() {
  const [counter, setCounter] = useState(1);
  const incrementCounter = increment => setCounter(counter + increment);
  return (
    <>
      {/* <> wird zu <React.Fragment> -> z.b. Anstelle eines Divs */}
      <Button clickHandler={incrementCounter} increment={5} />
      <Button clickHandler={incrementCounter} increment={10} />
      <Display message={counter} />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
