import "./ErrorModal.css";
import invalid from "./red-vector.png";

export default function ErrorModal({ render }) {
  console.log(render);
  return (
    <>
      {render.status ? (
        <div className="modal-window">
          <div className="alert">
            <img src={invalid} alt="" className="alert-icon"></img>
            <p className="alert-text">{render.alert} </p>
          </div>
          <p className="modal-text">{render.text}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
