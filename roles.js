// PTG Role Quiz Scoring (client-side, deterministic)
// Roles: CEO, GM, OPS, COMM, TECH, CASH, MEMBER
// Works on GitHub Pages.

export const ROLE_KEYS = ["CEO", "GM", "OPS", "COMM", "TECH", "CASH", "MEMBER"];

export const ROLES = {
  CEO: {
    title: "CEO",
    emoji: "👑",
    oneLine: "Sets direction, protects the mission, owns the big calls.",
    description: "You think big-picture, keep standards tight, and make the hard calls to protect the mission. You care about fairness, long-term stability, and how PTG feels for the community.",
    nextStep: "Own the mission statement, define non-negotiables, and approve what gets built next."
  },
  GM: {
    title: "General Manager",
    emoji: "🧭",
    oneLine: "Runs the whole floor and keeps the day smooth.",
    description: "You can lead people, solve problems on the fly, and keep the place running without drama. You notice issues before they turn into chaos.",
    nextStep: "Set schedules, handle escalations, and keep staff aligned with the rules and vibe."
  },
  OPS: {
    title: "Operations Lead",
    emoji: "🛠️",
    oneLine: "Protects systems, inventory,流程, and quality.",
    description: "You care about clean process: checklists, setup, breakdown, tools, repair workflow, and repeatable execution. You want consistency.",
    nextStep: "Write the SOPs: intake, repair tracking, resale steps, cleaning, and daily close."
  },
  COMM: {
    title: "Community & Events Lead",
    emoji: "🎉",
    oneLine: "Builds the vibe, events, and community loyalty.",
    description: "You want PTG to feel welcoming and alive. You love tournaments, themed nights, partnerships, and making people feel seen.",
    nextStep: "Design weekly events, member nights, and feedback loops that keep the community active."
  },
  TECH: {
    title: "Tech & Media Lead",
    emoji: "🎥",
    oneLine: "Handles games, systems, streaming, and tech education.",
    description: "You care about the tech being smooth: consoles, accounts, updates, controllers, Wi‑Fi, displays, and content capture. You also like teaching.",
    nextStep: "Build the game library plan, EA Play options, setup checklists, and content workflow."
  },
  CASH: {
    title: "Cashier / Front Desk",
    emoji: "🧾",
    oneLine: "Runs check-in, check-out, and customer care.",
    description: "You keep things friendly, organized, and fair at the front. You can explain rules without being rude and keep lines moving.",
    nextStep: "Own the intake scripts, membership signups, and quick issue resolution at the counter."
  },
  MEMBER: {
    title: "Member",
    emoji: "🕹️",
    oneLine: "Shows up, supports the vibe, and makes PTG better.",
    description: "You may not want to run the building, but you want a clean, safe, fun place. Your feedback and participation help PTG grow the right way.",
    nextStep: "Join events, follow house rules, and help shape the game list and membership perks."
  }
};

// Answer keys map
export const ANSWER_ROLE_WEIGHTS = {
  // Q2: What sounds most like you?
  q2_a: { CEO: 4, GM: 3 },
  q2_b: { GM: 4, OPS: 2 },
  q2_c: { COMM: 4, MEMBER: 1 },
  q2_d: { TECH: 4, OPS: 1 },
  q2_e: { CASH: 4, GM: 1 },
  q2_f: { MEMBER: 4 },

  // Q3: When conflict happens...
  q3_a: { GM: 4, CEO: 2 },
  q3_b: { CASH: 4, GM: 1 },
  q3_c: { OPS: 4, GM: 1 },
  q3_d: { COMM: 4, GM: 1 },
  q3_e: { TECH: 4, OPS: 1 },
  q3_f: { MEMBER: 3, COMM: 1 },

  // Q4: Extra effort (xx)
  q4_a: { OPS: 4 },
  q4_b: { COMM: 4 },
  q4_c: { TECH: 4 },
  q4_d: { CASH: 4 },
  q4_e: { GM: 3, CEO: 2 },
  q4_f: { MEMBER: 3 },

  // Q5: Pick the most important “qx” (quality experience)
  q5_a: { GM: 2, CASH: 2, MEMBER: 2 },
  q5_b: { OPS: 3, GM: 1 },
  q5_c: { COMM: 3, MEMBER: 1 },
  q5_d: { TECH: 3 },
  q5_e: { CEO: 3, GM: 1 },

  // Q6: Games focus
  q6_a: { TECH: 3, COMM: 1 },
  q6_b: { COMM: 3, MEMBER: 1 },
  q6_c: { TECH: 2, OPS: 1 },
  q6_d: { MEMBER: 2, CASH: 1 },
  q6_e: { GM: 2, CEO: 1 },

  // Q7: Discipline (d)
  q7_a: { CEO: 3, GM: 2 },
  q7_b: { GM: 3, CASH: 1 },
  q7_c: { CASH: 3, GM: 1 },
  q7_d: { COMM: 2, MEMBER: 1 },
  q7_e: { OPS: 2, TECH: 1 },

  // Q8: Community (c)
  q8_a: { COMM: 4 },
  q8_b: { GM: 3, CEO: 1 },
  q8_c: { TECH: 3 },
  q8_d: { CASH: 3 },
  q8_e: { OPS: 3 },
  q8_f: { MEMBER: 3 },

  // Q9: How do you like to lead?
  q9_a: { CEO: 4, GM: 1 },
  q9_b: { GM: 4 },
  q9_c: { OPS: 4 },
  q9_d: { COMM: 4 },
  q9_e: { TECH: 4 },
  q9_f: { CASH: 4 },
  q9_g: { MEMBER: 4 }
};

export function computeRoleScore(answers) {
  const scores = Object.fromEntries(ROLE_KEYS.map(k => [k, 0]));
  for (const [key, val] of Object.entries(answers)) {
    if (!val) continue;
    const weightKey = `${key}_${val}`;
    const weights = ANSWER_ROLE_WEIGHTS[weightKey];
    if (!weights) continue;
    for (const [role, pts] of Object.entries(weights)) {
      scores[role] = (scores[role] || 0) + pts;
    }
  }
  return scores;
}

export function pickPrimaryRole(scores) {
  // Prefer higher score; tie-breakers use role order (more responsibility first)
  const order = ["CEO","GM","OPS","COMM","TECH","CASH","MEMBER"];
  let best = order[0];
  for (const r of order) {
    if ((scores[r] ?? 0) > (scores[best] ?? 0)) best = r;
  }
  return best;
}

export function pickSecondaryRole(scores, primary) {
  const order = ["CEO","GM","OPS","COMM","TECH","CASH","MEMBER"].filter(r => r !== primary);
  let best = order[0];
  for (const r of order) {
    if ((scores[r] ?? 0) > (scores[best] ?? 0)) best = r;
  }
  return best;
}
