//import Landing from "./components/landing-page-component/Landing";
//import Board from "./components/onboarding-component/Board";
import ImgComponent from "./components/ImgComponent/ImgComponent";
import testImg from "./assets/test-img.svg";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
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
      {/* <Board /> */}
      <PersonalInfo />
    </div>
  );
}

export default App;
