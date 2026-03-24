import { useState } from 'react';
import { C, font } from './constants/theme';
import Registration from './features/registration/Registration';
import AssessmentList from './features/assessment/AssessmentList';
import AssessmentQuiz from './features/assessment/AssessmentQuiz';
import DoctorReview from './features/doctor/DoctorReview';

export default function App() {
  const [phase, setPhase] = useState("register");
  const [patient, setPatient] = useState(null);
  const [activeQ, setActiveQ] = useState(null);
  const [completedKeys, setCompletedKeys] = useState([]);
  const [scores, setScores] = useState({});

  const onRegDone = data => { setPatient(data); setPhase("patient"); };
  const onAssessmentDone = (key, score) => {
    setScores(s => ({ ...s, [key]: score }));
    setCompletedKeys(k => k.includes(key) ? k : [...k, key]);
    setActiveQ(null);
  };

  const renderInner = () => {
    if (phase === "register") return <Registration onDone={onRegDone} />;
    if (phase === "doctor") return <DoctorReview patient={patient} scores={scores} />;
    if (activeQ) return <AssessmentQuiz assessmentKey={activeQ} onDone={score => onAssessmentDone(activeQ, score)} />;
    return <AssessmentList completedKeys={completedKeys} onStart={setActiveQ} onDoctorView={() => setPhase("doctor")} />;
  };

  return (
    <div style={{ fontFamily: font, background: "#E4DFDA", minHeight: "100vh", paddingTop: 20 }}>
      {phase !== "register" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, paddingBottom: 14 }}>
          <span style={{ fontSize: 12, color: "#888" }}>View as:</span>
          {[{ id: "patient", label: "🙋 Patient" }, { id: "doctor", label: "🩺 Doctor" }].map(v => (
            <button key={v.id} onClick={() => setPhase(v.id)} style={{ padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, fontFamily: font, cursor: "pointer", background: phase === v.id ? C.sage : "#fff", color: phase === v.id ? "#fff" : C.slate, border: `1px solid ${phase === v.id ? C.sage : C.border}` }}>{v.label}</button>
          ))}
          <button onClick={() => { setPhase("register"); setPatient(null); setCompletedKeys([]); setScores({}); setActiveQ(null); }} style={{ padding: "5px 10px", borderRadius: 99, fontSize: 11, fontFamily: font, cursor: "pointer", background: "#fff", color: C.muted, border: `1px solid ${C.border}` }}>↺ Reset</button>
        </div>
      )}

      <div style={{ width: 390, margin: "0 auto", border: "10px solid #1a1a1a", borderRadius: 44, height: 790, overflow: "hidden", boxShadow: "0 32px 72px rgba(0,0,0,0.22),inset 0 0 0 1px rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", background: C.cream, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 110, height: 24, background: "#1a1a1a", borderRadius: "0 0 16px 16px", zIndex: 30 }} />
        <div style={{ height: 26, flexShrink: 0 }} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderInner()}
        </div>
      </div>
    </div>
  );
}
