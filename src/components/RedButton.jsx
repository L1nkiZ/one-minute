import { useState } from "react";

function RedButton({ onClick, isShutdown }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (!isShutdown) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      onClick();
    }
  };

  return (
    <div className="button-container">
      <button
        className={`red-button ${isShaking ? "shake" : ""} ${
          isShutdown ? "shutdown" : ""
        }`}
        onClick={handleClick}
        disabled={isShutdown}
      >
        {isShutdown ? "🌍 PLANÈTE ÉTEINTE" : "🔴 ÉTEINDRE LA PLANÈTE"}
      </button>
      {isShutdown && (
        <div className="button-status">
          <span className="status-indicator">●</span>
          <span>Mode économie activé</span>
        </div>
      )}
    </div>
  );
}

export default RedButton;
