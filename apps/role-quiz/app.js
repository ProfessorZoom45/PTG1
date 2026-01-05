// PTG Role Quiz — app.js
// Works on GitHub Pages (no backend). Generates role + explanation.
// Buttons supported: Copy, Email, Download JSON, Submit (endpoint optional).

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

  // ===== Roles =====
  // CEO = Vision + Mission Protection
  // GM  = Floor leadership + real-time coordination
  // OPS = Operations, checklists, consistency, cleanliness
  // COMM= Community, events, vibe, inclusion
  // TECH= Tech systems, troubleshooting, workshops
  // CASH= Front desk, customer service, check-in/out, fairness
  // MEMBER = Support culture, follow rules, feedback

  const ROLE_INFO = {
    CEO: {
      subtitle: "Vision & Mission Protector 🛡️",
      desc:
        "You’re built to set direction, protect the culture, and make the hard calls when it matters. PTG needs people who keep the mission clean and the standards real.",
      next:
        "Next step: help define the top rules, the vibe standards, and the 10/10 experience checklist (qx = 100%).",
    },
    GM: {
      subtitle: "Floor Leader & Problem Solver 🎮",
      desc:
        "You keep the whole space running smooth in real time. When things get busy, you don’t panic — you coordinate, communicate, and keep the day moving.",
      next:
        "Next step: build a simple shift flow: opening checklist, mid-day resets, and closing checklist.",
    },
    OPS: {
      subtitle: "Operations & Consistency Engine ⚙️",
      desc:
        "You’re the backbone: clean systems, clean space, clean processes. You spot problems early and fix them before they grow.",
      next:
        "Next step: create PTG’s daily ops checklist and weekly maintenance schedule.",
    },
    COMM: {
      subtitle: "Community Builder & Event Energy 🎉",
      desc:
        "You’re about the people: events, welcoming vibes, inclusion, and momentum. You turn a room into a community.",
      next:
        "Next step: draft a weekly event plan: tournaments, community nights, and skill-building sessions.",
    },
    TECH: {
      subtitle: "Tech Support & Systems Wizard 🧠💻",
      desc:
        "You make the tech side feel effortless. You troubleshoot calmly, teach people, and keep setups ready to go.",
      next:
        "Next step: create a ‘quick-fix’ guide for controllers, accounts, Wi-Fi, and updates.",
    },
    CASH: {
      subtitle: "Front Desk & Customer Care Leader 🤝",
      desc:
        "You’re calm, clear, and organized. You help people feel safe, handle check-in/check-out, and keep fairness consistent.",
      next:
        "Next step: build the check-in/check-out script + a fairness rule card for common issues.",
    },
    MEMBER: {
      subtitle: "Culture Support & Feedback Power ✅",
      desc:
        "You’re here to follow the rules, support the vibe, and help PTG grow with honest feedback. Members help set the tone.",
      next:
        "Next step: join events, bring a friend, and submit feedback on what makes a 10/10 experience.",
    },
  };

  // ===== Scoring Map =====
  // Each answer option boosts certain roles.
  // We purposely weight based on mission + operations + community + tech + front desk.
  const SCORE_MAP = {
    q2: {
      a: { CEO: 4, GM: 2 },
      b: { GM: 4, OPS: 2 },
      c: { COMM: 4, GM: 1 },
      d: { TECH: 4, OPS: 1 },
      e: { CASH: 4, OPS: 1 },
      f: { MEMBER: 4, COMM: 1 },
    },
    q3: {
      a: { GM: 3, CEO: 2, CASH: 1 },
      b: { CASH: 3, GM: 1 },
      c: { OPS: 3, TECH: 1 },
      d: { COMM: 3, GM: 1 },
      e: { TECH: 3, OPS: 1 },
      f: { MEMBER: 2, COMM: 1 },
    },
    q4: {
      a: { OPS: 4, GM: 1 },
      b: { COMM: 4, MEMBER: 1 },
      c: { TECH: 4, OPS: 1 },
      d: { CASH: 4, GM: 1 },
      e: { CEO: 4, GM: 1 },
      f: { MEMBER: 4, OPS: 1 },
    },
    q5: {
      a: { CASH: 3, COMM: 1 },
      b: { OPS: 3, GM: 1 },
      c: { COMM: 3, MEMBER: 1 },
      d: { TECH: 3, OPS: 1 },
      e: { CEO: 2, GM: 2, CASH: 1 },
    },
    q6: {
      a: { COMM: 2, CASH: 1 },
      b: { COMM: 3, GM: 1 },
      c: { OPS: 2, TECH: 2 },
      d: { GM: 2, COMM: 1 },
      e: { CEO: 3, OPS: 1 },
    },
    q7: {
      a: { CEO: 3, OPS: 2 },
      b: { GM: 2, CEO: 1, CASH: 1 },
      c: { CASH: 2, GM: 1 },
      d: { MEMBER: 2, COMM: 1 },
      e: { GM: 2, CEO: 1, COMM: 1 },
    },
    q8: {
      a: { COMM: 3, GM: 1 },
      b: { CEO: 2, GM: 1, CASH: 1 },
      c: { TECH: 3, OPS: 1 },
      d: { CASH: 3, COMM: 1 },
      e: { OPS: 3, GM: 1 },
      f: { MEMBER: 3, COMM: 1 },
    },
    q9: {
      a: { CEO: 4, OPS: 1 },
      b: { GM: 4, CASH: 1 },
      c: { OPS: 4, TECH: 1 },
      d: { COMM: 4, MEMBER: 1 },
      e: { TECH: 4, OPS: 1 },
      f: { CASH: 4, GM: 1 },
      g: { MEMBER: 4, COMM: 1 },
    },
  };

  const ROLES = ["CEO", "GM", "OPS", "COMM", "TECH", "CASH", "MEMBER"];

  function freshScores() {
    const s = {};
    for (const r of ROLES) s[r] = 0;
    return s;
  }

  function addScores(scores, bump) {
    for (const [role, points] of Object.entries(bump)) {
      scores[role] = (scores[role] || 0) + points;
    }
  }

  function getFormData(formEl) {
    const fd = new FormData(formEl);
    const out = {};
    for (const [k, v] of fd.entries()) out[k] = String(v).trim();
    return out;
  }

  function rankRoles(scores) {
    const pairs = ROLES.map((r) => [r, scores[r]]);
    pairs.sort((a, b) => b[1] - a[1]);
    return pairs;
  }

  function tieBreak(top2, answers) {
    // Tie-break uses Q9 first (lead/support preference),
    // then Q2 (identity preference).
    const [r1, s1] = top2[0];
    const [r2, s2] = top2[1];
    if (s1 !== s2) return r1;

    const q9 = answers.q9 || "";
    const q2 = answers.q2 || "";

    // If tied, see which tied role gets a boost from Q9 choice
    const q9Bump = (SCORE_MAP.q9 && SCORE_MAP.q9[q9]) ? SCORE_MAP.q9[q9] : {};
    const q2Bump = (SCORE_MAP.q2 && SCORE_MAP.q2[q2]) ? SCORE_MAP.q2[q2] : {};

    const q9r1 = q9Bump[r1] || 0;
    const q9r2 = q9Bump[r2] || 0;
    if (q9r1 !== q9r2) return q9r1 > q9r2 ? r1 : r2;

    const q2r1 = q2Bump[r1] || 0;
    const q2r2 = q2Bump[r2] || 0;
    if (q2r1 !== q2r2) return q2r1 > q2r2 ? r1 : r2;

    // Final deterministic fallback: alphabetical
    return [r1, r2].sort()[0];
  }

  function buildResultText(payload) {
    const lines = [];
    lines.push("PTG Role Quiz Result");
    lines.push("--------------------");
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
    for (const [r, pts] of payload.rankings) {
      lines.push(`- ${r}: ${pts}`);
    }
    lines.push("");
    lines.push("Answers:");
    for (const [k, v] of Object.entries(payload.answers)) {
      lines.push(`${k}: ${v}`);
    }
    return lines.join("\n");
  }

  function setStatus(msg) {
    if (!elStatus) return;
    elStatus.textContent = msg || "";
  }

  function showResult(payload) {
    resultCard.classList.remove("hidden");

    elRole.textContent = payload.topRole;
    elSubtitle.textContent = payload.subtitle;
    elDesc.textContent = payload.desc;
    elNext.textContent = payload.next;
    elSecondary.textContent = `Secondary match: ${payload.secondaryRole}`;

    // Score breakdown list
    if (elScores) {
      elScores.innerHTML = "";
      for (const [r, pts] of payload.rankings) {
        const li = document.createElement("li");
        li.textContent = `${r}: ${pts}`;
        elScores.appendChild(li);
      }
    }

    setStatus("Ready ✅ Copy, Email, or Download your result.");
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });

    // Buttons
    btnCopy.onclick = async () => {
      const text = buildResultText(payload);
      try {
        await navigator.clipboard.writeText(text);
        setStatus("Copied ✅ Paste it anywhere.");
      } catch {
        setStatus("Copy blocked by browser. Use Download JSON instead ✅");
      }
    };

    btnDownload.onclick = () => {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ptg_role_quiz_${safeFileStamp()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStatus("Downloaded ✅ Check your files/downloads.");
    };

    btnEmail.onclick = () => {
      const subject = encodeURIComponent("PTG Role Quiz Submission");
      const body = encodeURIComponent(buildResultText(payload));
      const mailto = `mailto:changethewrld@outlook.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      setStatus("Email draft opened ✅ Send it when ready.");
    };

    btnSubmit.onclick = () => {
      setStatus("Endpoint submit is not enabled on GitHub Pages. If you add a server later, we’ll wire it here ✅");
    };
  }

  function safeFileStamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  // ===== Form submit =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setStatus("");

    const answers = getFormData(form);

    // Base validation
    if (!answers.q1) {
      alert("Please enter your name + age for Q1.");
      return;
    }

    // Compute scores
    const scores = freshScores();

    for (const q of Object.keys(SCORE_MAP)) {
      const choice = answers[q];
      if (!choice) continue;
      const bump = SCORE_MAP[q][choice];
      if (bump) addScores(scores, bump);
    }

    const rankings = rankRoles(scores);

    const top2 = rankings.slice(0, 2);
    const topRole = tieBreak(top2, answers);
    const secondaryRole = topRole === top2[0][0] ? top2[1][0] : top2[0][0];

    const info = ROLE_INFO[topRole] || ROLE_INFO.MEMBER;

    const payload = {
      app: "PTG Role Quiz",
      createdAt: new Date().toISOString(),
      nameAge: answers.q1,
      topRole,
      secondaryRole,
      subtitle: info.subtitle,
      desc: info.desc,
      next: info.next,
      scores,
      rankings,
      answers,
    };

    showResult(payload);
  });

})();
