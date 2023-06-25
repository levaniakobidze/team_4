import "./Chess.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useForm } from "react-hook-form";
import Check from "/src/assets/icons/check-all.png";
import RadioImage from "/src/assets/icons/Frame radio.png";

export default function Chess() {
  const [fetchedCharacters, setFetchedCharacters] = useState([]);
  const [knowledge, setKnowledge] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const grandmastersUrl =
    "https://chess-tournament-api.devtest.ge/api/grandmasters";
  const postUrl = "https://chess-tournament-api.devtest.ge/api/register";

  useEffect(() => {
    axios(grandmastersUrl)
      .then((res) => setFetchedCharacters(res.data))
      .catch((err) => console.log(err));
    const savedData = localStorage.getItem("chessFormData");
  }, []);
  const optionCharacter = fetchedCharacters.map((character) => {
    return {
      value: character.id,
      label: (
        <div className="character">
          <p>{character.name}</p>
          <img
            className="characterImg"
            src={"https://chess-tournament-api.devtest.ge" + character.image}
            alt={character.id}
          />
        </div>
      ),
    };
  });
  const options = [
    { value: "beginner", label: "Beginner", className: "optionsStyle" },
    { value: "intermediate", label: "Intermediate", className: "optionsStyle" },
    { value: "professional", label: "Professional", className: "optionsStyle" },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      borderRadius: "4px",
      background: "var(--gray-white, #FFF)",
      boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.13) inset",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isFocused ? "600" : "inherit",
      cursor: "Pointer",
    }),
  };

  return (
    <div className="chessPage">
      <div className="header">
        <p className="headerP">
          First step is done, continue to finish onboarding
        </p>
        <hr />
      </div>
      <div className="checkbox">
        <div className="one">
          <div className="border">
            <img src={Check} />
          </div>
        </div>
        <div className="line"></div>
        <div className="one">
          <div className="border two">2</div>
        </div>
      </div>
      <div className="p">
        <p>Personal information</p>
        <p>Chess experience</p>
      </div>

      <div className="chessContent">
        <div className="text">
          <h1 className="black">Chess experience</h1>
          <p className="chessP">This is basic information fields</p>
        </div>
        <form>
          <div className="selectsFlex">
            <Select
              styles={customStyles}
              className="custom-select"
              onChange={(value) => setKnowledge(value.value)}
              options={options}
              placeholder={
                <span className="mySelect">
                  level of knowledge{" "}
                  <span className="customPlaceHolder">*</span>
                </span>
              }
            />

            <Select
              className="custom-select"
              styles={customStyles}
              onChange={(value) => setSelectedCharacter(value.value)}
              options={optionCharacter}
              placeholder={
                <span className="mySelect">
                  Choose your character{" "}
                  <span className="customPlaceHolder">*</span>
                </span>
              }
            />
          </div>

          <div className="radioButtons">
            <h3>
              Have you participated in the Redberry Championship?{" "}
              <span className="customPlaceHolder">*</span>
            </h3>
            <div className="radio">
              <label className="flex">
                <input
                  className="input"
                  type="radio"
                  name="myRadioInput"
                  value="Yes"
                  onClick={() => setSelectedOption("Yes")}
                />
                <div
                  className={`circle yes no ${
                    selectedOption === "Yes" ? "checked" : "unchecked"
                  }`}
                >
                  {selectedOption === "Yes" && (
                    <img src={RadioImage} alt="Radio" />
                  )}
                </div>
                <span>Yes</span>
              </label>
              <label className="flex">
                <input
                  className="input"
                  type="radio"
                  name="myRadioInput"
                  value="No"
                  onClick={() => setSelectedOption("No")}
                />
                <div
                  className={` circle yes no ${
                    selectedOption === "No" ? "checked" : "unchecked"
                  }`}
                >
                  {selectedOption === "No" && (
                    <img src={RadioImage} alt="Radio" />
                  )}
                </div>
                <span>No</span>
              </label>
            </div>
          </div>
          <div className="buttons">
            <button className="back">Back </button>
            <button className="done">Done </button>
          </div>
        </form>
      </div>
    </div>
  );
}
