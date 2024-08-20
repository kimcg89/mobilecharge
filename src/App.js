import "./App.css";
import TopBar from "./components/TopBar/TopBar"
import OptionBox from "./components/OptionBox/OptionBox"
import FilterBox from "./components/FilterBox/FilterBox"
import SelectBar from "./components/RightSide/SelectBar/SelectBar"
import ShowBox from "./components/RightSide/ShowBox/ShowBox"
import RightSide from "./components/RightSide/RightSide"


function App() {
  return (
    <div className="App">
      <div className="mainContainer">
        <TopBar />
        <div className="middleContainer">
          <div className="leftSide">
            <div><OptionBox /></div>
            <div><FilterBox /></div>
          </div>
          <RightSide className="rightSide">
            <div><ShowBox /></div>
            <div><SelectBar /></div>
          </RightSide>
        </div>
      </div>
    </div>
  );
}

export default App;
