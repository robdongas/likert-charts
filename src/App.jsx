import "./App.css";
import LikertBarChart from "./components/LikertBarChart";
import LikertBoxPlot from "./components/LikertBoxPlot";
import { responses } from "./data/responses";

function App() {
  return (
    <>
      <LikertBoxPlot responses={responses} minStatement={1} maxStatement={10} title={"Box Plot Title"} />
      <LikertBarChart responses={responses} minStatement={1} maxStatement={10} title={"Bar Chart Title"} />
    </>
  );
}

export default App;
