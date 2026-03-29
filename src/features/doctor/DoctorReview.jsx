import { useState } from "react";
import { C, font } from '../../constants/theme';
import { ASSESSMENTS, getSev } from '../../data/assessments';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Btn from '../../components/ui/Btn';

export default function DoctorReview({ patient, scores, onBack }) {
  const [tab, setTab] = useState("overview");
  const phqScore = scores.phq9 ?? null;
  const gadScore = scores.gad7 ?? null;
  const phqSev = phqScore !== null ? getSev(phqScore, ASSESSMENTS.phq9.thresholds) : null;
  const gadSev = gadScore !== null ? getSev(gadScore, ASSESSMENTS.gad7.thresholds) : null;

  const tabs = ["overview", "scores"];
  const tabLabel = t => ({ overview: "Overview", scores: "Scores" })[t];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: "linear-gradient(150deg,#1C3050 0%,#3562A0 100%)", padding: "44px 20px 20px", color: "#fff" }}>
        {onBack && <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0, opacity: 0.8 }}>← Back to Patient List</button>}
        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.65, letterSpacing: 1, marginBottom: 8 }}>DOCTOR VIEW · PRE-SESSION BRIEF</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Avatar name={`${patient.firstName} ${patient.lastName}`} size={50} bg="rgba(255,255,255,0.18)" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{patient.firstName} {patient.lastName}</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>{patient.pronouns || "Pronouns not listed"} · New patient</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {phqScore !== null && (
            <div style={{ background: "rgba(255,255,255,0.14)", borderRadius: 10, padding: "8px 12px", flex: 1 }}>
              <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 2 }}>PHQ-9</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{phqScore}<span style={{ fontSize: 11, opacity: 0.7 }}>/{ASSESSMENTS.phq9.maxScore}</span></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: phqSev.bg }}>{phqSev.label}</div>
            </div>
          )}
          {gadScore !== null && (
            <div style={{ background: "rgba(255,255,255,0.14)", borderRadius: 10, padding: "8px 12px", flex: 1 }}>
              <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 2 }}>GAD-7</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{gadScore}<span style={{ fontSize: 11, opacity: 0.7 }}>/{ASSESSMENTS.gad7.maxScore}</span></div>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{gadSev.label}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 4px", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? C.blue : "transparent"}`, color: tab === t ? C.blue : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}>{tabLabel(t)}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px" }}>

        {tab === "overview" && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>PATIENT PROFILE</div>
            <Card>
              {[["Date of Birth", patient.dob || "—"], ["Email", patient.email || "—"], ["Phone", patient.phone || "—"], ["Pronouns", patient.pronouns || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.charcoal, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </Card>

          </>
        )}

        {tab === "scores" && (
          <>
            {[{ a: ASSESSMENTS.phq9, score: phqScore, sev: phqSev }, { a: ASSESSMENTS.gad7, score: gadScore, sev: gadSev }].map(({ a, score, sev }) => (
              <div key={a.key} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>{a.name} — {a.about.toUpperCase()}</div>
                {score !== null ? (
                  <>
                    <div style={{ background: sev.bg, borderRadius: 14, padding: 14, border: `1px solid ${sev.color}44`, marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ fontSize: 42, fontWeight: 800, color: sev.color, lineHeight: 1 }}>{score}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: sev.color }}>{sev.label}</div>
                        <div style={{ fontSize: 12, color: C.slate, marginBottom: 6 }}>out of {a.maxScore}</div>
                        <ProgressBar val={score} max={a.maxScore} color={sev.color} h={5} />
                      </div>
                    </div>
                    <Card>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Score ranges</div>
                      {a.thresholds.map((t, i) => {
                        const min = i === 0 ? 0 : a.thresholds[i - 1].max + 1;
                        const active = score >= min && score <= t.max;
                        return (
                          <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 8, marginBottom: 4, background: active ? t.bg : "transparent", border: `1px solid ${active ? t.color + "44" : "transparent"}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {active && <div style={{ width: 6, height: 6, borderRadius: 3, background: t.color }} />}
                              <span style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? t.color : C.muted }}>{t.label}</span>
                            </div>
                            <span style={{ fontSize: 12, color: C.muted }}>{min}–{t.max}</span>
                          </div>
                        );
                      })}
                    </Card>
                  </>
                ) : (
                  <div style={{ background: C.sand, borderRadius: 14, padding: 16, border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>{a.name} not yet submitted</div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}


      </div>
    </div>
  );
}
