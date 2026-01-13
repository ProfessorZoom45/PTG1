// PTG Market Research Survey -> mailto builder (GitHub Pages friendly)
(() => {
  const form = document.getElementById('surveyForm');
  const statusEl = document.getElementById('status');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const progressBar = document.getElementById('progressBar');

  const TO_EMAIL = "changethewrld@outlook.com";
  const SUBJECT = "PTG Market Research Survey";
  const STORAGE_KEY = "ptg_market_research_v1";

  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => (s ?? "").toString().trim();

  function setStatus(msg, isBad = false) {
    statusEl.textContent = msg;
    statusEl.style.color = isBad ? "var(--danger)" : "var(--muted)";
  }

  // Enforce checkbox limits per section (data-limit)
  function setupLimitSections() {
    const limitedSections = $all('[data-limit]');
    limitedSections.forEach(section => {
      const limit = parseInt(section.getAttribute('data-limit'), 10);
      if (!Number.isFinite(limit)) return;

      const boxes = $all('input[type="checkbox"]', section);
      const counter = section.querySelector('[data-counter]');

      const update = () => {
        const checked = boxes.filter(b => b.checked).length;
        if (counter) counter.textContent = String(checked);

        // If at limit, disable unchecked boxes
        boxes.forEach(b => {
          b.disabled = (!b.checked && checked >= limit);
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
    const els = $all('input, textarea, select', form);

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

    const els = $all('input, textarea, select', form);

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

  // Helpers to collect answers within a section
  function collectSectionAnswer(section) {
    const title = esc(section.querySelector('h2')?.textContent) || "Question";
    const qNum = section.getAttribute('data-q') || "";

    // Inputs inside this section (exclude buttons)
    const inputs = $all('input, textarea, select', section)
      .filter(el => el.type !== 'button' && el.type !== 'submit' && el.type !== 'reset');

    const checkboxes = inputs.filter(el => el.type === 'checkbox');
    const radios = inputs.filter(el => el.type === 'radio');
    const textish = inputs.filter(el =>
      el.tagName === 'TEXTAREA' ||
      (el.tagName === 'INPUT' && !['checkbox','radio','button','submit','reset','hidden'].includes(el.type)) ||
      el.tagName === 'SELECT'
    );

    const lines = [];

    // Checkbox groups by name
    const cbNames = [...new Set(checkboxes.map(x => x.name).filter(Boolean))];
    cbNames.forEach(name => {
      const checked = checkboxes.filter(c => c.name === name && c.checked).map(c => c.value);
      if (checked.length) lines.push(`- ${checked.join(", ")}`);
    });

    // Radio groups by name (take selected)
    const rNames = [...new Set(radios.map(x => x.name).filter(Boolean))];
    rNames.forEach(name => {
      const sel = radios.find(r => r.name === name && r.checked);
      if (sel) lines.push(`- ${sel.value}`);
    });

    // Text inputs / textareas
    // (Avoid duplicating "Other" helper fields unless they have content)
    textish.forEach(el => {
      const val = esc(el.value);
      if (!val) return;

      // Skip helper "other" fields when the main checkbox/radio isn't chosen
      if (/_other$/i.test(el.name)) {
        // include only if a sibling option contains value "Other" and is checked/selected
        const base = el.name.replace(/_other$/i, "");
        const baseChosen =
          !!section.querySelector(`input[name="${base}"][type="checkbox"][value="Other"]:checked`) ||
          !!section.querySelector(`input[name="${base}"][type="radio"][value="Other"]:checked`);
        if (!baseChosen) return;
      }

      // Special case: lists (games)
      if (/^q3_game_/i.test(el.name)) return; // handled below

      const label = section.querySelector(`label[for="${el.id}"]`)?.textContent?.trim();
      lines.push(`- ${label ? label + ": " : ""}${val}`);
    });

    // Special: games list Q3
    const games = ["q3_game_1","q3_game_2","q3_game_3","q3_game_4","q3_game_5"]
      .map(n => esc(form.elements[n]?.value))
      .filter(Boolean);
    if (section.id === "q3" && games.length) {
      lines.push(`- ${games.join(" | ")}`);
    }

    const header = qNum ? `Q${qNum} ${title}` : title;
    const body = lines.length ? lines.join("\n") : "- (no response)";
    return `${header}\n${body}\n`;
  }

  function collectAnswersText() {
    const sections = $all('section.q', form);
    const parts = [];

    parts.push("PTG 🎯 Market Research Survey Submission");
    parts.push(`Timestamp: ${new Date().toLocaleString()}`);
    parts.push("");
    parts.push("============================================================");
    parts.push("Answers");
    parts.push("============================================================");
    parts.push("");

    sections.forEach(sec => {
      parts.push(collectSectionAnswer(sec));
    });

    return parts.join("\n");
  }

  // Progress: percent of non-optional question blocks with ANY input filled
  function updateProgress() {
    const sections = $all('section.q', form);
    const required = sections.filter(s => s.getAttribute('data-optional') !== 'true');

    const isAnswered = (section) => {
      const inputs = $all('input, textarea, select', section)
        .filter(el => el.type !== 'button' && el.type !== 'submit' && el.type !== 'reset');

      // any checkbox/radio checked?
      if (inputs.some(el => (el.type === 'checkbox' || el.type === 'radio') && el.checked)) return true;

      // any text typed?
      if (inputs.some(el => {
        if (el.tagName === 'TEXTAREA') return esc(el.value).length > 0;
        if (el.tagName === 'SELECT') return esc(el.value).length > 0;
        if (el.tagName === 'INPUT' && !['checkbox','radio','hidden'].includes(el.type)) return esc(el.value).length > 0;
        return false;
      })) return true;

      return false;
    };

    const done = required.filter(isAnswered).length;
    const pct = required.length ? Math.round((done / required.length) * 100) : 0;
    progressBar.style.width = `${pct}%`;
  }

  // Copy to clipboard
  async function copyAnswers() {
    const text = collectAnswersText();
    try {
      await navigator.clipboard.writeText(text);
      setStatus("✅ Copied! Paste into Notes, Discord, or an email.");
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

    const body = collectAnswersText();
    const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;

    // Mailto length can be limited in some environments
    if (mailto.length > 1800) {
      setStatus("⚠️ Your answers are long. Tap 'Copy Answers' then paste into an email.", true);
      return;
    }

    window.location.href = mailto;
    setStatus("✉️ Opening your email app… If it doesn’t open, tap 'Copy Answers'.");
  }

  function resetAll() {
    if (!confirm("Reset all answers?")) return;
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    setupLimitSections();
    updateProgress();
    setStatus("Reset complete ✅");
  }

  // Wire up
  restoreDraft();
  setupLimitSections();
  updateProgress();

  // Save on input
  $all('input, textarea, select', form).forEach(el => {
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
