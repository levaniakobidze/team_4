import ErrorModal from "../Error-modal/ErrorModal";
import { useState, useEffect } from "react";
import "./PersonalInfo.css";
import next from "./Vector-next.png";
import check from "./Vector-checked.png";

export default function PersonalInfo({ setRenderComponent }) {
  const initialUsername = localStorage.getItem("username")
    ? JSON.parse(localStorage.getItem("username"))
    : "";
  const initialEmail = localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email"))
    : "";
  const initialPhone = localStorage.getItem("phone")
    ? JSON.parse(localStorage.getItem("phone"))
    : "";
  const initialDate = localStorage.getItem("date")
    ? JSON.parse(localStorage.getItem("date"))
    : "";
  const initialStars = localStorage.getItem("stars")
    ? JSON.parse(localStorage.getItem("stars"))
    : [];
  const initialChecked = localStorage.getItem("checked")
    ? JSON.parse(localStorage.getItem("checked"))
    : [];

  const [stars, setStars] = useState(initialStars);
  const [checked, setChecked] = useState(initialChecked);
  const [userName, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [dateNumber, setDateNumber] = useState(initialDate);
  const [modal, setModal] = useState({
    status: false,
    alert: "",
    text: "",
  });

  const handleAsterix = (index) => {
    setStars((prev) => [...prev, index]);
  };
  const checkName = (value, element) => {
    if (value.length < 3) {
      const updatedChecked = checked.filter((elem) => {
        return elem !== 1;
      });
      setChecked(updatedChecked);
    } else if (value.length > 2) {
      setModal((prev) => ({
        ...prev,
        status: false,
        alert: "",
        text: "",
      }));
      setChecked((prev) => [...prev, 1]);
      element.classList.remove("pink");
    }
  };

  const checkPhone = (e, element) => {
    if (e.length > 9) {
      setPhone(e.slice(0, 9));
    } else if (e.length === 9) {
      setChecked((prev) => [...prev, 3]);
      setPhone(e);
      element.classList.remove("pink");
      setModal((prev) => ({
        ...prev,
        status: false,
        alert: "",
        text: "",
      }));
    } else if (e.length < 9) {
      setPhone(e);
      const updatedChecked = checked.filter((elem) => {
        return elem !== 3;
      });
      setChecked(updatedChecked);
    } else {
      setPhone(e);
    }
  };

  const handleInputChange = (event) => {
    const inputDate = event;
    const formattedDate = addSlashes(inputDate);
    setDateNumber(formattedDate);
  };

  const addSlashes = (inputDate) => {
    const dateWithoutSlashes = inputDate.replace(/\//g, "");

    const formattedDate = dateWithoutSlashes.replace(
      /(.{2})(.{0,2})(.{0,4})/,
      (match, month, day, year) => {
        let formattedString = "";
        if (month) {
          formattedString += month;
          if (day) {
            formattedString += "/" + day;
            if (year) {
              formattedString += "/" + year;
            }
          }
        }
        return formattedString;
      }
    );

    return formattedDate;
  };

  const checkDate = (value, element) => {
    handleInputChange(value);
    console.log(value.length);
    if (value.length > 10) {
      setDateNumber(value.slice(0, 10));
      element.classList.remove("pink");
      setChecked((prev) => [...prev, 4]);
      setModal((prev) => ({
        ...prev,
        status: false,
        alert: "",
        text: "",
      }));
    } else if (value.length > 1 && value.length < 3) {
      // const dateString = value.toString();
      // const day = dateString.substr(0, 2);
      // const formattedDate = `${day}/`;
      // setDateNumber(formattedDate);
    } else if (value.length > 4 && value.length < 6) {
      // const dateString = value.toString();
      // const day = dateString.substr(0, 2);
      // const month = dateString.substr(3, 2);
      // const formattedDate = `${day}/${month}/`;
      // setDateNumber(formattedDate);
    } else if (value.length < 10) {
      const updatedChecked = checked.filter((elem) => {
        return elem !== 4;
      });
      setChecked(updatedChecked);
      setDateNumber(value);
    }
  };

  const checkInputs = (type, value, element) => {
    if (type === "name" && value.length < 3) {
      setModal((prev) => ({
        ...prev,
        status: true,
        alert: type,
        text: type,
      }));
      const updatedChecked = checked.filter((elem) => {
        return elem !== 1;
      });
      setChecked(updatedChecked);
      element.classList.add("pink");
    } else if (type === "name" && value.length > 2) {
      setChecked((prev) => [...prev, 1]);
      element.classList.remove("pink");
    } else if (type === "email") {
      if (value.substr(-12) !== "@redberry.ge") {
        setModal((prev) => ({
          ...prev,
          status: true,
          alert: type,
          text: type,
        }));
        element.classList.add("pink");
        const updatedChecked = checked.filter((elem) => {
          return elem !== 2;
        });
        setChecked(updatedChecked);
      } else {
        setModal((prev) => ({
          ...prev,
          status: false,
          alert: "",
          text: "",
        }));
        setChecked((prev) => [...prev, 2]);
        element.classList.remove("pink");
      }
    } else if (type === "phone number" && value.length < 9) {
      setModal((prev) => ({
        ...prev,
        status: true,
        alert: type,
        text: type,
      }));
      element.classList.add("pink");
    } else if (type === "date" && value.length < 10) {
      setModal((prev) => ({
        ...prev,
        status: true,
        alert: type,
        text: type,
      }));
      element.classList.add("pink");
      const updatedChecked = checked.filter((elem) => {
        return elem !== 4;
      });
      setChecked(updatedChecked);
    }
  };

  const nextPage = () => {
    if (checked.length > 3) {
      setRenderComponent("experience");
      console.log("აქ შემდეგ ფეიჯზე გადასავსლელი setState");
    }
  };

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(userName));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("phone", JSON.stringify(phone));
    localStorage.setItem("date", JSON.stringify(dateNumber));
    localStorage.setItem("stars", JSON.stringify(stars));
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [userName, email, phone, dateNumber, stars, checked]);

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
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-title">
          <h3>Personal information</h3>
          <p>This is basic informaton fields</p>
        </div>
        <div className="personal-form">
          <div className="personal-input-wrapper">
            {!stars.includes(1) && <div className="asterix a-1">*</div>}
            {checked.includes(1) ? (
              <img src={check} alt="check" className="checked"></img>
            ) : (
              ""
            )}
            <input
              required
              type="text"
              minLength={2}
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
                checkName(e.target.value, e.target);
              }}
              onFocus={(e) => {
                e.target.classList.add("focused");
                handleAsterix(1);
              }}
              onBlur={(e) => {
                e.target.classList.remove("focused");
                if (userName == " ") {
                  setUsername("");
                }
                checkInputs("name", userName, e.target);
              }}
              className="personal-input"
              placeholder="Name"
            />
          </div>

          <div className="personal-input-wrapper">
            {!stars.includes(2) && <div className="asterix a-2">*</div>}
            {checked.includes(2) ? (
              <img src={check} alt="check" className="checked"></img>
            ) : (
              ""
            )}
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={(e) => {
                handleAsterix(2);
                e.target.classList.add("focused");
              }}
              onBlur={(e) => {
                e.target.classList.remove("focused");
                checkInputs("email", email, e.target);
              }}
              className="personal-input"
              placeholder="Email address"
            />
          </div>

          <div className="personal-input-wrapper">
            {!stars.includes(3) && <div className="asterix a-3">*</div>}
            {checked.includes(3) ? (
              <img src={check} alt="check" className="checked"></img>
            ) : (
              ""
            )}
            <input
              required
              onChange={(e) => checkPhone(e.target.value, e.target)}
              value={phone}
              type="number"
              maxLength="9"
              onFocus={(e) => {
                handleAsterix(3);
                e.target.classList.add("focused");
              }}
              onBlur={(e) => {
                e.target.classList.remove("focused");
                checkInputs("phone number", e.target.value, e.target);
              }}
              className="personal-input"
              placeholder="Phone number"
            />
          </div>

          <div className="personal-input-wrapper">
            {!stars.includes(4) && <div className="asterix a-4">*</div>}
            {checked.includes(4) ? (
              <img src={check} alt="check" className="checked"></img>
            ) : (
              ""
            )}
            <input
              required
              type="text"
              onChange={(e) => {
                setDateNumber(e.target.value);
                checkDate(e.target.value, e.target);
              }}
              value={dateNumber}
              onFocus={(e) => {
                handleAsterix(4);
                e.target.classList.add("focused");
              }}
              onBlur={(e) => {
                e.target.classList.remove("focused");
                checkInputs("date", e.target.value, e.target);
              }}
              className="personal-input"
              placeholder="Date of birth"
            />
          </div>
        </div>

        <div className="personal-buttons">
          <div className="personal-back">Back</div>
          <button onClick={nextPage} type="submit" className="personal-next">
            Next
            <img src={next} alt="next"></img>
          </button>
        </div>
      </form>

      <ErrorModal render={modal} />
    </div>
  );
}
