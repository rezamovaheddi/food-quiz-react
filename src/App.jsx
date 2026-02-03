import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainPage from "./MainPage";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";

// import "./App.css";

export default function App() {
  const initialState = {
    questions: [],
    // loading, ready, error, finished, active
    status: "loading",
    indexQuestion: 0,
    answer: null,
    option: 0,
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
          option:
            action.paylaod === state.questions[indexQuestion].correctOption
              ? state.option + state.questions[indexQuestion].points
              : state.option,
        };
      default:
        throw new Error("Error action");
    }
  }
  const [state, dispatch] = useReducer(reduce, initialState);
  const numQuestion = state.questions.length;
  const indexQuestion = state.indexQuestion;
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
          <Question
            answer={state.answer}
            dispatch={dispatch}
            question={state.questions[indexQuestion]}
          />
        )}
      </MainPage>
    </div>
  );
}
