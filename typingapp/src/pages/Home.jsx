// Import Modules_
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

// Import Components_
import { getMetrics } from "../redux/Metrics/Actions";
import KeyDisplay from "../component/KeyDisplay";
import TypingBox from "../component/TypingBox";


// Export Component_
const Home = () => {
  let countDown = useSelector((state) => state.settingsReducer.timer);
  let storedText = useSelector((state) => state.settingsReducer.displaytext);
  let [time, setTime] = useState(countDown * 60);
  const [running, setRunning] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [startTime, setstartTime] = useState(0);
  const [typingSpeed, setSpeed] = useState(0);
  const [usertext, setusertext] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let givenKeys = storedText;
  let text = usertext;

  // Speed Calculation in Words Per Minute_
  const starTest = () => {
    let date = new Date();
    setstartTime(date.getTime());
  };

  const endTest = useCallback(() => {
    let date = new Date();
    let endTime = date.getTime();
    let totalTime = Number((endTime - startTime) / 1000);
    let wordCount = Number(text.split(" ").length);
    let speed = Math.round(wordCount / totalTime) * 60;

    setSpeed(speed);

    if (usertext === "") {
      dispatch(getMetrics(givenKeys, usertext, 0));
    } else {
      dispatch(getMetrics(givenKeys, usertext, speed));
    }
  }, [dispatch, givenKeys, startTime, text, usertext]);

  //  Functionalities Started_
  const handleStart = () => {
    setRunning(true);
  };

  const handleReset = () => {
    setTime(5 * 60);
    setRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      setToggle(true);
      endTest();
      handleReset();
      navigate("/results");
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, running, navigate, endTest]);

  //  Functionalities End_

  return (
    <>
      {toggle ? <></> : <KeyDisplay givenKeys={givenKeys} />}

      {toggle ? (
        <></>
      ) : (
        <>
          <TypingBox
            givenKeys={givenKeys}
            usertext={usertext}
            setusertext={setusertext}
          />
        </>
      )}

      

      {toggle ? (
        <div className="start-button-div-0">
          <button
            className="start-button-css"
            onClick={() => {
              setToggle(false);
              starTest();
              handleStart();
            }}
          >
            START TEST
          </button>
        </div>
      ) : (
        <div className="start-button-div">
          <button
            className="start-button-css"
            onClick={() => {
              setToggle(true);
              endTest();
              handleReset();
              navigate("/results");
            }}
          >
            END TEST
          </button>
          {toggle ? <></> : <button className="start-button-css">{formatTime(time)} Mins</button>}
        </div>
      )}
    </>
  );
};

export default Home;
