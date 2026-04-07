import { useState, useEffect } from 'react';
import { C, font } from './constants/theme';
import Registration from './features/registration/Registration';
import AssessmentList from './features/assessment/AssessmentList';
import AssessmentQuiz from './features/assessment/AssessmentQuiz';
import DoctorReview from './features/doctor/DoctorReview';
import PatientList from './features/doctor/PatientList';
import Welcome from './features/landing/Welcome';
import Login from './features/auth/Login';
import Profile from './features/profile/Profile';
import { registerPatient, submitAssessment, getPatient, getPatients, deletePatient, purgePatients } from './api';

export default function App() {
  const [phase, setPhase] = useState("welcome"); // phases: welcome, login, register, patient, doctor
  const [patient, setPatient] = useState(null);
  const [activeQ, setActiveQ] = useState(null);
  const [completedKeys, setCompletedKeys] = useState([]);
  const [scores, setScores] = useState({});
  const [tab, setTab] = useState("assessments");
  const [doctorSelectedPatient, setDoctorSelectedPatient] = useState(null);
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [doctorLoading, setDoctorLoading] = useState(true);

  useEffect(() => {
    if (phase === "doctor") {
      setDoctorLoading(true);
      getPatients().then(data => {
        setDoctorPatients(data.filter(u => u.role === "patient"));
        setDoctorLoading(false);
      }).catch(err => {
        console.error(err);
        setDoctorLoading(false);
      });
    }
  }, [phase]);

  const onLoginDone = (user) => {
    setPatient(user);
    setScores(user.scores || {});
    const done = Object.keys(user.scores || {}).filter(k => user.scores[k] !== null);
    setCompletedKeys(done);
    const isPrivileged = user.role === "doctor" || user.role === "admin";
    setPhase(isPrivileged ? "doctor" : "patient");
    setTab("assessments");
    setDoctorSelectedPatient(null);
  };

  const onRegDone = async (data) => {
    try {
      const saved = await registerPatient(data);
      onLoginDone(saved);
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.message || "Registration failed.");
    }
  };



  const onAssessmentDone = async (key, score) => {
    try {
      const updated = await submitAssessment(patient._id, key, score);
      setScores(updated.scores);
      setCompletedKeys(k => k.includes(key) ? k : [...k, key]);
      setActiveQ(null);
    } catch (err) {
      console.error("Assessment submit failed:", err);
      setScores(s => ({ ...s, [key]: score }));
      setCompletedKeys(k => k.includes(key) ? k : [...k, key]);
      setActiveQ(null);
    }
  };

  const handleDoctorView = async () => {
    if (patient?._id) {
      try {
        const fresh = await getPatient(patient._id);
        setPatient(fresh);
        setScores(fresh.scores);
      } catch { /* use cached */ }
    }
    setPhase("doctor");
  };

  const handleLogout = () => {
    setPhase("welcome");
    setPatient(null);
    setCompletedKeys([]);
    setScores({});
    setActiveQ(null);
    setTab("assessments");
  };

  const handleDelete = async (patientID) => {
    if (!window.confirm("Are you sure you want to delete this patient and all their results? This cannot be undone.")) return;
    try {
      await deletePatient(patientID);
      setDoctorPatients(prev => prev.filter(p => p._id !== patientID));
      setDoctorSelectedPatient(null);
    } catch (err) {
      alert("Failed to delete patient");
    }
  }

  const renderInner = () => {
    if (phase === "welcome") return <Welcome onStart={() => setPhase("register")} onLogin={() => setPhase("login")} />;
    if (phase === "login") return <Login onDone={onLoginDone} onBack={() => setPhase("welcome")} />;
    if (phase === "register") return <Registration onDone={onRegDone} onBack={() => setPhase("welcome")} />;
    
    if (!patient) return <Welcome onStart={() => setPhase("register")} onLogin={() => setPhase("login")} />;
    if (phase === "doctor") {
      if (doctorSelectedPatient) {
        return <DoctorReview patient={doctorSelectedPatient} scores={doctorSelectedPatient.scores || {}} onBack={() => setDoctorSelectedPatient(null)} onDelete={() => handleDelete(doctorSelectedPatient._id)} />;
      }
      return <PatientList patients={doctorPatients} loading={doctorLoading} onSelect={setDoctorSelectedPatient} />;
    }
    
    if (activeQ) return <AssessmentQuiz assessmentKey={activeQ} onDone={score => onAssessmentDone(activeQ, score)} onBack={() => setActiveQ(null)} />;
    
    if (tab === "profile") return <Profile user={patient} onLogout={handleLogout} />;
    
    return <AssessmentList completedKeys={completedKeys} onStart={setActiveQ} onDoctorView={handleDoctorView} />;
  };

  const showNav = !["welcome", "login", "register"].includes(phase) && !activeQ;
  const isPrivileged = patient?.role === "doctor" || patient?.role === "admin";

  return (
    <div style={{ fontFamily: font, background: "#E4DFDA", minHeight: "100vh", paddingTop: 20 }}>
      {showNav && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, paddingBottom: 14 }}>
          <span style={{ fontSize: 12, color: "#888" }}>Logged in as:</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.sageDark }}>{patient.firstName} ({patient.role})</span>
          {isPrivileged && (
             <button onClick={() => setPhase(phase === "doctor" ? "patient" : "doctor")} style={{ padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, fontFamily: font, cursor: "pointer", background: C.sage, color: "#fff", border: "none" }}>
               {phase === "doctor" ? "View Patients" : "🩺 Provider View"}
             </button>
          )}
          {!["doctor", "profile"].includes(tab) && <button onClick={handleLogout} style={{ padding: "5px 10px", borderRadius: 99, fontSize: 11, fontFamily: font, cursor: "pointer", background: "#fff", color: C.muted, border: `1px solid ${C.border}` }}>Log Out</button>}
        </div>
      )}

      <div style={{ width: 390, margin: "0 auto", border: "10px solid #1a1a1a", borderRadius: 44, height: 790, overflow: "hidden", boxShadow: "0 32px 72px rgba(0,0,0,0.22),inset 0 0 0 1px rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", background: C.cream, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 110, height: 24, background: "#1a1a1a", borderRadius: "0 0 16px 16px", zIndex: 30 }} />
        <div style={{ height: 26, flexShrink: 0 }} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderInner()}
        </div>

        {showNav && phase !== "doctor" && (
          <div style={{ height: 80, background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 10 }}>
            {[{ id: "assessments", icon: "📋", label: "Home" }, { id: "profile", icon: "👤", label: "Profile" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", opacity: tab === t.id ? 1 : 0.4, transition: "0.2s" }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: tab === t.id ? C.sageDark : C.muted }}>{t.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
