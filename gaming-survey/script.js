// Gaming Survey -> mailto builder (GitHub Pages friendly)
(() => {
  const form = document.getElementById('surveyForm');
  const statusEl = document.getElementById('status');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const progressBar = document.getElementById('progressBar');

  const TO_EMAIL = "changethewrld@outlook.com";
  const SUBJECT = "Gaming Survey";
  const STORAGE_KEY = "ptg_gaming_survey_v2";

  // Helpers
  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => (s ?? "").toString().trim();

  // Enforce checkbox limits per section
  function setupLimitSections() {
    const limitedSections = $all('[data-limit]');
    limitedSections.forEach(section => {
      const limit = parseInt(section.getAttribute('data-limit'), 10);
      const boxes = $all('input[type="checkbox"]', section);
      const counter = section.querySelector('[data-counter]');

      const update = () => {
        const checked = boxes.filter(b => b.checked).length;
        if (counter) counter.textContent = String(checked);

        // If at limit, disable unchecked boxes
        boxes.forEach(b => {
          if (!b.checked && checked >= limit) b.disabled = true;
          else b.disabled = false;
        });
      };

      boxes.forEach(b => b.addEventListener('change', () => {
        update();
        saveDraft();
        updateProgress();
      }));

      update();
    });
  }

  // Save + restore draft (localStorage)
  function saveDraft() {
    const data = {};
    const els = $all('input, textarea', form);

    els.forEach(el => {
      const name = el.name;
      if (!name) return;

      if (el.type === 'checkbox') {
        data[name] = data[name] || [];
        if (el.checked) data[name].push(el.value);
      } else if (el.type === 'radio') {
        if (el.checked) data[name] = el.value;
      } else {
        data[name] = el.value;
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function restoreDraft() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let data;
    try { data = JSON.parse(raw); } catch { return; }

    const els = $all('input, textarea', form);

    els.forEach(el => {
      const name = el.name;
      if (!name || !(name in data)) return;

      if (el.type === 'checkbox') {
        const arr = Array.isArray(data[name]) ? data[name] : [];
        el.checked = arr.includes(el.value);
      } else if (el.type === 'radio') {
        el.checked = (data[name] === el.value);
      } else {
        el.value = data[name] ?? "";
      }
    });
  }

  function setStatus(msg, isBad = false) {
    statusEl.textContent = msg;
    statusEl.style.color = isBad ? "var(--danger)" : "var(--muted)";
  }

  // Build readable report
  function collectAnswersText() {
    const platforms = $all('input[name="platforms"]:checked', form).map(x => x.value);
    const platformsOther = esc(form.elements["platforms_other"]?.value);
    if (platforms.includes("Other") && platformsOther) platforms.push(`Other: ${platformsOther}`);

    const genres = $all('input[name="genres"]:checked', form).map(x => x.value);
    const genresOther = esc(form.elements["genres_other"]?.value);
    if (genres.includes("Other") && genresOther) genres.push(`Other: ${genresOther}`);

    const reasons = $all('input[name="reasons"]:checked', form).map(x => x.value);
    const reasonsOther = esc(form.elements["reasons_other"]?.value);
    if (reasons.includes("Other") && reasonsOther) reasons.push(`Other: ${reasonsOther}`);

    const matters = $all('input[name="matters"]:checked', form).map(x => x.value);

    const playstyle = esc($all('input[name="playstyle"]:checked', form)[0]?.value);

    const turnoffs = $all('input[name="turnoffs"]:checked', form).map(x => x.value);
    const turnoffsOther = esc(form.elements["turnoffs_other"]?.value);
    if (turnoffs.includes("Other") && turnoffsOther) turnoffs.push(`Other: ${turnoffsOther}`);

    const games = [
      esc(form.elements["game_1"]?.value),
      esc(form.elements["game_2"]?.value),
      esc(form.elements["game_3"]?.value),
      esc(form.elements["game_4"]?.value),
      esc(form.elements["game_5"]?.value),
    ].filter(Boolean);

    const changeOne = esc(form.elements["change_one"]?.value);

    // Socials
    const socials = {
      "Twitch": esc(form.elements["social_twitch"]?.value),
      "YouTube": esc(form.elements["social_youtube"]?.value),
      "Facebook": esc(form.elements["social_facebook"]?.value),
      "X/Twitter": esc(form.elements["social_twitter"]?.value),
      "Discord": esc(form.elements["social_discord"]?.value),
      "Email": esc(form.elements["social_email"]?.value),
    };

    const socialsLines = Object.entries(socials)
      .filter(([,v]) => v)
      .map(([k,v]) => `- ${k}: ${v}`);

    const text =
`PTG 🎯 Gaming Survey Submission

Q1 Platforms:
- ${platforms.length ? platforms.join(", ") : "(none)"}

Q2 Genres (Top 3):
- ${genres.length ? genres.join(", ") : "(none)"}

Q3 Top Games (last year):
- ${games.length ? games.join(" | ") : "(none listed)"}

Q4 Why you play (Top 2):
- ${reasons.length ? reasons.join(", ") : "(none)"}

Q5 Matters most (Top 3):
- ${matters.length ? matters.join(", ") : "(none)"}

Q6 Playstyle:
- ${playstyle || "(not selected)"}

Q7 Biggest turn-offs (Top 2):
- ${turnoffs.length ? turnoffs.join(", ") : "(none)"}

Q8 Change one thing:
- ${changeOne || "(no response)"}

Q9 Socials (optional):
${socialsLines.length ? socialsLines.join("\n") : "- (none provided)"}
`;
    return text;
  }

  // Progress bar based on "answered-ness"
  function updateProgress() {
    // Basic coverage checks
    const checks = [];

    // q1 any platform checkbox
    checks.push($all('input[name="platforms"]:checked', form).length > 0);

    // q2 any genre checkbox
    checks.push($all('input[name="genres"]:checked', form).length > 0);

    // q3 any game field typed
    checks.push(["game_1","game_2","game_3","game_4","game_5"].some(n => esc(form.elements[n]?.value)));

    // q4 any reason checkbox
    checks.push($all('input[name="reasons"]:checked', form).length > 0);

    // q5 any matters checkbox
    checks.push($all('input[name="matters"]:checked', form).length > 0);

    // q6 radio required
    checks.push(!!$all('input[name="playstyle"]:checked', form)[0]);

    // q7 any turnoff checkbox
    checks.push($all('input[name="turnoffs"]:checked', form).length > 0);

    // q8 typed
    checks.push(!!esc(form.elements["change_one"]?.value));

    // q9 any social typed
    checks.push(["social_twitch","social_youtube","social_facebook","social_twitter","social_discord","social_email"]
      .some(n => esc(form.elements[n]?.value)));

    const done = checks.filter(Boolean).length;
    const pct = Math.round((done / checks.length) * 100);
    progressBar.style.width = `${pct}%`;
  }

  // Copy to clipboard
  async function copyAnswers() {
    const text = collectAnswersText();
    try {
      await navigator.clipboard.writeText(text);
      setStatus("✅ Copied! Paste anywhere (Discord, Notes, email, etc.)");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setStatus("✅ Copied (fallback). Paste anywhere.");
    }
  }

  // Submit by mailto
  function submitMailto(e) {
    e.preventDefault();

    // Validate required playstyle
    if (!$all('input[name="playstyle"]:checked', form)[0]) {
      setStatus("🚫 Please pick your playstyle for Q6 before submitting.", true);
      document.getElementById("q6").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const body = collectAnswersText();
    const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;

    // Mailto length can be limited in some environments
    if (mailto.length > 1800) {
      setStatus("⚠️ Your answers are long — hit 'Copy Answers' then paste into an email.", true);
      return;
    }

    window.location.href = mailto;
    setStatus("✉️ Opening your email app… If it doesn’t open, tap 'Copy Answers'.");
  }

  function resetAll() {
    if (!confirm("Reset all answers?")) return;
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    setupLimitSections(); // re-apply enable/disable states + counters
    updateProgress();
    setStatus("Reset complete ✅");
  }

  // Wire up
  restoreDraft();
  setupLimitSections();
  updateProgress();

  // Save on input
  $all('input, textarea', form).forEach(el => {
    el.addEventListener('input', () => {
      saveDraft();
      updateProgress();
    });
    el.addEventListener('change', () => {
      saveDraft();
      updateProgress();
    });
  });

  form.addEventListener('submit', submitMailto);
  copyBtn.addEventListener('click', copyAnswers);
  resetBtn.addEventListener('click', resetAll);
})();
