/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ErrorModal from "../Error-modal/ErrorModal";
import "./Chess.css";
import RadioImage from "/src/assets/icons/Frame radio.png";
import Check from "/src/assets/icons/check-all.png";

// eslint-disable-next-line react/prop-types
export default function Chess({ setRenderComponent }) {
  const [fetchedCharacters, setFetchedCharacters] = useState([]);
  const [knowledge, setKnowledge] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [formErrors, setFormErrors] = useState({});
  //const [isFormFilled, setIsFormFilled] = useState(false);
  const [headerPText, setHeaderPText] = useState(
    "First step is done, continue to finish onboarding"
  );

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (knowledge && selectedCharacter && selectedOption) {
      setHeaderPText("Almost Done!");
    } else {
      setHeaderPText("First step is done, continue to finish onboarding");
    }
  }, [knowledge, selectedCharacter, selectedOption]);

  const grandmastersUrl =
    "https://chess-tournament-api.devtest.ge/api/grandmasters";
  const postUrl = "https://chess-tournament-api.devtest.ge/api/register";

  useEffect(() => {
    axios(grandmastersUrl)
      .then((res) => setFetchedCharacters(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("option")) {
      setSelectedOption(localStorage.getItem("option"));
    }
    if (localStorage.getItem("selectedCharacter")) {
      setSelectedCharacter(+localStorage.getItem("selectedCharacter"));
    }
    if (localStorage.getItem("Knowledge")) {
      setKnowledge(localStorage.getItem("Knowledge"));
    }
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
      fontWeight: 400,
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isFocused ? "600" : "inherit",
      cursor: "Pointer",
      backgroundColor: state.isFocused ? "#F7F7F9;" : "white", // Customize the background color on hover
      color: state.isFocused ? "black" : "inherit",
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
    console.log(errors);
    setFormErrors(errors);

    return Object.keys(errors).length;
  };

  const onSubmit = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (validation()) {
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
          name: userData.username,
          email: userData.email,
          phone: userData.phone,
          experience_level: knowledgeConverter(),
          already_participated: Boolean(selectedOption),
          character_id: selectedCharacter,
          date_of_birth: String(userData.date),
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setRenderComponent("board");
            localStorage.clear();
          }
        })
        .catch((error) => {
          console.error(error);
        });

      const errorCount = validation();
      if (errorCount === 0) {
        setRenderComponent("board");
      }
    }
  };

  const nextPage = () => {
    const errorCount = validation(); // Check for form errors and get the error count
    if (errorCount === 0) {
      setRenderComponent("board");
    } else {
      setIsFormFilled(false); // Handle form errors (display error message, scroll to error fields, etc.)
    }
  };

  const previousPage = () => {
    setRenderComponent("personalInfo");
  };

  return (
    <div className="chessPage">
      <div className="section1"></div>
      <div className="section2">
        <div className="header">
          <p className="headerP">{headerPText}</p>
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
          <p className="pP">Chess experience </p>
        </div>

        <div className="chessContent">
          <div className="text">
            <h1 className="black">Chess experience</h1>
            <p className="chessP">This is basic information fields</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="selectsFlex">
              <Select
                styles={customStyles}
                className="custom-select"
                value={options.find((option) => option.value === knowledge)}
                onChange={(value) => {
                  setKnowledge(value.value);
                  localStorage.setItem("Knowledge", value.value);
                }}
                options={options}
                placeholder={
                  <span className="mySelect">
                    level of knowledge{" "}
                    <span className="customPlaceHolder">*</span>
                  </span>
                }
              />

              <Select
                className="custom-select2"
                styles={customStyles}
                value={optionCharacter.find(
                  (char) => char.value === selectedCharacter
                )}
                onChange={(value) => {
                  setSelectedCharacter(value.value);
                  localStorage.setItem("selectedCharacter", value.value);
                }}
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
              <p className="participateh3">
                Have you participated in the Redberry Championship?{" "}
                <span className="customPlaceHolder">*</span>
              </p>
              <div className="radio">
                <label className="flex">
                  <input
                    className="input"
                    type="radio"
                    name="myRadioInput"
                    value="Yes"
                    onClick={() => {
                      setSelectedOption("Yes");
                      localStorage.setItem("option", "Yes");
                    }}
                  />
                  <div
                    className={`circle yes no ${
                      selectedOption === "Yes" ? "checkedd" : "unchecked"
                    }`}
                  >
                    {selectedOption === "Yes" && (
                      <img src={RadioImage} alt="Radio" />
                    )}
                  </div>
                  <span className="yes-no">Yes</span>
                </label>
                <label className="flex">
                  <input
                    className="input"
                    type="radio"
                    name="myRadioInput"
                    value="No"
                    onClick={() => {
                      setSelectedOption("No");
                      localStorage.setItem("option", "No");
                    }}
                  />
                  <div
                    className={` circle yes no ${
                      selectedOption === "No" ? "checkedd" : "unchecked"
                    }`}
                  >
                    {selectedOption === "No" && (
                      <img src={RadioImage} alt="Radio" />
                    )}
                  </div>
                  <span className="yes-no">No</span>
                </label>
              </div>
            </div>
            <div className="buttons">
              <button onClick={previousPage} className="back">
                Back
              </button>
              <button
                onClick={nextPage}
                // onClick={() => {
                //   setRenderComponent("board");
                // }}
                type="submit"
                className="done"
              >
                Done{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      {(formErrors.radio ||
        formErrors.selectedCharacter ||
        formErrors.knowledge) && (
        <ErrorModal
          render={
            formErrors.radio ||
            formErrors.selectedCharacter ||
            formErrors.knowledge
          }
        />
      )}
    </div>
  );
}
