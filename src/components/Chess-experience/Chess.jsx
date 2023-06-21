import "./Chess.css";
import React from "react";
import Select from "react-select";

export default function Chess() {
  const options = [
    { value: "beginner", label: "begginer" },
    { value: "intermediate", label: "intermediate" },
    { value: "professional", label: "professional" },
  ];
  return (
    <div>
      <h1 className="black">Chess experience</h1>
      <p className="chessP">This is basic informaton fields</p>

      <h3>Have you participated in the Redberry Championship? *</h3>
      <label>
        <span>Yes</span>
        <input type="radio" name="myRadioInput" value="Yes" />
      </label>
      <label>
        <span>No</span>

        <Select
          options={options}
          placeholder={
            <span className="mySelect">
              level of knowledge <span className="customPlaceHolder">*</span>
            </span>
          }
        />
        <Select
          options={options}
          placeholder={
            <span className="mySelect">
              Choose your character <span className="customPlaceHolder">*</span>
            </span>
          }
        />

        <input type="radio" name="myRadioInput" value="No" />
      </label>

      <div className="buttons">
        <button className="back">Back </button>
        <button className="done">Done </button>
      </div>
    </div>
  );
}
