import { useState } from "react";
import ErrorModal from "./components/Error-modal/ErrorModal";

function App() {
  const [userName, setUsername] = useState(false);
  const [invalid, setInvalid] = useState({
    status: false,
    alert: "",
    text: "",
  });
  console.log(invalid);

  const checkInputs = () => {
    if (!userName) {
      setInvalid((prev) => ({
        ...prev,
        status: true,
        alert: "Invalid name",
        text: "Please enter valid name",
      }));
    }
  };
  return (
    <div>
      <button onClick={checkInputs}>set text</button>
      <ErrorModal render={invalid} />
    </div>
  );
}

export default App;
