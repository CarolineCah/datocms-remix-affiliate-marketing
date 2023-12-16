import React, { useState } from "react";
import { QuizData } from "./QuizData";
import {
  QuizContainer,
  QuestionContainer,
  Question,
  Options,
  OptionLabel,
  OptionInput,
  NextButton,
} from "./style";

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const nextQuestion = () => {
    const correctAnswer = QuizData[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz ended! Your score is ${score + 1}`);
    }
  };

  return (
    <QuizContainer>
      <QuestionContainer>
        <Question>{QuizData[currentQuestion].question}</Question>
        <Options>
          {QuizData[currentQuestion].options.map((option, index) => (
            <OptionLabel key={index}>
              <OptionInput
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </OptionLabel>
          ))}
        </Options>
        <NextButton onClick={nextQuestion}>Next</NextButton>
      </QuestionContainer>
    </QuizContainer>
  );
};

export default QuizComponent;
