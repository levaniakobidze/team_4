import "./Landing.css";
import Arrow from "../icons/arrow-right-circle.png";

export default function Landing() {
  return (
    <div className="container">
      <div className="text">
        <h1>
          chess says <span> a lot about</span>
        </h1>
        <h1>who we are</h1>
      </div>
      <button>
        Get started
        <img className="arrow" src={Arrow} alt="arrow" />
      </button>
    </div>
  );
}
