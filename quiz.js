(() => {
  const canvas = document.getElementById("quizCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const rnd = (min, max, step = 1) => min + Math.floor(Math.random() * (Math.floor((max - min) / step) + 1)) * step;
  const pick = (array) => array[Math.floor(Math.random() * array.length)];
  const L = () => window.cmLang || "en";
  const langText = (value) => value?.[L()] || "";
  const englishOrChinese = (en, zh) => L() === "zh" ? zh : en;
  const Q = (key, value) => {
    const item = window.CM6?.quizUI?.[L()]?.[key];
    return typeof item === "function" ? item(value) : item || key;
  };
  const QCall = (key, ...values) => {
    const item = window.CM6?.quizUI?.[L()]?.[key];
    return typeof item === "function" ? item(...values) : item || key;
  };
  const care = {
    en: {
      title: "Practice is information, not judgement",
      body: "Use a hint, change an answer, or begin again. Your result is a map for the next step, not a label.",
      breakTitle: "A short pause can help the next idea land.",
      breakBody: "Relax your shoulders, look away from the screen, and take one slow breath. Your question is still here."
    },
    zh: {
      title: "练习提供信息，而不是评价你",
      body: "可以使用提示、修改答案或重新开始。成绩是下一步的地图，不是给你的标签。",
      breakTitle: "短暂休息，可以让下一个想法更容易出现。",
      breakBody: "放松肩膀，暂时看向屏幕外，慢慢呼吸一次。当前题目会一直保留。"
    }
  };

  const modes = {
    sprint: { count: 10, tiers: [1, 2], en: ["10-question Sprint", "Fast visual practice across the core circle rules."], zh: ["10 题冲刺", "快速练习核心圆定理与图形识别。"] },
    standard: { count: 15, tiers: [1, 2, 3], en: ["15-question Standard", "A balanced mock test with direct and multi-step questions."], zh: ["15 题标准测验", "直接题与多步骤题结合的均衡模拟测验。"] },
    exam: { count: 20, tiers: [2, 3, 4], en: ["20-question Exam", "Deeper reasoning, algebra, and theorem selection."], zh: ["20 题考试模式", "包含更深入的推理、代数与定理选择。"] },
    mastery: { count: 25, tiers: [1, 2, 3, 4], en: ["25-question Mastery", "The full adaptive challenge with a wide range of generated values."], zh: ["25 题精通挑战", "覆盖大量随机参数的完整自适应挑战。"] }
  };

  const templates = [
    template("centralArc", 1, () => {
      const a = rnd(40, 160, 10);
      return q("Central angle", "圆心角", `The central angle ∠AOB is ${a}°. What is minor arc AB?`, `圆心角 ∠AOB 为 ${a}°。小弧 AB 是多少度？`,
        a, `A central angle equals its intercepted arc.`, `圆心角与它所对弧的度数相等。`,
        `Arc AB is ${a}°.`, `弧 AB 为 ${a}°。`, { type: "central", angle: a, label: `${a}°` });
    }),
    template("arcToInscribed", 1, () => {
      const arc = rnd(60, 160, 10);
      return q("Inscribed angle", "圆周角", `Minor arc AB is ${arc}°. Find ∠ACB.`, `小弧 AB 为 ${arc}°。求 ∠ACB。`,
        arc / 2, `An inscribed angle is half its intercepted arc.`, `圆周角等于它所对弧度数的一半。`,
        `∠ACB = ${arc}° ÷ 2 = ${arc / 2}°.`, `∠ACB = ${arc}° ÷ 2 = ${arc / 2}°。`, { type: "inscribed", central: arc, label: `arc AB = ${arc}°` });
    }),
    template("inscribedToCentral", 1, () => {
      const ins = rnd(25, 75, 5);
      return q("Inscribed angle", "圆周角", `∠ACB is ${ins}°. Find central angle ∠AOB.`, `∠ACB 为 ${ins}°。求圆心角 ∠AOB。`,
        ins * 2, `The central angle is twice the inscribed angle.`, `同弧所对圆心角是圆周角的两倍。`,
        `∠AOB = 2 × ${ins}° = ${ins * 2}°.`, `∠AOB = 2 × ${ins}° = ${ins * 2}°。`, { type: "inscribed", central: ins * 2, label: `${ins}° at C` });
    }),
    template("thales", 1, () => q("Thales' theorem", "泰勒斯定理", "AB is a diameter. Find ∠ACB.", "AB 是直径。求 ∠ACB。",
      90, "An angle in a semicircle is a right angle.", "半圆所对圆周角是直角。", "∠ACB = 90°.", "∠ACB = 90°。", { type: "thales" })),
    template("radiusDiameter", 1, () => {
      const r = rnd(3, 15);
      return q("Radius and diameter", "半径与直径", `The radius is ${r} cm. Find the diameter.`, `半径为 ${r} cm。求直径。`,
        r * 2, "Diameter = 2 × radius.", "直径 = 2 × 半径。", `Diameter = ${r * 2} cm.`, `直径 = ${r * 2} cm。`, { type: "radius", value: r });
    }),
    template("cyclicOpposite", 2, () => {
      const a = rnd(55, 125, 5);
      return q("Cyclic quadrilateral", "圆内接四边形", `ABCD is cyclic and ∠A = ${a}°. Find ∠C.`, `ABCD 是圆内接四边形，∠A = ${a}°。求 ∠C。`,
        180 - a, "Opposite angles in a cyclic quadrilateral sum to 180°.", "圆内接四边形的对角和为 180°。",
        `∠C = 180° − ${a}° = ${180 - a}°.`, `∠C = 180° − ${a}° = ${180 - a}°。`, { type: "cyclic", labelA: `${a}°`, angleA: a, angleC: 180 - a });
    }),
    template("cyclicExterior", 2, () => {
      const a = rnd(45, 120, 5);
      return q("Cyclic exterior angle", "圆内接四边形外角", `The exterior angle at D is ${a}°. Find the opposite interior angle at B.`, `D 点外角为 ${a}°。求 B 点内对角。`,
        a, "A cyclic exterior angle equals the opposite interior angle.", "圆内接四边形的外角等于内对角。",
        `The opposite interior angle is ${a}°.`, `内对角为 ${a}°。`, { type: "cyclicExterior", value: a });
    }),
    template("chordHalf", 2, () => {
      const full = rnd(8, 28, 2);
      return q("Chord bisector", "垂径定理", `A perpendicular radius bisects chord AB of length ${full} cm. Find AM.`, `半径垂直并平分长度为 ${full} cm 的弦 AB。求 AM。`,
        full / 2, "A perpendicular from the centre bisects the chord.", "从圆心到弦的垂线平分弦。",
        `AM = ${full} ÷ 2 = ${full / 2} cm.`, `AM = ${full} ÷ 2 = ${full / 2} cm。`, { type: "chord", value: full });
    }),
    template("semicircleTriangle", 2, () => {
      const a = rnd(20, 65, 5);
      return q("Triangle in a semicircle", "半圆内三角形", `AB is a diameter and ∠CAB = ${a}°. Find ∠CBA.`, `AB 是直径，∠CAB = ${a}°。求 ∠CBA。`,
        90 - a, "Use Thales' theorem, then the triangle angle sum.", "先使用泰勒斯定理，再使用三角形内角和。",
        `∠CBA = 180° − 90° − ${a}° = ${90 - a}°.`, `∠CBA = 180° − 90° − ${a}° = ${90 - a}°。`, { type: "thales", label: `${a}°`, angleA: a });
    }),
    template("tangentRadius", 2, () => q("Tangent theorem", "切线定理", "PT is tangent at T. Find the angle between OT and PT.", "PT 在 T 点与圆相切。求 OT 与 PT 的夹角。",
      90, "A tangent is perpendicular to the radius at the contact point.", "切线在切点处垂直于半径。",
      "OT ⟂ PT, so the angle is 90°.", "OT ⟂ PT，所以夹角为 90°。", { type: "tangent" })),
    template("tangentChord", 2, () => {
      const a = rnd(25, 70, 5);
      return q("Tangent-chord theorem", "弦切角定理", `The angle between tangent PT and chord TA is ${a}°. Find the angle in the alternate segment.`, `切线 PT 与弦 TA 的夹角为 ${a}°。求交替弓形角。`,
        a, "The tangent-chord angle equals the angle in the alternate segment.", "弦切角等于交替弓形中的圆周角。",
        `The alternate-segment angle is ${a}°.`, `交替弓形角为 ${a}°。`, { type: "tangentChord", value: a });
    }),
    template("equalChords", 2, () => {
      const a = rnd(40, 140, 10);
      return choice("Equal chords", "等弦", `Equal chords AB and CD subtend central angle ∠AOB = ${a}°. What is ∠COD?`, `等弦 AB、CD 所对圆心角 ∠AOB = ${a}°。求 ∠COD。`,
        `${a}°`, [`${a / 2}°`, `${a}°`, `${180 - a}°`, `${Math.min(180, a * 2)}°`],
        "Equal chords subtend equal central angles.", "等弦所对圆心角相等。", `∠COD = ${a}°.`, `∠COD = ${a}°。`, { type: "equalChords", value: a });
    }),
    template("sameSegment", 2, () => {
      const a = rnd(25, 75, 5);
      return choice("Same segment", "同弧圆周角", `Angles ∠ACB and ∠ADB stand on the same chord AB. If ∠ACB = ${a}°, find ∠ADB.`, `∠ACB 与 ∠ADB 同弧 AB。若 ∠ACB = ${a}°，求 ∠ADB。`,
        `${a}°`, [`${a}°`, `${a * 2}°`, `${180 - a}°`, `${90 - a}°`],
        "Angles in the same segment are equal.", "同弧所对圆周角相等。", `∠ADB = ${a}°.`, `∠ADB = ${a}°。`, { type: "sameSegment", value: a });
    }),
    template("cyclicAlgebra", 3, () => {
      const x = rnd(35, 65, 5), k = rnd(5, 25, 5), a = 2 * x + k, b = 180 - a, c = b - x;
      const second = c >= 0 ? `(x + ${c})°` : `(x − ${Math.abs(c)})°`;
      const equationConstant = k + c;
      return q("Cyclic algebra", "圆内接四边形代数", `ABCD is cyclic. Opposite angles A and C are (2x + ${k})° and ${second}. Find x.`, `ABCD 是圆内接四边形。对角 A、C 分别为 (2x + ${k})° 和 ${second}。求 x。`,
        x, "Opposite angles sum to 180°.", "圆内接四边形对角和为 180°。",
        `3x ${equationConstant >= 0 ? "+" : "−"} ${Math.abs(equationConstant)} = 180, so x = ${x}.`, `3x ${equationConstant >= 0 ? "+" : "−"} ${Math.abs(equationConstant)} = 180，所以 x = ${x}。`,
        { type: "cyclicAlgebra", exprA: `(2x + ${k})°`, exprC: second, angleA: a, angleC: b });
    }),
    template("tangentPythagoras", 3, () => {
      const triples = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      return q("Tangent length", "切线长度", `OT = ${triples[0]} cm, OP = ${triples[2]} cm, and PT is tangent. Find PT.`, `OT = ${triples[0]} cm，OP = ${triples[2]} cm，PT 为切线。求 PT。`,
        triples[1], "OT is perpendicular to PT, so use Pythagoras.", "OT 垂直于 PT，因此使用勾股定理。",
        `PT = √(${triples[2]}² − ${triples[0]}²) = ${triples[1]} cm.`, `PT = √(${triples[2]}² − ${triples[0]}²) = ${triples[1]} cm。`, { type: "tangentTriangle", values: triples });
    }),
    template("intersectingChords", 3, () => {
      const a = rnd(2, 8), b = rnd(3, 9), c = pick([2, 3, 4, 6]), product = a * b;
      if (product % c) return templates.find((t) => t.id === "intersectingChords").make();
      return q("Intersecting chords", "相交弦定理", `AX = ${a}, XB = ${b}, CX = ${c}. Find XD.`, `AX = ${a}，XB = ${b}，CX = ${c}。求 XD。`,
        product / c, "Use AX × XB = CX × XD.", "使用 AX × XB = CX × XD。",
        `XD = (${a} × ${b}) ÷ ${c} = ${product / c}.`, `XD = (${a} × ${b}) ÷ ${c} = ${product / c}。`, { type: "intersecting", values: [a, b, c] });
    }),
    template("pointPower", 3, () => {
      const ext = pick([2, 4, 8, 9]), whole = pick([8, 9, 18, 16, 25]), product = ext * whole, root = Math.sqrt(product);
      if (!Number.isInteger(root)) return templates.find((t) => t.id === "pointPower").make();
      return q("Power of a point", "点幂定理", `A secant from P has external length ${ext} and whole length ${whole}. Find tangent PT.`, `从 P 点作割线，外部长度为 ${ext}，总长度为 ${whole}。求切线 PT。`,
        root, "Use PT² = external length × whole length.", "使用 PT² = 割线外部长度 × 割线总长度。",
        `PT = √(${ext} × ${whole}) = ${root}.`, `PT = √(${ext} × ${whole}) = ${root}。`, { type: "power", values: [ext, whole] });
    }),
    template("arcFraction", 3, () => {
      const angle = pick([45, 60, 72, 90, 120, 144, 180]);
      return choice("Arc fraction", "弧所占比例", `A central angle is ${angle}°. What fraction of the full circle is its arc?`, `圆心角为 ${angle}°。它所对弧占整圆的比例是多少？`,
        simplify(angle, 360), [simplify(angle, 360), simplify(360 - angle, 360), simplify(angle, 180), simplify(180 - angle, 360)],
        "Divide the central angle by 360°.", "用圆心角除以 360°。", `${angle}/360 = ${simplify(angle, 360)}.`, `${angle}/360 = ${simplify(angle, 360)}。`, { type: "central", angle, label: `${angle}°` });
    }),
    template("sectorArcLength", 4, () => {
      const [r, angle] = pick([[3, 60], [4, 90], [6, 120], [8, 180], [10, 90], [5, 180]]), answer = angle / 360 * 2 * r;
      return q("Arc length with π", "含 π 的弧长", `Radius = ${r} cm and central angle = ${angle}°. Find the coefficient of π in the arc length.`, `半径为 ${r} cm，圆心角为 ${angle}°。求弧长中 π 的系数。`,
        answer, "Arc length = angle/360 × 2πr. Enter only the coefficient of π.", "弧长 = 圆心角/360 × 2πr，只输入 π 的系数。",
        `Arc length = ${answer}π cm.`, `弧长 = ${answer}π cm。`, { type: "central", angle, label: `r=${r}` }, .11);
    }),
    template("sectorArea", 4, () => {
      const r = pick([4, 6, 8, 10]), angle = pick([45, 90, 180]), answer = angle / 360 * r * r;
      return q("Sector area with π", "含 π 的扇形面积", `Radius = ${r} cm and central angle = ${angle}°. Find the coefficient of π in the sector area.`, `半径为 ${r} cm，圆心角为 ${angle}°。求扇形面积中 π 的系数。`,
        answer, "Sector area = angle/360 × πr². Enter only the coefficient of π.", "扇形面积 = 圆心角/360 × πr²，只输入 π 的系数。",
        `Sector area = ${answer}π cm².`, `扇形面积 = ${answer}π cm²。`, { type: "central", angle, label: `r=${r}` }, .11);
    }),
    template("combinedArc", 4, () => {
      const a = rnd(25, 65, 5), b = rnd(20, 60, 5);
      return q("Combined reasoning", "综合推理", `Two inscribed angles intercept adjacent, non-overlapping arcs. The angles are ${a}° and ${b}°. Find the combined arc.`, `两个圆周角分别对应相邻且不重叠的弧，角度为 ${a}° 和 ${b}°。求两段弧的总度数。`,
        2 * (a + b), "Each intercepted arc is twice its inscribed angle.", "每条所对弧的度数是圆周角的两倍。",
        `Combined arc = 2(${a} + ${b}) = ${2 * (a + b)}°.`, `总弧度数 = 2(${a} + ${b}) = ${2 * (a + b)}°。`, { type: "doubleInscribed", values: [a, b] });
    })
  ];

  function template(id, tier, make) {
    return { id, tier, make: () => {
      const question = make();
      ["ko", "ja", "de", "ru"].forEach((lang) => {
        const localized = window.CM6?.quizQuestion?.(lang, id, question);
        if (localized) {
          question.topic[lang] = localized.topic;
          question.text[lang] = localized.text;
          question.hint[lang] = localized.hint;
          question.explanation[lang] = localized.explanation;
        }
      });
      return question;
    } };
  }
  function q(topicEn, topicZh, en, zh, answer, hintEn, hintZh, expEn, expZh, diagram, tolerance = .6) {
    return { id: `${Date.now()}-${Math.random()}`, topic: { en: topicEn, zh: topicZh }, text: { en, zh }, answer, hint: { en: hintEn, zh: hintZh }, explanation: { en: expEn, zh: expZh }, diagram, type: "numeric", tolerance };
  }
  function choice(topicEn, topicZh, en, zh, answer, options, hintEn, hintZh, expEn, expZh, diagram) {
    return { ...q(topicEn, topicZh, en, zh, answer, hintEn, hintZh, expEn, expZh, diagram), type: "choice", options: [...new Set(options)].slice(0, 4).sort(() => Math.random() - .5) };
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function simplify(a, b) { const d = gcd(Math.abs(a), Math.abs(b)); return `${a / d}/${b / d}`; }

  const state = { mode: "sprint", questions: [], index: 0, attempts: 0, hint: false, answered: false, results: [] };
  const ui = Object.fromEntries(["quizLanding", "quizPlayer", "quizResult", "levelGrid", "lastResult", "quizLevelName", "questionCounter", "progressFill", "questionTopic", "attemptBadge", "questionText", "diagramCaption", "answerArea", "quizFeedback", "nextQuestion", "checkAnswer"].map((id) => [id, document.getElementById(id)]));

  function renderModes() {
    document.getElementById("quizCareTitle").textContent = L() === "en" || L() === "zh" ? langText(care).title : Q("careTitle");
    document.getElementById("quizCareBody").textContent = L() === "en" || L() === "zh" ? langText(care).body : Q("careBody");
    document.getElementById("takeBreak").textContent = L() === "en" ? "Pause and breathe" : L() === "zh" ? "暂停并呼吸" : Q("pause");
    ui.levelGrid.innerHTML = Object.entries(modes).map(([key, mode]) => `<article class="level-card">
      <span class="level-tag">${L() === "en" ? "Generated question bank" : L() === "zh" ? "随机生成题库" : Q("bank")}</span>
      <h2>${L() === "en" || L() === "zh" ? langText(mode)[0] : Q("modes")[key][0]}</h2><p>${L() === "en" || L() === "zh" ? langText(mode)[1] : Q("modes")[key][1]}</p>
      <div class="level-meta"><span>${mode.count} ${L() === "en" ? "questions" : L() === "zh" ? "道题" : Q("questions")}</span><span>${L() === "en" ? "New values every run" : L() === "zh" ? "每次参数不同" : Q("newValues")}</span><span>${L() === "en" ? "Visual feedback" : L() === "zh" ? "图形反馈" : Q("visual")}</span></div>
      <button class="button primary ghost-full" type="button" data-mode="${key}">${L() === "en" ? "Generate this test" : L() === "zh" ? "生成本次测验" : Q("generate")}</button>
    </article>`).join("");
    ui.levelGrid.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => start(b.dataset.mode)));
    const latest = JSON.parse(localStorage.getItem("cm2_quiz_latest") || "null");
    ui.lastResult.textContent = latest ? `${latest.score}/${latest.total} · ${latest.percent}% · ${latest.count} ${L() === "en" ? "questions" : L() === "zh" ? "题" : Q("questions")}` : "—";
  }

  function generate(modeKey) {
    const mode = modes[modeKey], pool = templates.filter((t) => mode.tiers.includes(t.tier)), result = [], used = new Set();
    for (let i = 0; i < mode.count; i += 1) {
      let question, attempts = 0;
      do {
        question = pool[(i + attempts) % pool.length].make();
        attempts += 1;
      } while ((!validateQuestion(question) || used.has(question.text.en)) && attempts < 80);
      if (!validateQuestion(question)) throw new Error(`Invalid generated quiz question: ${question.text.en}`);
      used.add(question.text.en);
      result.push(question);
    }
    return result.sort(() => Math.random() - .5);
  }

  function validateQuestion(question) {
    if (!question?.diagram || !question?.text?.en || !question?.text?.zh) return false;
    if (question.type === "numeric" && !Number.isFinite(question.answer)) return false;
    if (question.type === "choice" && !question.options.includes(question.answer)) return false;
    if (question.diagram.type === "cyclicAlgebra") {
      const { angleA, angleC } = question.diagram;
      return angleA > 0 && angleA < 180 && angleC > 0 && angleC < 180 && angleA + angleC === 180;
    }
    if (question.diagram.type === "cyclic") {
      const { angleA, angleC } = question.diagram;
      return angleA > 0 && angleC > 0 && angleA + angleC === 180 && question.answer === angleC;
    }
    if (question.diagram.type === "cyclicExterior") return question.answer === question.diagram.value && question.answer > 0 && question.answer < 180;
    if (question.diagram.type === "radius") return question.answer === question.diagram.value * 2;
    return true;
  }

  function start(modeKey) {
    state.mode = modeKey; state.questions = generate(modeKey); state.index = 0; state.results = [];
    ui.quizLanding.classList.add("hidden"); ui.quizResult.classList.add("hidden"); ui.quizPlayer.classList.remove("hidden");
    renderQuestion(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function current() { return state.questions[state.index]; }
  function resetQuestion() {
    state.attempts = 0; state.hint = false; state.answered = false; ui.nextQuestion.disabled = true; ui.checkAnswer.disabled = false;
    ui.quizFeedback.className = "quiz-feedback neutral"; ui.quizFeedback.innerHTML = `<p>${L() === "en" ? "Choose or enter an answer, then check it." : L() === "zh" ? "选择或输入答案，然后点击检查。" : Q("prompt")}</p>`;
  }

  function renderQuestion() {
    resetQuestion();
    const question = current(), mode = modes[state.mode];
    ui.quizLevelName.textContent = L() === "en" || L() === "zh" ? langText(mode)[0] : Q("modes")[state.mode][0]; ui.questionCounter.textContent = L() === "en" ? `Question ${state.index + 1} of ${state.questions.length}` : L() === "zh" ? `第 ${state.index + 1} / ${state.questions.length} 题` : QCall("counter", state.index + 1, state.questions.length);
    ui.progressFill.style.width = `${state.index / state.questions.length * 100}%`; ui.questionTopic.textContent = langText(question.topic);
    ui.attemptBadge.textContent = L() === "en" ? "2 attempts + hint" : L() === "zh" ? "2 次尝试 + 提示" : Q("attempts"); ui.questionText.textContent = langText(question.text);
    if (question.type === "choice") {
      ui.answerArea.innerHTML = `<div class="answer-options">${question.options.map((o, i) => `<label class="answer-option"><input type="radio" name="quizAnswer" value="${o}"><span><strong>${String.fromCharCode(65 + i)}.</strong> ${o}</span></label>`).join("")}</div>`;
    } else {
      ui.answerArea.innerHTML = `<div class="numeric-answer"><label for="numericAnswer">${L() === "en" ? "Your numeric answer (units and degree symbol optional)" : L() === "zh" ? "你的数值答案（单位和度数符号可省略）" : Q("numeric")}</label><input id="numericAnswer" inputmode="decimal" autocomplete="off" placeholder="${L() === "en" ? "Type a number" : L() === "zh" ? "输入数值" : Q("typeNumber")}"></div>`;
    }
    ui.diagramCaption.textContent = diagramDescription(question.diagram);
    draw(question);
  }

  function readAnswer() {
    if (current().type === "choice") return document.querySelector('input[name="quizAnswer"]:checked')?.value || "";
    return document.getElementById("numericAnswer")?.value.trim() || "";
  }

  function correct(question, raw) {
    if (question.type === "choice") return raw === question.answer;
    const number = Number.parseFloat(raw.replace(/,/g, ".").replace(/[^\d.+-]/g, ""));
    return Number.isFinite(number) && Math.abs(number - question.answer) <= question.tolerance;
  }

  function check() {
    const question = current(), raw = readAnswer();
    if (!raw) { ui.quizFeedback.className = "quiz-feedback error"; ui.quizFeedback.innerHTML = `<p>${L() === "en" ? "Enter or select an answer first." : L() === "zh" ? "请先输入或选择答案。" : Q("empty")}</p>`; return; }
    state.attempts += 1;
    if (correct(question, raw)) {
      state.answered = true; const points = state.hint || state.attempts > 1 ? 1 : 2;
      state.results.push({ correct: true, points, answer: raw, question }); ui.quizFeedback.className = "quiz-feedback success";
      ui.quizFeedback.innerHTML = `<strong>${L() === "en" ? "Correct. The generated diagram and theorem agree." : L() === "zh" ? "回答正确，生成图形与定理关系一致。" : Q("correct")}</strong><p>${langText(question.explanation)}</p>`; finish(); return;
    }
    if (state.attempts === 1) {
      ui.attemptBadge.textContent = L() === "en" ? "1 retry remaining" : L() === "zh" ? "还可重试 1 次" : Q("retry"); ui.quizFeedback.className = "quiz-feedback error";
      ui.quizFeedback.innerHTML = `<strong>${L() === "en" ? "This attempt gave us useful information. Try one adjustment." : L() === "zh" ? "这次尝试提供了有用信息，请调整一步再试。" : Q("adjust")}</strong><p>${langText(question.hint)}</p>`; return;
    }
    state.answered = true; state.results.push({ correct: false, points: 0, answer: raw, question }); ui.quizFeedback.className = "quiz-feedback error";
    ui.quizFeedback.innerHTML = `<strong>${L() === "en" ? `Answer: ${question.answer}` : L() === "zh" ? `正确答案：${question.answer}` : Q("answer", question.answer)}</strong><p>${langText(question.explanation)}</p>`; finish();
  }

  function finish() { ui.checkAnswer.disabled = true; ui.nextQuestion.disabled = false; ui.progressFill.style.width = `${(state.index + 1) / state.questions.length * 100}%`; }
  function next() { if (!state.answered) return; if (state.index < state.questions.length - 1) { state.index += 1; renderQuestion(); } else showResult(); }

  function showResult() {
    ui.quizPlayer.classList.add("hidden"); ui.quizResult.classList.remove("hidden");
    const score = state.results.reduce((s, r) => s + r.points, 0), total = state.questions.length * 2, percent = Math.round(score / total * 100);
    document.getElementById("resultTitle").textContent = percent >= 80 ? (L() === "en" ? "Generated test mastered" : L() === "zh" ? "随机生成测验已掌握" : Q("mastered")) : percent >= 50 ? (L() === "en" ? "Good progress with clear review targets" : L() === "zh" ? "进步明显，复习目标清晰" : Q("progress")) : (L() === "en" ? "Useful diagnostic complete" : L() === "zh" ? "诊断测验已完成" : Q("diagnostic"));
    document.getElementById("resultScore").textContent = `${score}/${total}`; document.getElementById("resultPercent").textContent = `${percent}%`;
    document.getElementById("resultMessage").textContent = L() === "en" ? "A new run will generate different values and a different question order." : L() === "zh" ? "再次挑战会生成不同数值与不同题目顺序。" : Q("newRun");
    document.getElementById("reviewList").innerHTML = state.results.map((r, i) => `<article class="review-item ${r.correct ? "" : "wrong"}"><h3>${i + 1}. ${langText(r.question.topic)} · ${r.correct ? (L() === "en" ? "Correct" : L() === "zh" ? "正确" : Q("correctWord")) : (L() === "en" ? "Review" : L() === "zh" ? "需复习" : Q("review"))}</h3><p>${langText(r.question.text)}</p><p><strong>${L() === "en" ? "Explanation:" : L() === "zh" ? "解析：" : Q("explanation")}</strong> ${langText(r.question.explanation)}</p></article>`).join("");
    localStorage.setItem("cm2_quiz_latest", JSON.stringify({ score, total, percent, count: state.questions.length })); renderModes(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function landing() { ui.quizPlayer.classList.add("hidden"); ui.quizResult.classList.add("hidden"); ui.quizLanding.classList.remove("hidden"); renderModes(); window.scrollTo({ top: 0, behavior: "smooth" }); }

  function colour(name) { return getComputedStyle(document.body).getPropertyValue(name).trim(); }
  const centre = { x: 360, y: 215 }, radius = 150;
  const pt = (degree, r = radius) => ({ x: centre.x + Math.cos(degree * Math.PI / 180) * r, y: centre.y + Math.sin(degree * Math.PI / 180) * r });
  function line(a, b, c = colour("--brand"), w = 4, dash = []) { ctx.save(); ctx.beginPath(); ctx.setLineDash(dash); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); }
  function label(t, p, x = 10, y = -10) { ctx.fillStyle = colour("--ink"); ctx.font = "800 18px system-ui"; ctx.fillText(t, p.x + x, p.y + y); }
  function dot(p, t) { ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fillStyle = colour("--brand"); ctx.fill(); label(t, p); }
  function base() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = colour("--surface-2"); ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.beginPath(); ctx.arc(centre.x, centre.y, radius, 0, Math.PI * 2); ctx.strokeStyle = colour("--brand"); ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.arc(centre.x, centre.y, 6, 0, Math.PI * 2); ctx.fillStyle = colour("--accent"); ctx.fill(); label("O", centre); }
  function rightAngle(origin, alongA, alongB, size = 17) {
    const unit = (v) => { const length = Math.hypot(v.x, v.y); return { x: v.x / length, y: v.y / length }; };
    const a = unit(alongA), b = unit(alongB);
    const p1 = { x: origin.x + a.x * size, y: origin.y + a.y * size };
    const p2 = { x: p1.x + b.x * size, y: p1.y + b.y * size };
    const p3 = { x: origin.x + b.x * size, y: origin.y + b.y * size };
    ctx.save(); ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.strokeStyle = colour("--accent"); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
  }
  function angleArc(origin, start, end, r = 30) {
    ctx.save(); ctx.beginPath(); ctx.arc(origin.x, origin.y, r, start * Math.PI / 180, end * Math.PI / 180); ctx.strokeStyle = colour("--accent"); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  }
  function cornerArc(origin, rayA, rayB, r = 27) {
    const start = Math.atan2(rayA.y - origin.y, rayA.x - origin.x);
    const end = Math.atan2(rayB.y - origin.y, rayB.x - origin.x);
    let difference = end - start;
    while (difference > Math.PI) difference -= Math.PI * 2;
    while (difference < -Math.PI) difference += Math.PI * 2;
    ctx.save(); ctx.beginPath(); ctx.arc(origin.x, origin.y, r, start, start + difference, difference < 0); ctx.strokeStyle = colour("--accent"); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  }
  function boxedLabel(text, x, y) {
    ctx.save(); ctx.font = "800 17px system-ui"; const width = ctx.measureText(text).width + 20;
    ctx.fillStyle = colour("--surface"); ctx.strokeStyle = colour("--line"); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y - 23, width, 32, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = colour("--ink"); ctx.fillText(text, x + 10, y); ctx.restore();
  }
  function diagramDescription(d) {
    const descriptions = {
      central: ["The marked radii form the central angle; the highlighted relationship uses the intercepted minor arc.", "两条标出的半径形成圆心角，题目使用其所对小弧。"],
      radius: ["OA is a radius. AB passes through O and is a diameter.", "OA 是半径，AB 经过圆心 O，是直径。"],
      inscribed: ["A and B are arc endpoints; C is on the circumference and ∠ACB intercepts arc AB.", "A、B 是弧端点，C 在圆周上，∠ACB 所对弧为 AB。"],
      thales: ["AB passes through O, so AB is a diameter and the marked angle at C is 90°.", "AB 经过圆心 O，因此 AB 是直径，C 点标出的角为 90°。"],
      cyclic: ["A, B, C, and D lie on the circle. A and C are opposite angles.", "A、B、C、D 均在圆上，A 与 C 是一组对角。"],
      cyclicAlgebra: ["A, B, C, and D lie on the circle. The algebraic expressions label opposite angles A and C.", "A、B、C、D 均在圆上，两个代数式分别标注对角 A 与 C。"],
      cyclicExterior: ["A, B, C, and D lie on the circle. CD is extended beyond D, forming an exterior angle equal to the opposite interior angle at B.", "A、B、C、D 均在圆上。CD 延长至 D 点外，形成的外角等于 B 点内对角。"],
      tangent: ["The tangent touches the circle only at T; radius OT is perpendicular to it.", "切线只在 T 点接触圆，半径 OT 与切线垂直。"]
    };
    if (!["en", "zh"].includes(L())) return Q("notScale");
    return descriptions[d.type] ? descriptions[d.type][L() === "zh" ? 1 : 0] : englishOrChinese("Not to scale. Labels and line styles show the exact relationship used in the question.", "图形不按比例绘制；标签与线型展示了本题使用的准确几何关系。");
  }

  function draw(question) {
    base(); const d = question.diagram, accent = colour("--accent"), brand = colour("--brand"), soft = colour("--line");
    if (d.type === "central") {
      const half = (d.angle || 90) / 2, a = pt(180 - half), b = pt(180 + half);
      line(centre, a, accent); line(centre, b, accent); angleArc(centre, 180 - half, 180 + half, 38); dot(a, "A"); dot(b, "B"); boxedLabel(d.label || `${d.angle}°`, 322, 205);
    } else if (d.type === "radius") {
      const a = pt(0), b = pt(180); line(b, a, soft, 3, [8, 6]); line(centre, a, accent, 6); dot(a, "A"); dot(b, "B"); boxedLabel(`OA = ${d.value} cm`, 397, 190); label(L() === "en" ? "diameter AB" : L() === "zh" ? "直径 AB" : Q("diameter"), { x: 260, y: 265 }, 0, 0);
    } else if (d.type === "inscribed") {
      const half = d.central / 2, a = pt(180 - half), b = pt(180 + half), c = pt(0), start = Math.atan2(a.y - c.y, a.x - c.x) * 180 / Math.PI, end = Math.atan2(b.y - c.y, b.x - c.x) * 180 / Math.PI;
      line(centre, a, accent, 3); line(centre, b, accent, 3); line(c, a, brand, 4); line(c, b, brand, 4); angleArc(c, start, end, 28); dot(a, "A"); dot(b, "B"); dot(c, "C"); boxedLabel(`⌢AB = ${d.central}°`, 280, 392);
    } else if (d.type === "thales") {
      const a = pt(180), b = pt(0), c = pt(d.angleA ? 360 - 2 * d.angleA : 255); line(a, b, accent, 5); line(c, a); line(c, b); rightAngle(c, { x: a.x - c.x, y: a.y - c.y }, { x: b.x - c.x, y: b.y - c.y }, 18); dot(a, "A"); dot(b, "B"); dot(c, "C"); if (d.label) boxedLabel(`∠A = ${d.label}`, 220, 255);
    } else if (["cyclic", "cyclicAlgebra"].includes(d.type)) {
      const p = [0, 180 - d.angleA, 180, 180 + d.angleA].map((degree) => pt(degree)); p.forEach((point, i) => line(point, p[(i + 1) % 4], i % 2 ? accent : brand, 4)); ["A", "B", "C", "D"].forEach((t, i) => dot(p[i], t));
      cornerArc(p[0], p[3], p[1]); cornerArc(p[2], p[1], p[3]);
      if (d.labelA) boxedLabel(`∠A = ${d.labelA}`, 505, 182);
      if (d.exprA) { boxedLabel(`∠A = ${d.exprA}`, 495, 178); boxedLabel(`∠C = ${d.exprC}`, 48, 265); }
    } else if (d.type === "cyclicExterior") {
      const angleA = 10, angleC = angleA + 360 - 2 * d.value, angleB = (angleA + angleC) / 2, angleD = (angleC + angleA + 360) / 2;
      const p = [angleA, angleB, angleC, angleD].map((degree) => pt(degree));
      p.forEach((point, i) => line(point, p[(i + 1) % 4], i % 2 ? accent : brand, 4));
      const extensionVector = { x: p[3].x - p[2].x, y: p[3].y - p[2].y }, extensionLength = Math.hypot(extensionVector.x, extensionVector.y);
      const extension = { x: p[3].x + extensionVector.x / extensionLength * 52, y: p[3].y + extensionVector.y / extensionLength * 52 };
      line(p[3], extension, accent, 5);
      ["A", "B", "C", "D"].forEach((t, i) => dot(p[i], t));
      cornerArc(p[3], p[0], extension, 25);
      boxedLabel(L() === "en" ? `${d.value}° exterior` : L() === "zh" ? `外角 ${d.value}°` : Q("external", d.value), Math.min(505, extension.x - 55), Math.max(48, extension.y - 16));
      boxedLabel(`∠B = ?`, Math.max(90, p[1].x - 100), Math.min(395, p[1].y + 58));
    } else if (d.type === "chord") {
      const a = pt(220), b = pt(320), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; line(a, b); line(centre, m, accent); rightAngle(m, { x: centre.x - m.x, y: centre.y - m.y }, { x: b.x - m.x, y: b.y - m.y }, 15); dot(a, "A"); dot(b, "B"); dot(m, "M"); boxedLabel(`AB = ${d.value} cm`, 286, 383);
    } else if (["tangent", "tangentTriangle"].includes(d.type)) {
      const t = pt(0), p = { x: t.x, y: 42 }; line(centre, t, accent, 6); line({ x: t.x, y: 20 }, { x: t.x, y: 395 }, brand, 5); line(centre, p, soft, 2, [8, 7]); rightAngle(t, { x: centre.x - t.x, y: 0 }, { x: 0, y: p.y - t.y }, 18); dot(t, "T"); dot(p, "P"); if (d.values) { boxedLabel(`OT = ${d.values[0]} cm`, 388, 260); boxedLabel(`OP = ${d.values[2]} cm`, 414, 105); }
    } else if (d.type === "tangentChord") {
      const t = pt(0), a = pt(360 - 2 * d.value), c = pt(120); line({ x: t.x, y: 20 }, { x: t.x, y: 395 }, accent); line(t, a); line(c, t); line(c, a); dot(t, "T"); dot(a, "A"); dot(c, "C"); boxedLabel(`${d.value}°`, 476, 176);
    } else if (d.type === "equalChords") {
      const a = pt(225 - d.value / 2), b = pt(225 + d.value / 2), c = pt(45 - d.value / 2), e = pt(45 + d.value / 2); line(a, b, brand, 5); line(c, e, accent, 5); [a, b, c, e].forEach((x, i) => dot(x, ["A", "B", "C", "D"][i])); [a, b, c, e].forEach((x) => line(centre, x, soft, 2)); boxedLabel(`∠AOB = ${d.value}°`, 270, 238); boxedLabel("AB = CD", 302, 400);
    } else if (d.type === "sameSegment") {
      const a = pt(270 - d.value), b = pt(270 + d.value), c = pt(30), e = pt(145); line(c, a); line(c, b); line(e, a, accent); line(e, b, accent); [a, b, c, e].forEach((x, i) => dot(x, ["A", "B", "C", "D"][i])); boxedLabel(`∠ACB = ${d.value}°`, 472, 118);
    } else if (d.type === "intersecting") {
      const a = pt(200), b = pt(20), c = pt(130), e = pt(310); line(a, b); line(c, e, accent); [a, b, c, e].forEach((x, i) => dot(x, ["A", "B", "C", "D"][i])); dot(centre, "X"); label(String(d.values[0]), { x: (a.x + centre.x) / 2, y: (a.y + centre.y) / 2 }); label(String(d.values[1]), { x: (b.x + centre.x) / 2, y: (b.y + centre.y) / 2 }); label(String(d.values[2]), { x: (c.x + centre.x) / 2, y: (c.y + centre.y) / 2 });
    } else if (d.type === "power") {
      const p = { x: 680, y: centre.y }, a = pt(0), b = pt(180), tangentOffset = radius * radius / (p.x - centre.x), tangentY = Math.sqrt(radius * radius - tangentOffset * tangentOffset), t = { x: centre.x + tangentOffset, y: centre.y - tangentY };
      line(p, b, accent, 5); line(p, t, brand, 5); dot(p, "P"); dot(a, "A"); dot(b, "B"); dot(t, "T"); boxedLabel(`PA (${L() === "en" ? "external" : L() === "zh" ? "外部" : Q("ext")}) = ${d.values[0]}`, 478, 275); boxedLabel(`PB (${L() === "en" ? "whole" : L() === "zh" ? "总长" : Q("whole")}) = ${d.values[1]}`, 278, 335);
    } else if (d.type === "doubleInscribed") {
      const a = pt(200), b = pt(270), c = pt(340), dPoint = pt(45), e = pt(135); line(dPoint, a); line(dPoint, b); line(e, b, accent); line(e, c, accent); [a, b, c, dPoint, e].forEach((x, i) => dot(x, ["A", "B", "C", "D", "E"][i])); boxedLabel(`∠ADB = ${d.values[0]}°`, 455, 115); boxedLabel(`∠BEC = ${d.values[1]}°`, 205, 95);
    }
  }

  ui.checkAnswer.addEventListener("click", check); ui.nextQuestion.addEventListener("click", next);
  document.getElementById("quizHint").addEventListener("click", () => { if (state.answered) return; state.hint = true; ui.quizFeedback.className = "quiz-feedback neutral"; ui.quizFeedback.innerHTML = `<strong>${L() === "en" ? "Hint" : L() === "zh" ? "提示" : Q("hint")}</strong><p>${langText(current().hint)}</p>`; });
  document.getElementById("takeBreak").addEventListener("click", () => {
    ui.quizFeedback.className = "quiz-feedback neutral";
    ui.quizFeedback.innerHTML = `<strong>${L() === "en" || L() === "zh" ? langText(care).breakTitle : Q("breakTitle")}</strong><p>${L() === "en" || L() === "zh" ? langText(care).breakBody : Q("breakBody")}</p>`;
  });
  document.getElementById("exitQuiz").addEventListener("click", () => { if (confirm(L() === "en" ? "Exit this generated test? Current answers will not be saved." : L() === "zh" ? "确定退出本次随机生成测验吗？当前答案不会保存。" : Q("exit"))) landing(); });
  document.getElementById("retryQuiz").addEventListener("click", () => start(state.mode)); document.getElementById("chooseLevel").addEventListener("click", landing);
  document.getElementById("clearQuizHistory").addEventListener("click", () => { if (confirm(L() === "en" ? "Clear the latest quiz result?" : L() === "zh" ? "确定清除最近测验成绩吗？" : Q("clear"))) { localStorage.removeItem("cm2_quiz_latest"); renderModes(); } });
  document.addEventListener("cm:theme", () => { if (!ui.quizPlayer.classList.contains("hidden")) draw(current()); });
  document.addEventListener("cm:language", () => { renderModes(); if (!ui.quizPlayer.classList.contains("hidden")) renderQuestion(); });
  renderModes();
})();
