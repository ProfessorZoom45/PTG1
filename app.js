/* PTG Survey Web App (Static) */
const EMAIL_TO = "changethewrld@outlook.com";

const INTERNAL_QUESTIONS = [{"num": 1, "section": "Brand & Voice", "q": "What is the single, primary mission of Perfect Timing Gaming (PTG) expressed in one sentence that governs all decisions?", "ceo": "PTG exists to help people level up through gaming, technology, music, and media—using fair competition, calm structure, and transparent business practices that protect the community while remaining sustainably profitable.", "type": "freetext"}, {"num": 2, "section": "Brand & Voice", "q": "What concrete outcomes must the PTG system produce daily, weekly, and monthly to be considered functional?", "ceo": "Daily: safe, calm sessions + clean logs; Weekly: scheduled events run on time + tracked attendance + cashflow recorded; Monthly: repeat-visitor growth, positive community health, and a clear profit/loss snapshot that supports next decisions.", "type": "freetext"}, {"num": 3, "section": "Brand & Voice", "q": "What deliverables related to PTG have already been fully completed and approved (documents, sheets, rules)?", "ceo": "Approved rule sets, discipline structure, and PTG language principles; any further deliverables must be explicitly marked 'Approved' with a version/date before treated as official.", "type": "status"}, {"num": 4, "section": "Brand & Voice", "q": "What PTG-related items were implied in prior discussions but never formally defined or completed?", "ceo": "Several build items remain implied until written and approved: pricing sheet, investor one‑pager, event SOPs, safety/legal terms draft, and the unified master knowledge file.", "type": "status"}, {"num": 5, "section": "Brand & Voice", "q": "What responsibilities, brands, or activities are explicitly OUTSIDE the scope of PTG?", "ceo": "Anything not directly supporting PTG’s real-world lounge/services (e.g., unrelated personal projects, experimental AI-only brands, or content that dilutes PTG’s community-first purpose).", "type": "freetext"}, {"num": 6, "section": "Brand & Voice", "q": "Which PTG content is business-critical for launch versus exploratory or optional?", "ceo": "Critical: rules, pricing, safety/legal baseline, staffing plan, event calendar, and basic bookkeeping. Optional: advanced automation, streaming, large-scale partnerships, and complex gamification.", "type": "status"}, {"num": 7, "section": "Brand & Voice", "q": "What hard boundaries must be enforced to prevent scope creep or AI drift within PTG?", "ceo": "Execution stays locked until definitions are complete; changes require versioning; PTG decisions must be human-approved; no mixing identities; and no expanding services without capacity, safety, and profit proof.", "type": "status"}, {"num": 8, "section": "Brand & Voice", "q": "What is the official PTG brand voice for investors and institutional audiences?", "ceo": "Professional, calm, data-forward, community impact + unit economics—no slang, no hype-only claims, and no unverifiable promises.", "type": "status"}, {"num": 9, "section": "Brand & Voice", "q": "What is the official PTG brand voice for operations, compliance, and internal planning?", "ceo": "Clear, direct, checklist-driven, and risk-aware with simple language that staff can execute consistently.", "type": "status"}, {"num": 10, "section": "Brand & Voice", "q": "What is the official PTG brand voice for community, youth, and creative engagement?", "ceo": "Friendly, uplifting, youth-safe, and respectful—fun energy without toxicity, bullying, or exploitative messaging.", "type": "status"}, {"num": 11, "section": "Brand & Voice", "q": "What tone rules must always be followed regardless of PTG audience?", "ceo": "Respectful, non-shaming, factual, calm under pressure, and transparent about what is known vs unknown.", "type": "status"}, {"num": 12, "section": "Brand & Voice", "q": "What words, phrases, or themes are forbidden in PTG communications?", "ceo": "Anything promoting gambling, harassment, hate, scams, manipulation, humiliation, or exploitative ‘get rich quick’ framing.", "type": "status"}, {"num": 13, "section": "Brand & Voice", "q": "Under what conditions does PTG switch between formal and casual communication styles?", "ceo": "Formal for investors/legal/partners and public policies; casual for youth/community posts—while keeping the same core meaning.", "type": "yesno"}, {"num": 14, "section": "Brand & Voice", "q": "What safeguards prevent PTG’s identity from becoming diluted or misrepresented?", "ceo": "Single master brand guide, versioned documents, required approvals for public posts, and a hard separation from non‑PTG projects.", "type": "yesno"}, {"num": 15, "section": "Brand & Voice", "q": "What role does PTG require AI to play when simplifying complex ideas for non-technical or youth audiences?", "ceo": "AI may translate and format; it may not silently change intent, decide strategy, or invent facts—humans remain the authority.", "type": "yesno"}, {"num": 16, "section": "Brand & Voice", "q": "What rules ensure simplification never removes factual accuracy or intent?", "ceo": "Keep definitions intact, preserve constraints, label assumptions, and require an approval pass before publishing.", "type": "status"}, {"num": 17, "section": "Brand & Voice", "q": "What metaphors, symbols, or analogies are allowed to explain PTG concepts?", "ceo": "Gaming, sports training, school systems, and “leveling up” analogies that stay respectful and accurate.", "type": "status"}, {"num": 18, "section": "Brand & Voice", "q": "How does PTG define one idea being expressed in two different levels of language?", "ceo": "Same meaning, different reading level: a ‘simple’ explanation and a ‘formal’ explanation that map 1:1.", "type": "status"}, {"num": 19, "section": "Brand & Voice", "q": "What explicit triggers control switching between advanced and simplified explanations?", "ceo": "Audience type, setting (public vs internal), and the risk of misunderstanding; default to simple unless precision requires formal.", "type": "status"}, {"num": 20, "section": "Brand & Voice", "q": "How does PTG verify that simplified explanations remain aligned with original intent?", "ceo": "Cross-check key terms, constraints, and non-negotiables; if anything changes meaning, rewrite.", "type": "status"}, {"num": 21, "section": "Brand & Voice", "q": "What standards define clean, professional PTG business language?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 22, "section": "Brand & Voice", "q": "What standards define acceptable child-friendly or beginner-friendly PTG language?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "status"}, {"num": 23, "section": "Brand & Voice", "q": "What validation rules ensure both translations remain factually identical?", "ceo": "AI can assist with formatting, summarizing, and translating; it cannot make binding decisions, fabricate data, or override human authority.", "type": "status"}, {"num": 24, "section": "Brand & Voice", "q": "What terminology must be normalized across all PTG documents?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 25, "section": "Brand & Voice", "q": "What rules govern breaking long PTG concepts into smaller units?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 26, "section": "Brand & Voice", "q": "What criteria determine when emotional language must be reduced or removed?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 27, "section": "Competitors & Market", "q": "What insights from competitors are relevant specifically to PTG’s business model?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 28, "section": "Competitors & Market", "q": "What competitor insights are irrelevant or misleading for PTG?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 29, "section": "Competitors & Market", "q": "What similarities between competitors directly inform PTG decisions?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 30, "section": "Competitors & Market", "q": "What differences between competitors reveal opportunities for PTG?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 31, "section": "Competitors & Market", "q": "What competitor practices are worth adapting—not copying—into PTG?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 32, "section": "Competitors & Market", "q": "What duplication must be removed to keep PTG analysis lean?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 33, "section": "Competitors & Market", "q": "How should overlapping market insights be merged into single PTG principles?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 34, "section": "Competitors & Market", "q": "What categories must all market insights be tagged with for PTG use?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 35, "section": "Competitors & Market", "q": "What is the minimum viable structure of a PTG competitive comparison table?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "status"}, {"num": 36, "section": "Competitors & Market", "q": "What columns are mandatory for PTG comparisons to be useful?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "status"}, {"num": 37, "section": "Competitors & Market", "q": "What comparison logic is allowed before scoring is introduced?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 38, "section": "Competitors & Market", "q": "What filtering and sorting capabilities must PTG comparison tables support?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "status"}, {"num": 39, "section": "Competitors & Market", "q": "What constraints ensure PTG tables remain web-app and Sheets compatible?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "status"}, {"num": 40, "section": "Pricing & Finance", "q": "What pricing references are relevant to PTG’s services and offerings?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 41, "section": "Pricing & Finance", "q": "How does PTG distinguish pay-as-you-go pricing from membership pricing?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 42, "section": "Pricing & Finance", "q": "How does PTG distinguish individual pricing from group pricing?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 43, "section": "Pricing & Finance", "q": "What price anchors establish perceived value for PTG?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 44, "section": "Pricing & Finance", "q": "What premium hooks justify higher PTG pricing ethically?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 45, "section": "Pricing & Finance", "q": "What pricing gaps represent opportunities rather than risks for PTG?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 46, "section": "Pricing & Finance", "q": "What financial metrics are essential for PTG decision-making?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 47, "section": "Pricing & Finance", "q": "Which financial data points are verified versus estimated?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 48, "section": "Pricing & Finance", "q": "How must PTG group financial metrics for clarity and analysis?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 49, "section": "Pricing & Finance", "q": "What external benchmarks are actually relevant to PTG’s scale and market?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 50, "section": "Pricing & Finance", "q": "What assumptions must be flagged before PTG acts on financial data?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 51, "section": "Legal & Risk", "q": "What legal terms are non-negotiable for PTG operations?", "ceo": "PTG uses a legally sane baseline: clear conduct rules, consent for media, safety policies, and service terms; anything high-risk is paused until reviewed.", "type": "status"}, {"num": 52, "section": "Legal & Risk", "q": "How should PTG group terms related to entry, payment, liability, conduct, and media?", "ceo": "PTG uses a legally sane baseline: clear conduct rules, consent for media, safety policies, and service terms; anything high-risk is paused until reviewed.", "type": "status"}, {"num": 53, "section": "Legal & Risk", "q": "What protections are mandatory to reduce PTG legal risk?", "ceo": "PTG uses a legally sane baseline: clear conduct rules, consent for media, safety policies, and service terms; anything high-risk is paused until reviewed.", "type": "status"}, {"num": 54, "section": "Legal & Risk", "q": "What protections are optional or situational for PTG?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 55, "section": "Legal & Risk", "q": "What constitutes a legally sane baseline framework for PTG?", "ceo": "PTG uses a legally sane baseline: clear conduct rules, consent for media, safety policies, and service terms; anything high-risk is paused until reviewed.", "type": "status"}, {"num": 56, "section": "Legal & Risk", "q": "What external best practices align with PTG’s ethics and goals?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 57, "section": "Legal & Risk", "q": "What industry practices conflict with PTG’s values and must be avoided?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 58, "section": "Legal & Risk", "q": "How can competitor strengths be converted into PTG leverage without imitation?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "status"}, {"num": 59, "section": "Legal & Risk", "q": "What makes PTG fundamentally different from competitors?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "freetext"}, {"num": 60, "section": "Legal & Risk", "q": "What rules prevent PTG from blindly copying competitors?", "ceo": "Competitor insights are used for learning and differentiation—PTG adapts what aligns with ethics and avoids copying models that create chaos or exploit customers.", "type": "yesno"}, {"num": 61, "section": "Operations, Systems, QX, Execution", "q": "What future assets are required to support PTG growth?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 62, "section": "Operations, Systems, QX, Execution", "q": "What information must an investor one-pager for PTG include?", "ceo": "Investor-facing assets must show mission, market, model, margins, risks, and milestones—backed by trackable data and realistic assumptions.", "type": "status"}, {"num": 63, "section": "Operations, Systems, QX, Execution", "q": "What data must exist before creating a PTG pricing sheet?", "ceo": "PTG pricing must be transparent, youth-safe, and value-based—anchored to local market reality, with clear tiers and no hidden fees.", "type": "status"}, {"num": 64, "section": "Operations, Systems, QX, Execution", "q": "What components are required for a PTG legal terms draft?", "ceo": "PTG uses a legally sane baseline: clear conduct rules, consent for media, safety policies, and service terms; anything high-risk is paused until reviewed.", "type": "status"}, {"num": 65, "section": "Operations, Systems, QX, Execution", "q": "Which assets are internal-only versus public-facing for PTG?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 66, "section": "Operations, Systems, QX, Execution", "q": "In what order must PTG assets be created to avoid waste?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 67, "section": "Operations, Systems, QX, Execution", "q": "What decision framework governs PTG’s next possible moves?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "freetext"}, {"num": 68, "section": "Operations, Systems, QX, Execution", "q": "What explicit triggers allow PTG to move from planning to execution?", "ceo": "Execution stays locked until definitions, safety, pricing, and capacity are verified; triggers to execute must be explicit and documented.", "type": "freetext"}, {"num": 69, "section": "Operations, Systems, QX, Execution", "q": "What conditions force PTG to pause or stop execution?", "ceo": "Execution stays locked until definitions, safety, pricing, and capacity are verified; triggers to execute must be explicit and documented.", "type": "freetext"}, {"num": 70, "section": "Operations, Systems, QX, Execution", "q": "What safeguards prevent PTG from acting prematurely?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "freetext"}, {"num": 71, "section": "Operations, Systems, QX, Execution", "q": "What rules define PTG’s single master knowledge file?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 72, "section": "Operations, Systems, QX, Execution", "q": "What qualifies as a complete thought within PTG documentation?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 73, "section": "Operations, Systems, QX, Execution", "q": "What qualifies as an incomplete thought that must still be preserved?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 74, "section": "Operations, Systems, QX, Execution", "q": "What qualifies as an actionable task for PTG?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 75, "section": "Operations, Systems, QX, Execution", "q": "What systems ensure zero loss of ideas?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 76, "section": "Operations, Systems, QX, Execution", "q": "What delivery formats best serve PTG’s long-term clarity?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 77, "section": "Operations, Systems, QX, Execution", "q": "What naming conventions prevent PTG file confusion?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 78, "section": "Operations, Systems, QX, Execution", "q": "What versioning rules prevent PTG overwrite or regression?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 79, "section": "Operations, Systems, QX, Execution", "q": "What formatting rules ensure PTG files remain human-first?", "ceo": "AI can assist with formatting, summarizing, and translating; it cannot make binding decisions, fabricate data, or override human authority.", "type": "status"}, {"num": 80, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as RED (vital/urgent)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 81, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as ORANGE (momentum-building)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 82, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as YELLOW (slow-build foundation)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 83, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as GREEN (ROI/profit-driven)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 84, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as BLUE (on ice)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 85, "section": "Operations, Systems, QX, Execution", "q": "What conditions classify a PTG task as VIOLET (conceptual)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "color"}, {"num": 86, "section": "Operations, Systems, QX, Execution", "q": "What rules lock color logic consistently across PTG?", "ceo": "Color logic is fixed: RED vital/urgent, ORANGE momentum, YELLOW slow-build, GREEN ROI, BLUE on-ice, VIOLET conceptual—applied consistently with written definitions.", "type": "color"}, {"num": 87, "section": "Operations, Systems, QX, Execution", "q": "What numbering system best represents PTG task order or importance?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 88, "section": "Operations, Systems, QX, Execution", "q": "What exactly does a PTG number represent—sequence, importance, or both?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 89, "section": "Operations, Systems, QX, Execution", "q": "What safeguards prevent renumbering chaos in PTG systems?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 90, "section": "Operations, Systems, QX, Execution", "q": "How can PTG safely reorder tasks without breaking references?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 91, "section": "Operations, Systems, QX, Execution", "q": "What does 'vital to success' mean in measurable PTG terms?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "freetext"}, {"num": 92, "section": "Operations, Systems, QX, Execution", "q": "What guardrails limit AI influence in PTG decision-making?", "ceo": "AI can assist with formatting, summarizing, and translating; it cannot make binding decisions, fabricate data, or override human authority.", "type": "yesno"}, {"num": 93, "section": "Operations, Systems, QX, Execution", "q": "What transparency is required when ranking or evaluating PTG items?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 94, "section": "Operations, Systems, QX, Execution", "q": "How does PTG enforce human override authority?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 95, "section": "Operations, Systems, QX, Execution", "q": "What does each score from 1 to 10 mean within PTG’s grading system?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "freetext"}, {"num": 96, "section": "Operations, Systems, QX, Execution", "q": "How does each score translate into real-world PTG action?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 97, "section": "Operations, Systems, QX, Execution", "q": "What rules prevent grading inflation in PTG?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 98, "section": "Operations, Systems, QX, Execution", "q": "What mechanisms ensure grading consistency over time?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 99, "section": "Operations, Systems, QX, Execution", "q": "What conditions must be met before PTG is allowed to activate execution?", "ceo": "Execution stays locked until definitions, safety, pricing, and capacity are verified; triggers to execute must be explicit and documented.", "type": "freetext"}, {"num": 100, "section": "Operations, Systems, QX, Execution", "q": "What is the maximum number of people the space can hold before qx (how it feels when people leave) drops?", "ceo": "QX (room quality) is protected by calm rules, capacity limits, and early de-escalation; if QX drops, we reduce load and reset the environment.", "type": "scale"}, {"num": 101, "section": "Operations, Systems, QX, Execution", "q": "How do we identify overstimulation early—before it becomes disruption?", "ceo": "We prevent overstimulation by limiting volume/crowding, enforcing respectful comms, using cooldowns early, and prioritizing calm structure over maximum throughput.", "type": "scale"}, {"num": 102, "section": "Operations, Systems, QX, Execution", "q": "What behaviors quietly lower the room’s quality even if they aren’t technically rule-breaking?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 103, "section": "Operations, Systems, QX, Execution", "q": "Who has final authority to say “that’s enough,” and is that authority respected in practice?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 104, "section": "Operations, Systems, QX, Execution", "q": "How do we protect first-time visitors from regulars dominating the space?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 105, "section": "Operations, Systems, QX, Execution", "q": "What makes someone a positive regular versus a merely tolerated regular?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 106, "section": "Operations, Systems, QX, Execution", "q": "How do we address negative energy early—before it turns into a real incident?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 107, "section": "Operations, Systems, QX, Execution", "q": "Are we clear on the difference between “welcoming” and “permissive,” and how is that enforced?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 108, "section": "Operations, Systems, QX, Execution", "q": "When does gaming add to the environment, and when does it distract from it?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 109, "section": "Operations, Systems, QX, Execution", "q": "What signs show gaming has become the focus instead of an enhancer to the overall PTG mission?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 110, "section": "Operations, Systems, QX, Execution", "q": "How do we pause or end gaming without embarrassment, conflict, or disrespect?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "yesno"}, {"num": 111, "section": "Operations, Systems, QX, Execution", "q": "Where does free help end and paid service begin—clearly, calmly, and consistently?", "ceo": "AI can assist with formatting, summarizing, and translating; it cannot make binding decisions, fabricate data, or override human authority.", "type": "yesno"}, {"num": 112, "section": "Operations, Systems, QX, Execution", "q": "How do we explain “no” to a customer without breaking trust or damaging qx?", "ceo": "AI can assist with formatting, summarizing, and translating; it cannot make binding decisions, fabricate data, or override human authority.", "type": "yesno"}, {"num": 113, "section": "Operations, Systems, QX, Execution", "q": "What services carry the highest risk to trust if done poorly (and why)?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 114, "section": "Operations, Systems, QX, Execution", "q": "How do we recognize extra effort (xx) without creating pressure or entitlement?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 115, "section": "Operations, Systems, QX, Execution", "q": "What signs show a staff member is nearing burnout (and what is the response plan)?", "ceo": "We protect staff energy with schedules, breaks, backup coverage, and a clear escalation path; burnout signs trigger immediate load reduction and recovery.", "type": "scale"}, {"num": 116, "section": "Operations, Systems, QX, Execution", "q": "Who supports the supporter when the day gets heavy (backup, decompression, escalation)?", "ceo": "We protect staff energy with schedules, breaks, backup coverage, and a clear escalation path; burnout signs trigger immediate load reduction and recovery.", "type": "status"}, {"num": 117, "section": "Operations, Systems, QX, Execution", "q": "What would scaling too fast look like in real life—inside PTG’s actual space and community?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "status"}, {"num": 118, "section": "Operations, Systems, QX, Execution", "q": "What must never be sacrificed, even if money is on the table?", "ceo": "PTG data tools must be simple, sortable, and versioned—built for Sheets-first compatibility, with consistent naming and minimal required columns.", "type": "freetext"}, {"num": 119, "section": "Operations, Systems, QX, Execution", "q": "How will we know we are still honoring the original handwritten vision five years from now?", "ceo": "PTG will define this explicitly in the master knowledge file and enforce it consistently through documented rules, metrics, and human approval.", "type": "freetext"}];

const LS_KEY = "ptg_survey_responses_v6";

/* ----------------- Utilities ----------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function nowISO(){ return new Date().toISOString(); }

function loadAll(){
  try{ return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }catch{ return []; }
}
function saveAll(rows){ localStorage.setItem(LS_KEY, JSON.stringify(rows)); }

function downloadText(filename, text){
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadJson(filename, obj){
  const blob = new Blob([JSON.stringify(obj,null,2)], {type:"application/json;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}


function downloadEml(filename, subject, body){
  // RFC822 / .eml download (works offline; user can open in Mail and send)
  const headers = [
    "To: " + EMAIL_TO,
    "Subject: " + subject,
    "Content-Type: text/plain; charset=UTF-8",
    "",
  ].join("\r\n");
  const eml = headers + body.replaceAll("\n", "\r\n");
  const blob = new Blob([eml], {type:"message/rfc822"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 500);
}
function mailto(subject, body){
  const url = "mailto:" + encodeURIComponent(EMAIL_TO)
    + "?subject=" + encodeURIComponent(subject)
    + "&body=" + encodeURIComponent(body);
  window.location.href = url;
}

function formatTxt(kv){
  const lines = [];
  lines.push("PTG Survey Export");
  lines.push("Generated: " + new Date().toString());
  lines.push("----------------------------------------");
  for(const [k,v] of Object.entries(kv)){
    lines.push(k + ": " + (typeof v === "object" ? JSON.stringify(v) : String(v)));
  }
  return lines.join("\n");
}

function groupBy(arr, keyFn){
  const m = new Map();
  for(const x of arr){
    const k = keyFn(x);
    if(!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
}

/* ----------------- Navigation ----------------- */
function show(id){
  ["home","public","internal","admin"].forEach(x => {
    const el = document.getElementById(x);
    if(el) el.style.display = (x===id) ? "block" : "none";
  });
  $$("button[data-nav]").forEach(b => {
    b.classList.toggle("primary", b.dataset.nav === id);
  });
  if(id==="admin") renderAdmin();
}

$$("button[data-nav]").forEach(b => {
  b.addEventListener("click", () => show(b.dataset.nav));
});

/* ----------------- Public Survey ----------------- */
function toggleNameInput(){
  const mode = $$("input[name='name_mode']").find(x=>x.checked)?.value || "Anonymous";
  const name = $("#name");
  name.disabled = (mode !== "Named");
  if(mode !== "Named") name.value = "";
}
$$("input[name='name_mode']").forEach(r => r.addEventListener("change", toggleNameInput));
toggleNameInput();

function limitChecks(containerId, max){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.addEventListener("change", (e) => {
    const checks = Array.from(container.querySelectorAll("input[type='checkbox']"));
    const chosen = checks.filter(c => c.checked);
    if(chosen.length > max){
      e.target.checked = false;
    }
  });
}
limitChecks("gameTypes", 3);
limitChecks("trustPicks", 2);

function bindRange(qName){
  const input = document.querySelector(`input[data-q='${qName}']`);
  const tag = document.querySelector(`span[data-range='${qName}']`);
  if(!input || !tag) return;
  const sync = () => tag.textContent = input.value;
  input.addEventListener("input", sync);
  sync();
}
bindRange("interest_lounge");
bindRange("non_toxic");

function readPublicForm(){
  const data = {};
  data.type = "PUBLIC";
  data.created_at = nowISO();

  const mode = $$("input[name='name_mode']").find(x=>x.checked)?.value || "Anonymous";
  data.name_mode = mode;
  data.name = (mode === "Named") ? ($("#name").value || "").trim() : "Anonymous";

  $$("select[data-q]").forEach(sel => { data[sel.dataset.q] = sel.value || ""; });

  $$("input[type='radio'][data-q]").forEach(r => { if(r.checked) data[r.dataset.q] = r.value; });

  $$("input[type='range'][data-q]").forEach(r => { data[r.dataset.q] = Number(r.value); });

  const cb = $$("input[type='checkbox'][data-q]");
  const grouped = groupBy(cb, x => x.dataset.q);
  for(const [k, boxes] of grouped.entries()){
    data[k] = boxes.filter(b => b.checked).map(b => b.value);
  }

  ["come_back_reason","leave_reason"].forEach(k => {
    const el = document.querySelector(`[data-q='${k}']`);
    if(el) data[k] = (el.value || "").trim();
  });

  data.assigned_role = suggestRole(data);
  return data;
}

function suggestRole(d){
  const score = {GM:0, OPS:0, COMM:0, TECH:0, CASH:0};

  score.OPS += (d.non_toxic || 0);
  if((d.matters_more||"").includes("Clean")) score.OPS += 6;
  if((d.trust_builders||[]).includes("Clear rules")) score.OPS += 4;
  if((d.trust_builders||[]).includes("Respectful staff")) score.OPS += 4;
  if((d.trust_builders||[]).includes("Clean space")) score.OPS += 3;

  if(d.reason_visit === "Events") score.COMM += 10;
  if(d.reason_visit === "Hangout") score.COMM += 7;
  if((d.fun_event||"").includes("tournament")) score.COMM += 7;
  if((d.fun_event||"").includes("league")) score.COMM += 6;
  if((d.trust_builders||[]).includes("Friendly community")) score.COMM += 5;
  score.COMM += Math.round((d.interest_lounge||0) * 0.6);

  if(d.reason_visit === "Music + gaming") score.TECH += 10;
  if((d.game_types||[]).includes("Rhythm/Music")) score.TECH += 8;
  if((d.trust_builders||[]).includes("Good equipment")) score.TECH += 4;

  if(d.matters_more === "Cheaper price") score.CASH += 8;
  if(d.fair_price === "$5–10") score.CASH += 6;
  if(d.pay_style === "Pay-as-you-go") score.CASH += 3;
  if(d.pay_style === "Membership") score.CASH += 2;
  if(d.pay_style === "Both") score.CASH += 2;

  score.GM += Math.round((d.interest_lounge||0) * 0.8);
  if((d.times_attend||[]).length >= 2) score.GM += 4;
  if(d.visit_freq === "Weekly" || d.visit_freq === "Multiple times weekly") score.GM += 5;
  if(d.reason_visit === "Competition") score.GM += 3;
  if((d.trust_builders||[]).includes("Clear rules")) score.GM += 2;

  const entries = Object.entries(score).sort((a,b) => b[1]-a[1]);
  if(entries[1] && entries[0][1] === entries[1][1]) return "GM (tie-break)";
  return entries[0][0];
}

$("#publicForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = readPublicForm();

  if(!d.age_range) return alert("Select age range.");
  if(!d.play_where || d.play_where.length===0) return alert("Pick at least one place you play.");
  if(!d.game_types || d.game_types.length===0) return alert("Pick at least 1 game type (up to 3).");
  if(d.game_types.length>3) return alert("Pick up to 3 game types.");
  if(!d.times_attend || d.times_attend.length===0) return alert("Pick at least one time you would attend.");
  if(!d.reason_visit) return alert("Select your main reason to visit.");
  if(!d.pay_style) return alert("Select payment style.");
  if(!d.matters_more) return alert("Select what matters more.");
  if(!d.fun_event) return alert("Select what event sounds most fun.");
  if(!d.trust_builders || d.trust_builders.length===0) return alert("Pick 1–2 trust builders.");
  if(d.trust_builders.length>2) return alert("Pick up to 2 trust builders.");

  const rows = loadAll();
  rows.push(d);
  saveAll(rows);

  $("#publicActions").style.display = "grid";
  $("#publicAssigned").textContent = d.assigned_role;
  $("#publicSaved").textContent = "Saved locally at: " + new Date(d.created_at).toString();
});

$("#publicDownload").addEventListener("click", () => {
  const rows = loadAll().filter(x => x.type==="PUBLIC");
  if(rows.length===0) return alert("No public responses saved yet.");
  const latest = rows[rows.length-1];
  downloadText(`ptg_public_survey_${latest.created_at.replaceAll(":","-")}.txt`, formatTxt(latest));
});

$("#publicEmail").addEventListener("click", () => {
  const rows = loadAll().filter(x => x.type==="PUBLIC");
  if(rows.length===0) return alert("No public responses saved yet.");
  const latest = rows[rows.length-1];
  mailto("PTG Public Survey Response — " + (latest.name || "Anonymous"), formatTxt(latest));
});
publicEmailBlank").addEventListener("click", () => {
  mailto("PTG Public Survey (Blank Draft)", buildPublicBlankEmailBody());
});
publicEml").addEventListener("click", () => {
  downloadEml("ptg_public_survey_blank.eml", "PTG Public Survey (Blank Draft)", buildPublicBlankEmailBody());
});


/* ----------------- Internal 119 Survey ----------------- */
function escapeHtml(s){
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function renderInternal(){
  const container = $("#internalInjected");
  container.innerHTML = "";
  const bySection = groupBy(INTERNAL_QUESTIONS, q => q.section);

  const sectionOrder = ["Brand & Voice","Competitors & Market","Pricing & Finance","Legal & Risk","Operations, Systems, QX, Execution"];

  const statusOpts = [
    ["Clearly defined","Clearly defined"],
    ["Mostly defined","Mostly defined"],
    ["Partially defined","Partially defined"],
    ["Not defined","Not defined"],
    ["Not applicable","Not applicable"],
  ];
  const yesnoOpts = [
    ["Yes","Yes"],
    ["No","No"],
    ["Depends / Conditional","Depends / Conditional"],
    ["Unknown","Unknown"],
  ];
  const colorOpts = [
    ["RED","🔴 RED"],
    ["ORANGE","🟠 ORANGE"],
    ["YELLOW","🟡 YELLOW"],
    ["GREEN","🟢 GREEN"],
    ["BLUE","🔵 BLUE"],
    ["VIOLET","🟣 VIOLET"],
  ];

  function makeRadio(name, opts){
    const wrap = document.createElement("div");
    wrap.className = "row";
    opts.forEach(([val,label], idx) => {
      const lab = document.createElement("label");
      lab.className = "check";
      const inp = document.createElement("input");
      inp.type="radio"; inp.name=name; inp.value=val;
      if(idx===0) inp.required = true;
      lab.appendChild(inp);
      const span = document.createElement("span");
      span.textContent = label;
      lab.appendChild(span);
      wrap.appendChild(lab);
    });
    return wrap;
  }

  sectionOrder.forEach(sec => {
    const list = bySection.get(sec) || [];
    if(list.length===0) return;

    const secCard = document.createElement("div");
    secCard.className = "card";
    secCard.innerHTML = `<h3>${sec}</h3><div class="small">${list.length} questions</div><hr/>`;

    list.forEach(q => {
      const block = document.createElement("div");
      block.className = "card";
      block.style.marginTop = "12px";

      block.innerHTML = `
        <div style="display:flex; gap:10px; align-items:flex-start; justify-content:space-between; flex-wrap:wrap">
          <div style="min-width:260px">
            <span class="pilltag">Q${q.num}</span>
            <div style="margin-top:6px; font-weight:900">${escapeHtml(q.q)}</div>
          </div>
        </div>
      `;

      const base = `q_${q.num}`;

      if(q.type === "freetext"){
        const status = makeRadio(base + "_status", statusOpts);
        block.appendChild(status);

        const noteBox = document.createElement("div");
        noteBox.className = "noteBox";
        noteBox.innerHTML = `<label style="margin-top:10px; display:block">Answer (short)</label>
          <textarea name="${base}_text" placeholder="Keep it short."></textarea>`;
        block.appendChild(noteBox);
        noteBox.style.display = "block";

        status.addEventListener("change", () => {
          const v = status.querySelector("input:checked")?.value || "";
          noteBox.style.display = (v === "Clearly defined") ? "none" : "block";
        });

      } else if(q.type === "yesno"){
        const radios = makeRadio(base, yesnoOpts);
        block.appendChild(radios);

        const noteBox = document.createElement("div");
        noteBox.className = "noteBox";
        noteBox.innerHTML = `<label style="margin-top:10px; display:block">Notes (only if needed)</label>
          <textarea name="${base}_notes" placeholder="Optional notes…"></textarea>`;
        block.appendChild(noteBox);

        radios.addEventListener("change", () => {
          const v = radios.querySelector("input:checked")?.value || "";
          noteBox.style.display = (v === "Depends / Conditional") ? "block" : "none";
        });

      } else if(q.type === "color"){
        const radios = makeRadio(base, colorOpts);
        block.appendChild(radios);

        const noteBox = document.createElement("div");
        noteBox.className = "noteBox";
        noteBox.innerHTML = `<label style="margin-top:10px; display:block">Definition / conditions (short)</label>
          <textarea name="${base}_notes" placeholder="What makes this color true? (short)"></textarea>`;
        block.appendChild(noteBox);
        noteBox.style.display = "block";

      } else if(q.type === "scale"){
        const row = document.createElement("div");
        row.className = "range";
        row.innerHTML = `<input type="range" min="1" max="10" value="5" name="${base}" />
                         <span class="kbd" data-scale="${base}">5</span>`;
        const r = row.querySelector("input");
        const tag = row.querySelector("span");
        r.addEventListener("input", () => tag.textContent = r.value);
        block.appendChild(row);

        const noteBox = document.createElement("div");
        noteBox.className = "noteBox";
        noteBox.innerHTML = `<label style="margin-top:10px; display:block">Notes (optional)</label>
          <textarea name="${base}_notes" placeholder="Optional…"></textarea>`;
        block.appendChild(noteBox);

      } else {
        const radios = makeRadio(base, statusOpts);
        block.appendChild(radios);

        const noteBox = document.createElement("div");
        noteBox.className = "noteBox";
        noteBox.innerHTML = `<label style="margin-top:10px; display:block">Notes (only if needed)</label>
          <textarea name="${base}_notes" placeholder="Optional notes…"></textarea>`;
        block.appendChild(noteBox);

        radios.addEventListener("change", () => {
          const v = radios.querySelector("input:checked")?.value || "";
          noteBox.style.display = (v === "Partially defined" || v === "Not defined") ? "block" : "none";
        });
      }

      const det = document.createElement("details");
      det.innerHTML = `<summary><span class="small">View CEO reference answer</span></summary>
        <div class="small" style="margin-top:10px; white-space:pre-wrap">${escapeHtml(q.ceo)}</div>`;
      block.appendChild(det);

      secCard.appendChild(block);
    });

    container.appendChild(secCard);
  });
}

renderInternal();

function readInternalForm(){
  const responder = $("#internalResponder").value;
  if(!responder) throw new Error("Responder required.");

  const data = {};
  data.type = "INTERNAL_119";
  data.created_at = nowISO();
  data.responder = responder;
  data.responder_name = ($("#internalName").value || "").trim();

  const answers = {};

  INTERNAL_QUESTIONS.forEach(q => {
    const base = `q_${q.num}`;
    if(q.type==="freetext"){
      const status = document.querySelector(`input[name='${base}_status']:checked`)?.value || "";
      const text = document.querySelector(`textarea[name='${base}_text']`)?.value || "";
      answers[base] = {status, text: text.trim()};
    } else if(q.type==="scale"){
      const val = document.querySelector(`input[name='${base}']`)?.value || "";
      const notes = document.querySelector(`textarea[name='${base}_notes']`)?.value || "";
      answers[base] = {value: Number(val), notes: notes.trim()};
    } else {
      const val = document.querySelector(`input[name='${base}']:checked`)?.value || "";
      const notes = document.querySelector(`textarea[name='${base}_notes']`)?.value || "";
      answers[base] = {value: val, notes: notes.trim()};
    }
  });

  data.answers = answers;
  return data;
}

$("#internalForm").addEventListener("submit", (e) => {
  e.preventDefault();
  try{
    const d = readInternalForm();
    const rows = loadAll();
    rows.push(d);
    saveAll(rows);

    $("#internalActions").style.display = "grid";
    $("#internalSaved").textContent = "Saved locally at: " + new Date(d.created_at).toString();
    alert("Saved.");
  }catch(err){
    alert(err.message || String(err));
  }
});

$("#internalDownload").addEventListener("click", () => {
  const rows = loadAll().filter(x => x.type==="INTERNAL_119");
  if(rows.length===0) return alert("No internal responses saved yet.");
  const latest = rows[rows.length-1];
  downloadText(`ptg_internal_119_${latest.created_at.replaceAll(":","-")}.txt`, formatTxt(latest));
});

$("#internalEmail").addEventListener("click", () => {
  const rows = loadAll().filter(x => x.type==="INTERNAL_119");
  if(rows.length===0) return alert("No internal responses saved yet.");
  const latest = rows[rows.length-1];
  mailto("PTG Internal 119 Response — " + (latest.responder_name || latest.responder), formatTxt(latest));
});
internalEml").addEventListener("click", () => {
  downloadEml("ptg_internal_119_blank.eml", "PTG Internal 119 (Blank Draft)", buildInternalBlankEmailBodyAll());
});
internalEmailS1").addEventListener("click", () => {
  mailto("PTG Internal 119 — Section 1 (Blank)", buildInternalBlankEmailBody("Brand & Voice"));
});
internalEmailS2").addEventListener("click", () => {
  mailto("PTG Internal 119 — Section 2 (Blank)", buildInternalBlankEmailBody("Competitors & Market"));
});
internalEmailS3").addEventListener("click", () => {
  mailto("PTG Internal 119 — Section 3 (Blank)", buildInternalBlankEmailBody("Pricing & Finance"));
});
internalEmailS4").addEventListener("click", () => {
  mailto("PTG Internal 119 — Section 4 (Blank)", buildInternalBlankEmailBody("Legal & Risk"));
});
internalEmailS5").addEventListener("click", () => {
  mailto("PTG Internal 119 — Section 5 (Blank)", buildInternalBlankEmailBody("Operations, Systems, QX, Execution"));
});


/* ----------------- Admin ----------------- */
function renderAdmin(){
  const rows = loadAll();
  const tb = $("#adminTbody");
  tb.innerHTML = "";
  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${r.type}</td>
      <td>${(r.type==="PUBLIC" ? r.name : (r.responder_name||r.responder||""))}</td>
      <td>${(r.type==="PUBLIC" ? (r.age_range||"") : "")}</td>
      <td>${(r.type==="PUBLIC" ? (r.assigned_role||"") : "")}</td>
      <td>${new Date(r.created_at).toLocaleString()}</td>
      <td><button class="btn" data-view="${i}">View</button></td>
    `;
    tb.appendChild(tr);
  });

  $$("button[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.view);
      const row = loadAll()[idx];
      $("#modalPre").textContent = JSON.stringify(row, null, 2);
      $("#modal").showModal();
    });
  });
}

$("#exportJson").addEventListener("click", () => {
  downloadJson("ptg_survey_responses_export.json", loadAll());
});

$("#clearAll").addEventListener("click", () => {
  if(confirm("Clear ALL locally saved responses on this device?")){
    saveAll([]);
    renderAdmin();
    alert("Cleared.");
  }
});

$("#modalClose").addEventListener("click", () => $("#modal").close());

/* initial view */
show("home");
function buildPublicBlankEmailBody(){
  return [
    "PTG Public Market Research Survey (Blank)",
    "Responder Name (or Anonymous): ",
    "Age Range: ",
    "",
    "1) Where do you usually play video games? (Home / Online / Friend’s house / Arcade-Lounge / Other)",
    "Answer: ",
    "",
    "2) Game types you enjoy most (pick up to 3): (Sports / Fighting / Shooter / Rhythm-Music / Retro / Party-Casual)",
    "Answer: ",
    "",
    "3) Interest in a local gaming lounge (1–10):",
    "Answer: ",
    "",
    "4) #1 reason you’d visit (Competition / Hangout / Events-Tournaments / Try new games / Music+gaming):",
    "Answer: ",
    "",
    "5) Preferred visit times (After school / Weeknights / Weekends / Late night):",
    "Answer: ",
    "",
    "6) Fair price for ~2 hours ($5–10 / $10–15 / $15–20 / Depends):",
    "Answer: ",
    "",
    "7) Preferred payment style (Pay-as-you-go / Membership / Both) + Why (short):",
    "Answer: ",
    "",
    "8) What matters more? (Cheap price / Clean + respectful environment):",
    "Answer: ",
    "",
    "9) Calm, non-toxic environment importance (1–10):",
    "Answer: ",
    "",
    "10) Avoided gaming spaces due to drama/toxicity? (Yes / No):",
    "Answer: ",
    "",
    "11) Youth-friendly rules + respectful staff increase trust? (Yes / No / Not sure):",
    "Answer: ",
    "",
    "12) What event sounds most fun? (Weekly tournament / Ladder league / Casual free-play night / Music+gaming night / Learn-to-play clinic):",
    "Answer: ",
    "",
    "13) How far would you travel? (minutes):",
    "Answer: ",
    "",
    "14) One thing that would make you come back (optional, short):",
    "Answer: ",
    "",
    "15) One thing that would make you leave (optional, short):",
    "Answer: ",
    ""
  ].join("\n");
}

function buildInternalBlankEmailBody(sectionName){
  const lines = [];
  lines.push("PTG Internal 119 Definition Survey (Blank)");
  lines.push("Section: " + sectionName);
  lines.push("Responder: ");
  lines.push("Date: ");
  lines.push("");
  const qs = INTERNAL_QUESTIONS.filter(q => q.section === sectionName);
  qs.forEach(q => {
    lines.push(`Q${q.num}. ${q.q}`);
    // Click-first response style (email-friendly)
    lines.push("Answer Type (choose one): Clearly defined / Mostly defined / Partially defined / Not defined yet");
    lines.push("Answer: ");
    lines.push("Optional Notes (only if needed): ");
    lines.push("");
  });
  return lines.join("\n");
}

function buildInternalBlankEmailBodyAll(){
  const lines = [];
  lines.push("PTG Internal 119 Definition Survey (Blank) — ALL QUESTIONS");
  lines.push("Responder: ");
  lines.push("Date: ");
  lines.push("");
  INTERNAL_QUESTIONS.forEach(q => {
    lines.push(`Q${q.num}. ${q.q}`);
    lines.push("Answer Type (choose one): Clearly defined / Mostly defined / Partially defined / Not defined yet");
    lines.push("Answer: ");
    lines.push("Optional Notes (only if needed): ");
    lines.push("");
  });
  return lines.join("\n");
}

