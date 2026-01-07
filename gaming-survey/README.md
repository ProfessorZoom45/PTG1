# Gaming Survey (Subfolder Deployment)

This folder is meant to live at:

- `/<repo-root>/gaming-survey/`

So your GitHub Pages URL becomes:

- `https://professorzoom45.github.io/gaming-survey/`

## Files
- `index.html` — the survey page
- `styles.css` — styling
- `script.js` — validates answers + builds the mailto submit

## Submit behavior
The submit button opens the user's email app using `mailto:` and pre-fills:
- **To:** changethewrld@outlook.com
- **Subject:** Gaming Survey
- **Body:** the survey answers

> Note: `mailto:` requires the visitor to have an email client configured.
