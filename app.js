import { ROLES, computeRoleScore, pickPrimaryRole, pickSecondaryRole } from './roles.js';

const CONFIG = {
  recipientEmail: 'changethewrld@outlook.com',
  // Optional: set this to a real endpoint (Google Apps Script / Cloudflare Worker / Netlify Function).
  submitEndpoint: '',
  projectTag: 'PTG-ROLE-QUIZ-v1'
};

const $ = (sel) => document.querySelector(sel);

const form = $('#quizForm');
const resultCard = $('#resultCard');
const resultRole = $('#resultRole');
const resultSubtitle = $('#resultSubtitle');
const resultDesc = $('#resultDesc');
const resultNext = $('#resultNext');
const resultSecondary = $('#resultSecondary');
const resultScores = $('#resultScores');

const btnCopy = $('#btnCopy');
const btnEmail = $('#btnEmail');
const btnDownload = $('#btnDownload');
const btnSubmit = $('#btnSubmit');
const submitStatus = $('#submitStatus');
const ps5Toggle = $('#ps5Toggle');

function getFormData() {
  const fd = new FormData(form);
  const nameAge = (fd.get('q1') || '').toString().trim();
  const answers = {
    q1: nameAge,
    q2: fd.get('q2') || '',
    q3: fd.get('q3') || '',
    q4: fd.get('q4') || '',
    q5: fd.get('q5') || '',
    q6: fd.get('q6') || '',
    q7: fd.get('q7') || '',
    q8: fd.get('q8') || '',
    q9: fd.get('q9') || ''
  };
  return answers;
}

function validate(answers) {
  const missing = [];
  if (!answers.q1) missing.push('Q1 (name + age)');
  for (let i = 2; i <= 9; i++) {
    const key = `q${i}`;
    if (!answers[key]) missing.push(`Q${i}`);
  }
  return missing;
}

function buildPayload(answers, primary, secondary, scores) {
  return {
    tag: CONFIG.projectTag,
    submittedAtISO: new Date().toISOString(),
    nameAndAge: answers.q1,
    answers: {
      q2: answers.q2,
      q3: answers.q3,
      q4: answers.q4,
      q5: answers.q5,
      q6: answers.q6,
      q7: answers.q7,
      q8: answers.q8,
      q9: answers.q9
    },
    results: {
      primaryRole: primary,
      secondaryRole: secondary,
      scoreTable: scores
    }
  };
}

function prettyText(payload) {
  const lines = [];
  lines.push('PTG ROLE QUIZ SUBMISSION');
  lines.push(`Tag: ${payload.tag}`);
  lines.push(`Submitted: ${payload.submittedAtISO}`);
  lines.push('');
  lines.push(`Name + Age: ${payload.nameAndAge}`);
  lines.push('');
  lines.push('Answers:');
  for (const [k, v] of Object.entries(payload.answers)) {
    lines.push(`- ${k.toUpperCase()}: ${v}`);
  }
  lines.push('');
  lines.push('Results:');
  lines.push(`Primary Role: ${payload.results.primaryRole}`);
  lines.push(`Secondary Role: ${payload.results.secondaryRole}`);
  lines.push('');
  lines.push('Scores:');
  Object.entries(payload.results.scoreTable)
    .sort((a,b) => b[1] - a[1])
    .forEach(([role, score]) => lines.push(`- ${role}: ${score}`));
  lines.push('');
  lines.push('Raw JSON:');
  lines.push(JSON.stringify(payload));
  return lines.join('\n');
}

function renderResult(primary, secondary, scores) {
  const role = ROLES[primary];
  const role2 = ROLES[secondary];
  resultRole.textContent = `${role.emoji} ${role.title}`;
  resultSubtitle.textContent = role.oneLine;
  resultDesc.textContent = role.description;
  resultNext.textContent = `Next step: ${role.nextStep}`;
  resultSecondary.textContent = `Backup fit: ${role2.emoji} ${role2.title} — ${role2.oneLine}`;

  const scoreRows = Object.entries(scores)
    .sort((a,b) => b[1]-a[1])
    .map(([k,v]) => `<li><strong>${k}</strong>: ${v}</li>`)
    .join('');
  resultScores.innerHTML = scoreRows;

  resultCard.classList.remove('hidden');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setStatus(msg, kind = 'info') {
  submitStatus.textContent = msg;
  submitStatus.dataset.kind = kind;
}

let lastPayload = null;

// PS5 / TV mode (extra-large UI)
const PS5_KEY = 'ptg_ps5_mode';
function applyPs5Mode(on) {
  document.documentElement.classList.toggle('ps5', on);
  if (ps5Toggle) ps5Toggle.setAttribute('aria-pressed', String(!!on));
  try { localStorage.setItem(PS5_KEY, on ? '1' : '0'); } catch {}
}

try {
  const saved = localStorage.getItem(PS5_KEY);
  applyPs5Mode(saved === '1');
} catch {}

if (ps5Toggle) {
  ps5Toggle.addEventListener('click', () => {
    const on = !document.documentElement.classList.contains('ps5');
    applyPs5Mode(on);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  setStatus('', 'info');

  const answers = getFormData();
  const missing = validate(answers);
  if (missing.length) {
    alert(`Please answer: ${missing.join(', ')}`);
    return;
  }

  const scores = computeRoleScore(answers);
  const primary = pickPrimaryRole(scores);
  const secondary = pickSecondaryRole(scores, primary);
  lastPayload = buildPayload(answers, primary, secondary, scores);

  renderResult(primary, secondary, scores);
  setStatus('Result ready. You can copy, email, download, or submit (if an endpoint is set).', 'ok');
});

btnCopy.addEventListener('click', async () => {
  if (!lastPayload) return;
  const text = prettyText(lastPayload);
  try {
    await navigator.clipboard.writeText(text);
    setStatus('Copied to clipboard ✅', 'ok');
  } catch {
    setStatus('Copy failed. Your browser may block clipboard. Use Download instead.', 'warn');
  }
});

btnEmail.addEventListener('click', () => {
  if (!lastPayload) return;
  const body = encodeURIComponent(prettyText(lastPayload));
  const subject = encodeURIComponent('PTG Role Quiz Submission');
  const mailto = `mailto:${CONFIG.recipientEmail}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
});

btnDownload.addEventListener('click', () => {
  if (!lastPayload) return;
  const blob = new Blob([JSON.stringify(lastPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ptg_role_quiz_submission.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  setStatus('Downloaded JSON ✅', 'ok');
});

btnSubmit.addEventListener('click', async () => {
  if (!lastPayload) return;
  if (!CONFIG.submitEndpoint) {
    setStatus('No submit endpoint is configured. Email or Download works on GitHub Pages.', 'warn');
    return;
  }
  setStatus('Submitting…', 'info');
  try {
    const res = await fetch(CONFIG.submitEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lastPayload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setStatus('Submitted successfully ✅', 'ok');
  } catch (err) {
    setStatus(`Submit failed: ${err.message}. Use Email or Download.`, 'warn');
  }
});
