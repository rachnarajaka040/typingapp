// Import Modules_
import React, { useRef } from "react";
import useSound from "use-sound";
import sound1 from "../media/Audio/RightAnswer.mp3";
import sound2 from "../media/Audio/WrongAnswer.mp3";
import "../App.css";

// Export components
const TypingBox = (props) => {
  let { givenKeys, usertext, setusertext } = props;
  const givenKeysArr = givenKeys.split(" ");
  const [playSuccess] = useSound(sound1);
  const [playError] = useSound(sound2);
  const currIndex = useRef(0);
  const targetInput = useRef(null);

  
  const handleChange = (e) => {
    setusertext(e.target.value);
  };

  
  const handleKeyPress = (e) => {
    playSound(e);
  };

  
  const playSound = (e) => {
    if (e.key !== " " && e.key === givenKeysArr[currIndex.current]) {
      playSuccess();
      currIndex.current++;
      targetInput.current.style.backgroundColor = "white";
    } else if (e.key === "Backspace") {
      currIndex.current--;
    } else if (
      e.key !== " " &&
      e.key !== "Backspace" &&
      e.key !== givenKeysArr[currIndex.current]
    ) {
      playError();
      currIndex.current++;
      setTimeout(() => {
        targetInput.current.style.backgroundColor = "red";
      }, 500);
    }
  };

  return (
    <div className="input-box">
      <input
        type="usertext"
        value={usertext}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        ref={targetInput}
      />
    </div>
  );
};

export default TypingBox;
