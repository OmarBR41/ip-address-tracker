import React, { useState } from "react";
import "./App.css";

import IP from "./IP";
import Map from "./Map";

function App() {
  const [coords, setCoords] = useState(null);

  return (
    <div className="App">
      <div className="App__Background" />
      <IP setCoords={setCoords} />
      <Map />
    </div>
  );
}

export default App;
