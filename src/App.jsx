import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainPage from "./MainPage";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";
import NextBtn from "./components/NextBtn";
import Progress from "./components/Progress";
import Finished from "./components/Finished";

// import "./App.css";

export default function App() {
  const initialState = {
    // loading, ready, error, finished, active
    questions: [],
    status: "loading",
    indexq: 0,
    answer: null,
    points: 0,
  };

  function reduce(state, action) {
    switch (action.type) {
      case "dataGet":
        return {
          ...state,
          status: "ready",
          questions: action.paylaod,
        };
      case "DataFail":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "newAnswer":
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === state.questions[state.indexq].correctOption
              ? state.points + state.questions[state.indexq].points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          indexq: state.indexq + 1,
          answer: null,
        };
      case "FINISH":
        return { ...state, status: "finished" };

      default:
        throw new Error("Error action");
    }
  }
  const [state, dispatch] = useReducer(reduce, initialState);
  const numQuestion = state.questions.length;
  const indexQuestion = state.indexq;
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataGet", paylaod: data }))
      .catch((err) => dispatch({ type: "DataFail" }));
  }, []);
  return (
    <div>
      <Header />
      <MainPage>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartQuiz numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.indexq}
              numQuestion={numQuestion}
              maxPoints={maxPoints}
              points={state.points}
              answer={state.answer}
            />
            <Question
              answer={state.answer}
              dispatch={dispatch}
              question={state.questions[indexQuestion]}
            />
            <NextBtn
              index={indexQuestion}
              numQuestion={numQuestion}
              dispatch={dispatch}
              answer={state.answer}
            />
          </>
        )}
        {state.status === "finished" && (
          <Finished maxPoints={maxPoints} points={state.points} />
        )}
      </MainPage>
    </div>
  );
}
