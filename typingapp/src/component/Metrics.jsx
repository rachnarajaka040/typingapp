import "../App.css";
import { useSelector } from "react-redux";

const Metrics = () => {
  let accu = useSelector((state) => state.metricReducer.accuracy);
  let mistakes = useSelector((state) => state.metricReducer.mistakes);
  let speed = useSelector((state) => state.metricReducer.speed);

  return (
    <div className="metrics">
      <h1 className="items">
        Speed : <span>{speed} wpm</span>
      </h1>
      <h1 className="items">
        Accuracy : <span>{accu} %</span>
      </h1>
      <h1 className="items">
        Mistakes : <span>{mistakes} </span>
      </h1>
    </div>
  );
};

export default Metrics;
