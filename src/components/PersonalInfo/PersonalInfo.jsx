import ErrorModal from "../Error-modal/ErrorModal";
import { useState } from "react";
import "./PersonalInfo.css";
import next from "./Vector-next.png";

export default function PersonalInfo() {
  const [stars, setStars] = useState([]);
  const [userName, setUsername] = useState("");
  const [modal, setModal] = useState({
    status: false,
    alert: "",
    text: "",
  });

  const handleAsterix = (index) => {
    setStars((prev) => [...prev, index]);
  };

  const checkInputs = () => {
    setModal((prev) => ({
      ...prev,
      status: true,
      alert: "",
      text: "",
    }));
  };
  return (
    <div className="personal-info-container">
      <div className="personal-info-header">Start creating your account</div>
      <div className="stages">
        <div className="box1">1</div>
        <div className="middle-line"></div>
        <div className="box2">2</div>
      </div>
      <div className="stage-titles">
        <p>Personal information</p>
        <p>Chess experience</p>
      </div>
      <div className="form-title">
        <h3>Personal information</h3>
        <p>This is basic informaton fields</p>
      </div>
      <div className="personal-form">
        <div className="personal-input-wrapper">
          {!stars.includes(1) && <div className="asterix a-1">*</div>}
          <input
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onFocus={(e) => {
              setUsername(" ");
              e.target.classList.add("focused");
              handleAsterix(1);
            }}
            onBlur={(e) => {
              e.target.classList.remove("focused");
              if (userName == " ") setUsername("");
            }}
            className="personal-input"
            placeholder="Name"
          />
        </div>

        <div className="personal-input-wrapper">
          {!stars.includes(2) && <div className="asterix a-2">*</div>}
          <input
            onFocus={(e) => {
              handleAsterix(2);
              e.target.classList.add("focused");
            }}
            onBlur={(e) => {
              e.target.classList.remove("focused");
            }}
            className="personal-input"
            placeholder="Email address"
          />
        </div>

        <div className="personal-input-wrapper">
          {!stars.includes(3) && <div className="asterix a-3">*</div>}
          <input
            onFocus={(e) => {
              handleAsterix(3);
              e.target.classList.add("focused");
            }}
            onBlur={(e) => {
              e.target.classList.remove("focused");
            }}
            className="personal-input"
            placeholder="Phone number"
          />
        </div>

        <div className="personal-input-wrapper">
          {!stars.includes(4) && <div className="asterix a-4">*</div>}
          <input
            onFocus={(e) => {
              handleAsterix(4);

              e.target.classList.add("focused");
            }}
            onBlur={(e) => {
              e.target.classList.remove("focused");
            }}
            className="personal-input"
            placeholder="Date of birth"
          />
        </div>
      </div>
      <div className="personal-buttons">
        <div className="personal-back">Back</div>
        <div className="personal-next">
          Next
          <img src={next} alt="next"></img>
        </div>
      </div>
      <button onClick={checkInputs}>set text</button>
      <ErrorModal render={modal} />
    </div>
  );
}
