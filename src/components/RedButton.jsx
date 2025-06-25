import { useEffect, useState } from "react";

function PowerSwitch({ onClick, isShutdown }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = () => {
    if (!isShutdown) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      onClick();
    }
  };

  // Assurer que l'état du checkbox correspond à l'état isShutdown
  useEffect(() => {
    const checkbox = document.querySelector(".switch__input");
    if (checkbox) {
      checkbox.checked = isShutdown;
    }
  }, [isShutdown]);

  return (
    <div className="button-container">
      <label className={`switch ${isShaking ? "shake" : ""}`}>
        <input
          className="switch__input"
          type="checkbox"
          role="switch"
          name="power"
          checked={isShutdown}
          onChange={handleChange}
          disabled={isShutdown}
        />
        <span className="switch__lever-shadow"></span>
        <span className="switch__lever">
          <span className="switch__lever-sides"></span>
          <span className="switch__lever-half-top"></span>
          <span className="switch__lever-half-bottom"></span>
        </span>
        <span className="switch__label">Power</span>
      </label>
      {isShutdown && (
        <div className="button-status">
          <span className="status-indicator">●</span>
          <span>Mode économie activé</span>
        </div>
      )}
    </div>
  );
}

export default PowerSwitch;
