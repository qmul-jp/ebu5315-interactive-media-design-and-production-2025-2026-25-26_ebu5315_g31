(() => {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const centre = { x: 410, y: 310 };
  const radius = 220;

  const missions = [
    mission("central60", "angle", 1, 60, ["A", "B"],
      ["60° Central Angle", "60° 圆心角"], ["Create ∠AOB = 60°.", "构造 ∠AOB = 60°。"],
      ["A central angle equals the measure of its intercepted arc.", "圆心角的度数等于它所对弧的度数。"]),
    mission("central90", "angle", 1, 90, ["A", "B"],
      ["Quarter-circle Builder", "四分之一圆构造"], ["Create ∠AOB = 90°.", "构造 ∠AOB = 90°。"],
      ["A 90° central angle cuts off one quarter of a circle.", "90° 圆心角截取整个圆的四分之一。"]),
    mission("central120", "angle", 1, 120, ["A", "B"],
      ["120° Arc Architect", "120° 弧设计师"], ["Create ∠AOB = 120°.", "构造 ∠AOB = 120°。"],
      ["The minor arc has the same 120° measure.", "对应小弧同样为 120°。"]),
    mission("inscribed30", "inscribed", 2, 60, ["A", "B", "C"],
      ["30° Inscribed Lens", "30° 圆周角镜头"], ["Create central angle 60°, then place C so ∠ACB = 30°.", "先构造 60° 圆心角，再放置 C 使 ∠ACB = 30°。"],
      ["An inscribed angle is half the central angle on the same arc.", "同弧所对圆周角等于圆心角的一半。"]),
    mission("inscribed45", "inscribed", 2, 90, ["A", "B", "C"],
      ["45° Inscribed Lens", "45° 圆周角镜头"], ["Create central angle 90°, then make ∠ACB = 45°.", "构造 90° 圆心角，再使 ∠ACB = 45°。"],
      ["Moving C on the opposite arc preserves the half-angle relationship.", "C 在对侧弧移动时，一半关系始终成立。"]),
    mission("inscribed60", "inscribed", 2, 120, ["A", "B", "C"],
      ["60° Inscribed Lens", "60° 圆周角镜头"], ["Create central angle 120°, then make ∠ACB = 60°.", "构造 120° 圆心角，再使 ∠ACB = 60°。"],
      ["The geometry engine checks both the central and inscribed angles.", "几何引擎会同时检查圆心角和圆周角。"]),
    mission("thales", "thales", 3, 180, ["A", "B", "C"],
      ["Thales Triangle", "泰勒斯三角形"], ["Place A and B at opposite ends of a diameter; add C anywhere else on the circle.", "把 A、B 放在直径两端，再把 C 放到圆上其他位置。"],
      ["A triangle built on a diameter always has a 90° angle at C.", "以直径为一边的圆内接三角形在 C 点始终为 90°。"]),
    mission("tangent", "tangent", 3, 90, ["T", "P"],
      ["Tangent Launch Pad", "切线发射台"], ["Place T on the circle and P outside so PT is perpendicular to OT.", "在圆上放置 T，在圆外放置 P，使 PT 垂直于 OT。"],
      ["The tangent is perpendicular to the radius at the contact point.", "切线在切点处垂直于半径。"]),
    mission("cyclic", "cyclic", 4, 70, ["A", "B", "C", "D"],
      ["Cyclic Balance", "圆内接四边形平衡"], ["Build a cyclic quadrilateral with ∠A = 70° and opposite angle ∠C = 110°.", "构造一个 ∠A = 70°、对角 ∠C = 110° 的圆内接四边形。"],
      ["Every quadrilateral with four vertices on the circle has supplementary opposite angles.", "四个顶点都在圆上的四边形，其对角互补。"]),
    mission("diameterChord", "bisector", 4, 90, ["A", "B", "M"],
      ["Chord Midpoint Finder", "弦中点寻找器"], ["Place A and B on the circle, then place M at the midpoint of chord AB.", "在圆上放置 A、B，再把 M 放到弦 AB 的中点。"],
      ["A perpendicular from the centre bisects a chord.", "从圆心到弦的垂线平分该弦。"]),
    mission("equalChords", "equalChords", 4, 0, ["A", "B", "C", "D"],
      ["Equal Chord Studio", "等弦工作室"], ["Construct two chords AB and CD with equal length.", "构造长度相等的两条弦 AB 与 CD。"],
      ["Equal chords are equally distant from the centre and subtend equal angles.", "等弦到圆心距离相等，并对应相等的圆心角。"]),
    mission("power", "power", 4, 0, ["P", "A", "B", "T"],
      ["Power-of-a-Point Finale", "点幂终极挑战"], ["Place P outside, A and B on one ray from P, and T to form a tangent-like segment satisfying PT² ≈ PA × PB.", "在圆外放置 P，并放置 A、B、T，使 PT² ≈ PA × PB。"],
      ["Power of a point connects tangent and secant lengths through PT² = PA × PB.", "点幂定理用 PT² = PA × PB 连接切线与割线长度。"])
  ];

  function mission(id, type, tier, target, labels, title, brief, concept) {
    return { id, type, tier, target, labels, title, brief, concept };
  }

  const text = {
    en: {
      pageEyebrow: "Interactive geometry mission arcade", pageTitle: "Place. Drag. Measure. Master.",
      pageIntro: "Complete 12 visual missions. Lines are built automatically from your points, while the geometry engine checks the actual relationships.",
      careTitle: "A patient space for precise thinking",
      careBody: "No countdown and no limited lives. Every point can be moved, every mission can be retried, and hints never block progress.",
      xp: "Total XP", stars: "Stars", missions: "Missions", best: "Best precision", path: "Mission path",
      next: "Next action", place: "Click the canvas to place", drag: "All points placed. Drag any point to refine the construction.",
      guide: "Show target guide", hideGuide: "Hide target guide", undo: "Undo point", clear: "Clear construction",
      validate: "Validate mission", live: "Live geometry", concept: "Concept card", hintTitle: "Need a strategic hint?",
      hintCost: "Hints reduce the XP bonus, but never block progress.", ready: "Construction ready for your first point.",
      incomplete: "A few pieces are still waiting", close: "Your idea is taking shape. Refine one relationship.", success: "Relationship understood and validated",
      all: "All", tier: "Tier", reset: "Reset", confirmReset: "Reset all mission stars and XP?",
      onCircle: "on circle", outside: "outside circle", free: "free position", accuracy: "Precision", target: "Target",
      completed: "Completed", available: "Available", hintUsed: "Hint revealed. Use the target guide or live measurements to refine your construction."
    },
    zh: {
      pageEyebrow: "互动式几何任务街机", pageTitle: "放置、拖动、测量、掌握。",
      pageIntro: "完成 12 个可视化任务。系统会根据关键点自动连线，并检查真实几何关系。",
      careTitle: "一个允许耐心思考的空间",
      careBody: "没有倒计时，也没有有限生命。每个点都可以移动，每个任务都可以重试，提示永远不会阻止进步。",
      xp: "总经验值", stars: "星级", missions: "任务", best: "最佳精度", path: "任务路线",
      next: "下一步", place: "点击画布放置", drag: "所有点已放置。拖动任意点微调构造。",
      guide: "显示目标引导", hideGuide: "隐藏目标引导", undo: "撤销点", clear: "清空构造",
      validate: "验证任务", live: "实时几何", concept: "概念卡片", hintTitle: "需要策略提示？",
      hintCost: "提示会减少经验值奖励，但不会阻止学习。", ready: "构造已准备好，请放置第一个点。",
      incomplete: "还有一些构造要素等待完成", close: "思路正在成形，请调整其中一个关系。", success: "几何关系已理解并验证",
      all: "全部", tier: "等级", reset: "重置", confirmReset: "确定重置全部任务星级和经验值吗？",
      onCircle: "圆上", outside: "圆外", free: "自由位置", accuracy: "精度", target: "目标",
      completed: "已完成", available: "可挑战", hintUsed: "提示已显示。请利用目标引导或实时测量继续调整。"
    }
  };
  Object.assign(text, window.CM6?.gameUI || {});
  text.en.nothingLost = "Nothing is lost; continue when ready."; text.en.adjust = "Drag a point gently and watch the live measurement respond."; text.en.alignment = "A–B alignment";
  text.zh.nothingLost = "不会丢失任何内容，准备好后继续即可。"; text.zh.adjust = "轻轻拖动一个点，观察实时测量如何变化。"; text.zh.alignment = "A–B 共线";
  ["ko", "ja", "de", "ru"].forEach((lang) => { text[lang].alignment = { ko:"A–B 일직선", ja:"A–B の一直線性", de:"A–B-Ausrichtung", ru:"Расположение A–B на одной прямой" }[lang]; });

  const state = {
    missionIndex: 0, filter: 0, points: [], drag: -1, ghost: false, hint: false,
    records: JSON.parse(localStorage.getItem("cm2_game_records") || "{}")
  };

  const ui = Object.fromEntries([
    "totalXp", "totalStars", "missionComplete", "bestPrecision", "missionFilters", "missionList", "missionMeta",
    "missionTitle", "missionBrief", "missionStars", "nextAction", "pointSlots", "canvasHelp", "measureGrid",
    "conceptTitle", "conceptBody", "missionFeedback", "showGhost"
  ].map((id) => [id, document.getElementById(id)]));

  const L = () => window.cmLang || "en";
  const T = (key) => text[L()]?.[key] || key;
  const localizedMissionText = (missionValue) => {
    const mission = missions.find((item) => item.title === missionValue || item.brief === missionValue || item.concept === missionValue);
    const field = mission?.title === missionValue ? 0 : mission?.brief === missionValue ? 1 : 2;
    if (L() === "en") return missionValue[0];
    if (L() === "zh") return missionValue[1];
    return window.CM6?.gameMission?.(L(), mission)?.[field] || "";
  };
  const current = () => missions[state.missionIndex];
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const angle = (v, a, b) => {
    const x = { x: a.x - v.x, y: a.y - v.y }, y = { x: b.x - v.x, y: b.y - v.y };
    const d = (x.x * y.x + x.y * y.y) / (Math.hypot(x.x, x.y) * Math.hypot(y.x, y.y));
    return Math.acos(Math.max(-1, Math.min(1, d))) * 180 / Math.PI;
  };
  const snapCircle = (p) => {
    const dx = p.x - centre.x, dy = p.y - centre.y, m = Math.hypot(dx, dy) || 1;
    return { x: centre.x + dx / m * radius, y: centre.y + dy / m * radius };
  };
  const pointAt = (degrees, r = radius) => ({ x: centre.x + Math.cos(degrees * Math.PI / 180) * r, y: centre.y + Math.sin(degrees * Math.PI / 180) * r });

  function pointRule(index) {
    const type = current().type;
    if (type === "tangent") return index === 0 ? "circle" : "outside";
    if (type === "bisector") return index < 2 ? "circle" : "free";
    if (type === "power") return index === 0 ? "outside" : "circle";
    return "circle";
  }

  function adaptPoint(raw, index) {
    const rule = pointRule(index);
    if (rule === "circle") return snapCircle(raw);
    if (rule === "outside" && dist(raw, centre) < radius + 55) {
      const p = snapCircle(raw);
      return { x: centre.x + (p.x - centre.x) * 1.45, y: centre.y + (p.y - centre.y) * 1.45 };
    }
    return raw;
  }

  function defaultGhostPoints() {
    const m = current();
    if (m.type === "angle") return [pointAt(-m.target / 2), pointAt(m.target / 2)];
    if (m.type === "inscribed") return [pointAt(180 - m.target / 2), pointAt(180 + m.target / 2), pointAt(0)];
    if (m.type === "thales") return [pointAt(180), pointAt(0), pointAt(270)];
    if (m.type === "tangent") return [pointAt(0), { x: centre.x + radius, y: centre.y - 220 }];
    if (m.type === "cyclic") return [pointAt(180), pointAt(320), pointAt(30), pointAt(100)];
    if (m.type === "bisector") { const a = pointAt(220), b = pointAt(320); return [a, b, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }]; }
    if (m.type === "equalChords") return [pointAt(200), pointAt(260), pointAt(20), pointAt(80)];
    return [{ x: 720, y: 310 }, pointAt(0), pointAt(180), { x: 566, y: 155 }];
  }

  function metrics() {
    const p = state.points, m = current(), list = [];
    if (m.type === "angle" && p.length >= 2) list.push(metric("∠AOB", angle(centre, p[0], p[1]), m.target, 4));
    if (m.type === "inscribed") {
      if (p.length >= 2) list.push(metric("∠AOB", angle(centre, p[0], p[1]), m.target, 5));
      if (p.length >= 3) list.push(metric("∠ACB", angle(p[2], p[0], p[1]), m.target / 2, 3));
    }
    if (m.type === "thales") {
      if (p.length >= 2) list.push(metric("∠AOB", angle(centre, p[0], p[1]), 180, 4));
      if (p.length >= 3) list.push(metric("∠ACB", angle(p[2], p[0], p[1]), 90, 3));
    }
    if (m.type === "tangent" && p.length >= 2) list.push(metric("∠OTP", angle(p[0], centre, p[1]), 90, 4));
    if (m.type === "cyclic" && p.length >= 4) {
      list.push(metric("∠A", angle(p[0], p[3], p[1]), m.target, 5));
      list.push(metric("∠C", angle(p[2], p[1], p[3]), 180 - m.target, 5));
      list.push(metric("∠A + ∠C", angle(p[0], p[3], p[1]) + angle(p[2], p[1], p[3]), 180, 4));
      list.push(metric("∠B + ∠D", angle(p[1], p[0], p[2]) + angle(p[3], p[2], p[0]), 180, 4));
    }
    if (m.type === "bisector" && p.length >= 3) {
      list.push(metric("AM − MB", Math.abs(dist(p[0], p[2]) - dist(p[2], p[1])), 0, 8, "px"));
      list.push(metric("OM ⟂ AB", angle(p[2], centre, p[0]), 90, 5));
    }
    if (m.type === "equalChords" && p.length >= 4) list.push(metric("|AB − CD|", Math.abs(dist(p[0], p[1]) - dist(p[2], p[3])), 0, 8, "px"));
    if (m.type === "power" && p.length >= 4) {
      const left = dist(p[0], p[3]) ** 2, right = dist(p[0], p[1]) * dist(p[0], p[2]);
      list.push(metric("|PT² − PA×PB|", Math.abs(left - right) / 1000, 0, 3, "k"));
      list.push({ name: T("alignment"), pass: Math.abs(angle(p[0], p[1], p[2])) < 6 || Math.abs(angle(p[0], p[1], p[2]) - 180) < 6 });
    }
    return list;
  }

  function metric(name, value, target, tolerance, unit = "°") {
    return { name, value, target, tolerance, unit, pass: Math.abs(value - target) <= tolerance };
  }

  function result() {
    if (state.points.length < current().labels.length) return { complete: false, pass: false, precision: 0, list: metrics() };
    const list = metrics();
    const pass = list.every((item) => item.pass);
    const numeric = list.filter((item) => item.value !== undefined);
    const error = numeric.reduce((sum, item) => sum + Math.abs(item.value - item.target) / Math.max(1, item.tolerance), 0) / Math.max(1, numeric.length);
    return { complete: true, pass, precision: Math.max(0, Math.round(100 - error * 12)), list };
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
  }

  function nearest(raw) {
    let found = -1, best = 42;
    state.points.forEach((p, i) => { const d = dist(raw, p); if (d < best) { best = d; found = i; } });
    return found;
  }

  function addPoint(raw) {
    if (state.points.length >= current().labels.length) return;
    state.points.push(adaptPoint(raw, state.points.length));
    render();
  }

  function colour(name) { return getComputedStyle(document.body).getPropertyValue(name).trim(); }
  function line(a, b, stroke, width = 4, dashed = false, alpha = 1) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.beginPath(); if (dashed) ctx.setLineDash([9, 8]);
    ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); ctx.restore();
  }
  function dot(p, label, stroke, ghost = false) {
    ctx.save(); ctx.globalAlpha = ghost ? .32 : 1; ctx.beginPath(); ctx.arc(p.x, p.y, ghost ? 12 : 10, 0, Math.PI * 2);
    ctx.fillStyle = stroke; ctx.fill(); ctx.strokeStyle = colour("--surface"); ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = colour("--ink"); ctx.font = "800 19px system-ui"; ctx.fillText(label, p.x + 14, p.y - 13); ctx.restore();
  }

  function drawConnections(points, ghost = false) {
    if (!points.length) return;
    const m = current(), primary = ghost ? colour("--muted") : colour("--brand"), accent = ghost ? colour("--muted") : colour("--accent");
    if (["angle", "inscribed", "thales"].includes(m.type)) {
      if (points[0]) line(centre, points[0], accent, 3, ghost, ghost ? .35 : 1);
      if (points[1]) line(centre, points[1], accent, 3, ghost, ghost ? .35 : 1);
    }
    if (m.type === "inscribed" && points[2]) { line(points[2], points[0], primary, 4, ghost); line(points[2], points[1], primary, 4, ghost); }
    if (m.type === "thales" && points[1]) line(points[0], points[1], accent, 5, ghost);
    if (m.type === "thales" && points[2]) { line(points[2], points[0], primary, 4, ghost); line(points[2], points[1], primary, 4, ghost); }
    if (m.type === "tangent" && points[0]) line(centre, points[0], accent, 4, ghost);
    if (m.type === "tangent" && points[1]) line(points[0], points[1], primary, 5, ghost);
    if (m.type === "cyclic") points.forEach((p, i) => points[(i + 1) % points.length] && line(p, points[(i + 1) % points.length], primary, 4, ghost));
    if (m.type === "bisector") { if (points[1]) line(points[0], points[1], primary, 5, ghost); if (points[2]) line(centre, points[2], accent, 4, ghost); }
    if (m.type === "equalChords") { if (points[1]) line(points[0], points[1], primary, 5, ghost); if (points[3]) line(points[2], points[3], accent, 5, ghost); }
    if (m.type === "power") { if (points[2]) line(points[0], points[2], accent, 4, ghost); if (points[3]) line(points[0], points[3], primary, 5, ghost); }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colour("--surface-2"); ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 10; x < canvas.width; x += 40) line({ x, y: 0 }, { x, y: canvas.height }, colour("--line"), 1, false, .5);
    for (let y = 10; y < canvas.height; y += 40) line({ x: 0, y }, { x: canvas.width, y }, colour("--line"), 1, false, .5);
    ctx.beginPath(); ctx.arc(centre.x, centre.y, radius, 0, Math.PI * 2); ctx.strokeStyle = colour("--brand"); ctx.lineWidth = 5; ctx.stroke();
    dot(centre, "O", colour("--accent"));
    if (state.ghost) { const ghosts = defaultGhostPoints(); drawConnections(ghosts, true); ghosts.forEach((p, i) => dot(p, current().labels[i], colour("--muted"), true)); }
    drawConnections(state.points);
    state.points.forEach((p, i) => dot(p, current().labels[i], i === state.drag ? colour("--accent") : colour("--brand")));
  }

  function updateCopy() {
    document.getElementById("gameEyebrow").textContent = T("pageEyebrow");
    document.getElementById("gamePageTitle").textContent = T("pageTitle");
    document.getElementById("gamePageIntro").textContent = T("pageIntro");
    document.getElementById("gameCareTitle").textContent = T("careTitle");
    document.getElementById("gameCareBody").textContent = T("careBody");
    document.getElementById("dashboardXpLabel").textContent = T("xp");
    document.getElementById("dashboardStarsLabel").textContent = T("stars");
    document.getElementById("dashboardCompleteLabel").textContent = T("missions");
    document.getElementById("dashboardBestLabel").textContent = T("best");
    document.getElementById("missionPathLabel").textContent = T("path");
    document.getElementById("nextActionLabel").textContent = T("next");
    document.getElementById("liveMeasureLabel").textContent = T("live");
    document.getElementById("conceptLabel").textContent = T("concept");
    document.getElementById("hintTitle").textContent = T("hintTitle");
    document.getElementById("hintCost").textContent = T("hintCost");
    document.getElementById("undoPoint").textContent = T("undo");
    document.getElementById("clearMission").textContent = T("clear");
    document.getElementById("validateMission").textContent = T("validate");
    document.getElementById("resetProgress").textContent = T("reset");
  }

  function dashboard() {
    const records = Object.values(state.records), xp = records.reduce((s, r) => s + (r.xp || 0), 0), stars = records.reduce((s, r) => s + (r.stars || 0), 0);
    ui.totalXp.textContent = xp; ui.totalStars.textContent = `${stars} / 36`; ui.missionComplete.textContent = `${records.length} / 12`;
    ui.bestPrecision.textContent = records.length ? `${Math.max(...records.map((r) => r.precision || 0))}%` : "—";
  }

  function renderBrowser() {
    ui.missionFilters.innerHTML = [0, 1, 2, 3, 4].map((tier) => `<button type="button" class="${state.filter === tier ? "active" : ""}" data-tier="${tier}">${tier ? `${T("tier")} ${tier}` : T("all")}</button>`).join("");
    ui.missionFilters.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { state.filter = Number(b.dataset.tier); renderBrowser(); }));
    ui.missionList.innerHTML = missions.map((m, i) => ({ m, i })).filter(({ m }) => !state.filter || m.tier === state.filter).map(({ m, i }) => {
      const record = state.records[m.id];
      return `<button type="button" class="mission-item ${i === state.missionIndex ? "active" : ""}" data-index="${i}">
        <span class="mission-tier">${T("tier")} ${m.tier}</span><span><strong>${localizedMissionText(m.title)}</strong><small>${record ? `${"★".repeat(record.stars)}${"☆".repeat(3 - record.stars)} · ${record.precision}%` : T("available")}</small></span>
      </button>`;
    }).join("");
    ui.missionList.querySelectorAll(".mission-item").forEach((b) => b.addEventListener("click", () => loadMission(Number(b.dataset.index))));
  }

  function renderMetrics() {
    const list = metrics();
    ui.measureGrid.innerHTML = list.length ? list.map((m) => `<div class="measure-row"><span>${m.name}</span><strong class="${m.pass ? "metric-pass" : "metric-miss"}">${m.value !== undefined ? `${m.value.toFixed(1)}${m.unit || "°"} / ${m.target}${m.unit || "°"}` : (m.pass ? "✓" : "…")}</strong></div>`).join("") : `<div class="measure-row"><span>${T("ready")}</span><strong>—</strong></div>`;
  }

  function render() {
    updateCopy(); dashboard(); renderBrowser();
    const m = current(), record = state.records[m.id];
    ui.missionMeta.textContent = `${T("tier")} ${m.tier} · ${state.missionIndex + 1}/12`;
    ui.missionTitle.textContent = localizedMissionText(m.title); ui.missionBrief.textContent = localizedMissionText(m.brief);
    ui.conceptTitle.textContent = localizedMissionText(m.title); ui.conceptBody.textContent = localizedMissionText(m.concept);
    ui.missionStars.textContent = record ? `${"★".repeat(record.stars)}${"☆".repeat(3 - record.stars)}` : "☆☆☆";
    ui.nextAction.textContent = state.points.length < m.labels.length ? `${T("place")} ${m.labels[state.points.length]} (${T(pointRule(state.points.length) === "circle" ? "onCircle" : pointRule(state.points.length) === "outside" ? "outside" : "free")})` : T("drag");
    ui.pointSlots.innerHTML = m.labels.map((label, i) => `<span class="${i < state.points.length ? "filled" : i === state.points.length ? "next" : ""}">${label}</span>`).join("");
    ui.canvasHelp.textContent = state.points.length < m.labels.length ? ui.nextAction.textContent : T("drag");
    ui.showGhost.textContent = state.ghost ? T("hideGuide") : T("guide");
    renderMetrics(); draw();
  }

  function loadMission(index) {
    state.missionIndex = index; state.points = []; state.drag = -1; state.ghost = false; state.hint = false;
    ui.missionFeedback.className = "feedback-panel neutral";
    ui.missionFeedback.innerHTML = `<strong>${T("ready")}</strong><p>${localizedMissionText(current().brief)}</p>`;
    render();
  }

  function validate() {
    const r = result();
    if (!r.complete) {
      ui.missionFeedback.className = "feedback-panel error";
      ui.missionFeedback.innerHTML = `<strong>${T("incomplete")}</strong><p>${ui.nextAction.textContent} ${T("nothingLost")}</p>`; return;
    }
    if (!r.pass) {
      const misses = r.list.filter((x) => !x.pass).map((x) => x.value !== undefined ? `${x.name}: ${x.value.toFixed(1)}${x.unit || "°"} (${T("target")} ${x.target}${x.unit || "°"})` : x.name).join(" · ");
      ui.missionFeedback.className = "feedback-panel error";
      ui.missionFeedback.innerHTML = `<strong>${T("close")}</strong><p>${misses} · ${T("adjust")}</p>`; return;
    }
    const stars = r.precision >= 92 && !state.hint ? 3 : r.precision >= 75 ? 2 : 1;
    const xp = 100 + current().tier * 30 + stars * 25 - (state.hint ? 20 : 0);
    const old = state.records[current().id];
    state.records[current().id] = { precision: Math.max(old?.precision || 0, r.precision), stars: Math.max(old?.stars || 0, stars), xp: Math.max(old?.xp || 0, xp) };
    localStorage.setItem("cm2_game_records", JSON.stringify(state.records));
    ui.missionFeedback.className = "feedback-panel success";
    ui.missionFeedback.innerHTML = `<strong>${T("success")} · ${r.precision}% · ${"★".repeat(stars)}${"☆".repeat(3 - stars)}</strong><p>+${xp} · ${T("xp")} · ${localizedMissionText(current().concept)}</p>`;
    render();
  }

  canvas.addEventListener("pointerdown", (event) => {
    const raw = canvasPoint(event), n = nearest(raw);
    if (n >= 0) { state.drag = n; canvas.setPointerCapture(event.pointerId); }
    else addPoint(raw);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (state.drag < 0) return;
    state.points[state.drag] = adaptPoint(canvasPoint(event), state.drag); renderMetrics(); draw();
  });
  canvas.addEventListener("pointerup", () => { state.drag = -1; render(); });

  document.getElementById("undoPoint").addEventListener("click", () => { state.points.pop(); render(); });
  document.getElementById("clearMission").addEventListener("click", () => { state.points = []; render(); });
  document.getElementById("showGhost").addEventListener("click", () => { state.ghost = !state.ghost; state.hint = true; render(); });
  document.getElementById("hintButton").addEventListener("click", () => { state.hint = true; state.ghost = true; ui.missionFeedback.className = "feedback-panel neutral"; ui.missionFeedback.innerHTML = `<strong>${T("hintTitle")}</strong><p>${T("hintUsed")}</p>`; render(); });
  document.getElementById("validateMission").addEventListener("click", validate);
  document.getElementById("resetProgress").addEventListener("click", () => { if (confirm(T("confirmReset"))) { state.records = {}; localStorage.removeItem("cm2_game_records"); loadMission(0); } });
  document.addEventListener("cm:language", render);
  document.addEventListener("cm:theme", draw);
  loadMission(0);
})();
