/**
 * Netlify Function: /api/subscribe
 * Empfaengt Email-Opt-ins vom Blog-Popup und Homepage.
 * Sendet Telegram-Alert bei neuem Lead.
 *
 * Deploy: netlify deploy --prod
 * Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT  = process.env.TELEGRAM_CHAT_ID   || "1826325177";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
}

async function sendTelegram(text) {
  if (!TELEGRAM_TOKEN) return;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT, text, parse_mode: "HTML" }),
    });
  } catch (_) {}
}

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload = {};
  try { payload = JSON.parse(event.body || "{}"); } catch (_) {}

  const email  = (payload.email  || "").trim().toLowerCase();
  const source = (payload.source || "unknown");

  if (!validateEmail(email)) {
    return {
      statusCode: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "invalid email" }),
    };
  }

  const ts = new Date().toISOString();
  await sendTelegram(
    `🎯 <b>Neuer Lead!</b>\n📧 ${email}\n🔗 ${source}\n🕐 ${ts.slice(0,16)}`
  );

  return {
    statusCode: 200,
    headers: { ...CORS, "Content-Type": "application/json" },
    body: JSON.stringify({ status: "ok", message: "Danke! Schau in dein Postfach." }),
  };
};
