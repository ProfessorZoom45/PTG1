# PTG Role Quiz (GitHub Pages)

A 9-question quiz that assigns a **PTG role** based on answers:

- CEO 👑
- General Manager (GM) 🧭
- Operations Lead (OPS) 🛠️
- Community & Events Lead (COMM) 🎉
- Tech & Media Lead (TECH) 🎥
- Cashier / Front Desk (CASH) 🧾
- Member 🕹️

## What works on GitHub Pages (Phase 0)
Because GitHub Pages is **static hosting**, the quiz supports 3 reliable submission methods:

1. **Email** (mailto:) to `changethewrld@outlook.com`
2. **Download JSON** (user downloads a `.json` file)
3. **Copy text** (clipboard)

> Optional: A real “Submit to database” button is included, but it only works if you set a real endpoint.

## Deploy (GitHub Pages)
1. Create a repo (example: `PTG_ROLE_QUIZ`)
2. Upload these files into the repo root:
   - `index.html`
   - `style.css`
   - `app.js`
   - `roles.js`
   - `README.md`
3. In GitHub: **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: `main` / folder: `/ (root)`
6. Save. Your quiz link becomes your hosted URL.

## Optional backend (when you want real submissions)
If you want “Submit” to post data to a server:

- Create a lightweight endpoint (Cloudflare Worker / Netlify Function / Google Apps Script web app)
- Then open `app.js` and set:

```js
submitEndpoint: 'https://YOUR-ENDPOINT-HERE'
```

The endpoint should accept `POST` JSON.

## PS5 Mode
Tap **PS5 Mode** in the top bar to enable extra-large UI for TV browsing.

---

Built for **Perfect Timing Gaming** 🎯
