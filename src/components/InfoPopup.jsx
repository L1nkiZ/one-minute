function InfoPopup({ isOpen, onClose, statInfo }) {
  if (!isOpen || !statInfo) return null;

  const sources = {
    co2_emissions: {
      title: "Émissions mondiales de CO₂",
      source:
        "IPCC (Groupe d'experts intergouvernemental sur l'évolution du climat)",
      link: "https://www.ipcc.ch/",
      details:
        "Les émissions mondiales de CO₂ atteignent environ 39 milliards de tonnes par an, soit environ 1 237 kg par seconde.",
    },
    water_consumption: {
      title: "Consommation mondiale d'eau potable",
      source:
        "UNESCO - Rapport mondial sur la mise en valeur des ressources en eau",
      link: "https://www.unesco.org/",
      details:
        "L'humanité consomme environ 900 milliards de mètres cubes d'eau par an pour tous usages.",
    },
    energy_consumption: {
      title: "Consommation énergétique mondiale",
      source: "Agence internationale de l'énergie (AIE)",
      link: "https://www.iea.org/",
      details:
        "La consommation mondiale d'énergie est d'environ 315 000 TWh par an.",
    },
    solid_waste: {
      title: "Production de déchets solides",
      source: "Banque mondiale - What a Waste 2.0",
      link: "https://www.worldbank.org/",
      details:
        "Le monde produit plus de 11 milliards de tonnes de déchets solides par an.",
    },
    deforestation: {
      title: "Déforestation mondiale",
      source:
        "FAO - Organisation des Nations Unies pour l'alimentation et l'agriculture",
      link: "https://www.fao.org/",
      details:
        "Environ 6,6 millions d'arbres sont abattus chaque année dans le monde.",
    },
  };

  const currentSource = sources[statInfo.id] || {
    title: statInfo.name,
    source: "Données basées sur diverses sources scientifiques",
    link: "#",
    details:
      "Estimation basée sur des moyennes mondiales annuelles converties en valeurs par seconde.",
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="popup-header">
          <span className="popup-icon">{statInfo.icon}</span>
          <h3>{currentSource.title}</h3>
        </div>

        <div className="popup-body">
          <p className="popup-details">{currentSource.details}</p>

          <div className="popup-source">
            <strong>Source :</strong>
            <a
              href={currentSource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentSource.source}
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
