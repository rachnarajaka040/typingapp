import { GET_METRICS } from "./ActionTypes";

const getMetrics = (givenText, inputText, speedInWPM) => {
  let speed = speedInWPM;
  let accuracy = calculateAccuracy(givenText, inputText);
  let mistakes = calculateMistakes(givenText, inputText);

  let data = {
    speed: speed,
    accuracy: accuracy,
    mistakes: mistakes,
  };

  return {
    type: GET_METRICS,
    payload: { ...data },
  };
};

const calculateAccuracy = (givenText, inputText) => {
  let AccuracyLevel = 0;

  let givenArr = givenText.split(" ");
  let userInputArr = inputText.split(" ");
  let totalKeys = givenArr.length;
  let correctKeys = 0;

  givenArr.forEach((key, index) => {
    if (key === userInputArr[index]) {
      correctKeys++;
    }
  });

  const accuracy = totalKeys > 0 ? (correctKeys / totalKeys) * 100 : 100;
  const finalAccuracy = accuracy.toFixed(2);
  AccuracyLevel = finalAccuracy;

  return AccuracyLevel;
};

const calculateMistakes = (givenText, inputText) => {
  let givenArr = givenText.split(" ");
  let userInputArr = inputText.split(" ");
  let totalKeys = givenArr.length;
  let correctKeys = 0;

  givenArr.forEach((key, index) => {
    if (key === userInputArr[index]) {
      correctKeys++;
    }
  });

  let totalMistakes = totalKeys - correctKeys;

  return totalMistakes;
};

export { getMetrics };
