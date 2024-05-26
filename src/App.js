import React, { useState } from "react";
import FlightsMapComponent from "./components/home/FlightsMap";
import AppBar from "./components/home/AppBar";
import ReadApplication from "./components/home/Application";

function App() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div>
      <AppBar />
      <FlightsMapComponent selectedDestination={selectedDestination} />
      <ReadApplication setSelectedDestination={setSelectedDestination} />
    </div>
  );
}

export default App;
