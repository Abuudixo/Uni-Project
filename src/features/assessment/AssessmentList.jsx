import { C, font } from '../../constants/theme';
import { ASSESSMENTS } from '../../data/assessments';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Btn from '../../components/ui/Btn';

export default function AssessmentList({ completedKeys, onStart, onDoctorView }) {
  const list = [ASSESSMENTS.phq9, ASSESSMENTS.gad7];
  const allDone = list.every(a => completedKeys.includes(a.key));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: `linear-gradient(150deg,${C.sageDark} 0%,${C.sageLight} 100%)`, padding: "44px 20px 24px", color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.65, letterSpacing: 1, marginBottom: 6 }}>PRE-SESSION</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Your Assessments</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6, lineHeight: 1.5 }}>Complete these before meeting your therapist so they can be fully prepared.</div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          <div style={{ flex: completedKeys.length, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.9)", transition: "flex 0.4s", minWidth: completedKeys.length === 0 ? 0 : undefined }} />
          <div style={{ flex: list.length - completedKeys.length, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.25)" }} />
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>{completedKeys.length} of {list.length} complete</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
        {allDone && (
          <div style={{ background: C.successLight, borderRadius: 14, padding: 14, marginBottom: 16, border: `1px solid ${C.success}44`, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.success }}>All done!</div>
              <div style={{ fontSize: 12, color: C.slate, marginTop: 2 }}>Your therapist has been notified and is reviewing your results now.</div>
            </div>
          </div>
        )}

        {list.map(a => {
          const done = completedKeys.includes(a.key);
          return (
            <Card key={a.key} style={{ borderLeft: `4px solid ${done ? a.color : C.border}`, marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: done ? a.colorLight : C.sand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{done ? "✓" : a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{a.name}</span>
                    {done && <Badge label="Complete" color={C.success} bg={C.successLight} />}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted }}>{a.full}</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
                    <span style={{ fontSize: 12, color: C.slate }}>🕐 {a.duration}</span>
                    <span style={{ fontSize: 12, color: C.slate }}>📊 {a.questions.length} questions</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn onClick={() => onStart(a.key)} variant={done ? "ghost" : "primary"} style={{ width: "100%", fontSize: 13 }}>
                  {done ? "Retake assessment" : `Start ${a.name} →`}
                </Btn>
              </div>
            </Card>
          );
        })}

        {!allDone && (
          <div style={{ background: C.sand, borderRadius: 14, padding: 14, marginTop: 4, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>
              💡 <strong>Why does this matter?</strong> Your answers help your therapist understand what you're going through right now — so your first session focuses on what matters most to you.
            </div>
          </div>
        )}

        {allDone && (
          <Btn onClick={onDoctorView} style={{ width: "100%", marginTop: 4, background: "#243B55" }}>
            🩺 Preview doctor's view →
          </Btn>
        )}
      </div>
    </div>
  );
}
