import Button from "react-bootstrap/Button";
import AnswerButton from "../components/AnswerButtons";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header";
import { useHistory, useLocation } from "react-router-dom";

const QuestionPage = () => {
  const history = useHistory();
  const location = useLocation();

  const btnGroup = useRef(null);

  const [questions, setQuestions] = useState("");
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [num, setNum] = useState(0);
  const [numQuestions, setNumQuestions] = useState(1);
  const [points, setPoints] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (!location.state) {
      history.push("/");
    } 
    else {
      const numQuestions = location.state.numQuestions;
      axios.get(
          `https://opentdb.com/api.php?amount=${numQuestions}&encode=url3986`
        )
        .then((res) => {
          const data = res.data.results;
          const question = data[num].question;
          const incorrect = data[num].incorrect_answers;
          const correct = data[num].correct_answer;
          const answerChoices = [...incorrect];
          const questionType = data[num].type;
          setQuestionType(questionType);

          // randomize the location of the correct answer between 0 (inclusive) to 4 (exclusive) (or 1 for T/F questions)
          const randomIndex = Math.floor(
            Math.random() * Math.floor(questionType === "boolean" ? 1 : 4)
          );
          answerChoices.splice(randomIndex, 0, correct);

          const decodedAnswerChoices = decodeURIComponent(
            JSON.stringify(answerChoices)
          );

          setQuestions(decodeURIComponent(question));
          setAnswer(decodeURIComponent(correct));
          setChoices(JSON.parse(decodedAnswerChoices));
          setNumQuestions(data.length);

          setIsLoading(false);
        });
    }
  }, [num, history, location.state]);

  const handleNext = () => {
    if (num < numQuestions - 1) {
      setNum(num + 1);
    } else {
      history.push("/results", {
        numCorrect: points,
        numQuestions: numQuestions,
      });
    }
  };

  const handleChange = (val) => {
    setSelectedValue(val);
  };

  const checkAnswer = () => {
    let correctAnswerIndex = choices.indexOf(answer);
    const selectedIndex = choices.indexOf(selectedValue);

    let correctAnswerBtn = btnGroup.current.children[correctAnswerIndex].children[0].children[0];
    correctAnswerBtn.classList.remove("active");
    correctAnswerBtn.classList.add("correct");

    let selectedWrongAnswer =
      btnGroup.current.children[selectedIndex].children[0].children[0];

    if (selectedValue === answer) {
      setPoints(points + 1);
    } 
    else {
      selectedWrongAnswer.classList.remove("active");
      selectedWrongAnswer.classList.add("incorrect");
    }

    for (var i = 0; i < btnGroup.current.children.length; i++) {
      let button = btnGroup.current.children[i].children[0].children[0];
      button.classList.add("disabled");
    }

    setTimeout(() => {
      setSelectedValue(null);
      correctAnswerBtn.classList.remove("correct");
      selectedWrongAnswer.classList.remove("incorrect");
      for (var i = 0; i < btnGroup.current.children.length; i++) {
        let button = btnGroup.current.children[i].children[0].children[0];
        button.classList.remove("disabled");
      }
      handleNext();
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="containerBox">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="containerBox">
        <Header points={points} />

        <div className="questionInfo">
          <h3 className="mt-3">
            Question {num + 1} / {numQuestions}
          </h3>
          <div className="subContainer d-flex flex-column justify-content-center mt-3">
            <h5 className="questionTitle">{questions}</h5>
            <Container>
              <Row ref={btnGroup}>
                {choices.slice(0, 4).map((txt, idx) => (
                  <Col
                    xs={questionType === "boolean" ? 6 : 12}
                    sm={6}
                    className="mx-auto mt-2 mb-2"
                    key={idx}
                  >
                    <AnswerButton
                      choiceTxt={txt}
                      selected={selectedValue}
                      handleChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          <Button
            disabled={selectedValue ? false : true}
            onClick={checkAnswer}
            className="mt-3 mb-3"
            variant={"action"}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
