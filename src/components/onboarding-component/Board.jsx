import "./Board.css";
import { useEffect } from "react";
import Logo from "/src/assets/icons/Onboarding-completed.png";

export default function Board() {
  useEffect(() => {
    localStorage.clear(); // Clear local storage on component mount
  }, []);
  return (
    <div className="lastPage">
      <img className="lastLogo" src={Logo} alt="logo" />
    </div>
  );
}
