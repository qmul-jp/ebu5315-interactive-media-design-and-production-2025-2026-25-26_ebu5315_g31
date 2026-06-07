EBU5315
Group Number: 2526EBU5315G31 小组编号：2526EBU5315G31
Project Title: CircleMaster 项目标题：CircleMaster
Members:Wang Ciyue ,Ye Tong,Jia Yuehan  成员：王慈悦，叶彤，贾月涵
Name, BUPT Student Number, QM Student Number, Email
王慈悦 2024213552 241118500 rainsing1005@qq.com

叶彤 2024213578 241117972 jp2024213578@qmul.ac.uk

贾月涵  2024213602  241118153  2024213602@bupt.cn

Assigned TA: Yuwoooo 指定助教：Yuwoooo



# CircleMaster New6

Open `index.html` in a modern browser. The project is stand-alone and requires no server.

## New6 complete global localisation

- Added a shared `locales.js` language resource used by Home, Game, and Quiz.
- Korean, Japanese, German, and Russian now cover the complete visible interface instead of falling back to English.
- Fully localised homepage learning content, animated theorem captions, study-coach replies, contact validation, account messages, accessibility feedback, and advertisement feedback.
- Fully localised all 12 Game missions, instructions, concept explanations, live feedback, hints, filters, and validation messages.
- Fully localised all 21 generated Quiz templates, including topics, generated question wording, hints, explanations, diagrams, mode cards, progress feedback, result reviews, and confirmation messages.
- Mathematical point names, formulas, the CircleMaster product name, and standard units remain universal.

## New5 focused correction retained

- Fixed the cyclic-quadrilateral Canvas bug caused by passing `.map(pt)` array indexes into the radius parameter. All four vertices now sit on the circumference and the quadrilateral edges are visible.
- Cyclic opposite-angle diagrams now change with the generated value, so the drawn `∠A` exactly matches its label and the actual opposite `∠C` is supplementary.
- Cyclic exterior-angle diagrams now generate a mathematically valid quadrilateral for every value from 45° to 120°. The extension of `CD` beyond `D` forms the labelled exterior angle, which exactly equals the opposite interior angle at `B`.

## Earlier New4 corrections retained

- Rebuilt the Quiz diagram system so every picture shows the exact theorem relationship used by the question.
- Corrected the Chinese translation of "minor arc" and replaced the fixed-answer cyclic algebra question with genuinely varied, validated equations.
- Added a validation layer for generated questions. The four modes create 10, 15, 20, or 25 valid, non-repeating questions.
- Replaced the four homepage theorem decorations with mathematically standard SVG diagrams, including labelled centres, diameters, contact points, arcs, and right-angle marks.
- Made the homepage paid promotion unambiguous with an `ADVERTISEMENT · PAID PLAN` disclosure, price, features, and demo-checkout note.

## Inclusive and human-centred design

- Added a persistent colour-blind-friendly mode using an Okabe-Ito-inspired palette plus labels, line styles, and shapes.
- Added local demonstration Login / Register controls at the top of Home, Game, and Quiz.
- Expanded the language selector to English, Chinese, Korean, Japanese, German, and Russian. Specialist question wording falls back to English when a full subject translation is not available.
- Retained Calm mode, dark mode, high contrast, adjustable text size, local-only progress, supportive feedback, no countdowns, and unlimited retries.

## Mobile compatibility

- Added fluid typography, 48-pixel touch targets, responsive accessibility controls, full-width mobile actions, and compact theorem cards.
- Improved small-screen navigation, login modal, advertisement layout, Quiz controls, and horizontal canvas handling.

## Verification completed

- JavaScript parse check: `app.js`, `game.js`, and `quiz.js`.
- Generated-question audit: 21 templates generated 200 times each, with no invalid questions.
- Mode audit: 10/15/20/25-question modes all produced the required number of valid, unique questions.
- HTML audit: no duplicate IDs, all three pages contain one language selector, colour-blind toggle, and Login / Register button.
