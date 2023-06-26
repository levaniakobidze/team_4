import "./Chess.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Check from "/src/assets/icons/check-all.png";
import RadioImage from "/src/assets/icons/Frame radio.png";
import ImgComponent from "../ImgComponent/ImgComponent";
import ErrorModal from "../Error-modal/ErrorModal";

export default function Chess() {
  const [fetchedCharacters, setFetchedCharacters] = useState([]);
  const [knowledge, setKnowledge] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
    const savedData = localStorage.getItem("chessFormData");
  }, []);
  const optionCharacter = fetchedCharacters.map((character) => {
    console.log("selectedChar", selectedCharacter, "char", character);
    return {
      value: character.id,
      name: character.name,
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
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      transition: "transform 0.3s ease",
    }),
  };

  const validation = () => {
    const errors = {};
    if (knowledge === "") {
      errors.knowledge = {
        text: "level of knowledge",
        alert: "level of knowledge",
        status: true,
      };
    }
    if (selectedCharacter === "") {
      errors.selectedCharacter = {
        text: "character",
        alert: "character",
        status: true,
      };
    }
    if (!selectedOption) {
      errors.radio = {
        text: "participation status",
        alert: "participation status",
        status: true,
      };
    }
    return errors;
  };
  const onSubmit = (formHookData) => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (knowledge !== "" && selectedCharacter !== "" && !!selectedOption) {
      const knowledgeConverter = () => {
        if (knowledge === "Beginner") {
          return "beginner";
        }
        if (knowledge === "Intermediate") {
          return "Intermediate";
        }
        if (knowledge === "Professional") {
          return "professional";
        }
      };
      axios
        .post(postUrl, {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          experience_level: knowledgeConverter(),
          already_participated: Boolean(formHookData.radio),
          character_id: selectedCharacter,
          date_of_birth: String(userData.data),
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            navigate("/success");
            localStorage.clear();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    const errs = validation();
    setFormErrors(errs);
  };
  const onError = (data) => {
    const errs = validation();
    errs.radio = {
      message: "Please enter if you have participated",
      error: true,
    };

    setFormErrors(errs);
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="chessPage">
      <div className="section1"></div>
      <div className="section2">
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
          <p>Chess experience </p>
        </div>

        <div className="chessContent">
          <div className="text">
            <h1 className="black">Chess experience</h1>
            <p className="chessP">This is basic information fields</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                components={{
                  ValueContainer: ({ getValue, children }) =>
                    getValue()[0]?.name ? (
                      <div className="character">
                        <p>{getValue()[0]?.name}</p>
                      </div>
                    ) : (
                      children
                    ),
                }}
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
              <button className="back">Back</button>
              <button type="submit" className="done">
                Done{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      {formErrors.radio && <ErrorModal render={formErrors.radio} />}
      {formErrors.selectedCharacter && (
        <ErrorModal render={formErrors.selectedCharacter} />
      )}
      {formErrors.knowledge && <ErrorModal render={formErrors.knowledge} />}
    </div>
  );
}
