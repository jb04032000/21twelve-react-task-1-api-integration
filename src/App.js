import React from "react";
import "./styles/App.css";
import RouteConfig from "./RouteConfig";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouteConfig />
      </header>
    </div>
  );
}

export default App;

function getString(string, index) {
  let output = [];
  for (let i = 0; i <= index; i++) {
    if (i === 0) {
      output.push(string.toUpperCase());
    } else {
      output.push(string);
    }
  }
  return output.join("");
}

let message = "abcd",
  result = [...message]
    .map((c, i) => {
      return getString(c, i);
    })
    .join("");

console.log("result", result);
