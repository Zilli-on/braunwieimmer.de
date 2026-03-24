# braunwieimmer Website deployen

## Option 1: GitHub Pages (empfohlen, kostenlos)

### Einmalige Einrichtung (10 Min):
1. GitHub Account erstellen (github.com)
2. Neues Repository anlegen: `braunwieimmer.de` (public)
3. Personal Access Token erstellen:
   - GitHub → Settings → Developer Settings → Personal access tokens
   - Token mit `repo` Berechtigung
4. Token in Windows setzen:
   ```
   setx GH_TOKEN "ghp_dein_token"
   ```
5. Repository-Name setzen:
   ```
   setx GH_REPO "dein_github_username/braunwieimmer.de"
   ```
6. In GitHub Repo Settings → Pages → Branch: `main` → Folder: `/ (root)`
7. Custom Domain: `braunwieimmer.de` eintragen

### Danach automatisch:
JARVIS deployed täglich um 12:30 automatisch.
URL: https://dein_username.github.io/braunwieimmer.de/

---

## Option 2: Netlify Drop (manuell, 2 Min setup)
1. netlify.com → Account
2. "Sites" → "Deploy manually" → Drag & Drop den Ordner:
   `C:\JARVIS\clients\braunwieimmer\website\`
3. Custom Domain eintragen
4. Fertig — URL z.B. https://braunwieimmer.netlify.app

---

## Option 3: Vercel (automatisch via GitHub)
→ Nach GitHub Pages Setup automatisch über Vercel verbinden für bessere Performance.

---

## Website-Dateien (lokal):
- Hauptseite:    `website/index.html`
- Blog:          `website/blog/*.html`
- Impressum:     `website/impressum.html`
- Datenschutz:   `website/datenschutz.html`
- Sitemap:       `website/sitemap.xml`
- robots.txt:    `website/robots.txt`
