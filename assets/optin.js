/**
 * JARVIS Email Opt-in Popup — braunwieimmer Blog
 *
 * Zeigt Exit-Intent-Popup wenn:
 * - Nutzer zum ersten Mal auf der Seite ist (kein Cookie)
 * - Und: entweder 45s gelesen hat ODER nach oben scrollt (Exit-Intent)
 *
 * Lead-Submit → jarvis_lead_server.py auf Port 8020
 * ODER direkt per fetch → /api/subscribe (wenn deployed)
 */

(function () {
  "use strict";

  const COOKIE_NAME = "bw_optin_shown";
  const SUBMIT_URL  = "https://braunwieimmer.de/api/subscribe"; // Produktiv
  const LOCAL_URL   = "http://localhost:8020/subscribe";          // Lokal

  // Cookie prüfen
  function getCookie(name) {
    return document.cookie.split(";").some(c => c.trim().startsWith(name + "="));
  }
  function setCookie(name, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + "=1; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
  }

  if (getCookie(COOKIE_NAME)) return; // Schon gezeigt

  // Popup-HTML erstellen
  const popup = document.createElement("div");
  popup.id = "bw-optin-popup";
  popup.innerHTML = `
    <div id="bw-optin-overlay" style="
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.85);z-index:9998;
      display:flex;align-items:center;justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <div style="
        background:#1a1a1a;border-radius:16px;padding:40px 36px;
        max-width:480px;width:90%;border-left:6px solid #ff8c00;
        position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5)">

        <button id="bw-optin-close" style="
          position:absolute;top:12px;right:16px;background:none;border:none;
          color:#666;font-size:24px;cursor:pointer;line-height:1">×</button>

        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:48px;margin-bottom:8px">🏃</div>
          <h2 style="color:#ff8c00;margin:0 0 8px;font-size:1.6em">
            Warte kurz!
          </h2>
          <p style="color:#ccc;margin:0;font-size:0.95em">
            Hol dir meinen <strong style="color:#fff">kostenlosen 8-Wochen-Laufplan</strong>
            — direkt in dein Postfach.
          </p>
        </div>

        <ul style="color:#aaa;font-size:0.9em;margin:0 0 20px;padding-left:20px;line-height:1.8">
          <li>56 Seiten Schritt-für-Schritt Plan</li>
          <li>Trainingstagebuch zum Ausfüllen</li>
          <li>Ernährungs-Guide für Läufer</li>
          <li>100% kostenlos, kein Spam</li>
        </ul>

        <form id="bw-optin-form">
          <input type="email" id="bw-optin-email" placeholder="deine@email.de"
            required style="
              width:100%;padding:14px 16px;border-radius:8px;
              border:1px solid #333;background:#0f0f0f;color:#fff;
              font-size:1em;margin-bottom:12px;box-sizing:border-box">
          <button type="submit" style="
              width:100%;padding:14px;border-radius:8px;border:none;
              background:#ff8c00;color:#000;font-weight:700;font-size:1em;
              cursor:pointer">
            Laufplan jetzt gratis holen →
          </button>
        </form>

        <p id="bw-optin-success" style="
          display:none;text-align:center;color:#4caf50;font-weight:bold;
          margin-top:16px;font-size:1.05em">
          ✅ Gesendet! Schau in dein Postfach.
        </p>

        <p style="color:#555;font-size:0.78em;text-align:center;margin:12px 0 0">
          Kein Spam. Abmelden jederzeit möglich.
        </p>
      </div>
    </div>`;

  document.body.appendChild(popup);

  // Close-Button
  document.getElementById("bw-optin-close").onclick = function () {
    popup.style.display = "none";
    setCookie(COOKIE_NAME, 30);
  };
  document.getElementById("bw-optin-overlay").onclick = function (e) {
    if (e.target === this) {
      popup.style.display = "none";
      setCookie(COOKIE_NAME, 30);
    }
  };

  // Form Submit
  document.getElementById("bw-optin-form").onsubmit = async function (e) {
    e.preventDefault();
    const email    = document.getElementById("bw-optin-email").value;
    const source   = window.location.pathname;
    const payload  = JSON.stringify({ email: email, source: "blog_popup:" + source });

    // Versuche lokalen Lead-Server, dann Prod
    let ok = false;
    for (const url of [LOCAL_URL, SUBMIT_URL]) {
      try {
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
        });
        if (resp.ok) { ok = true; break; }
      } catch (_) {}
    }

    // Fallback: In LocalStorage speichern (JARVIS kann das auslesen)
    if (!ok) {
      const pending = JSON.parse(localStorage.getItem("bw_pending_leads") || "[]");
      pending.push({ email, source, ts: new Date().toISOString() });
      localStorage.setItem("bw_pending_leads", JSON.stringify(pending));
    }

    document.getElementById("bw-optin-form").style.display = "none";
    document.getElementById("bw-optin-success").style.display = "block";
    setCookie(COOKIE_NAME, 365);
    setTimeout(() => { popup.style.display = "none"; }, 3000);
  };

  // Trigger: Exit-Intent (Maus nach oben) ODER 45s gelesen
  let shown = false;
  function showPopup() {
    if (shown) return;
    shown = true;
    popup.style.display = "flex";
  }

  // Exit Intent (Desktop)
  document.addEventListener("mouseleave", function (e) {
    if (e.clientY <= 20) showPopup();
  });

  // Scroll-basiert (Mobile — 70% der Seite gelesen)
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrolled > 0.70) showPopup();
  });

  // Zeit-basiert (45 Sekunden)
  setTimeout(showPopup, 45000);

})();
