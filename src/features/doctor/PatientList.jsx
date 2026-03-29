import { useState, useEffect } from "react";
import { C, font } from '../../constants/theme';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { getPatients } from '../../api';

export default function PatientList({ onSelect }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients().then(data => {
      // Filter out admins/doctors if needed, or show all
      setPatients(data.filter(u => u.role === "patient"));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: C.muted }}>Loading patients...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: "linear-gradient(150deg,#1C3050 0%,#3562A0 100%)", padding: "44px 20px 24px", color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.65, letterSpacing: 1, marginBottom: 6 }}>DOCTOR DASHBOARD</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>Your Patients</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Review current assessments and prepare for upcoming sessions.</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>{patients.length} REGISTERED PATIENTS</div>
        
        {patients.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: C.muted }}>No patients found yet.</div>
        ) : (
          patients.map(p => {
            const scores = p.scores || {};
            const doneCount = Object.values(scores).filter(s => s !== null).length;
            const total = 2; // Hardcoded PHQ-9 and GAD-7
            const isComplete = doneCount >= total;

            return (
              <Card key={p._id} onClick={() => onSelect(p)} style={{ marginBottom: 12, cursor: "pointer", transition: "transform 0.1s" }} hoverScale={1.01}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Avatar name={`${p.firstName} ${p.lastName}`} size={46} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{p.firstName} {p.lastName}</div>
                      <Badge label={isComplete ? "Complete" : "Pending"} color={isComplete ? C.success : C.amber} bg={isComplete ? C.successLight : C.amberLight} />
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{p.email}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.sage, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                       <span>📋 Assessments: {doneCount}/{total}</span>
                       {isComplete && <span style={{ opacity: 0.5 }}> · </span>}
                       {isComplete && <span>Ready for review</span>}
                    </div>
                  </div>
                  <div style={{ color: C.border, fontSize: 18 }}>›</div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
