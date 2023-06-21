import "./Chess.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useForm } from "react-hook-form";
export default function Chess() {
  const [fetchedCharacters, setFetchedCharacters] = useState([]);
  const [knowledge, setKnowledge] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [counter, setCounter] = useState(0);
  const [formErrors, setFormErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const grandmastersUrl =
    "https://chess-tournament-api.devtest.ge/api/grandmasters";
  const postUrl = "https://chess-tournament-api.devtest.ge/api/register";

  useEffect(() => {
    axios(grandmastersUrl)
      .then((res) => setFetchedCharacters(res.data))
      .catch((err) => console.log(err));
  }, []);
  const optionCharacter = fetchedCharacters.map((character) => {
    return {
      value: character.id,
      label: (
        <div>
          <p>{character.name}</p>
        </div>
      ),
    };
  });
  const options = [
    { value: "beginner", label: "Beginner", className: "optionsStyle" },
    { value: "intermediate", label: "Intermediate", className: "optionsStyle" },
    { value: "professional", label: "Professional", className: "optionsStyle" },
  ];
  return (
    <div className="chessPage">
      <div className="text">
        <h1 className="black">Chess experience</h1>
        <p className="chessP">This is basic informaton fields</p>
      </div>

      <div className="selectsFlex">
        <Select
          options={options}
          placeholder={
            <span className="mySelect">
              level of knowledge <span className="customPlaceHolder">*</span>
            </span>
          }
        />
        <Select
          options={optionCharacter}
          placeholder={
            <span className="mySelect">
              Choose your character <span className="customPlaceHolder">*</span>
            </span>
          }
        />
      </div>

      <div className="radioButtons">
        <h3>
          Have you participated in the Redberry Championship?{" "}
          <span className="customPlaceHolder">*</span>
        </h3>
        <label>
          <span className="yes no">Yes</span>
          <input type="radio" name="myRadioInput" value="Yes" />
        </label>
        <label>
          <span className="yes no">No</span>
          <input type="radio" name="myRadioInput" value="No" />
        </label>
      </div>
      <div className="buttons">
        <button className="back">Back </button>
        <button className="done">Done </button>
      </div>
    </div>
  );
}
