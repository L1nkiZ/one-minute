import { useEffect, useRef, useState } from "react";
import "./App.css";
import InfoPopup from "./components/InfoPopup";
import Planet3D from "./components/Planet3D";
import PowerSwitch from "./components/RedButton";
import ShareButton from "./components/ShareButton";
import StatsDisplay from "./components/StatsDisplay";

function App() {
  const [isShutdown, setIsShutdown] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleShutdownPlanet = () => {
    setIsShutdown(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000 / 30);
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStat(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        {!isShutdown && (
          <p className="app-subtitle">
            Découvrez l'impact de nos consommations sur la planète en temps réel
          </p>
        )}
        {isShutdown && (
          <div className="timer-container">
            <div className="timer">
              {Math.floor(elapsedSeconds / 3600)}h{" "}
              {Math.floor((elapsedSeconds % 3600) / 60)}m{" "}
              {Math.floor(elapsedSeconds % 60)}s
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="planet-container-wrapper">
          <div className="planet-section">
            <Planet3D isShutdown={isShutdown} />
          </div>

          {isShutdown && (
            <div className="circular-stats">
              <StatsDisplay
                isShutdown={isShutdown}
                elapsedSeconds={elapsedSeconds}
                onStatClick={handleStatClick}
                circular={true}
              />
            </div>
          )}
        </div>

        <div className="interaction-section">
          <PowerSwitch onClick={handleShutdownPlanet} isShutdown={isShutdown} />
        </div>

        {isShutdown && (
          <div className="share-section">
            <ShareButton
              elapsedSeconds={elapsedSeconds}
              isShutdown={isShutdown}
            />
          </div>
        )}
      </main>

      <InfoPopup
        isOpen={showPopup}
        onClose={closePopup}
        statInfo={selectedStat}
      />

      {!isShutdown && (
        <footer className="app-footer">
          <p>
            Inspiré par des sites comme{" "}
            <a
              href="https://neal.fun"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neal.fun
            </a>
          </p>
          <p>
            Sources : IPCC, UNESCO, AIE, Banque mondiale, FAO et autres
            organismes scientifiques
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
