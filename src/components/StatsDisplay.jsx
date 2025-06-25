import { useEffect, useState } from "react";
import statsConfig from "../statsConfig.json";

function formatNumber(value, decimals = 0) {
  if (value === 0) return "0";

  const absValue = Math.abs(value);

  if (absValue >= 1000000000) {
    return (value / 1000000000).toFixed(decimals) + "B";
  } else if (absValue >= 1000000) {
    return (value / 1000000).toFixed(decimals) + "M";
  } else if (absValue >= 1000) {
    return (value / 1000).toFixed(decimals) + "K";
  } else if (absValue < 1 && absValue > 0) {
    return value.toFixed(Math.max(3, decimals));
  }

  return value.toFixed(decimals);
}

function StatItem({ stat, elapsedSeconds, index, onStatClick, circular, compact = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentValue = stat.ratePerSecond * elapsedSeconds;

  useEffect(() => {
    // Si c'est pour le rapport final (compact), pas d'animation progressive
    if (compact) {
      setDisplayValue(currentValue);
      return;
    }

    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        const target = currentValue;
        const diff = target - prev;
        const increment = diff * 0.1;

        if (Math.abs(increment) > 0.01) {
          // Déclencher l'animation seulement si pas compact
          if (!isAnimating && !compact) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
          }
          return prev + increment;
        }

        return target;
      });
    }, 33);

    return () => clearInterval(interval);
  }, [currentValue, isAnimating, compact]);

  if (circular) {
    return (
      <div
        className={`circular-stat-item ${isAnimating && !compact ? 'animating' : ''}`}
        onClick={() => onStatClick && onStatClick(stat)}
      >
        <div className="stat-icon-container">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-underline"></div>
        </div>
        <div className={`stat-value ${isAnimating && !compact ? 'value-animating' : ''}`}>
          {formatNumber(displayValue, stat.ratePerSecond < 1 ? 6 : 0)}{" "}
          {stat.unit}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`stat-item ${isAnimating && !compact ? 'animating' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: 1,
        transform: "translateY(0)",
      }}
      onClick={() => onStatClick && onStatClick(stat)}
    >
      <div className="stat-icon-container">
        <div className="stat-icon">{stat.icon}</div>
        <div className="stat-underline"></div>
      </div>
      <div className="stat-content">
        <div className={`stat-value ${isAnimating && !compact ? 'value-animating' : ''}`}>
          {formatNumber(displayValue, stat.ratePerSecond < 1 ? 6 : 0)}{" "}
          {stat.unit}
        </div>
        <div className="stat-description">{stat.description}</div>
      </div>
      <div className="stat-info-icon">ℹ️</div>
    </div>
  );
}

function StatsDisplay({ isShutdown, elapsedSeconds, onStatClick, circular, compact = false }) {
  if (!isShutdown) return null;

  if (circular) {
    const totalStats = statsConfig.stats.length;
    const angleStep = (2 * Math.PI) / totalStats;

    return (
      <div className="circular-stats-display">
        {statsConfig.stats.map((stat, index) => {
          const angle = index * angleStep;
          const style = {
            "--angle": `${angle}rad`,
            "--index": index,
            "--total": totalStats,
          };

          return (
            <div className="circular-stat-position" style={style} key={stat.id}>
              <StatItem
                stat={stat}
                elapsedSeconds={elapsedSeconds}
                index={index}
                onStatClick={onStatClick}
                circular={true}
                compact={compact}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`stats-display ${compact ? 'stats-display-compact' : ''}`}>
      {!compact && (
        <div className="stats-header">
          <h2>🌱 Ressources économisées depuis l'extinction</h2>
          <div className="timer">
            {Math.floor(elapsedSeconds / 3600)}h{" "}
            {Math.floor((elapsedSeconds % 3600) / 60)}m{" "}
            {Math.floor(elapsedSeconds % 60)}s
          </div>
        </div>
      )}

      <div className={`stats-grid ${compact ? 'stats-grid-compact' : ''}`}>
        {statsConfig.stats.map((stat, index) => (
          <StatItem
            key={stat.id}
            stat={stat}
            elapsedSeconds={elapsedSeconds}
            index={index}
            onStatClick={onStatClick}
            compact={compact}
          />
        ))}
      </div>

      {!compact && (
        <div className="stats-footer">
          <p>Ces données sont basées sur des estimations mondiales moyennes</p>
        </div>
      )}
    </div>
  );
}

export default StatsDisplay;
