function InfoPopup({ isOpen, onClose, statInfo }) {
  if (!isOpen || !statInfo) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="popup-header">
          <span className="popup-icon">{statInfo.icon}</span>
          <h3>{statInfo.sourceTitle}</h3>
        </div>

        <div className="popup-body">
          <p className="popup-details">{statInfo.details}</p>

          <div className="popup-source">
            <strong>Source :</strong>
            <a
              href={statInfo.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {statInfo.sourceOrganization}
            </a>
          </div>

          <div className="popup-calculation">
            <strong>Calcul :</strong>
            <span>
              {statInfo.ratePerSecond} {statInfo.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
