/* ============================================================
   Français au Quotidien — logique de l'application
   ============================================================ */

const STORAGE_KEY = "fq_state_v1";

/* ---------------- État persistant ---------------- */
function defaultState() {
  return {
    startDate: getTodayISO(),
    completedDays: [],
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastCompletionDate: null,
    unlockedConcepts: [],   // { title, def, day }
    seenBadges: [],
    settings: { rate: 0.92, voiceURI: null }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); }
  catch (e) { console.warn("Impossible d'enregistrer la progression :", e); }
}

let STATE = loadState();

/* Etat transitoire d'interface (non sauvegardé) */
const ui = {
  view: "home",
  lessonDay: null,
  step: 0,
  celebrationQueue: [],
  reviewWords: null // cache des mots de révision pour le jour de lesson en cours
};

/* ---------------- Utilitaires date ---------------- */
function getTodayISO(d) {
  d = d || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(isoA, isoB) {
  const [ay, am, ad] = isoA.split("-").map(Number);
  const [by, bm, bd] = isoB.split("-").map(Number);
  const a = Date.UTC(ay, am - 1, ad);
  const b = Date.UTC(by, bm - 1, bd);
  return Math.round((b - a) / 86400000);
}

function availableDay() {
  const diff = daysBetween(STATE.startDate, getTodayISO());
  return Math.min(Math.max(diff + 1, 1), TOTAL_DAYS);
}

function featuredDay() {
  const avail = availableDay();
  for (let d = 1; d <= avail; d++) {
    if (!STATE.completedDays.includes(d)) return d;
  }
  return avail;
}

function getDay(n) { return CURRICULUM[n - 1]; }

/* ---------------- Similarité de texte (pour la prononciation) ---------------- */
function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[.,!?;:«»"'()\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = tmp;
    }
  }
  return dp[n];
}

function similarity(a, b) {
  const na = normalize(a), nb = normalize(b);
  if (!na.length && !nb.length) return 1;
  const dist = levenshtein(na, nb);
  const maxLen = Math.max(na.length, nb.length, 1);
  return 1 - dist / maxLen;
}

/* ---------------- Synthèse vocale (écoute en français) ---------------- */
let cachedVoices = [];
function refreshVoices() {
  if (window.speechSynthesis) cachedVoices = window.speechSynthesis.getVoices();
}
if (window.speechSynthesis) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function getFrenchVoice() {
  if (!cachedVoices.length) refreshVoices();
  if (STATE.settings.voiceURI) {
    const chosen = cachedVoices.find(v => v.voiceURI === STATE.settings.voiceURI);
    if (chosen) return chosen;
  }
  return cachedVoices.find(v => (v.lang || "").toLowerCase().startsWith("fr")) || null;
}

function speak(text) {
  if (!window.speechSynthesis) {
    alert("La synthèse vocale n'est pas disponible sur ce navigateur.");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = STATE.settings.rate || 0.92;
  const voice = getFrenchVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

/* ---------------- Reconnaissance vocale (écoute du navigateur) ---------------- */
function recognitionSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

let activeRecognition = null;

function stopActiveRecognition() {
  if (activeRecognition) {
    try { activeRecognition.stop(); } catch (e) {}
    activeRecognition = null;
  }
}

function startRecognition(onResult, onError, options) {
  options = options || {};
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) { onError("unsupported"); return null; }
  stopActiveRecognition();
  const rec = new Ctor();
  rec.lang = "fr-FR";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.continuous = !!options.continuous;
  rec.onresult = (event) => {
    let transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    onResult(transcript.trim());
  };
  rec.onerror = (event) => { onError(event.error || "error"); };
  rec.onend = () => { if (activeRecognition === rec) activeRecognition = null; };
  activeRecognition = rec;
  try { rec.start(); } catch (e) { onError("start-failed"); }
  return rec;
}

/* ---------------- Progression : compléter un jour, badges, concepts ---------------- */
function markDayComplete(day) {
  const already = STATE.completedDays.includes(day);
  const dayObj = getDay(day);
  let xpGain = 0;
  let newConcept = null;

  if (!already) {
    STATE.completedDays.push(day);
    STATE.completedDays.sort((a, b) => a - b);
    xpGain = 50 + (dayObj.milestone ? 20 : 0);
    STATE.xp += xpGain;

    const today = getTodayISO();
    if (STATE.lastCompletionDate) {
      const diff = daysBetween(STATE.lastCompletionDate, today);
      if (diff === 1) STATE.streak += 1;
      else if (diff === 0) { /* déjà compté aujourd'hui */ }
      else STATE.streak = 1;
    } else {
      STATE.streak = 1;
    }
    STATE.lastCompletionDate = today;
    STATE.bestStreak = Math.max(STATE.bestStreak, STATE.streak);

    if (dayObj.concept && !STATE.unlockedConcepts.some(c => c.title === dayObj.concept.title)) {
      newConcept = Object.assign({ day }, dayObj.concept);
      STATE.unlockedConcepts.push(newConcept);
    }
    saveState();
  }

  const newBadges = checkBadges();

  ui.celebrationQueue = [];
  if (!already) {
    ui.celebrationQueue.push({ type: "day", day, xpGain });
    if (newConcept) ui.celebrationQueue.push({ type: "concept", concept: newConcept });
  }
  newBadges.forEach(b => ui.celebrationQueue.push({ type: "badge", badge: b }));

  ui.view = "home";
  render();
  if (ui.celebrationQueue.length) showNextCelebration();
}

function checkBadges() {
  const earned = [];
  BADGES.forEach(b => {
    if (!STATE.seenBadges.includes(b.id) && b.check(STATE)) {
      STATE.seenBadges.push(b.id);
      earned.push(b);
    }
  });
  if (earned.length) saveState();
  return earned;
}

/* ---------------- Célébrations ---------------- */
function showNextCelebration() {
  const layer = document.getElementById("toast-layer");
  if (!ui.celebrationQueue.length) { layer.innerHTML = ""; return; }
  const item = ui.celebrationQueue.shift();
  let html = "";
  if (item.type === "day") {
    const d = getDay(item.day);
    html = `
      <div class="celebrate">
        <span class="big-emoji">${d.milestone ? "🌟" : "✅"}</span>
        <h3>Jour ${item.day} terminé !</h3>
        <p class="muted small">+${item.xpGain} XP gagnés. ${d.milestone ? "Étape importante franchie — bravo pour ta régularité !" : "Continue comme ça."}</p>
        <button class="btn btn-primary btn-block" data-action="close-celebration">Continuer</button>
      </div>`;
  } else if (item.type === "concept") {
    html = `
      <div class="celebrate">
        <span class="big-emoji">🔖</span>
        <h3>Fiche débloquée</h3>
        <p class="muted small">Une nouvelle carte a rejoint ta bibliothèque de concepts :</p>
        <p style="font-family:var(--font-display); color:var(--gold-soft); font-size:18px;">${item.concept.title}</p>
        <button class="btn btn-primary btn-block" data-action="close-celebration">Voir</button>
      </div>`;
  } else if (item.type === "badge") {
    html = `
      <div class="celebrate">
        <span class="big-emoji">${item.badge.icon}</span>
        <h3>Badge débloqué : ${item.badge.title}</h3>
        <p class="muted small">${item.badge.desc}</p>
        <button class="btn btn-primary btn-block" data-action="close-celebration">Super !</button>
      </div>`;
  }
  layer.innerHTML = html;
}

/* ============================================================
   RENDU DES VUES
   ============================================================ */

function render() {
  const root = document.getElementById("view-root");
  document.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.view === ui.view));

  if (ui.view === "home") root.innerHTML = renderHome();
  else if (ui.view === "calendar") root.innerHTML = renderCalendar();
  else if (ui.view === "concepts") root.innerHTML = renderConcepts();
  else if (ui.view === "badges") root.innerHTML = renderBadges();
  else if (ui.view === "settings") root.innerHTML = renderSettings();
  else if (ui.view === "lesson") root.innerHTML = renderLesson();

  renderTopStats();
  root.scrollTop = 0;
}

function renderTopStats() {
  const el = document.getElementById("topbar-stats");
  const level = Math.floor(STATE.xp / 100) + 1;
  el.innerHTML = `
    <span class="stat-pill"><span class="flame">🔥</span>${STATE.streak}</span>
    <span class="stat-pill">✨ Niv. ${level}</span>
  `;
}

function sealSVG(pct) {
  const r = 33, c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  return `
    <svg viewBox="0 0 74 74">
      <circle cx="37" cy="37" r="${r}" fill="none" stroke="rgba(244,239,228,0.12)" stroke-width="5"></circle>
      <circle cx="37" cy="37" r="${r}" fill="none" stroke="#e8c987" stroke-width="5"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"
        transform="rotate(-90 37 37)"></circle>
    </svg>`;
}

function renderHome() {
  const fd = featuredDay();
  const d = getDay(fd);
  const isDone = STATE.completedDays.includes(fd);
  const avail = availableDay();
  const allDone = STATE.completedDays.length >= TOTAL_DAYS;
  const level = Math.floor(STATE.xp / 100) + 1;
  const xpIntoLevel = STATE.xp % 100;

  let heroBody;
  if (allDone) {
    heroBody = `
      <div class="hero-top">
        <div class="seal">${sealSVG(1)}<span class="seal-num">🏆</span></div>
        <div>
          <span class="hero-eyebrow">Parcours complet</span>
          <div class="hero-title">Les 30 jours sont terminés !</div>
          <p class="muted small" style="margin:0;">Reviens quand tu veux revoir un jour, ou continue à t'entraîner librement.</p>
        </div>
      </div>
      <button class="btn btn-secondary btn-block" style="margin-top:16px;" data-action="start" data-day="${TOTAL_DAYS}">Revoir le Jour 30</button>
    `;
  } else {
    heroBody = `
      <div class="hero-top">
        <div class="seal">${sealSVG(STATE.completedDays.length / TOTAL_DAYS)}<span class="seal-num">${fd}</span></div>
        <div>
          <span class="hero-eyebrow">${isDone ? "Déjà fait — à jour !" : `Jour ${fd} sur ${TOTAL_DAYS}`}</span>
          <span class="category-tag ${d.category}">${d.category === "vie" ? "Vie quotidienne" : d.category === "final" ? "Grand final" : "Romantisme"}</span>
          <div class="hero-title"><span class="hero-icon">${d.icon}</span>${d.title}</div>
        </div>
      </div>
      <div class="xp-row">
        <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${xpIntoLevel}%"></div></div>
        <span class="xp-label">${STATE.xp} XP</span>
      </div>
      ${isDone
        ? `<button class="btn btn-secondary btn-block" style="margin-top:16px;" data-action="start" data-day="${fd}">Revoir ce jour</button>
           <p class="small muted" style="margin-top:10px;">${fd < avail ? "Un nouveau jour t'attend déjà ! Regarde ton parcours." : "Reviens demain pour la suite du parcours."}</p>`
        : `<button class="btn btn-primary btn-block btn-lg" style="margin-top:16px;" data-action="start" data-day="${fd}">Commencer (≈ 45-60 min)</button>`
      }
    `;
  }

  return `
  <div class="screen">
    <div class="hero-card">${heroBody}</div>

    <div class="section-title-row"><h2>Ton parcours</h2><a href="#" data-action="nav" data-view="calendar" class="small">Voir tout →</a></div>
    <div class="mini-card">
      <div class="ico">📅</div>
      <div class="txt"><strong>${STATE.completedDays.length} / ${TOTAL_DAYS} jours terminés</strong><span>Jour ${avail} disponible aujourd'hui</span></div>
    </div>
    <div class="mini-card">
      <div class="ico">🔖</div>
      <div class="txt"><strong>${STATE.unlockedConcepts.length} / ${TOTAL_CONCEPTS} fiches concept</strong><span>Débloquées en terminant les jours « Romantisme »</span></div>
    </div>
    <div class="mini-card">
      <div class="ico">🔥</div>
      <div class="txt"><strong>Série actuelle : ${STATE.streak} jour(s)</strong><span>Record : ${STATE.bestStreak} jour(s) d'affilée</span></div>
    </div>

    <hr class="rule">
    <p class="small muted">Astuce : utilise un casque ou un endroit calme pour que la reconnaissance vocale du navigateur t'entende bien. Fonctionne mieux sur Chrome ou Edge.</p>
  </div>`;
}

function renderCalendar() {
  let cells = "";
  const avail = availableDay();
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const day = getDay(d);
    const locked = d > avail;
    const done = STATE.completedDays.includes(d);
    const today = d === avail && !done;
    const cls = ["day-cell"];
    if (done) cls.push("done"); if (today) cls.push("today"); if (locked) cls.push("locked");
    cells += `
      <div class="${cls.join(" ")}" ${locked ? "" : `data-action="start" data-day="${d}"`}>
        <div class="dot ${day.category}"></div>
        <div class="n">${done ? "✓" : d}</div>
      </div>`;
  }
  return `
  <div class="screen">
    <h1>Ton parcours</h1>
    <p class="muted small">Un nouveau jour se débloque automatiquement chaque jour. Tu peux revenir sur n'importe quel jour déjà déverrouillé pour réviser.</p>
    <div class="legend">
      <span><span class="sw" style="background:#a8d4b8"></span>Vie quotidienne</span>
      <span><span class="sw" style="background:var(--gold-soft)"></span>Romantisme</span>
      <span><span class="sw" style="background:var(--ember-soft)"></span>Grand final</span>
    </div>
    <div class="day-grid">${cells}</div>
  </div>`;
}

function renderConcepts() {
  const litt = CURRICULUM.filter(d => d.concept);
  let html = litt.map(d => {
    const unlocked = STATE.unlockedConcepts.some(c => c.title === d.concept.title);
    if (unlocked) {
      return `
      <div class="exlibris">
        <div class="frame-corner fc-tl"></div><div class="frame-corner fc-tr"></div>
        <div class="frame-corner fc-bl"></div><div class="frame-corner fc-br"></div>
        <span class="tag">Ex-libris · Jour ${d.day}</span>
        <h3>${d.concept.title}</h3>
        <p>${d.concept.def}</p>
      </div>`;
    }
    return `
      <div class="concept-locked">
        <span class="lock">🔒</span>
        <div><strong>Fiche verrouillée</strong><br><span class="small">Se débloque en terminant le Jour ${d.day}</span></div>
      </div>`;
  }).join("");

  return `
  <div class="screen">
    <h1>Bibliothèque de concepts</h1>
    <p class="muted small">Chaque jour « Romantisme » débloque une fiche ex-libris à collectionner. ${STATE.unlockedConcepts.length} / ${litt.length} débloquées.</p>
    ${html}
  </div>`;
}

function renderBadges() {
  const cards = BADGES.map(b => {
    const unlocked = b.check(STATE);
    return `
    <div class="badge-card ${unlocked ? "unlocked" : ""}">
      <span class="bico">${b.icon}</span>
      <div class="btitle">${b.title}</div>
      <div class="bdesc">${b.desc}</div>
    </div>`;
  }).join("");
  return `
  <div class="screen">
    <h1>Tes badges</h1>
    <p class="muted small">Débloqués en progressant dans le parcours de 30 jours.</p>
    <div class="badge-grid">${cards}</div>
  </div>`;
}

function renderSettings() {
  const voices = cachedVoices.filter(v => (v.lang || "").toLowerCase().startsWith("fr"));
  const voiceOptions = voices.map(v =>
    `<option value="${v.voiceURI}" ${STATE.settings.voiceURI === v.voiceURI ? "selected" : ""}>${v.name}</option>`
  ).join("");

  return `
  <div class="screen">
    <h1>Réglages</h1>

    ${!recognitionSupported() ? `<div class="compat-note">⚠️ Ce navigateur ne supporte pas la reconnaissance vocale (micro). Utilise Google Chrome ou Microsoft Edge pour les exercices de prononciation. L'écoute (voix française) reste disponible.</div>` : ""}
    <div class="compat-note">🎙️ Le micro nécessite une connexion sécurisée (https) ou l'ouverture en local via un petit serveur — cela fonctionne automatiquement une fois le site déployé sur GitHub Pages.</div>

    <div class="card">
      <div class="field-row">
        <div><strong>Vitesse de la voix</strong><br><span class="small muted">Plus lent pour bien articuler</span></div>
        <input type="range" min="0.6" max="1.1" step="0.05" value="${STATE.settings.rate}" id="rate-slider">
      </div>
      ${voices.length ? `
      <div class="field-row">
        <div><strong>Voix française</strong></div>
        <select id="voice-select">${voiceOptions}</select>
      </div>` : ""}
      <div class="field-row">
        <div></div>
        <button class="btn btn-secondary" data-action="test-voice">🔊 Tester la voix</button>
      </div>
    </div>

    <div class="card">
      <div class="field-row"><div>Jour de départ</div><div class="small muted">${STATE.startDate}</div></div>
      <div class="field-row"><div>Jours terminés</div><div class="small muted">${STATE.completedDays.length} / ${TOTAL_DAYS}</div></div>
      <div class="field-row"><div>XP total</div><div class="small muted">${STATE.xp}</div></div>
      <div class="field-row"><div>Meilleure série</div><div class="small muted">${STATE.bestStreak} jour(s)</div></div>
    </div>

    <button class="btn btn-ember btn-block" data-action="reset">Réinitialiser toute la progression</button>
    <p class="small muted" style="margin-top:10px; text-align:center;">Tes données sont enregistrées uniquement dans ce navigateur (stockage local), sur cet appareil.</p>
  </div>`;
}

/* ---------------- Lecon (lesson player) ---------------- */
const BASE_STEPS = ["warmup", "vocab", "listening", "conversation", "challenge", "summary"];

function stepsFor(dayObj) {
  return dayObj.reviewRange ? ["review"].concat(BASE_STEPS) : BASE_STEPS.slice();
}

function buildTextMap(dayObj) {
  const map = { tt: dayObj.tongueTwister.fr, listen: dayObj.listening.text, challenge: dayObj.challenge };
  dayObj.vocab.forEach((v, i) => map["voc-" + i] = v.fr);
  dayObj.conversation.forEach((q, i) => map["conv-" + i] = q);
  return map;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderLesson() {
  const d = getDay(ui.lessonDay);
  const steps = stepsFor(d);
  if (ui.step >= steps.length) ui.step = steps.length - 1;
  const stepName = steps[ui.step];
  window.__textMap = buildTextMap(d);

  const segs = steps.map((s, i) =>
    `<div class="seg ${i < ui.step ? "filled" : i === ui.step ? "current" : ""}"></div>`
  ).join("");

  let body = "";
  if (stepName === "review") body = renderStepReview(d);
  else if (stepName === "warmup") body = renderStepWarmup(d);
  else if (stepName === "vocab") body = renderStepVocab(d);
  else if (stepName === "listening") body = renderStepListening(d);
  else if (stepName === "conversation") body = renderStepConversation(d);
  else if (stepName === "challenge") body = renderStepChallenge(d);
  else if (stepName === "summary") body = renderStepSummary(d);

  const isLast = ui.step === steps.length - 1;
  const isFirst = ui.step === 0;
  const already = STATE.completedDays.includes(d.day);

  return `
  <div class="screen">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
      <button class="btn-icon" data-action="nav" data-view="home">←</button>
      <div>
        <span class="category-tag ${d.category}">Jour ${d.day}</span>
      </div>
    </div>
    <h2 style="margin-top:8px;">${d.icon} ${d.title}</h2>
    <div class="stepper">${segs}</div>
    ${body}
    <div class="lesson-nav">
      ${isFirst ? "" : `<button class="btn btn-secondary" data-action="prev-step">← Précédent</button>`}
      ${isLast
        ? `<button class="btn ${already ? "btn-secondary" : "btn-primary"} btn-block" data-action="finish-day" data-day="${d.day}">${already ? "Retourner à l'accueil" : "🏁 Terminer le jour"}</button>`
        : `<button class="btn btn-primary btn-block" data-action="next-step">Suivant →</button>`}
    </div>
  </div>`;
}

function renderStepReview(d) {
  const [from, to] = d.reviewRange;
  if (!ui.reviewWords || ui.reviewWords.day !== d.day) {
    let pool = [];
    for (let i = from; i <= to; i++) getDay(i).vocab.forEach(v => pool.push(v));
    ui.reviewWords = { day: d.day, words: shuffle(pool).slice(0, 6) };
  }
  const items = ui.reviewWords.words.map((v, i) => `
    <div class="vocab-item">
      <div class="vocab-head">
        <span class="vocab-fr">${v.fr}</span>
        <span class="vocab-ipa">[${v.ipa}]</span>
      </div>
      <div class="vocab-actions">
        <button class="iconbtn" data-action="play" data-ref="rev-${i}">🔊 Écouter</button>
        <button class="iconbtn" data-action="mic-match" data-ref="rev-${i}" data-feedback="fb-rev-${i}">🎤 Répéter</button>
      </div>
      <div id="fb-rev-${i}"></div>
    </div>`).join("");
  ui.reviewWords.words.forEach((v, i) => { window.__textMap["rev-" + i] = v.fr; });

  return `
  <div class="card tint-gold">
    <span class="step-label">Révision éclair — Jours ${from} à ${to}</span>
    <p class="small muted">Avant de continuer, réentraîne-toi sur quelques mots déjà vus.</p>
    ${items}
  </div>`;
}

function renderStepWarmup(d) {
  return `
  <div class="card">
    <span class="step-label">Échauffement phonétique</span>
    <p class="tt-fr">« ${d.tongueTwister.fr} »</p>
    <p class="tt-tip">💡 ${d.tongueTwister.tip}</p>
    <div class="play-row">
      <button class="iconbtn" data-action="play" data-ref="tt">🔊 Écouter</button>
      <button class="iconbtn" data-action="mic-match" data-ref="tt" data-feedback="fb-tt">🎤 Répéter</button>
    </div>
    <div id="fb-tt"></div>
  </div>`;
}

function renderStepVocab(d) {
  const items = d.vocab.map((v, i) => `
    <div class="vocab-item">
      <div class="vocab-head">
        <span class="vocab-fr">${v.fr}</span>
        <span class="vocab-ipa">[${v.ipa}]</span>
      </div>
      <div class="vocab-note">${v.note}</div>
      <div class="vocab-actions">
        <button class="iconbtn" data-action="play" data-ref="voc-${i}">🔊 Écouter</button>
        <button class="iconbtn" data-action="mic-match" data-ref="voc-${i}" data-feedback="fb-voc-${i}">🎤 Répéter</button>
      </div>
      <div id="fb-voc-${i}"></div>
    </div>`).join("");
  return `
  <div class="card">
    <span class="step-label">Vocabulaire du jour</span>
    ${items}
  </div>`;
}

function renderStepListening(d) {
  const opts = d.listening.options.map((o, i) =>
    `<button class="option" data-action="quiz" data-idx="${i}" data-answer="${d.listening.answer}">${o}</button>`
  ).join("");
  return `
  <div class="card">
    <span class="step-label">Écoute</span>
    <p class="small muted">Écoute le texte autant de fois que nécessaire, puis réponds à la question.</p>
    <div class="play-row"><button class="iconbtn" data-action="play" data-ref="listen">🔊 Écouter le texte</button></div>
    <hr class="rule">
    <p><strong>${d.listening.question}</strong></p>
    <div id="quiz-box">${opts}</div>
  </div>`;
}

function renderStepConversation(d) {
  const items = d.conversation.map((q, i) => `
    <div class="qa-item">
      <div class="qa-q">${q}</div>
      <div class="play-row">
        <button class="iconbtn" data-action="play" data-ref="conv-${i}">🔊</button>
        <button class="iconbtn" data-action="mic-open" data-ref="conv-${i}" data-feedback="fb-conv-${i}">🎤 Répondre à voix haute</button>
      </div>
      <div class="qa-transcript" id="fb-conv-${i}">Ta réponse apparaîtra ici…</div>
    </div>`).join("");
  return `
  <div class="card">
    <span class="step-label">Conversation</span>
    <p class="small muted">Réponds à voix haute à chaque question. Le texte reconnu s'affiche pour que tu (ou ton tuteur) puisses le relire.</p>
    ${items}
  </div>`;
}

function renderStepChallenge(d) {
  return `
  <div class="card tint-ember">
    <span class="step-label">Défi du jour</span>
    <p>${d.challenge}</p>
    <div class="play-row">
      <button class="iconbtn" data-action="mic-challenge" data-ref="challenge" data-feedback="fb-challenge">🎤 Enregistrer mon défi</button>
    </div>
    <div class="qa-transcript" id="fb-challenge">Ton enregistrement apparaîtra ici…</div>
  </div>`;
}

function renderStepSummary(d) {
  const already = STATE.completedDays.includes(d.day);
  return `
  <div class="card tint-gold">
    <span class="step-label">Bilan du jour</span>
    <p>Bravo, tu as travaillé la prononciation, le vocabulaire, l'écoute et la conversation autour de : <strong>${d.title}</strong>.</p>
    ${d.concept ? `<p class="small muted">Termine ce jour pour débloquer la fiche concept « ${d.concept.title} ».</p>` : ""}
    ${already ? `<p class="small" style="color:var(--success);">✓ Jour déjà validé — tu peux le rejouer autant que tu veux pour t'entraîner.</p>` : `<p class="small muted">Clique sur « Terminer le jour » pour valider ta progression et gagner ton XP.</p>`}
  </div>`;
}

/* ============================================================
   INTERACTIONS (délégation d'événements)
   ============================================================ */

function setFeedbackListening(el, isListening) {
  if (!el) return;
  el.classList.toggle("listening", isListening);
}

function handleMicMatch(ref, feedbackId) {
  const target = window.__textMap[ref];
  const btn = document.querySelector(`[data-ref="${ref}"][data-action="mic-match"]`);
  const fb = document.getElementById(feedbackId);
  if (!recognitionSupported()) {
    fb.innerHTML = `<div class="feedback low">🎤 Micro non supporté par ce navigateur. Essaie Chrome ou Edge.</div>`;
    return;
  }
  setFeedbackListening(btn, true);
  fb.innerHTML = `<div class="feedback mid">🎧 Je t'écoute…</div>`;
  startRecognition(
    (transcript) => {
      setFeedbackListening(btn, false);
      const score = similarity(transcript, target);
      let cls = "low", msg = "Réessaie — écoute encore une fois puis répète lentement.";
      if (score >= 0.75) { cls = "good"; msg = "Excellente prononciation ! 🎉"; }
      else if (score >= 0.45) { cls = "mid"; msg = "Bien, presque parfait — encore un essai ?"; }
      fb.innerHTML = `<div class="feedback ${cls}">${msg}<span class="transcript">Entendu : « ${transcript || "…"} »</span></div>`;
    },
    (err) => {
      setFeedbackListening(btn, false);
      fb.innerHTML = `<div class="feedback low">Je n'ai rien entendu (${err}). Vérifie l'autorisation du micro et réessaie.</div>`;
    }
  );
}

function handleMicOpen(ref, feedbackId) {
  const btn = document.querySelector(`[data-ref="${ref}"][data-action="mic-open"]`);
  const fb = document.getElementById(feedbackId);
  if (!recognitionSupported()) {
    fb.innerHTML = `Micro non supporté par ce navigateur. Essaie Chrome ou Edge.`;
    return;
  }
  setFeedbackListening(btn, true);
  fb.textContent = "🎧 Je t'écoute… parle librement.";
  startRecognition(
    (transcript) => {
      setFeedbackListening(btn, false);
      const words = transcript.split(/\s+/).filter(Boolean).length;
      fb.innerHTML = `« ${transcript || "…"} »<br><span class="muted" style="font-style:normal;">${words} mot(s) reconnu(s).</span>`;
    },
    (err) => {
      setFeedbackListening(btn, false);
      fb.textContent = `Je n'ai rien entendu (${err}). Réessaie.`;
    },
    { continuous: true }
  );
}

function handleMicChallenge(ref, feedbackId, dayObj) {
  const btn = document.querySelector(`[data-ref="${ref}"][data-action="mic-challenge"]`);
  const fb = document.getElementById(feedbackId);
  if (!recognitionSupported()) {
    fb.innerHTML = `Micro non supporté par ce navigateur. Essaie Chrome ou Edge.`;
    return;
  }
  setFeedbackListening(btn, true);
  fb.textContent = "🎧 Enregistrement en cours… parle pendant 30 à 60 secondes, puis attends la fin.";
  startRecognition(
    (transcript) => {
      setFeedbackListening(btn, false);
      const words = transcript.split(/\s+/).filter(Boolean).length;
      const usedWords = dayObj.vocab.filter(v => {
        const w = v.fr.split(" ")[0].toLowerCase();
        return transcript.toLowerCase().includes(w);
      });
      fb.innerHTML = `« ${transcript || "…"} »<br><span class="muted" style="font-style:normal;">${words} mot(s) au total`
        + (usedWords.length ? ` · mots du jour utilisés : ${usedWords.map(v => v.fr).join(", ")} 🎉` : "")
        + `</span>`;
    },
    (err) => {
      setFeedbackListening(btn, false);
      fb.textContent = `Je n'ai rien entendu (${err}). Réessaie.`;
    },
    { continuous: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("view-root");

  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;

    if (action === "nav") { ui.view = el.dataset.view; render(); }
    else if (action === "start") { ui.view = "lesson"; ui.lessonDay = Number(el.dataset.day); ui.step = 0; ui.reviewWords = null; render(); }
    else if (action === "prev-step") { ui.step = Math.max(0, ui.step - 1); window.speechSynthesis && window.speechSynthesis.cancel(); render(); }
    else if (action === "next-step") { ui.step += 1; window.speechSynthesis && window.speechSynthesis.cancel(); render(); }
    else if (action === "finish-day") { markDayComplete(Number(el.dataset.day)); }
    else if (action === "play") { speak(window.__textMap[el.dataset.ref]); }
    else if (action === "mic-match") { handleMicMatch(el.dataset.ref, el.dataset.feedback); }
    else if (action === "mic-open") { handleMicOpen(el.dataset.ref, el.dataset.feedback); }
    else if (action === "mic-challenge") { handleMicChallenge(el.dataset.ref, el.dataset.feedback, getDay(ui.lessonDay)); }
    else if (action === "quiz") {
      const box = document.getElementById("quiz-box");
      const idx = Number(el.dataset.idx), answer = Number(el.dataset.answer);
      box.querySelectorAll(".option").forEach((opt, i) => {
        opt.disabled = true;
        if (i === answer) opt.classList.add("correct");
        else if (i === idx) opt.classList.add("wrong");
      });
    }
    else if (action === "test-voice") { speak("Bonjour ! Voici un exemple de voix française pour ton entraînement."); }
    else if (action === "reset") {
      if (confirm("Réinitialiser toute ta progression ? Cette action est définitive.")) {
        localStorage.removeItem(STORAGE_KEY);
        STATE = defaultState();
        saveState();
        ui.view = "home";
        render();
      }
    }
    else if (action === "close-celebration") { showNextCelebration(); if (!ui.celebrationQueue.length) render(); }
  });

  root.addEventListener("change", (e) => {
    if (e.target.id === "rate-slider") {
      STATE.settings.rate = Number(e.target.value);
      saveState();
    }
    if (e.target.id === "voice-select") {
      STATE.settings.voiceURI = e.target.value;
      saveState();
    }
  });

  document.getElementById("bottomnav").addEventListener("click", (e) => {
    const btn = e.target.closest(".navbtn");
    if (!btn) return;
    ui.view = btn.dataset.view;
    render();
  });

  document.getElementById("toast-layer").addEventListener("click", (e) => {
    if (e.target.dataset.action === "close-celebration") {
      showNextCelebration();
      if (!ui.celebrationQueue.length) render();
    }
  });

  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
