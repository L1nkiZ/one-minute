import { useEffect, useRef, useState } from "react";
import "./App.css";
import InfoPopup from "./components/InfoPopup";
import Planet3D from "./components/Planet3D";
import PowerSwitch from "./components/RedButton";
import StatsDisplay from "./components/StatsDisplay";

function App() {
  const [isShutdown, setIsShutdown] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const MAX_DURATION = 60; // 1 minute en secondes

  const handleShutdownPlanet = () => {
    setIsShutdown(true);
    setIsComplete(false);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);

      if (elapsed >= MAX_DURATION) {
        setElapsedSeconds(MAX_DURATION);
        setIsComplete(true);
        setShowFinalReport(true);
        clearInterval(intervalRef.current);
      } else {
        setElapsedSeconds(elapsed);
      }
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

  const closeFinalReport = () => {
    setShowFinalReport(false);
  };

  const restartExperience = () => {
    setIsShutdown(false);
    setElapsedSeconds(0);
    setIsComplete(false);
    setShowFinalReport(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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
            <div className={`timer ${isComplete ? "timer-complete" : ""}`}>
              {Math.floor(elapsedSeconds / 3600)}h{" "}
              {Math.floor((elapsedSeconds % 3600) / 60)}m{" "}
              {Math.floor(elapsedSeconds % 60)}s
              {isComplete && " - TERMINÉ"}
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
          {!isComplete && (
            <PowerSwitch onClick={handleShutdownPlanet} isShutdown={isShutdown} />
          )}
          {isComplete && (
            <button className="restart-button" onClick={restartExperience}>
              Recommencer l'expérience
            </button>
          )}
        </div>
      </main>

      {/* Final Report Modal */}
      {showFinalReport && (
        <div
          className="popup-overlay final-report-overlay"
          onClick={closeFinalReport}
        >
          <div
            className="popup-content final-report-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closeFinalReport}>
              ✕
            </button>

            <div className="final-report-header">
              <h2>🎉 Rapport Final - Une Minute Sans Impact</h2>
              <p className="final-report-subtitle">
                Voici ce que vous avez économisé en éteignant votre impact pendant 1
                minute :
              </p>
            </div>

            <div className="final-report-stats">
              <StatsDisplay
                isShutdown={true}
                elapsedSeconds={60}
                onStatClick={handleStatClick}
                circular={false}
                compact={true}
              />
            </div>

            <div className="final-report-message">
              <h3>💡 Réflexion</h3>
              <p>
                Ces chiffres représentent l'impact évité en seulement une minute.
                Imaginez l'effet sur une heure, une journée, ou même une année !
              </p>
              <p>
                Chaque geste compte pour préserver notre planète. Même les plus
                petites actions peuvent avoir un impact significatif.
              </p>
            </div>

            <div className="final-report-actions">
              <button
                className="final-report-button primary"
                onClick={restartExperience}
              >
                Recommencer l'expérience
              </button>
              <button
                className="final-report-button secondary"
                onClick={closeFinalReport}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

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
