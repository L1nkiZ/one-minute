import { useState } from "react";

function ShareButton({ elapsedSeconds, isShutdown }) {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isShutdown) return null;

  const generateShareText = () => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = Math.floor(elapsedSeconds % 60);

    const co2Saved = Math.floor(1237 * elapsedSeconds);
    const waterSaved = Math.floor(28500 * elapsedSeconds);
    const energySaved = Math.floor(10000 * elapsedSeconds);

    return `🌍 J'ai éteint la planète pendant ${hours}h ${minutes}m ${seconds}s !

✅ ${co2Saved.toLocaleString()} kg de CO₂ évités
✅ ${waterSaved.toLocaleString()} L d'eau économisée  
✅ ${energySaved.toLocaleString()} kWh d'énergie sauvée

Et toi, combien peux-tu économiser ? 
#PlanèteÉteinte #EcologieImpact #DevDurable`;
  };

  const shareUrl = window.location.href;

  const handleShare = (platform) => {
    const text = generateShareText();
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setIsShareMenuOpen(false);
  };

  const copyToClipboard = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
    setIsShareMenuOpen(false);
  };

  return (
    <div className="share-container">
      <button
        className="share-button"
        onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
      >
        📤 Partager mes économies
      </button>

      {isShareMenuOpen && (
        <div className="share-menu">
          <div className="share-preview">
            <h4>Aperçu du partage :</h4>
            <pre className="share-text-preview">{generateShareText()}</pre>
          </div>

          <div className="share-options">
            <button
              className="share-option twitter"
              onClick={() => handleShare("twitter")}
            >
              🐦 Twitter
            </button>

            <button
              className="share-option facebook"
              onClick={() => handleShare("facebook")}
            >
              📘 Facebook
            </button>

            <button
              className="share-option linkedin"
              onClick={() => handleShare("linkedin")}
            >
              💼 LinkedIn
            </button>

            <button
              className="share-option whatsapp"
              onClick={() => handleShare("whatsapp")}
            >
              💬 WhatsApp
            </button>

            <button className="share-option copy" onClick={copyToClipboard}>
              {copySuccess ? "✅ Copié!" : "📋 Copier le texte"}
            </button>
          </div>

          <button
            className="share-close"
            onClick={() => setIsShareMenuOpen(false)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default ShareButton;
