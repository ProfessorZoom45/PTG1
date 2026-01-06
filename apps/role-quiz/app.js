// PTG Role Quiz App (v1) - multi-pick 1–3 + scrambled options
const form = document.getElementById("quizForm");
const resultCard = document.getElementById("resultCard");
const resultRole = document.getElementById("resultRole");
const resultSubtitle = document.getElementById("resultSubtitle");
const resultDesc = document.getElementById("resultDesc");
const resultScores = document.getElementById("resultScores");
const btnEmail = document.getElementById("btnEmail");
const btnDownload = document.getElementById("btnDownload");
const btnSubmit = document.getElementById("btnSubmit");
const submitStatus = document.getElementById("submitStatus");

const ROLES = ["CEO","GM","OPS","COMM","TECH","CASH","MEMBER"];

function shuffleChildren(container){
  const kids = Array.from(container.querySelectorAll("label.opt"));
  for (let i = kids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kids[i], kids[j]] = [kids[j], kids[i]];
  }
  kids.forEach(k => container.appendChild(k));
}

function setupPickLimits(){
  document.querySelectorAll("fieldset[data-min][data-max]").forEach(fs => {
    const min = parseInt(fs.dataset.min, 10);
    const max = parseInt(fs.dataset.max, 10);
    const name = fs.querySelector("input")?.name;
    const hint = fs.querySelector("[data-live]");

    shuffleChildren(fs);

    const boxes = Array.from(fs.querySelectorAll(`input[type="checkbox"][name="${name}"]`));
    function update(){
      const checked = boxes.filter(b => b.checked).length;
      if (checked >= max){
        boxes.filter(b => !b.checked).forEach(b => b.disabled = true);
      } else {
        boxes.forEach(b => b.disabled = false);
      }
      if (hint){
        hint.textContent = `Pick ${min}–${max}. Selected: ${checked}.`;
      }
    }
    boxes.forEach(b => b.addEventListener("change", update));
    update();
  });
}
setupPickLimits();

function getBasics(){
  const name = (document.getElementById("name").value || "").trim();
  const ageRange = document.getElementById("ageRange").value;
  const gender = document.getElementById("gender").value;
  return { name, ageRange, gender };
}

function collectAnswers(){
  const basics = getBasics();
  const answers = { basics, responses: {} };

  if (!basics.name) throw new Error("Please enter your first name.");
  if (!basics.ageRange) throw new Error("Please pick an age range.");
  if (!basics.gender) throw new Error("Please pick a gender option.");

  document.querySelectorAll("fieldset[data-min][data-max]").forEach(fs => {
    const name = fs.querySelector("input")?.name;
    const checked = Array.from(fs.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
    const min = parseInt(fs.dataset.min, 10);
    const max = parseInt(fs.dataset.max, 10);

    if (checked.length < min) throw new Error(`Please answer ${name.toUpperCase()} (pick at least ${min}).`);
    if (checked.length > max) throw new Error(`Please answer ${name.toUpperCase()} (pick no more than ${max}).`);

    answers.responses[name] = checked;
  });

  return answers;
}

function score(answers){
  const scores = Object.fromEntries(ROLES.map(r => [r, 0]));
  Object.values(answers.responses).forEach(arr => {
    arr.forEach(role => { if (scores[role] !== undefined) scores[role] += 1; });
  });
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  return { scores, topRole: sorted[0][0], topScore: sorted[0][1], secondRole: sorted[1][0], secondScore: sorted[1][1] };
}

function roleCopy(topRole, secondRole){
  const copy = {
    CEO: ["CEO", "Vision + Mission Protector 🛡️", "You’re built to set direction, protect values, and make the big calls when it matters."],
    GM: ["GM", "Floor Commander ⏱️", "You keep sessions moving, handle real-time issues, and make the day feel smooth and organized."],
    OPS: ["OPS", "Standards + Systems 🧱", "You’re the structure: cleanliness, rules, checklists, and consistency. The vibe stays protected because of you."],
    COMM: ["COMM", "Community Builder 🤝", "You bring people together. Events, inclusion, and culture — without letting things get messy."],
    TECH: ["TECH", "Tech + Setup Wizard 🧠", "Accounts, updates, controllers, troubleshooting — you keep the experience feeling premium."],
    CASH: ["CASH", "Front Desk Anchor 💳", "Check-in/out, fairness, calm customer support. You keep the entrance clean and respectful."],
    MEMBER: ["MEMBER", "Culture Supporter 🌱", "You’re here for the experience. You support the vibe, give feedback, and keep things positive."]
  };
  const [role, subtitle, desc] = copy[topRole] || ["MEMBER", "Supporter", "Thanks for taking the quiz."];
  const sec = secondRole && secondRole !== topRole ? `Secondary lane: ${secondRole}` : "";
  return { role, subtitle, desc, sec };
}

function renderResult(answers, scored){
  const { role, subtitle, desc, sec } = roleCopy(scored.topRole, scored.secondRole);
  resultRole.textContent = role;
  resultSubtitle.textContent = subtitle + (sec ? ` • ${sec}` : "");
  resultDesc.textContent = desc;

  resultScores.innerHTML = "";
  Object.entries(scored.scores).sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => {
    const li = document.createElement("li");
    li.textContent = `${k}: ${v}`;
    resultScores.appendChild(li);
  });

  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildPayload(answers, scored){
  return {
    app: "ptg-role-quiz",
    version: "v1",
    submittedAt: new Date().toISOString(),
    role: scored.topRole,
    secondRole: scored.secondRole,
    scores: scored.scores,
    answers
  };
}

function makeMailto(payload){
  const subj = encodeURIComponent(`PTG Role Quiz Submission • ${payload.answers.basics.name}`);
  const body = encodeURIComponent(JSON.stringify(payload, null, 2));
  const to = "changethewrld@outlook.com";
  return `mailto:${to}?subject=${subj}&body=${body}`;
}

function downloadJSON(payload){
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type:"application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ptg_role_quiz_${payload.answers.basics.name || "submission"}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function submitToWorker(payload){
  const endpoint = window.PTG_SUBMIT_ENDPOINT || "";
  if (!endpoint){
    throw new Error("No endpoint set. Ask PTG admin to paste the Worker /submit URL into index.html.");
  }
  const headers = { "Content-Type":"application/json" };
  const secret = window.PTG_SUBMIT_SECRET || "";
  if (secret) headers["X-PTG-Secret"] = secret;

  const res = await fetch(endpoint, { method:"POST", headers, body: JSON.stringify(payload) });
  if (!res.ok){
    const text = await res.text().catch(()=> "");
    throw new Error(`${res.status} ${text}`.trim());
  }
  return res.json();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitStatus.textContent = "Scoring…";
  try{
    const answers = collectAnswers();
    const scored = score(answers);
    renderResult(answers, scored);
    submitStatus.textContent = "Ready.";
  }catch(err){
    submitStatus.textContent = `Fix: ${err.message}`;
  }
});

btnEmail.addEventListener("click", () => {
  try{
    const answers = collectAnswers();
    const scored = score(answers);
    const payload = buildPayload(answers, scored);
    window.location.href = makeMailto(payload);
  }catch(err){
    submitStatus.textContent = `Fix: ${err.message}`;
  }
});

btnDownload.addEventListener("click", () => {
  try{
    const answers = collectAnswers();
    const scored = score(answers);
    const payload = buildPayload(answers, scored);
    downloadJSON(payload);
    submitStatus.textContent = "Downloaded ✅";
  }catch(err){
    submitStatus.textContent = `Fix: ${err.message}`;
  }
});

btnSubmit.addEventListener("click", async () => {
  try{
    const answers = collectAnswers();
    const scored = score(answers);
    const payload = buildPayload(answers, scored);
    submitStatus.textContent = "Submitting…";
    const out = await submitToWorker(payload);
    submitStatus.textContent = `Submitted ✅ (${out.key || "ok"})`;
  }catch(err){
    submitStatus.textContent = `Submit failed: ${err.message}. Use Email or Download.`;
  }
});
