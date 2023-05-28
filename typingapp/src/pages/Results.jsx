import "../App.css";
import Metrics from "../component/Metrics";

const Results = () => {
  return (
    <div className="results">
      <h1>RESULTS</h1>
      <Metrics />
      <div>
        <a href="/">
          <button className="start-button-css">Go Back!</button>
        </a>
      </div>
    </div>
  );
};

export default Results;
