// All site content lives here. Edit copy, links and images in this file.

const BASE = import.meta.env.BASE_URL;
export const asset = (file) => `${BASE}assets/${file}`;

export const SITE = {
  name: 'evangelina le',
  email: 'evangelinale201@gmail.com',
  resume: asset('Evangelina-Le-Resume.pdf'),
  linkedin: 'https://www.linkedin.com/in/evangelinale',
  github: 'https://github.com/celestieve',
};

// Images come from `npm run images` (originals live in images/)
const IMG = (k, n) => asset(`${k}-${n}.webp`);
const P = (arr) => arr.map(([h, t]) => ({ h, t }));

export const ROTS = ['-1.2deg', '1deg', '-.6deg', '1.4deg', '-1deg', '.8deg', '-1.4deg'];

export const CASES = [
  { id: 'vtask', title: 'VTask', sub: 'Clinical task management', statusShort: 'live ✓', status: 'Live in production', tools: 'Claude Design, Claude Code, React, TypeScript', before: 1, after: 3,
    overview: 'Redesigned the task manager clinicians open every morning. I took it from wireframes through front-end code, API integration, QA and stakeholder sign-off.',
    problems: P([['Generic form controls', 'Standard inputs with no visual hierarchy or priority metadata.'], ['No urgency signal', 'Assignee, dates and notes were there, but nothing marked high-urgency work at a glance.']]),
    solutions: P([['Show what matters on each task', 'Priority colors, who sent it and the time slot, right on the task.'], ['Cleaner components', 'I cleaned up the type, button states and form inputs so they match.']]),
    sections: [
      { h: 'High-density task inbox', img: 4 },
      { h: 'Side-panel task details', img: 5 },
      { h: 'Custom lists', img: 6 } ] },
  { id: 'vdrive', title: 'VDrive', sub: 'Enterprise health asset management', statusShort: 'POC → eng', status: 'Prototype + POC code delivered to engineering', tools: 'Claude Design, Claude Code, React', before: 1, after: 2,
    overview: 'Redesigned how clinicians store and share files, with stricter sharing settings and a quicker way to open medical images in VitalPACS.',
    problems: P([['Generic file explorer', 'A basic list with no thumbnails or high-density metadata filters.'], ['Unrestricted sharing', 'Downloads had no granular permissions, passcodes or domain safeguards.']]),
    solutions: P([['Open images in VitalPACS', 'A built-in image viewer with a button that opens the study in VitalPACS.'], ['Clearer permissions', 'One tab for who can access a file, another for link settings.']]),
    sections: [
      { h: 'The file workspace', img: 3 },
      { h: 'Sharing settings', img: 4 },
      { h: 'DICOM preview → VitalPACS', img: 5 } ] },
  { id: 'calendar', title: 'VCalendar', sub: 'Unified clinical scheduling', statusShort: 'POC → eng', status: 'Prototype + POC code delivered to engineering', tools: 'Claude Design, Claude Code, React', before: 1, after: 4,
    overview: 'Put tasks, appointments and referrals on one calendar and removed most of the pop-ups that slowed people down on busy clinic days.',
    problems: P([['Fragmented schedules', 'Separate views for tasks, appointments and referrals forced constant context switching.'], ['Intrusive modals', 'Blocking overlays for basic RSVPs and quick event details.']]),
    solutions: P([['One calendar for everything', 'All six event types in one view, with live status.'], ['Fewer pop-ups', 'Hover to see details, and RSVP or edit right on the calendar.']]),
    sections: [
      { h: 'The schedule view', img: 5 },
      { h: 'Hover cards & inline RSVP', img: 6 },
      { h: 'Right sidebar', img: 7 } ] },
  { id: 'vmail', title: 'VMail', sub: 'Clinical messaging & escalation', statusShort: 'prototype', status: 'Interactive prototype + specs', tools: 'Claude Design, React', before: 1, after: 2,
    overview: 'Turned a flat inbox into a three-panel layout, and added a way to turn a conversation into a referral.',
    problems: P([['Flat inbox', 'No multi-panel context, cross-cutting tags or folder trees.'], ['Page-jump navigation', 'Reading threads, checking attachments or managing permissions all meant leaving the list.']]),
    solutions: P([['Three-panel layout', 'Folders, conversation list and the active thread in one viewport.'], ['Message to referral', 'A conversation can become a referral without starting over.']]),
    sections: [
      { h: 'Three-panel workspace', img: 3 },
      { h: 'Selection & composition', img: 4 },
      { h: 'Attachments & escalation', img: 5 } ] },
  { id: 'rounds', title: 'VitalRounds', sub: 'Conference workspace', statusShort: 'prototype', status: 'Interactive prototype + specs', tools: 'Claude Design, React', before: 1, after: 4,
    overview: 'Built one place for case conferences, so care teams stop re-entering patient data and can choose how much they see during a live discussion.',
    problems: P([['Siloed systems', 'Case discussions lived apart from referrals, so clinicians re-entered patient data by hand.'], ['Context loss', 'Reviewing history during live rounds meant toggling between apps.']]),
    solutions: P([['One workspace', 'A case list on the left that stays put while you open each case.'], ['Show or hide sections', 'Hide what you don’t need, bring it back anytime, and toggle the chat.']]),
    sections: [
      { h: 'The case workspace', img: 5 },
      { h: 'Referral conversion', img: 6 },
      { h: 'Meeting minutes', img: 7 } ] },
  { id: 'vfax', title: 'VFax', sub: 'Shared fax inbox & AI triage', statusShort: 'prototype', status: 'Interactive prototype + specs', tools: 'Claude Design, React', before: 1, after: 3,
    overview: 'Turned shared fax lines into a team inbox where it’s clear who owns each fax, and AI fills in referral forms that staff can check.',
    problems: P([['Ownerless queue', 'Shared lines were an unorganized pile, so faxes got missed or worked twice.'], ['Destructive filing', 'Filing moved faxes out of the queue and hid ongoing work from the team.']]),
    solutions: P([['Clear owners', 'Each fax shows who has it, and "Assign to me" takes one click.'], ['Folders as tags', 'Filing a fax tags it instead of hiding it from the team.']]),
    sections: [
      { h: 'AI fills it in, people check it', img: 4 },
      { h: 'The inbox', img: 5 },
      { h: 'Audit trail', img: 6 } ] },
  { id: 'onboarding', title: 'Onboarding', sub: 'First-login workspace', statusShort: 'prototype', status: 'Interactive prototype + specs', tools: 'Claude Design, React', before: 1, after: 2,
    overview: 'Replaced an empty first login with a short flow: confirm your details, find your coworkers and take a quick tour.',
    problems: P([['Redundant data entry', 'Uninvited users filled 12+ fields (NPI, address, specialty); invited users landed on an empty dashboard.'], ['Empty first screen', 'No coworkers, no compliance check and nothing explaining the tools.']]),
    solutions: P([['Activation & compliance', 'Email-link activation, SMS verification, password setup and HIPAA agreement.'], ['Confirm instead of retype', 'We already had most of the info from sales, so 12 fields became 4.']]),
    sections: [
      { h: 'Profile confirmation', img: 4 },
      { h: 'Team discovery', img: 5 },
      { h: 'Category-grouped tour', img: 6 } ] },
];

const OUTCOMES = {
  vtask: 'shipped to production ✓',
  onboarding: '12 fields → 4, 10 tour stops → 3',
  vdrive: 'POC handed to engineering',
  calendar: '6 schedules → 1 view',
  vmail: 'message → referral in one step',
  rounds: 'no more re-entering patient data',
  vfax: 'AI fills 26 fields, staff check',
};

CASES.forEach((c, i) => {
  c.num = String(i + 1).padStart(2, '0');
  c.href = `#/work/${c.id}`;
  c.beforeSrc = IMG(c.id, c.before);
  c.afterSrc = IMG(c.id, c.after);
  c.outcome = OUTCOMES[c.id];
  c.sections.forEach((s) => { s.src = IMG(c.id, s.img); });
});

export const SKILLS = ['Figma', 'Claude Design', 'Claude Code', 'React', 'TypeScript', 'Tailwind', 'Vue', 'Node.js', 'Firebase', 'Git / GitHub', 'Usability testing', 'Design systems', 'Photoshop', 'Illustrator', 'Lightroom'];

export const EXPERIENCE = [
  { org: 'VitalEngine', when: '2026 → now', role: 'UX Designer & Frontend Developer' },
  { org: 'Vietnamese Student Association, UAB', when: '2022 → 2025', role: 'Creative Director & Designer' },
  { org: 'University of Alabama at Birmingham', when: '2021 → 2025', role: 'B.A. Computer Science · Minors in Marketing & Studio Art' },
];

/* ---------- Spreads (each "page turn" of the sketchbook) ----------
   l / r  = left / right page content (type flags + data)
   full   = a spread that spans both pages (slider or image gallery) */
export const SPREADS = [];
const add = (base, chapter, l, r, full) => {
  const k = SPREADS.filter((s) => s.base === base).length;
  SPREADS.push({ base, chapter, key: k ? `${base}/${k + 1}` : base, l: l || {}, r: r || {}, full: full || null });
};
const gallery = (f) => ({ cap: '', L: [], R: [], imgH: '32cqh', ...f });

add('', 'contents', { toc: true }, { collage: true });

CASES.forEach((c, ci) => {
  const base = `work/${c.id}`;
  add(base, c.title,
    { intro: true, outcome: c.outcome, num: c.num, title: c.title, sub: c.sub, overview: c.overview,
      meta: [{ k: 'role', v: 'UX Designer & Frontend Developer' }, { k: 'status', v: c.status }, { k: 'tools', v: c.tools }] },
    { probsol: true, problems: c.problems, solutions: c.solutions });
  add(base, c.title, null, null, { slider: true, title: c.title, before: c.beforeSrc, after: c.afterSrc });
  const K = c.sections.slice(0, 3).map((s, j) => ({ src: s.src, alt: s.h, bg: '#fff', rot: ROTS[(ci + j) % ROTS.length], cap: s.h }));
  add(base, c.title, null, null, gallery({ L: [{ ...K[0], h: '58cqh' }], R: K.slice(1).map((k) => ({ ...k, h: '27cqh' })) }));
});

const V = (n, rot) => ({ src: asset(`vsa-${n}.webp`), alt: 'VSA reveal graphic', bg: '#191919', rot });
add('studio', 'graphics', { studioIntro: true },
  { shot: true, src: asset('vsa-2.webp'), alt: 'Lotus Under the Lights reveal graphic', bg: '#191919', cap: 'every performer got their own reveal', rot: '1.5deg' });
add('studio', 'graphics', null, null, gallery({ cap: '2024 – 2025 · reveal series', L: [V(1, '-1.5deg'), V(3, '1deg')], R: [V(4, '1.2deg'), V(5, '-1deg')] }));
add('studio', 'graphics', null, null, gallery({ cap: '2023 – 2025 · reveal series', L: [V(6, '1deg'), V(7, '-1.4deg')], R: [V(8, '-.8deg'), V(9, '1.3deg')] }));
add('studio', 'graphics', null, null, gallery({ cap: 'side projects · UAB', imgH: '50cqh',
  L: [{ src: asset('nexo-1.webp'), alt: 'Nexo', bg: '#fff', rot: '-1.2deg', cap: 'Nexo: senior capstone. Calendar, tasks and notes in one app. Team lead + React/Firebase.' }],
  R: [{ src: asset('mixify-1.webp'), alt: 'Mixify', bg: '#fff', rot: '1deg', cap: 'Mixify: genre-based playlists on the Spotify API. Team lead, design + Vue.' }] }));

add('about', 'about', { aboutL: true }, { aboutR: true });
