import React, { useEffect, useState, useRef } from "react";
import "../CSS/Pages.css";

export function Typing() {
    function getQust() {
        let ques = "";
        let char = ["a", "s", "d", "f", "j", "k", "l", ";"];
        for (let i = 0; i < 3; i++) {
            let rand = Math.random() * 8;
            rand = Math.floor(rand);
            ques += char[rand];
            console.log(rand, ques);
        }
        return ques;
    }

    function nextQuest() {
        if (ansStatus === "Correct ans") {
            setCorrect(prev => prev + 1);
        }
        setAttempts(prev => prev + 1);
        setNumber(prev => prev + 1);
        setAnsStatus("Accuracy: 0%");
        setInput("");
        setChar(0);
        clearInterval(id.current);
    }

    const [question, setQuestion] = useState("");
    const [number, setNumber] = useState(1);
    const [ansStatus, setAnsStatus] = useState("Accuracy: 0%");

    const [input, setInput] = useState("");
    const [char, setChar] = useState(0);
    const [average, setAverage] = useState(0);
    const [min, setMin] = useState(0);
    const [total, setTotal] = useState(0);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds

    const [isTyping, setIsTyping] = useState(false);
    const id = useRef();
    const attempts = useRef(0);
    const correct = useRef(0);
    const words = useRef(0);
    const startTimeRef = useRef(0);
    const typingTimeoutRef = useRef(null);

    const setCorrect = value => {
        correct.current = value;
    };

    const setAttempts = value => {
        attempts.current = value;
    };

    const setWords = value => {
        words.current = value;
    };

    useEffect(() => {
        let Q = getQust();
        console.log(Q);
        setQuestion(prev => Q);
    }, [number]);

    


    useEffect(() => {
        const interval = setInterval(() => {
            const avgWPM = min > 0 ? Math.floor((words.current / (min / 60)) * 10) / 10 : 0; // Calculate average WPM based on words
            setAverage(avgWPM);
            setMin(prev => prev + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    
    
    
    const handleInputClick = () => {
        if (!startTimeRef.current) {
          startTimeRef.current = Date.now();
          const timerInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - startTimeRef.current) / 1000);
            const remainingTime = Math.max(timer - elapsedTime, 0); // Ensure remaining time doesn't go below 0
            setTimer(remainingTime);
      
            if (remainingTime === 0) {
              clearInterval(timerInterval);
            }
          }, 1000);
          return () => clearInterval(timerInterval);
        }
      };
      

      const handleInputChange = e => {
        setInput(e.target.value);
    
        if (!isTyping) {
            setIsTyping(true);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
            }, 2000);
        }
    
        const currentQuestion = question.toLowerCase();
        const currentInput = e.target.value.toLowerCase();
        const currentInputWords = currentInput.trim().split(/\s+/).filter(word => word !== '').length; // Counting non-empty words
    
        let accuracy = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (currentQuestion[i] === currentInput[i]) {
                accuracy++;
            }
        }
    
        const currentAccuracy = (accuracy / currentInput.length) * 100;
        setAnsStatus(`Accuracy: ${currentAccuracy.toFixed(2)}%`);
    
        if (currentInput === currentQuestion) {
            setChar(prev => prev + currentInput.length);
            setWords(prev => prev + currentInputWords);
        }
    };
    
    
    

    const formatTime = time => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
      
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");
      
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      };
      

    return (
        <div className="main">

            <div className="timer">{formatTime(timer)}</div>
            <div className="SecondDiv">
                <div class="card-body h-30  card-header main_ques" >
                    <h5 style={{paddingTop:"10px"}}>{question}</h5>

                </div>
                <div className="next">
                    <button className="btn btn-outline-danger button" type="button" onClick={nextQuest}>
                        Next
                    </button>
                </div>
            </div>


            <br></br>

            <input class="form-control form-control-lg w-50"

                value={input}
                onClick={handleInputClick}
                onChange={handleInputChange}
                type="text" placeholder="Re-type if filed"
                style={{ margin: "auto" }} ></input>

            <div className=" d-flex align-items-center w-50 items" style={{ marginLeft: "25%" }} >
                <div className="wpm p-2 ">WPM: {char}</div>
                <div className="accu p-2 ">{ansStatus}</div>
                <div className="aver p-2 ">Average WPM : {average}</div>

            </div>



        </div>
    );
}