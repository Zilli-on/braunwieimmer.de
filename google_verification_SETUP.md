# Google Search Console Setup

## Einmalige Einrichtung (5 Minuten)

1. search.google.com/search-console → Neue Property hinzufügen
2. URL: https://braunwieimmer.de
3. Verifizierungsmethode: HTML-Tag oder HTML-Datei

### HTML-Tag Methode:
Google gibt dir einen Code wie: `<meta name="google-site-verification" content="ABC123">`
→ Trage ihn in `C:\JARVIS\clients\braunwieimmer\website\index.html` im `<head>` ein

### Nach Verifizierung:
1. Sitemap einreichen: `https://braunwieimmer.de/sitemap.xml`
2. "URL-Inspektion" → neue Artikel manuell zur Indexierung anfordern

## Automatische Sitemap (bereits fertig)
- Sitemap: `website/sitemap.xml`
- Robots.txt: `website/robots.txt`
- Beide werden täglich um 12:00 von JARVIS aktualisiert

## Was Google Search Console zeigt:
- Welche Keywords dich finden
- Wie viele Klicks / Impressionen pro Artikel
- Welche Seiten indexiert sind
- Fehler und Warnungen

→ JARVIS liest die GSC-Daten sobald der API-Zugang eingerichtet ist
  (setx GSC_SITE_URL "https://braunwieimmer.de" nach OAuth-Setup)
