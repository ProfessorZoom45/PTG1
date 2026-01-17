// PTG Role Quiz logic
(() => {
  const form = document.getElementById('quizForm');
  const resultCard = document.getElementById('resultCard');
  const resultRole = document.getElementById('resultRole');
  const resultSubtitle = document.getElementById('resultSubtitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultScores = document.getElementById('resultScores');
  const submitStatus = document.getElementById('submitStatus');
  // Buttons
  const btnRevealEmail = document.getElementById('btnRevealEmail');
  const btnCopy = document.getElementById('btnCopy');
  const btnEmail = document.getElementById('btnEmail');
  const btnDownload = document.getElementById('btnDownload');
  const btnCopyResult = document.getElementById('btnCopyResult');
  const TO_EMAIL = 'changethewrld@outlook.com';

  // Define roles with names and descriptions
  const ROLES = {
    CEO: { name: 'CEO', subtitle: 'Vision & Values', desc: 'You set the mission and protect the culture. People look to you for guidance.' },
    GM: { name: 'GM', subtitle: 'Floor Leader', desc: 'You thrive in real‑time, coordinating people and solving problems on the spot.' },
    COMM: { name: 'Community', subtitle: 'Vibe Creator', desc: 'You bring people together and make events memorable.' },
    TECH: { name: 'Tech', subtitle: 'Systems & Setup', desc: 'You love making things work and teaching others how to use them.' },
    CASH: { name: 'Cashier', subtitle: 'Front Desk', desc: 'Fairness and customer service are your jam. You keep the flow smooth.' },
    MEMBER: { name: 'Member', subtitle: 'Culture Keeper', desc: 'You show up consistently, follow the rules and support others.' },
    OPS: { name: 'Operations', subtitle: 'Checklist & Order', desc: 'You like cleaning, organizing and fixing what’s broken.' }
  };

  // Compute scores based on checkboxes
  function computeScores() {
    const scores = { CEO:0, GM:0, COMM:0, TECH:0, CASH:0, MEMBER:0, OPS:0 };
    // iterate over fieldsets with data-min attribute
    const picks = form.querySelectorAll('fieldset[data-min]');
    picks.forEach(fs => {
      const inputs = fs.querySelectorAll('input[type="checkbox"]:checked');
      inputs.forEach(input => {
        const val = input.value;
        if (scores.hasOwnProperty(val)) scores[val]++;
      });
    });
    return scores;
  }

  // Determine top role
  function determineRole(scores) {
    let topRole = null;
    let topScore = -1;
    for (const key in scores) {
      const val = scores[key];
      if (val > topScore) { topScore = val; topRole = key; }
    }
    return topRole || 'MEMBER';
  }

  // Build JSON result for download
  function buildResultJSON(scores, top) {
    return JSON.stringify({ scores, result: ROLES[top].name, timestamp: new Date().toISOString() }, null, 2);
  }

  // Build result text
  function buildResultText(scores, top) {
    const lines = [];
    lines.push(`RESULT`);
    lines.push(`======`);
    lines.push(`role: ${ROLES[top].name}`);
    lines.push(`subtitle: ${ROLES[top].subtitle}`);
    lines.push(`desc: ${ROLES[top].desc}`);
    lines.push('');
    lines.push('SCORES');
    lines.push('======');
    Object.keys(scores).forEach(key => {
      lines.push(`${key}: ${scores[key]}`);
    });
    return lines.join('\n');
  }

  // Copy to clipboard helper
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Compose and open email for result
  function sendEmail(summary, fullText) {
    // Copy full text to clipboard for fallback
    copyToClipboard(fullText);
    const mailto = `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent('PTG Role Quiz Result')}&body=${encodeURIComponent(summary)}`;
    window.location.href = mailto;
  }

  // Generate result and show card
  function showResult() {
    const scores = computeScores();
    const top = determineRole(scores);
    // Populate card
    resultRole.textContent = ROLES[top].name;
    resultSubtitle.textContent = ROLES[top].subtitle;
    resultDesc.textContent = ROLES[top].desc;
    // Scores list
    resultScores.innerHTML = '';
    Object.keys(scores).forEach(key => {
      const li = document.createElement('li');
      li.textContent = `${key}: ${scores[key]}`;
      resultScores.appendChild(li);
    });
    resultCard.classList.remove('hidden');
    return { scores, top };
  }

  // Reveal and email button
  btnRevealEmail.addEventListener('click', () => {
    const { scores, top } = showResult();
    const fullText = buildResultText(scores, top);
    const summary = `${ROLES[top].name} role selected.\n\n(Scores copied to clipboard. Paste them in the email if blank.)`;
    sendEmail(summary, fullText);
  });

  // Copy answers only (checkbox selections) – here we copy the entire score breakdown
  btnCopy.addEventListener('click', async () => {
    const { scores, top } = showResult();
    const fullText = buildResultText(scores, top);
    await copyToClipboard(fullText);
    btnCopy.textContent = '✅ Copied!';
    setTimeout(() => { btnCopy.textContent = '📋 Copy Answers'; }, 1500);
  });

  btnEmail.addEventListener('click', () => {
    // Already computed when revealing; if not computed show result
    if (resultRole.textContent === '—') showResult();
    const liItems = resultScores.querySelectorAll('li');
    const lines = Array.from(liItems).map(li => li.textContent).join('\n');
    const summary = `${resultRole.textContent} role.\n\n(Scores copied to clipboard. Paste them in the email if blank.)`;
    sendEmail(summary, lines);
  });

  btnDownload.addEventListener('click', () => {
    const { scores, top } = showResult();
    const json = buildResultJSON(scores, top);
    const blob = new Blob([json], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ptg-role-result.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  btnCopyResult.addEventListener('click', async () => {
    const { scores, top } = showResult();
    const text = buildResultText(scores, top);
    await copyToClipboard(text);
    btnCopyResult.textContent = '✅ Copied!';
    setTimeout(() => { btnCopyResult.textContent = '📋 Copy Result'; }, 1500);
  });
})();