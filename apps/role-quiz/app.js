// PTG Role Quiz — app.js (Cloudflare Submit + 1-2 answer multi-select)
// GitHub Pages front-end + Cloudflare endpoint POST JSON

(function () {
  "use strict";

  const form = document.getElementById("quizForm");
  const resultCard = document.getElementById("resultCard");

  const elRole = document.getElementById("resultRole");
  const elSubtitle = document.getElementById("resultSubtitle");
  const elDesc = document.getElementById("resultDesc");
  const elNext = document.getElementById("resultNext");
  const elSecondary = document.getElementById("resultSecondary");
  const elScores = document.getElementById("resultScores");
  const elStatus = document.getElementById("submitStatus");

  const btnCopy = document.getElementById("btnCopy");
  const btnEmail = document.getElementById("btnEmail");
  const btnDownload = document.getElementById("btnDownload");
  const btnSubmit = document.getElementById("btnSubmit");

  // ===== Cloudflare endpoint (set in HTML via window.PTG_SUBMIT_ENDPOINT) =====
  const SUBMIT_ENDPOINT = (window.PTG_SUBMIT_ENDPOINT || "").trim();

  // ===== Roles =====
  const ROLES = ["CEO", "GM", "OPS", "COMM", "TECH", "CASH", "MEMBER"];

  const ROLE_INFO = {
    CEO: {
      subtitle: "Vision & Mission Protector 🛡️",
      desc:
        "You’re built to set direction, protect the culture, and make the hard calls when it matters. PTG needs leaders who keep the mission clean and the standards real.",
      next:
        "Next step: help define top rules, the vibe standards, and the 10/10 experience checklist (qx = 100%).",
    },
    GM: {
      subtitle: "Floor Leader & Problem Solver 🎮",
      desc:
        "You keep the space running smooth in real time. When it gets busy, you coordinate, communicate, and keep the day moving.",
      next:
        "Next step: build a shift flow: opening checklist, mid-day resets, and closing checklist.",
    },
    OPS: {
      subtitle: "Operations & Consistency Engine ⚙️",
      desc:
        "You’re the backbone: clean systems, clean space, clean processes. You fix problems before they grow.",
      next:
        "Next step: create PTG’s daily ops checklist and weekly maintenance schedule.",
    },
    COMM: {
      subtitle: "Community Builder & Event Energy 🎉",
      desc:
        "You’re about people and momentum: events, welcoming vibes, inclusion, and community growth.",
      next:
        "Next step: draft a weekly event plan (tournaments, community nights, skill sessions).",
    },
    TECH: {
      subtitle: "Tech Support & Systems Wizard 🧠💻",
      desc:
        "You make the tech side feel effortless. You troubleshoot calmly, teach people, and keep stations ready.",
      next:
        "Next step: build a quick-fix guide for controllers, accounts, Wi-Fi, and updates.",
    },
    CASH: {
      subtitle: "Front Desk & Customer Care Leader 🤝",
      desc:
        "You’re calm, clear, and organized. You handle check-in/out, answer questions, and keep fairness consistent.",
      next:
        "Next step: build the check-in/out script + fairness rule card for common issues.",
    },
    MEMBER: {
      subtitle: "Culture Support & Feedback Power ✅",
      desc:
        "You support the vibe by following rules, giving feedback, and helping PTG stay safe and welcoming.",
      next:
        "Next step: join events, bring a friend, and submit feedback on what makes a 10/10 visit.",
    },
  };

  // ===== NEW SCORING MAP (Balanced + CEO reachable) =====
  // Each selected option adds points. Multi-select means you may get extra clarity.
  const SCORE_MAP = {
    q2: {
      a: { CEO: 5, GM: 2 },
      b: { GM: 5, OPS: 2 },
      c: { COMM: 5, GM: 1 },
      d: { TECH: 5, OPS: 1 },
      e: { CASH: 5, OPS: 1 },
      f: { MEMBER: 5, COMM: 1 },
    },
    q3: {
      a: { CEO: 2, GM: 4, CASH: 1 },
      b: { CASH: 4, GM: 1 },
      c: { OPS: 4, TECH: 2 },
      d: { COMM: 4, GM: 1 },
      e: { TECH: 4, OPS: 2 },
      f: { MEMBER: 3, COMM: 1 },
    },
    q4: {
      a: { OPS: 5, GM: 1 },
      b: { COMM: 5, MEMBER: 1 },
      c: { TECH: 5, OPS: 1 },
      d: { CASH: 5, GM: 1 },
      e: { CEO: 5, GM: 1 },
      f: { MEMBER: 5, OPS: 1 },
    },
    q5: {
      a: { CASH: 4, COMM: 1 },
      b: { OPS: 4, GM: 1 },
      c: { COMM: 4, MEMBER: 1 },
      d: { TECH: 4, OPS: 1 },
      e: { CEO: 3, GM: 2, CASH: 1 },
    },
    q6: {
      a: { COMM: 3, CASH: 1 },
      b: { COMM: 4, GM: 1 },
      c: { OPS: 3, TECH: 3 },
      d: { GM: 3, COMM: 1 },
      e: { CEO: 4, OPS: 2 },
    },
    q7: {
      a: { CEO: 4, OPS: 3 },
      b: { GM: 3, CEO: 2, CASH: 1 },
      c: { CASH: 3, GM: 1 },
      d: { MEMBER: 3, COMM: 2 },
      e: { GM: 3, CEO: 1, COMM: 1 },
    },
    q8: {
      a: { COMM: 5, GM: 1 },
      b: { CEO: 4, GM: 1, CASH: 1 },
      c: { TECH: 5, OPS: 1 },
      d: { CASH: 5, COMM: 1 },
      e: { OPS: 5, GM: 1 },
      f: { MEMBER: 5, COMM: 1 },
    },
    q9: {
      a: { CEO: 6, OPS: 1 },
      b: { GM: 6, CASH: 1 },
      c: { OPS: 6, TECH: 1 },
      d: { COMM: 6, MEMBER: 1 },
      e: { TECH: 6, OPS: 1 },
      f: { CASH: 6, GM: 1 },
      g: { MEMBER: 6, COMM: 1 },
    },
  };

  // ===== Multi-select enforcement (max 2 per question) =====
  // We support checkboxes by converting existing radios in-place.
  // If you switch HTML to checkboxes yourself, this still works.

  function upgradeInputsToMultiSelect() {
    const questions = ["q2","q3","q4","q5","q6","q7","q8","q9"];
    for (const q of questions) {
      const inputs = Array.from(form.querySelectorAll(`input[name="${q}"]`));
      for (const inp of inputs) {
        if (inp.type === "radio") {
          // Turn into checkbox to allow multi-select
          inp.type = "checkbox";
          inp.dataset.multi = "1";
        } else if (inp.type === "checkbox") {
          inp.dataset.multi = "1";
        }
      }

      // Enforce max 2 picks
      form.addEventListener("change", (e) => {
        const t = e.target;
        if (!t || t.name !== q || t.type !== "checkbox") return;

        const checked = Array.from(form.querySelectorAll(`input[name="${q}"][type="checkbox"]:checked`));
        if (checked.length > 2) {
          // Undo the most recent click
          t.checked = false;
          flashStatus(`Max 2 picks for ${q.toUpperCase()} ✅`, "warn");
        }
      });
    }
  }

  function flashStatus(msg, kind="info") {
    if (!elStatus) return;
    elStatus.textContent = msg;
    elStatus.dataset.kind = kind;
  }

  function freshScores() {
    const s = {};
    for (const r of ROLES) s[r] = 0;
    return s;
  }

  function addScores(scores, bump) {
    for (const [role, pts] of Object.entries(bump)) {
      scores[role] = (scores[role] || 0) + pts;
    }
  }

  function getAnswers() {
    const fd = new FormData(form);
    const out = {};
    // Q1 text
    out.q1 = String(fd.get("q1") || "").trim();

    // For multi-select questions, collect checked values
    const qs = ["q2","q3","q4","q5","q6","q7","q8","q9"];
    for (const q of qs) {
      const picks = Array.from(form.querySelectorAll(`input[name="${q}"]:checked`)).map(i => i.value);
      out[q] = picks; // array
    }
    return out;
  }

  function validateAnswers(ans) {
    if (!ans.q1) return "Please enter your name + age for Q1.";
    const qs = ["q2","q3","q4","q5","q6","q7","q8","q9"];
    for (const q of qs) {
      if (!Array.isArray(ans[q]) || ans[q].length < 1) return `Please pick at least 1 option for ${q.toUpperCase()}.`;
      if (ans[q].length > 2) return `Please pick no more than 2 options for ${q.toUpperCase()}.`;
    }
    return "";
  }

  function rankRoles(scores) {
    return ROLES
      .map(r => [r, scores[r]])
      .sort((a,b) => b[1] - a[1]);
  }

  // Deterministic tiny "randomizer" (same person gets same tie result)
  function seededPick(str, choices) {
    let h = 0;
    for (let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i)) >>> 0;
    const idx = h % choices.length;
    return choices[idx];
  }

  function chooseTopRole(rankings, seed) {
    // If tie at the top, choose deterministically using seed
    const topScore = rankings[0][1];
    const tied = rankings.filter(([_,pts]) => pts === topScore).map(([r]) => r);
    if (tied.length === 1) return tied[0];
    return seededPick(seed, tied.sort());
  }

  function buildResultPayload(ans, scores, rankings, topRole) {
    const secondary = rankings.find(([r]) => r !== topRole)?.[0] || topRole;
    const info = ROLE_INFO[topRole] || ROLE_INFO.MEMBER;

    return {
      app: "PTG Role Quiz",
      createdAt: new Date().toISOString(),
      nameAge: ans.q1,
      topRole,
      secondaryRole: secondary,
      subtitle: info.subtitle,
      desc: info.desc,
      next: info.next,
      scores,
      rankings,
      answers: ans
    };
  }

  function buildResultText(payload) {
    const lines = [];
    lines.push("PTG Role Quiz Submission");
    lines.push("------------------------");
    lines.push(`Name/Age: ${payload.nameAge}`);
    lines.push(`Top Role: ${payload.topRole}`);
    lines.push(`Secondary: ${payload.secondaryRole}`);
    lines.push("");
    lines.push(`Why: ${payload.subtitle}`);
    lines.push(payload.desc);
    lines.push("");
    lines.push(payload.next);
    lines.push("");
    lines.push("Score Breakdown:");
    for (const [r, pts] of payload.rankings) lines.push(`- ${r}: ${pts}`);
    lines.push("");
    lines.push("Answers:");
    for (const k of Object.keys(payload.answers)) {
      lines.push(`${k}: ${Array.isArray(payload.answers[k]) ? payload.answers[k].join(", ") : payload.answers[k]}`);
    }
    return lines.join("\n");
  }

  function renderResult(payload) {
    resultCard.classList.remove("hidden");

    elRole.textContent = payload.topRole;
    elSubtitle.textContent = payload.subtitle;
    elDesc.textContent = payload.desc;
    elNext.textContent = payload.next;
    elSecondary.textContent = `Secondary match: ${payload.secondaryRole}`;

    if (elScores) {
      elScores.innerHTML = "";
      for (const [r, pts] of payload.rankings) {
        const li = document.createElement("li");
        li.textContent = `${r}: ${pts}`;
        elScores.appendChild(li);
      }
    }

    flashStatus("Ready ✅ Copy, Email, Download, or Submit to Cloudflare.", "info");
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });

    btnCopy.onclick = async () => {
      const text = buildResultText(payload);
      try {
        await navigator.clipboard.writeText(text);
        flashStatus("Copied ✅ Paste it anywhere.", "info");
      } catch {
        flashStatus("Copy blocked. Use Download JSON ✅", "warn");
      }
    };

    btnDownload.onclick = () => {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ptg_role_quiz_${stamp()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      flashStatus("Downloaded ✅ Check your files/downloads.", "info");
    };

    btnEmail.onclick = () => {
      const subject = encodeURIComponent("PTG Role Quiz Submission");
      const body = encodeURIComponent(buildResultText(payload));
      window.location.href = `mailto:changethewrld@outlook.com?subject=${subject}&body=${body}`;
      flashStatus("Email draft opened ✅ Send it when ready.", "info");
    };

    btnSubmit.onclick = async () => {
      if (!SUBMIT_ENDPOINT) {
        flashStatus("No endpoint set. Add window.PTG_SUBMIT_ENDPOINT in HTML ✅", "warn");
        return;
      }

      flashStatus("Submitting to Cloudflare… ⏳", "info");

      try {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const t = await safeText(res);
          flashStatus(`Submit failed (${res.status}). Cloudflare said: ${t || "error"} ⚠️`, "warn");
          return;
        }

        const data = await safeJson(res);
        flashStatus(`Submitted ✅ Cloudflare received it. ${data && data.id ? "ID: " + data.id : ""}`, "info");
      } catch (e) {
        flashStatus("Submit blocked (CORS/network). Fix Cloudflare CORS headers ✅", "warn");
      }
    };
  }

  function stamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  async function safeText(res) {
    try { return (await res.text()).slice(0, 240); } catch { return ""; }
  }
  async function safeJson(res) {
    try { return await res.json(); } catch { return null; }
  }

  function computeScores(ans) {
    const scores = freshScores();

    for (const q of Object.keys(SCORE_MAP)) {
      const picks = ans[q] || [];
      for (const pick of picks) {
        const bump = SCORE_MAP[q][pick];
        if (bump) addScores(scores, bump);
      }
    }

    // Small CEO bonus if they choose “responsibility/mission/vision” style multiple times
    const missionSignals =
      (ans.q2.includes("a") ? 1 : 0) +
      (ans.q4.includes("e") ? 1 : 0) +
      (ans.q7.includes("a") ? 1 : 0) +
      (ans.q9.includes("a") ? 1 : 0);

    if (missionSignals >= 2) scores.CEO += 2;
    if (missionSignals >= 3) scores.CEO += 2;

    return scores;
  }

  // ===== Init =====
  upgradeInputsToMultiSelect();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    flashStatus("");

    const ans = getAnswers();
    const err = validateAnswers(ans);
    if (err) {
      alert(err);
      return;
    }

    const scores = computeScores(ans);
    const rankings = rankRoles(scores);

    const seed = `${ans.q1}|${JSON.stringify(ans)}`;
    const topRole = chooseTopRole(rankings, seed);

    const payload = buildResultPayload(ans, scores, rankings, topRole);
    renderResult(payload);
  });

})();
