import "./App.css";
import FlightsMapContainer from "./components/home/FlightsMap";
import AppBar from "./components/home/AppBar";
import ReadApplication from "./components/home/Application";

function App() {
  return (
    <div>
      <AppBar />
      {/* <FlightsMapContainer /> */}
      <ReadApplication />
    </div>
  );
}

export default App;
