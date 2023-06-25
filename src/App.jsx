import Board from "./components/onboarding-component/Board";
import ImgComponent from "./components/ImgComponent/ImgComponent";
import testImg from "./assets/test-img.svg";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Chess from "./components/Chess-experience/Chess";


function App() {
  return (
    <div>
      <ImgComponent
        img={testImg}
        text={
          "Many have become chess masters; no one has become the master ofchess."
        }
        name={"- Siegbert Tarrasch"}
      />
      <Board />
          <Chess />
      <PersonalInfo />
    </div>
  );
}

export default App;
