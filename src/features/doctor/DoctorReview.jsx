import { useState } from "react";
import { C, font } from '../../constants/theme';
import { ASSESSMENTS, getSev } from '../../data/assessments';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Btn from '../../components/ui/Btn';

export default function DoctorReview({ patient, scores }) {
  const [tab, setTab] = useState("overview");
  const phqScore = scores.phq9 ?? null;
  const gadScore = scores.gad7 ?? null;
  const phqSev = phqScore !== null ? getSev(phqScore, ASSESSMENTS.phq9.thresholds) : null;
  const gadSev = gadScore !== null ? getSev(gadScore, ASSESSMENTS.gad7.thresholds) : null;

  const flags = [];
  if (phqScore !== null && phqScore >= 15) flags.push({ label: "High PHQ-9 score", detail: "Score indicates severe depression. Begin with a safety check and assess any suicidal ideation directly." });
  if (gadScore !== null && gadScore >= 15) flags.push({ label: "High GAD-7 score", detail: "Severe anxiety indicated. Explore current stressors and coping strategies before setting session agenda." });
  if (patient.diagnoses?.includes("PTSD")) flags.push({ label: "PTSD in history", detail: "Use a trauma-informed approach. Avoid detailed re-telling of traumatic events in the first session." });
  if (patient.diagnoses?.includes("Bipolar")) flags.push({ label: "Bipolar disorder noted", detail: "Check current mood phase and medication adherence. Assess for manic or depressive episode." });
  if (!patient.consentTreatment || !patient.consentData) flags.push({ label: "Incomplete consent", detail: "Required consent forms not signed. Do not begin clinical work until consent is obtained." });

  const tabs = ["overview", "scores", "flags", "prep"];
  const tabLabel = t => ({ overview: "Overview", scores: "Scores", flags: `Flags${flags.length ? ` (${flags.length})` : ""}`, prep: "Prep" })[t];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: "linear-gradient(150deg,#1C3050 0%,#3562A0 100%)", padding: "44px 20px 20px", color: "#fff" }}>
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
          {flags.length > 0 && (
            <div style={{ background: "rgba(200,60,60,0.25)", borderRadius: 10, padding: "8px 12px", border: "1px solid rgba(255,100,100,0.35)", flex: 1 }}>
              <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 2 }}>Flags</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{flags.length}</div>
              <div style={{ fontSize: 11, fontWeight: 600 }}>Review</div>
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
              {[["Date of Birth", patient.dob || "—"], ["Email", patient.email || "—"], ["Phone", patient.phone || "—"], ["Pronouns", patient.pronouns || "—"], ["Allergies", patient.allergies || "None reported"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.charcoal, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, margin: "14px 0 10px" }}>MEDICAL HISTORY</div>
            <Card>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Diagnoses</div>
                {patient.diagnoses?.length ? <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{patient.diagnoses.map(d => <Badge key={d} label={d} color={C.blue} bg={C.blueLight} />)}</div> : <span style={{ fontSize: 13, color: C.muted }}>None listed</span>}
              </div>
              {patient.medications && <div style={{ marginBottom: 10 }}><div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Medications</div><div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.55 }}>{patient.medications}</div></div>}
              {patient.notes && <div><div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Patient notes</div><div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.55, background: C.sand, borderRadius: 10, padding: 10 }}>{patient.notes}</div></div>}
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, margin: "14px 0 10px" }}>CONSENT STATUS</div>
            {[{ label: "Informed consent for therapy", ok: patient.consentTreatment }, { label: "Data privacy & HIPAA", ok: patient.consentData }, { label: "Appointment reminders", ok: patient.consentContact }].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 12px", background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{c.ok ? "✅" : "❌"}</span>
                <span style={{ fontSize: 13, color: c.ok ? C.charcoal : C.danger, fontWeight: c.ok ? 400 : 600 }}>{c.label}</span>
              </div>
            ))}
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

        {tab === "flags" && (
          <>
            {flags.length === 0 ? (
              <div style={{ background: C.successLight, borderRadius: 14, padding: 20, border: `1px solid ${C.success}44`, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.success }}>No clinical flags</div>
                <div style={{ fontSize: 13, color: C.slate, marginTop: 6, lineHeight: 1.55 }}>Assessment scores and history show no immediate concerns requiring special attention before the session.</div>
              </div>
            ) : (
              <>
                <div style={{ background: C.dangerLight, borderRadius: 14, padding: 14, border: `1px solid ${C.danger}44`, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.danger, marginBottom: 4 }}>⚠️ {flags.length} item{flags.length > 1 ? "s" : ""} require attention</div>
                  <div style={{ fontSize: 12, color: C.slate }}>Review all flags before starting the session.</div>
                </div>
                {flags.map((f, i) => (
                  <Card key={i} style={{ borderLeft: `4px solid ${C.danger}`, marginBottom: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.danger, marginBottom: 6 }}>⚑ {f.label}</div>
                    <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.55 }}>{f.detail}</div>
                  </Card>
                ))}
              </>
            )}
          </>
        )}

        {tab === "prep" && (
          <>
            {patient.notes && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>PATIENT'S OWN WORDS</div>
                <div style={{ background: C.blueLight, borderRadius: 14, padding: 14, border: `1px solid ${C.blue}33`, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 6 }}>Patient-submitted notes</div>
                  <div style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.65, fontStyle: "italic" }}>"{patient.notes}"</div>
                </div>
              </>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>SESSION PREP CHECKLIST</div>
            {["Review PHQ-9 and GAD-7 scores in Scores tab", "Check all flags in the Flags tab", "Verify consent forms are signed", "Note current medications and allergies", "Prepare tailored opening questions based on patient notes", "Check medication interactions if applicable"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 12px", background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 6 }}>
                <span style={{ color: C.sage, flexShrink: 0, marginTop: 1 }}>○</span>
                <span style={{ fontSize: 13, color: C.charcoal }}>{item}</span>
              </div>
            ))}
            <div style={{ background: C.amberLight, borderRadius: 14, padding: 14, marginTop: 8, border: `1px solid ${C.amber}33` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 4 }}>Suggested opening</div>
              <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.6, fontStyle: "italic" }}>
                "Hi {patient.firstName}, it's great to meet you. I've had a chance to review your intake forms and assessments — how are you feeling about being here today?"
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "12px 18px 22px", borderTop: `1px solid ${C.border}`, background: C.white }}>
        <Btn variant="dark" style={{ width: "100%" }}>Begin session with {patient.firstName} →</Btn>
      </div>
    </div>
  );
}
