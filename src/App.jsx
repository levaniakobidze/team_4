import ImgComponent from "./components/ImgComponent/ImgComponent";
import testImg from "./assets/test-img.svg";
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
    </div>
  );
}

export default App;
