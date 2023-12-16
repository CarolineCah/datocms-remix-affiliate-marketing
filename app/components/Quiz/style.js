import styled from "styled-components";

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f7f7;
  font-family: "Arial", sans-serif;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const Question = styled.h1`
  font-size: 1.5em;
  color: #333333;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const OptionLabel = styled.label`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const OptionInput = styled.input`
  margin-right: 10px;
`;

export const NextButton = styled.button`
  position: relative;
  background-color: black;
  border-radius: 4em;
  font-size: 16px;
  color: white;
  padding: 0.8em 1.8em;
  cursor: pointer;
  user-select: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;

  &:hover {
    transition-duration: 0.1s;
    background-color: #3a3a3a;
  }

  &:active:after {
    box-shadow: 0 0 0 0 white;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }

  &:active {
    top: 1px;
  }
`;
