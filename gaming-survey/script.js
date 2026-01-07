// Gaming Survey -> mailto builder (GitHub Pages friendly)
(() => {
  const form = document.getElementById('survey');
  const status = document.getElementById('status');

  // Limit checkbox selections by groups (data-max + data-group)
  function wireLimits() {
    const groups = document.querySelectorAll('[data-group][data-max]');
    groups.forEach(groupEl => {
      const max = Number(groupEl.getAttribute('data-max')) || 999;
      const groupName = groupEl.getAttribute('data-group');

      groupEl.addEventListener('change', () => {
        const checks = [...groupEl.querySelectorAll('input[type="checkbox"]')];
        const picked = checks.filter(c => c.checked);

        if (picked.length > max) {
          // Undo the most recent selection (last checked)
          const last = picked[picked.length - 1];
          last.checked = false;
          status.textContent = `Heads up: "${groupName}" is limited to ${max} picks.`;
          status.style.color = 'var(--danger)';
          setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 1800);
        }
      });
    });
  }

  function getCheckedValues(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
  }

  function safeText(value) {
    return (value || '').toString().trim();
  }

  function buildEmailBody() {
    const platforms = getCheckedValues('platforms');
    const platformsOther = safeText(form.elements['platforms_other']?.value);
    if (platforms.includes('Other') && platformsOther) {
      // replace "Other" with the typed value
      const idx = platforms.indexOf('Other');
      if (idx > -1) platforms[idx] = `Other: ${platformsOther}`;
    } else if (platforms.includes('Other') && !platformsOther) {
      // keep "Other" if they didn't type
      // no-op
    }

    const genres = getCheckedValues('genres');
    const genresOther = safeText(form.elements['genres_other']?.value);
    if (genres.includes('Other') && genresOther) {
      const idx = genres.indexOf('Other');
      if (idx > -1) genres[idx] = `Other: ${genresOther}`;
    }

    const games = [
      safeText(form.elements['game_1']?.value),
      safeText(form.elements['game_2']?.value),
      safeText(form.elements['game_3']?.value),
      safeText(form.elements['game_4']?.value),
      safeText(form.elements['game_5']?.value),
    ].filter(Boolean);

    const playFor = getCheckedValues('play_for');
    const playForOther = safeText(form.elements['play_for_other']?.value);
    if (playFor.includes('Other') && playForOther) {
      const idx = playFor.indexOf('Other');
      if (idx > -1) playFor[idx] = `Other: ${playForOther}`;
    }

    const matters = getCheckedValues('matters');

    const playStyle = safeText(form.elements['play_style']?.value);

    const turnoffs = getCheckedValues('turnoffs');

    const oneChange = safeText(form.elements['one_change']?.value);

    const lines = [];
    lines.push('Gaming Survey Results');
    lines.push('---------------------');
    lines.push('');
    lines.push(`1) Platforms: ${platforms.length ? platforms.join(', ') : '—'}`);
    lines.push(`2) Favorite genres (up to 3): ${genres.length ? genres.join(', ') : '—'}`);
    lines.push(`3) Top games (last year): ${games.length ? games.join(' | ') : '—'}`);
    lines.push(`4) I play for (up to 2): ${playFor.length ? playFor.join(', ') : '—'}`);
    lines.push(`5) What matters most (up to 3): ${matters.length ? matters.join(', ') : '—'}`);
    lines.push(`6) Preferred play style: ${playStyle || '—'}`);
    lines.push(`7) Biggest turn-offs (up to 2): ${turnoffs.length ? turnoffs.join(', ') : '—'}`);
    lines.push('8) One change I want:');
    lines.push(oneChange ? oneChange : '—');
    lines.push('');
    lines.push('Sent from the GitHub Pages survey form ✨');

    return lines.join('\n');
  }

  function openMailto(subject, body) {
    const to = 'changethewrld@outlook.com';
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Use location change (works in most browsers)
    window.location.href = mailto;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const subject = 'Gaming Survey';
    const body = buildEmailBody();

    status.textContent = 'Opening your email app… ✉️';
    status.style.color = 'var(--muted)';

    try {
      openMailto(subject, body);
      setTimeout(() => {
        status.textContent = 'If nothing opened, your browser blocked mailto. Copy answers manually and email them. ✅';
        status.style.color = '';
      }, 1200);
    } catch (err) {
      status.textContent = 'Could not open email app. Please copy answers and email them manually. ❗';
      status.style.color = 'var(--danger)';
    }
  });

  wireLimits();
})();
