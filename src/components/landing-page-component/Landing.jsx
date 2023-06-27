import "./Landing.css";
import Arrow from "/src/assets/icons/arrow-right-circle.png";

export default function Landing({ setRenderComponent }) {
  return (
    <div className="container">
      <div className="text">
        <h1 className="spanCenter">
          chess says <span className="span"> a lot about</span>
        </h1>
        <h1>who we are</h1>
      </div>
      <button
        onClick={() => {
          setRenderComponent("personalInfo");
        }}
        className="started"
      >
        Get started
        <img className="arrow" src={Arrow} alt="arrow" />
      </button>
    </div>
  );
}
