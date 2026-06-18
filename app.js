// ----- Data layer (localStorage-backed) -----
const STORAGE_KEY = "wc-scores-v2";
const uid = () => Math.random().toString(36).slice(2, 9);

const WC_TEAMS = [
  "Argentina", "France", "Brazil", "England", "Spain", "Portugal", "Netherlands",
  "Germany", "Italy", "Belgium", "Croatia", "Uruguay", "Morocco", "Mexico",
  "USA", "Canada", "Japan", "South Korea", "Australia", "Senegal", "Ghana",
  "Nigeria", "Cameroon", "Ecuador", "Colombia", "Denmark", "Switzerland",
  "Poland", "Serbia", "Wales", "Qatar", "Saudi Arabia", "Iran", "Tunisia",
  "Costa Rica", "Ivory Coast", "Egypt", "Algeria", "Chile", "Peru",
  "Turkey", "Bosnia", "Scotland", "Uzbekistan", "Iraq", "Austria", "Norway",
  "Paraguay", "Panama", "New Zealand", "South Africa", "Congo", "Jordan",
  "Czech Republic", "Curacao", "Cape Verde", "Haiti", "Sweden",
];

const SEED_PEOPLE = [
  { name: "Anish", teams: ["Turkey", "Ecuador"] },
  { name: "Julia", teams: ["Bosnia", "Canada"] },
  { name: "Polly", teams: ["Scotland", "Uzbekistan", "Iraq"] },
  { name: "Sofia", teams: ["Colombia", "Croatia", "Tunisia"] },
  { name: "Elsa", teams: ["Brazil", "Australia", "Saudi Arabia"] },
  { name: "Lindsay", teams: ["Netherlands", "Qatar", "Ivory Coast"] },
  { name: "Andras", teams: ["Algeria", "Mexico", "Cape Verde"] },
  { name: "Supi", teams: ["Argentina", "Austria", "Senegal"] },
  { name: "Vincent", teams: ["Norway"] },
  { name: "Lisha", teams: ["South Korea", "Paraguay", "Panama"] },
  { name: "Sook Lin", teams: ["Ghana", "New Zealand", "Iran"] },
  { name: "Anisha", teams: ["Switzerland", "Germany", "South Africa"] },
  { name: "Nivi", teams: ["France", "Morocco"] },
  { name: "Jeremy", teams: ["Congo", "Egypt"] },
  { name: "Raja", teams: ["England", "Belgium"] },
  { name: "Ted", teams: ["Portugal", "Jordan"] },
  { name: "Sam", teams: ["USA", "Czech Republic", "Curacao"] },
  { name: "Meilin", teams: ["Japan", "Haiti", "Sweden"] },
  { name: "Andor", teams: ["Uruguay"] },
  { name: "Alvin", teams: ["Spain"] },
];

// [group, teamA, teamB, date, status, scoreA, scoreB, time]
// Dates and times are in Singapore time (SGT, UTC+8). status: "scheduled" | "live" | "final".
const SEED_MATCHES = [
  ["A", "Mexico", "South Africa", "2026-06-12", "final", 2, 0, "03:00"],
  ["A", "South Korea", "Czech Republic", "2026-06-12", "final", 2, 1, "10:00"],
  ["A", "Czech Republic", "South Africa", "2026-06-19", "scheduled", 0, 0, "00:00"],
  ["A", "Mexico", "South Korea", "2026-06-19", "scheduled", 0, 0, "11:00"],
  ["A", "Czech Republic", "Mexico", "2026-06-25", "scheduled", 0, 0, "09:00"],
  ["A", "South Africa", "South Korea", "2026-06-25", "scheduled", 0, 0, "09:00"],
  ["B", "Canada", "Bosnia", "2026-06-13", "final", 1, 1, "03:00"],
  ["B", "Qatar", "Switzerland", "2026-06-14", "final", 1, 1, "03:00"],
  ["B", "Switzerland", "Bosnia", "2026-06-19", "scheduled", 0, 0, "03:00"],
  ["B", "Canada", "Qatar", "2026-06-19", "scheduled", 0, 0, "06:00"],
  ["B", "Switzerland", "Canada", "2026-06-25", "scheduled", 0, 0, "03:00"],
  ["B", "Bosnia", "Qatar", "2026-06-25", "scheduled", 0, 0, "03:00"],
  ["C", "Brazil", "Morocco", "2026-06-14", "final", 1, 1, "06:00"],
  ["C", "Haiti", "Scotland", "2026-06-14", "final", 0, 1, "09:00"],
  ["C", "Scotland", "Morocco", "2026-06-20", "scheduled", 0, 0, "06:00"],
  ["C", "Brazil", "Haiti", "2026-06-20", "scheduled", 0, 0, "09:00"],
  ["C", "Scotland", "Brazil", "2026-06-25", "scheduled", 0, 0, "06:00"],
  ["C", "Morocco", "Haiti", "2026-06-25", "scheduled", 0, 0, "06:00"],
  ["D", "USA", "Paraguay", "2026-06-13", "final", 4, 1, "09:00"],
  ["D", "Australia", "Turkey", "2026-06-14", "final", 2, 0, "12:00"],
  ["D", "USA", "Australia", "2026-06-20", "scheduled", 0, 0, "03:00"],
  ["D", "Turkey", "Paraguay", "2026-06-20", "scheduled", 0, 0, "12:00"],
  ["D", "Turkey", "USA", "2026-06-26", "scheduled", 0, 0, "10:00"],
  ["D", "Paraguay", "Australia", "2026-06-26", "scheduled", 0, 0, "10:00"],
  ["E", "Germany", "Curacao", "2026-06-15", "final", 7, 1, "01:00"],
  ["E", "Ivory Coast", "Ecuador", "2026-06-15", "final", 1, 0, "07:00"],
  ["E", "Germany", "Ivory Coast", "2026-06-21", "scheduled", 0, 0, "04:00"],
  ["E", "Ecuador", "Curacao", "2026-06-21", "scheduled", 0, 0, "08:00"],
  ["E", "Curacao", "Ivory Coast", "2026-06-26", "scheduled", 0, 0, "04:00"],
  ["E", "Ecuador", "Germany", "2026-06-26", "scheduled", 0, 0, "04:00"],
  ["F", "Netherlands", "Japan", "2026-06-15", "final", 2, 2, "04:00"],
  ["F", "Sweden", "Tunisia", "2026-06-15", "final", 5, 1, "10:00"],
  ["F", "Netherlands", "Sweden", "2026-06-21", "scheduled", 0, 0, "01:00"],
  ["F", "Tunisia", "Japan", "2026-06-21", "scheduled", 0, 0, "12:00"],
  ["F", "Japan", "Sweden", "2026-06-26", "scheduled", 0, 0, "07:00"],
  ["F", "Tunisia", "Netherlands", "2026-06-26", "scheduled", 0, 0, "07:00"],
  ["G", "Belgium", "Egypt", "2026-06-16", "final", 1, 1, "06:00"],
  ["G", "Iran", "New Zealand", "2026-06-16", "final", 2, 2, "12:00"],
  ["G", "Belgium", "Iran", "2026-06-22", "scheduled", 0, 0, "03:00"],
  ["G", "New Zealand", "Egypt", "2026-06-22", "scheduled", 0, 0, "09:00"],
  ["G", "Egypt", "Iran", "2026-06-27", "scheduled", 0, 0, "11:00"],
  ["G", "New Zealand", "Belgium", "2026-06-27", "scheduled", 0, 0, "11:00"],
  ["H", "Spain", "Cape Verde", "2026-06-16", "final", 0, 0, "00:00"],
  ["H", "Saudi Arabia", "Uruguay", "2026-06-16", "final", 1, 1, "06:00"],
  ["H", "Spain", "Saudi Arabia", "2026-06-22", "scheduled", 0, 0, "00:00"],
  ["H", "Uruguay", "Cape Verde", "2026-06-22", "scheduled", 0, 0, "06:00"],
  ["H", "Cape Verde", "Saudi Arabia", "2026-06-27", "scheduled", 0, 0, "08:00"],
  ["H", "Uruguay", "Spain", "2026-06-27", "scheduled", 0, 0, "08:00"],
  ["I", "France", "Senegal", "2026-06-17", "final", 3, 1, "03:00"],
  ["I", "Iraq", "Norway", "2026-06-17", "final", 1, 4, "06:00"],
  ["I", "France", "Iraq", "2026-06-23", "scheduled", 0, 0, "05:00"],
  ["I", "Norway", "Senegal", "2026-06-23", "scheduled", 0, 0, "08:00"],
  ["I", "Norway", "France", "2026-06-27", "scheduled", 0, 0, "03:00"],
  ["I", "Senegal", "Iraq", "2026-06-27", "scheduled", 0, 0, "03:00"],
  ["J", "Argentina", "Algeria", "2026-06-17", "final", 3, 0, "09:00"],
  ["J", "Austria", "Jordan", "2026-06-17", "final", 3, 1, "12:00"],
  ["J", "Argentina", "Austria", "2026-06-23", "scheduled", 0, 0, "01:00"],
  ["J", "Jordan", "Algeria", "2026-06-23", "scheduled", 0, 0, "11:00"],
  ["J", "Algeria", "Austria", "2026-06-28", "scheduled", 0, 0, "10:00"],
  ["J", "Jordan", "Argentina", "2026-06-28", "scheduled", 0, 0, "10:00"],
  ["K", "Portugal", "Congo", "2026-06-18", "final", 1, 1, "01:00"],
  ["K", "Uzbekistan", "Colombia", "2026-06-18", "final", 1, 3, "10:00"],
  ["K", "Portugal", "Uzbekistan", "2026-06-24", "scheduled", 0, 0, "01:00"],
  ["K", "Colombia", "Congo", "2026-06-24", "scheduled", 0, 0, "10:00"],
  ["K", "Colombia", "Portugal", "2026-06-28", "scheduled", 0, 0, "07:30"],
  ["K", "Congo", "Uzbekistan", "2026-06-28", "scheduled", 0, 0, "07:30"],
  ["L", "England", "Croatia", "2026-06-18", "final", 4, 2, "04:00"],
  ["L", "Ghana", "Panama", "2026-06-18", "final", 1, 0, "07:00"],
  ["L", "England", "Ghana", "2026-06-24", "scheduled", 0, 0, "04:00"],
  ["L", "Panama", "Croatia", "2026-06-24", "scheduled", 0, 0, "07:00"],
  ["L", "Panama", "England", "2026-06-28", "scheduled", 0, 0, "05:00"],
  ["L", "Croatia", "Ghana", "2026-06-28", "scheduled", 0, 0, "05:00"],
];

function seedMatches() {
  return SEED_MATCHES.map(([group, teamA, teamB, date, status, scoreA, scoreB, time = ""]) => ({
    id: uid(), group, teamA, teamB, date, status, scoreA, scoreB, time, minute: "",
  }));
}

function defaultState() {
  return {
    tournament: "World Cup 2026 - Merlion Sweepstake",
    people: SEED_PEOPLE.map((p) => ({ id: uid(), name: p.name, teams: [...p.teams] })),
    matches: seedMatches(),
    feed: [],
    trashTalk: [],
    updatedAt: Date.now(),
  };
}

// Singapore (SGT) kickoff times for each match day. Times are assigned
// deterministically per day so they stay stable across reloads. Stored as
// "HH:MM" (24h, Singapore time); only filled in if a match has no time yet.
function slotsFor(n) {
  if (n <= 2) return ["07:00", "10:00"];
  if (n <= 4) return ["01:00", "04:00", "07:00", "10:00"];
  return ["00:00", "02:00", "05:00", "07:00", "09:00", "11:00"];
}
function assignKickoffTimes(matches) {
  const byDate = new Map();
  for (const m of matches) {
    const k = m.date || "";
    if (!byDate.has(k)) byDate.set(k, []);
    byDate.get(k).push(m);
  }
  for (const list of byDate.values()) {
    list.sort((a, b) =>
      (a.group || "").localeCompare(b.group || "") ||
      (a.teamA || "").localeCompare(b.teamA || "")
    );
    const slots = slotsFor(list.length);
    list.forEach((m, i) => {
      if (!m.time) m.time = slots[Math.min(i, slots.length - 1)];
    });
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const s = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
    assignKickoffTimes(s.matches);
    return s;
  } catch {
    return defaultState();
  }
}

function save() {
  state.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (fbRef && !applyingRemote) fbRef.set(state);
  render();
}

let state = load();

// ----- Firebase live sync (optional; off until firebase-config.js is filled in) -----
let fbRef = null;
let applyingRemote = false;

function initSync() {
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || typeof firebase === "undefined") return;
  try {
    firebase.initializeApp(cfg);
    fbRef = firebase.database().ref("sweepstake");
    fbRef.on("value", (snap) => {
      const remote = snap.val();
      if (!remote) {
        // Database is empty → seed it from this device's current data.
        fbRef.set(state);
        return;
      }
      applyingRemote = true;
      state = Object.assign(defaultState(), remote);
      if (!state.trashTalk) state.trashTalk = [];
      if (!state.feed) state.feed = [];
      assignKickoffTimes(state.matches);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      render();
      if (!document.getElementById("adminPanel").classList.contains("hidden")) renderAdmin();
      applyingRemote = false;
    });
  } catch (e) {
    console.warn("Firebase sync unavailable:", e);
  }
}

// ----- Helpers -----
function ownerOf(teamName) {
  const norm = teamName.trim().toLowerCase();
  const p = state.people.find((person) =>
    person.teams.some((t) => t.trim().toLowerCase() === norm)
  );
  return p ? p.name : null;
}

// Win/tie/loss record per team, computed from completed (final) matches.
function computeRecords() {
  const rec = new Map(); // normalized team name -> { w, t, l }
  const get = (name) => {
    const k = name.trim().toLowerCase();
    if (!rec.has(k)) rec.set(k, { w: 0, t: 0, l: 0 });
    return rec.get(k);
  };
  for (const m of state.matches) {
    if (m.status !== "final") continue;
    const a = get(m.teamA), b = get(m.teamB);
    if (m.scoreA > m.scoreB) { a.w++; b.l++; }
    else if (m.scoreA < m.scoreB) { a.l++; b.w++; }
    else { a.t++; b.t++; }
  }
  return rec;
}

function recordFor(records, teamName) {
  return records.get(teamName.trim().toLowerCase()) || { w: 0, t: 0, l: 0 };
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(ts).toLocaleDateString();
}

function clockTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

// ----- Render -----
function render() {
  document.getElementById("tournamentTitle").textContent = state.tournament || "World Cup Scores";
  document.title = state.tournament || "World Cup Scores";
  renderMatches();
  renderRoster();
  renderFeed();
  renderTrashTalk();
  document.getElementById("lastUpdated").textContent = "Updated " + timeAgo(state.updatedAt);
}

function fmtDate(iso) {
  if (!iso) return "";
  const parts = iso.split("-").map(Number);
  if (parts.length !== 3) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parts[1] - 1]} ${parts[2]}`;
}

function pad2(n) { return String(n).padStart(2, "0"); }
function isoOf(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
// Current date in Singapore time (en-CA formats as YYYY-MM-DD).
function todayISO() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}
// "01:00" -> "1:00 AM"
function fmt12(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad2(m)} ${ap}`;
}
function shiftISO(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  return isoOf(new Date(y, m - 1, d + days));
}

// Which day-sections are expanded. Seeded with today + yesterday on first render,
// then driven by the user toggling sections (persists across re-renders this session).
const openDays = new Set();
let openDaysSeeded = false;

function renderMatches() {
  const list = document.getElementById("matchList");
  const empty = document.getElementById("liveEmpty");
  empty.classList.toggle("hidden", state.matches.length > 0);

  const today = todayISO();
  const yesterday = shiftISO(today, -1);
  if (!openDaysSeeded) {
    openDays.add(today);
    openDays.add(yesterday);
    openDaysSeeded = true;
  }

  const byDate = new Map();
  for (const m of state.matches) {
    const key = m.date || "";
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key).push(m);
  }

  const keys = [...byDate.keys()].sort((a, b) => {
    if (a === "") return 1;
    if (b === "") return -1;
    return a.localeCompare(b); // earliest day first
  });

  list.innerHTML = keys.map((k) => {
    const matches = byDate.get(k).slice().sort((a, b) =>
      (a.time || "").localeCompare(b.time || "") ||
      (a.group || "").localeCompare(b.group || "")
    );
    const liveCount = matches.filter((m) => m.status === "live").length;
    const label = k === today ? `Today &middot; ${fmtDate(k)}`
      : k === yesterday ? `Yesterday &middot; ${fmtDate(k)}`
      : k ? fmtDate(k) : "Other";
    const count = `${matches.length} ${matches.length === 1 ? "match" : "matches"}`;
    const live = liveCount ? `<span class="day-live">${liveCount} live</span>` : "";
    return `
      <details class="day-group" data-date="${esc(k)}" ${openDays.has(k) ? "open" : ""}>
        <summary class="day-header">
          <span class="day-label">${label}</span>
          <span class="day-count">${live}${count}</span>
        </summary>
        <div class="day-matches">${matches.map(matchCard).join("")}</div>
      </details>`;
  }).join("");
}

function matchCard(m) {
  const statusLabel = { live: "Live", scheduled: "Upcoming", final: "Full time" }[m.status];
  const minute = m.status === "live" && m.minute ? ` &middot; ${esc(m.minute)}'` : "";
  const ownerA = ownerOf(m.teamA);
  const ownerB = ownerOf(m.teamB);
  const showScore = m.status !== "scheduled";
  const meta = [m.group ? `Group ${esc(m.group)}` : "", fmtDate(m.date), fmt12(m.time)].filter(Boolean).join(" &middot; ");
  return `
    <div class="match-card">
      <div class="match-top">
        <span class="match-meta">${meta}</span>
        <span class="match-status status-${m.status}"><span class="dot"></span>${statusLabel}${minute}</span>
      </div>
      <div class="match-row">
        <div class="team home">
          <span class="team-name">${esc(m.teamA)}</span>
          <span class="team-owner ${ownerA ? "" : "none"}">${ownerA ? esc(ownerA) : "unclaimed"}</span>
        </div>
        <div class="score">
          ${showScore ? `<span>${m.scoreA}</span><span class="sep">–</span><span>${m.scoreB}</span>` : `<span class="sep">vs</span>`}
        </div>
        <div class="team away">
          <span class="team-name">${esc(m.teamB)}</span>
          <span class="team-owner ${ownerB ? "" : "none"}">${ownerB ? esc(ownerB) : "unclaimed"}</span>
        </div>
      </div>
    </div>`;
}

function renderRoster() {
  const list = document.getElementById("rosterList");
  const empty = document.getElementById("rosterEmpty");
  empty.classList.toggle("hidden", state.people.length > 0);

  const records = computeRecords();
  const standings = state.people.map((p) => {
    const teams = p.teams.map((t) => ({ name: t, rec: recordFor(records, t) }));
    const total = teams.reduce((acc, t) => {
      acc.w += t.rec.w; acc.t += t.rec.t; acc.l += t.rec.l;
      return acc;
    }, { w: 0, t: 0, l: 0 });
    return { person: p, teams, total };
  });

  standings.sort((a, b) =>
    (b.total.w - a.total.w) || (b.total.t - a.total.t) ||
    (a.total.l - b.total.l) || a.person.name.localeCompare(b.person.name)
  );

  list.innerHTML = standings.map((s, i) => {
    const rows = s.teams.length
      ? s.teams.map((t) => `
          <div class="team-row">
            <span class="team-row-name">${esc(t.name)}</span>
            <span class="wtl">
              <span class="wtl-w">${t.rec.w}W</span>
              <span class="wtl-t">${t.rec.t}T</span>
              <span class="wtl-l">${t.rec.l}L</span>
            </span>
          </div>`).join("")
      : `<div class="team-row"><span class="team-row-name empty-chip">no teams yet</span></div>`;
    return `
      <div class="person-card">
        <div class="person-head">
          <div class="person-rank-name">
            <span class="rank">${i + 1}</span>
            <span class="person-name">${esc(s.person.name)}</span>
          </div>
          <div class="total-record">
            <span class="tr-stat tr-w"><b>${s.total.w}</b>W</span>
            <span class="tr-stat tr-t"><b>${s.total.t}</b>T</span>
            <span class="tr-stat tr-l"><b>${s.total.l}</b>L</span>
          </div>
        </div>
        <div class="team-records">${rows}</div>
      </div>`;
  }).join("");
}

function renderFeed() {
  const list = document.getElementById("feedList");
  const empty = document.getElementById("feedEmpty");
  if (!list || !empty) return;
  empty.classList.toggle("hidden", state.feed.length > 0);
  list.innerHTML = [...state.feed].reverse().map((f) => `
    <li class="feed-item">
      <div class="feed-time">${clockTime(f.time)}</div>
      <div class="feed-text">${esc(f.text)}</div>
    </li>`).join("");
}

function renderTrashTalk() {
  const list = document.getElementById("talkList");
  const empty = document.getElementById("talkEmpty");
  if (!list || !empty) return;
  const msgs = state.trashTalk || [];
  empty.classList.toggle("hidden", msgs.length > 0);
  list.innerHTML = [...msgs].reverse().map((t) => `
    <li class="talk-item">
      <div class="talk-head">
        <span class="talk-author">${esc(t.name || "Anonymous")}</span>
        <span class="talk-time">${timeAgo(t.time)}</span>
      </div>
      <div class="talk-body">${esc(t.text)}</div>
    </li>`).join("");
}

// ----- Admin rendering -----
function renderAdmin() {
  document.getElementById("adminTournament").value = state.tournament;
  renderAdminPeople();
  renderAdminMatches();
}

function renderAdminPeople() {
  const wrap = document.getElementById("adminPeople");
  wrap.innerHTML = state.people.map((p) => {
    const tags = p.teams.map((t, i) =>
      `<span class="team-tag">${esc(t)}<button data-act="rmTeam" data-pid="${p.id}" data-idx="${i}">✕</button></span>`
    ).join("");
    return `
      <div class="admin-person">
        <div class="admin-person-head">
          <strong>${esc(p.name)}</strong>
          <button class="del-link" data-act="rmPerson" data-pid="${p.id}">remove</button>
        </div>
        <div class="team-input-row">
          <input class="field" type="text" list="teamOptions" placeholder="Add a team" data-act="teamInput" data-pid="${p.id}" />
          <button class="primary-btn small" data-act="addTeam" data-pid="${p.id}">Add</button>
        </div>
        <div class="team-tags">${tags}</div>
      </div>`;
  }).join("");
}

function renderAdminMatches() {
  const wrap = document.getElementById("adminMatches");
  wrap.innerHTML = state.matches.map((m) => `
    <div class="admin-match" data-mid="${m.id}">
      <div class="admin-match-teams">${esc(m.teamA)} vs ${esc(m.teamB)}</div>
      <div class="admin-match-when">
        <input class="field date-field" type="date" value="${m.date || ""}" data-act="date" data-mid="${m.id}" />
        <input class="field time-field" type="time" value="${m.time || ""}" data-act="time" data-mid="${m.id}" />
        <span class="when-tz">SGT</span>
      </div>
      <div class="admin-match-controls">
        <div class="stepper">
          <button data-act="score" data-mid="${m.id}" data-side="A" data-delta="-1">−</button>
          <span class="val">${m.scoreA}</span>
          <button data-act="score" data-mid="${m.id}" data-side="A" data-delta="1">+</button>
        </div>
        <span class="sep">–</span>
        <div class="stepper">
          <button data-act="score" data-mid="${m.id}" data-side="B" data-delta="-1">−</button>
          <span class="val">${m.scoreB}</span>
          <button data-act="score" data-mid="${m.id}" data-side="B" data-delta="1">+</button>
        </div>
        <select class="status-select" data-act="status" data-mid="${m.id}">
          <option value="scheduled" ${m.status === "scheduled" ? "selected" : ""}>Upcoming</option>
          <option value="live" ${m.status === "live" ? "selected" : ""}>Live</option>
          <option value="final" ${m.status === "final" ? "selected" : ""}>Full time</option>
        </select>
        <input class="field minute-field" type="text" placeholder="min" value="${m.minute || ""}" data-act="minute" data-mid="${m.id}" />
        <button class="del-link" data-act="rmMatch" data-mid="${m.id}">delete</button>
      </div>
    </div>`).join("");
}

// ----- Mutations -----
function findMatch(id) { return state.matches.find((m) => m.id === id); }
function findPerson(id) { return state.people.find((p) => p.id === id); }

// ----- Tab switching -----
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.view).classList.add("active");
  });
});

// Remember which day-sections the user expands/collapses (toggle doesn't bubble → capture)
document.getElementById("matchList").addEventListener("toggle", (e) => {
  const el = e.target;
  if (!el.classList || !el.classList.contains("day-group")) return;
  const key = el.dataset.date;
  if (el.open) openDays.add(key);
  else openDays.delete(key);
}, true);

// ----- Admin open/close -----
const panel = document.getElementById("adminPanel");
const backdrop = document.getElementById("adminBackdrop");
function openAdmin() {
  renderAdmin();
  panel.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}
function closeAdmin() {
  panel.classList.add("hidden");
  backdrop.classList.add("hidden");
}
document.getElementById("adminToggle").addEventListener("click", openAdmin);
document.getElementById("adminClose").addEventListener("click", closeAdmin);
backdrop.addEventListener("click", closeAdmin);

// ----- Admin: tournament name -----
document.getElementById("adminTournament").addEventListener("input", (e) => {
  state.tournament = e.target.value;
  save();
});

// ----- Admin: people -----
document.getElementById("addPerson").addEventListener("click", () => {
  const input = document.getElementById("newPersonName");
  const name = input.value.trim();
  if (!name) return;
  state.people.push({ id: uid(), name, teams: [] });
  input.value = "";
  save();
  renderAdminPeople();
});
document.getElementById("newPersonName").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("addPerson").click();
});

// Delegated clicks inside the people section
document.getElementById("adminPeople").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const act = btn.dataset.act;
  const pid = btn.dataset.pid;
  if (act === "rmPerson") {
    state.people = state.people.filter((p) => p.id !== pid);
    save();
    renderAdminPeople();
  } else if (act === "addTeam") {
    const input = document.querySelector(`input[data-act="teamInput"][data-pid="${pid}"]`);
    const val = input.value.trim();
    if (!val) return;
    findPerson(pid).teams.push(val);
    input.value = "";
    save();
    renderAdminPeople();
  } else if (act === "rmTeam") {
    const person = findPerson(pid);
    person.teams.splice(Number(btn.dataset.idx), 1);
    save();
    renderAdminPeople();
  }
});
document.getElementById("adminPeople").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.dataset.act === "teamInput") {
    e.preventDefault();
    document.querySelector(`button[data-act="addTeam"][data-pid="${e.target.dataset.pid}"]`).click();
  }
});

// ----- Admin: matches -----
document.getElementById("addMatch").addEventListener("click", () => {
  const a = document.getElementById("mTeamA").value.trim();
  const b = document.getElementById("mTeamB").value.trim();
  if (!a || !b) return;
  state.matches.push({ id: uid(), group: "", teamA: a, teamB: b, date: "", scoreA: 0, scoreB: 0, status: "scheduled", minute: "" });
  document.getElementById("mTeamA").value = "";
  document.getElementById("mTeamB").value = "";
  save();
  renderAdminMatches();
});

document.getElementById("adminMatches").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const mid = btn.dataset.mid;
  const m = findMatch(mid);
  if (!m) return;
  if (btn.dataset.act === "score") {
    const side = btn.dataset.side === "A" ? "scoreA" : "scoreB";
    m[side] = Math.max(0, m[side] + Number(btn.dataset.delta));
    if (m.status === "scheduled") m.status = "live";
    save();
    renderAdminMatches();
  } else if (btn.dataset.act === "rmMatch") {
    state.matches = state.matches.filter((x) => x.id !== mid);
    save();
    renderAdminMatches();
  }
});
document.getElementById("adminMatches").addEventListener("change", (e) => {
  const el = e.target;
  const m = findMatch(el.dataset.mid);
  if (!m) return;
  if (el.dataset.act === "status") { m.status = el.value; save(); }
  else if (el.dataset.act === "date") { m.date = el.value; save(); renderAdminMatches(); }
  else if (el.dataset.act === "time") { m.time = el.value; save(); }
});
document.getElementById("adminMatches").addEventListener("input", (e) => {
  const el = e.target;
  if (el.dataset.act === "minute") {
    const m = findMatch(el.dataset.mid);
    if (m) { m.minute = el.value; save(); }
  }
});

// ----- Admin: feed -----
function postFeed() {
  const input = document.getElementById("feedText");
  const text = input.value.trim();
  if (!text) return;
  state.feed.push({ id: uid(), time: Date.now(), text });
  input.value = "";
  save();
}
document.getElementById("addFeed").addEventListener("click", postFeed);
document.getElementById("feedText").addEventListener("keydown", (e) => {
  if (e.key === "Enter") postFeed();
});

// ----- Trash Talk (open to all users) -----
const TALK_NAME_KEY = "wc-trash-talk-name";
function postTrashTalk() {
  const nameInput = document.getElementById("talkName");
  const textInput = document.getElementById("talkText");
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!text) return;
  if (name) localStorage.setItem(TALK_NAME_KEY, name);
  if (!state.trashTalk) state.trashTalk = [];
  state.trashTalk.push({ id: uid(), time: Date.now(), name: name || "Anonymous", text });
  textInput.value = "";
  save();
}
document.getElementById("talkPost").addEventListener("click", postTrashTalk);
document.getElementById("talkText").addEventListener("keydown", (e) => {
  if (e.key === "Enter") postTrashTalk();
});
const savedTalkName = localStorage.getItem(TALK_NAME_KEY);
if (savedTalkName) document.getElementById("talkName").value = savedTalkName;

// ----- Admin: backup -----
document.getElementById("exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fifa-scores-backup.json";
  a.click();
  URL.revokeObjectURL(url);
});
document.getElementById("importData").addEventListener("click", () => {
  document.getElementById("importFile").click();
});
document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = Object.assign(defaultState(), JSON.parse(reader.result));
      assignKickoffTimes(state.matches);
      save();
      renderAdmin();
    } catch {
      alert("That file couldn't be read as a valid backup.");
    }
  };
  reader.readAsText(file);
});
document.getElementById("resetData").addEventListener("click", () => {
  if (!confirm("Erase all people, matches, and updates? This can't be undone.")) return;
  state = defaultState();
  assignKickoffTimes(state.matches);
  save();
  renderAdmin();
});

// ----- Init -----
document.getElementById("teamOptions").innerHTML =
  WC_TEAMS.map((t) => `<option value="${t}"></option>`).join("");

setInterval(() => {
  document.getElementById("lastUpdated").textContent = "Updated " + timeAgo(state.updatedAt);
}, 30000);

render();
initSync();
