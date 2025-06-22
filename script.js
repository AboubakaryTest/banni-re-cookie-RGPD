document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cookie-modal");
  const settings = document.getElementById("cookie-settings");
  const main = document.getElementById("main-content");

  // ✅ Essayez de récupérer un consentement existant
  let consent = null;
  try {
    const stored = localStorage.getItem("cookieConsent");
    if (stored) {
      consent = JSON.parse(stored);
    }
  } catch (e) {
    console.warn("⚠️ Erreur de parsing cookieConsent, suppression...", e);
    localStorage.removeItem("cookieConsent");
  }

  // ✅ Affiche la modale si aucun consentement
  if (!consent) {
    modal.style.display = "flex";
    main.classList.add("blurred");
  } else {
    main.classList.remove("blurred");
  }

  // ✅ Tout accepter
  document.getElementById("accept").addEventListener("click", () => {
    saveConsent({ analytics: true, ads: true });
    modal.style.display = "none";
    main.classList.remove("blurred");
  });

  // ✅ Tout refuser
  document.getElementById("reject").addEventListener("click", () => {
    saveConsent({ analytics: false, ads: false });
    modal.style.display = "none";
    main.classList.remove("blurred");
  });

  // ✅ Afficher l'écran de personnalisation
  document.getElementById("customize").addEventListener("click", () => {
    modal.style.display = "none";
    settings.style.display = "flex";
  });

  // ✅ Enregistrer les choix personnalisés
  document.getElementById("cookie-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const preferences = {
      analytics: form.analytics.checked,
      ads: form.ads.checked
    };
    saveConsent(preferences);
    settings.style.display = "none";
    main.classList.remove("blurred");
  });

  // ✅ Fonction d’enregistrement du consentement
  function saveConsent(preferences) {
    const consentData = {
      ...preferences,
      date: new Date().toISOString()
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
  }
});
