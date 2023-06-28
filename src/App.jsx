import Board from "./components/onboarding-component/Board";
import ImgComponent from "./components/ImgComponent/ImgComponent";
import testImg from "./assets/test-img.svg";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Chess from "./components/Chess-experience/Chess";
//import ErrorModal from "./components/Error-modal/ErrorModal";
import "./App.css";
import { useEffect, useState } from "react";
import Landing from "./components/landing-page-component/Landing";
import LandingImg from "./assets/Landing.png";
import Personal from "./assets/Personal.png";
import experience from "./assets/experience.png";

function App() {
  const initialPage = localStorage.getItem("initialPage")
    ? JSON.parse(localStorage.getItem("initialPage"))
    : "landing";
  const [renderComponent, setRenderComponent] = useState(initialPage);

  useEffect(() => {
    localStorage.setItem("initialPage", JSON.stringify(renderComponent));
  }, [renderComponent]);
  return (
    <div className="appContainer">
      <ImgComponent
        img={
          renderComponent === "landing"
            ? LandingImg
            : renderComponent === "personalInfo"
            ? Personal
            : renderComponent === "experience"
            ? experience
            : renderComponent === "board"
            ? testImg
            : ""
        }
        text={
          renderComponent === "landing"
            ? ""
            : renderComponent === "personalInfo"
            ? "'When you see a good move,look for a better one.'"
            : renderComponent === "experience"
            ? "Many have become chess masters; no one has become the master of chess."
            : renderComponent === "board"
            ? testImg
            : ""
        }
        name={
          renderComponent === "landing"
            ? ""
            : renderComponent === "personalInfo"
            ? "-Emanuel Lasker"
            : renderComponent === "experience"
            ? "-Emanuel Lasker"
            : renderComponent === "board"
            ? -" Siegbert Tarrasch"
            : ""
        }
      />
      {renderComponent === "landing" && (
        <Landing setRenderComponent={setRenderComponent} />
      )}
      {renderComponent === "experience" && (
        <Chess setRenderComponent={setRenderComponent} />
      )}
      {renderComponent === "personalInfo" && (
        <PersonalInfo setRenderComponent={setRenderComponent} />
      )}
      {renderComponent === "board" && (
        <Board setRenderComponent={setRenderComponent} />
      )}
    </div>
  );
}

export default App;
