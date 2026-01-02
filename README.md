# PTG Survey Web App (Static)

This site is built to run on **GitHub Pages** (or any static host).
No accounts required for responders.

## What works without a backend
- Public survey (low typing) ✅
- Internal 119 survey (click-first) ✅
- Saves responses **locally on the device** ✅
- Download response files ✅
- Email response via **mailto:** (opens user’s email app) ✅

## Why email is mailto
Static hosting cannot send email automatically without a server/API key.
This build generates a prefilled email to:
changethewrld@outlook.com

## GitHub Pages Quick Deploy
1. Create a repo (example: `ptg-surveys`)
2. Upload `index.html`, `styles.css`, `app.js`
3. Repo Settings → Pages → Deploy from `main` branch, root
4. Your link will look like:
   https://YOUR_USERNAME.github.io/ptg-surveys/

## QR Code
Once you have your final Pages URL, generate a QR code from any QR generator
(or add one later; this project intentionally has no external dependencies).
