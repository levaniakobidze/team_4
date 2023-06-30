import "./Board.css";
import { useEffect } from "react";
import Logo from "/src/assets/icons/Onboarding-completed.png";

export default function Board() {
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear(); // Clear local storage on component mount
    };

    clearLocalStorage(); // Call the function immediately

    // Add a unique query parameter to the URL to bypass cache
    const url = new URL(window.location.href);
    url.searchParams.set("timestamp", Date.now());
    window.location.href = url.href;
  }, []);
  return (
    <div className="lastPage">
      <img className="lastLogo" src={Logo} alt="logo" />
    </div>
  );
}
