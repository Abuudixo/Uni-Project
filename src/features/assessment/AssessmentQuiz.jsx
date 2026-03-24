import { useState } from "react";
import { C, font } from '../../constants/theme';
import { ASSESSMENTS, getSev } from '../../data/assessments';
import NavBar from '../../components/ui/NavBar';
import ProgressBar from '../../components/ui/ProgressBar';
import Btn from '../../components/ui/Btn';

export default function AssessmentQuiz({ assessmentKey, onDone }) {
  const a = ASSESSMENTS[assessmentKey];
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const score = Object.values(answers).reduce((s, v) => s + v, 0);
  const sev = getSev(score, a.thresholds);

  const pick = val => {
    const next = { ...answers, [idx]: val };
    setAnswers(next);
    if (idx < a.questions.length - 1) setTimeout(() => setIdx(i => i + 1), 260);
    else setTimeout(() => setFinished(true), 280);
  };

  if (finished) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
        <NavBar title={`${a.name} Results`} sub={a.full} />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 18px" }}>
          <div style={{ background: sev.bg, borderRadius: 20, padding: 20, border: `1px solid ${sev.color}33`, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>{score <= 4 ? "🌱" : score <= 9 ? "🌤" : score <= 14 ? "⛅" : "🌧"}</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: sev.color }}>{score}<span style={{ fontSize: 18, fontWeight: 400, color: C.muted }}>/{a.maxScore}</span></div>
            <div style={{ fontSize: 15, fontWeight: 700, color: sev.color, marginTop: 4 }}>{sev.label}</div>
            <div style={{ fontSize: 13, color: C.slate, marginTop: 8, lineHeight: 1.55 }}>Your results have been securely submitted to your therapist for review before your session.</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>BREAKDOWN</div>
          {a.questions.map((q, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "10px 13px", border: `1px solid ${C.border}`, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 13, color: C.slate, flex: 1, lineHeight: 1.4 }}>{q}</div>
                <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: (answers[i] ?? 0) >= 2 ? a.colorLight : C.sand, color: (answers[i] ?? 0) >= 2 ? a.color : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{answers[i] ?? 0}</div>
              </div>
              <div style={{ marginTop: 6 }}><ProgressBar val={answers[i] ?? 0} max={3} color={(answers[i] ?? 0) >= 2 ? a.color : C.border} h={3} /></div>
            </div>
          ))}

          {assessmentKey === "phq9" && score >= 15 && (
            <div style={{ background: C.dangerLight, borderRadius: 14, padding: 14, marginTop: 4, border: `1px solid ${C.danger}44` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.danger, marginBottom: 4 }}>Crisis Support</div>
              <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.55 }}>If you're in immediate distress: <strong>988</strong> (call or text — Suicide & Crisis Lifeline).</div>
            </div>
          )}
        </div>
        <div style={{ padding: "12px 18px 22px", borderTop: `1px solid ${C.border}`, background: C.white }}>
          <Btn onClick={() => onDone(score)} style={{ width: "100%" }}>← Back to assessments</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <NavBar title={a.name} sub={`${a.about} · ${a.duration}`} />
      <div style={{ padding: "12px 18px 8px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>{idx + 1} of {a.questions.length}</span>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{Math.round((idx / a.questions.length) * 100)}%</span>
        </div>
        <ProgressBar val={idx} max={a.questions.length} color={a.color} />
      </div>

      <div style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: a.colorLight, borderRadius: 18, padding: "18px", border: `1px solid ${a.color}33` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: a.color, letterSpacing: 0.5, marginBottom: 8 }}>OVER THE LAST 2 WEEKS…</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: C.charcoal, lineHeight: 1.5 }}>{a.questions[idx]}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {a.scale.map((opt, i) => (
            <button key={i} onClick={() => pick(i)} style={{ display: "flex", alignItems: "center", gap: 13, background: answers[idx] === i ? a.colorLight : C.white, border: `1.5px solid ${answers[idx] === i ? a.color : C.border}`, borderRadius: 13, padding: "13px 15px", cursor: "pointer", textAlign: "left", fontFamily: font, transition: "all 0.15s" }}
              onMouseEnter={e => { if (answers[idx] !== i) { e.currentTarget.style.borderColor = C.muted; e.currentTarget.style.background = C.sand; } }}
              onMouseLeave={e => { if (answers[idx] !== i) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white; } }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 10, flexShrink: 0, background: answers[idx] === i ? a.color : C.sand, color: answers[idx] === i ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, transition: "all 0.15s" }}>{i}</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.charcoal }}>{opt}</span>
            </button>
          ))}
        </div>
        {idx > 0 && <button onClick={() => setIdx(i => i - 1)} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: font, marginTop: "auto" }}>← Previous</button>}
      </div>
    </div>
  );
}
