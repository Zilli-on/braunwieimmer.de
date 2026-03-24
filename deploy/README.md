# Landing Page Deployment — braunwieimmer.de

## Option A: GitHub Pages (kostenlos, empfohlen)

1. GitHub Repo erstellen: `github.com/new` → Name: `braunwieimmer`
2. Im Repo: Settings → Pages → Source: "Deploy from branch" → `main` → `/docs`
3. Datei hochladen: `website/index.html` in den `/docs` Ordner
4. URL: `https://USERNAME.github.io/braunwieimmer/`
5. Optional: Custom Domain `braunwieimmer.de` in CNAME Datei eintragen

## Option B: Netlify Drop (30 Sekunden, kein Account)

1. Öffne: netlify.com/drop
2. Ziehe den Ordner `website/` auf die Seite
3. Sofort online mit URL wie `https://xxx-yyy.netlify.app`
4. Optional: Custom Domain in Netlify Settings

## Option C: GitHub Codespaces / Gist (einfachste)

1. gist.github.com → neuer Gist → `index.html` einfügen → Public
2. URL: `https://gist.github.com/USERNAME/HASH`
3. Über rawgit.com oder jsDelivr zugänglich machen

## Lead Server URL anpassen

Nach dem Deployment: Ersetze in `index.html`:
```
action="http://localhost:8020/subscribe"
```
Mit (wenn ngrok aktiv):
```
action="https://DEINE-NGROK-URL.ngrok.io/subscribe"
```

Oder nutze Formspree als kostenlosen Backup:
1. formspree.io → neues Formular → Endpoint kopieren
2. Ersetze URL in index.html
3. Formspree leitet Submissions an deine Email weiter

## Custom Domain (optional)

Bei Registrar (z.B. Namecheap, ~12€/Jahr):
- `braunwieimmer.de` registrieren
- CNAME: `www` → `USERNAME.github.io`
- Bei GitHub Pages: Custom Domain eintragen

---
_Alle BW Links zeigen auf braunwieimmer.de — also lohnt sich die Domain._
