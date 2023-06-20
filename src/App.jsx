import { useState } from "react";
import ErrorModal from "./components/Error-modal/ErrorModal";

function App() {
  const [userName, setUsername] = useState(false);
  const [modal, setModal] = useState({
    status: false,
    alert: "",
    text: "",
  });
  console.log(modal);

  const checkInputs = () => {
    if (!userName) {
      setModal((prev) => ({
        ...prev,
        status: true,
        alert: "name",
        text: "name",
      }));
    }
  };
  return (
    <div>
      <button onClick={checkInputs}>set text</button>
      <ErrorModal render={modal} />
    </div>
  );
}

export default App;
