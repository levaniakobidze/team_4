import "./ErrorModal.css";
import invalid from "./red-vector.png";
import close from "./close.png";
import { useState, useEffect } from "react";

export default function ErrorModal({ render }) {
  const [showModal, setShowModal] = useState(render.status);
  console.log(showModal);

  useEffect(() => {
    setShowModal(render.status);
  }, [render.status]);
  return (
    <>
      {showModal ? (
        <div className="modal-window">
          <div className="alert-part">
            <div className="alert">
              <img src={invalid} alt="" className="alert-icon"></img>
              <p className="alert-text">Invalid {render.alert} </p>
            </div>
            <div>
              <img
                onClick={() => {
                  setShowModal(!render.status);
                  render.status = false;
                }}
                className="x"
                src={close}
                alt="x"
              ></img>
            </div>
          </div>
          <p className="modal-text">Please enter valid {render.text}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
