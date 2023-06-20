import ErrorModal from "../Error-modal/ErrorModal";
import { useState } from "react";

export default function PersonalInfo() {
  const [modal, setModal] = useState({
    status: false,
    alert: "",
    text: "",
  });
  console.log(modal);

  const checkInputs = () => {
    setModal((prev) => ({
      ...prev,
      status: true,
      alert: "name",
      text: "name",
    }));
  };
  return (
    <div>
      <button onClick={checkInputs}>set text</button>
      <ErrorModal render={modal} />
    </div>
  );
}
