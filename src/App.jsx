import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainPage from "./MainPage";
// import "./App.css";

export default function App() {
  const initialState = {
    questions: [],
    // loading, ready, error, finished, active
    status: "loading",
  };

  function reduce(state, action) {
    switch (state.type) {
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
      default:
        throw new Error("action unkonwn");
    }
  }
  const [state, dispatch] = useReducer(reduce, initialState);
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
        <p>quiston</p>
        <p>awonser</p>
      </MainPage>
    </div>
  );
}
