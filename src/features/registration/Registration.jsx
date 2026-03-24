import { useState } from "react";
import { C, font } from '../../constants/theme';
import FieldInput from '../../components/ui/FieldInput';
import Btn from '../../components/ui/Btn';

export default function Registration({ onDone }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", dob: "", email: "", phone: "", pronouns: "", diagnoses: [], medications: "", allergies: "", notes: "", consentTreatment: false, consentData: false, consentContact: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDx = d => set("diagnoses", form.diagnoses.includes(d) ? form.diagnoses.filter(x => x !== d) : [...form.diagnoses, d]);
  const dxOptions = ["Depression", "Anxiety", "PTSD", "OCD", "Bipolar", "ADHD", "Panic Disorder", "Social Anxiety", "Grief", "Other"];
  const canAdvance = [form.firstName && form.lastName && form.dob && form.email, true, form.consentTreatment && form.consentData][step];
  const stepTitles = ["Tell us about yourself", "Your health background", "Review & consent"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: `linear-gradient(150deg,${C.sageDark} 0%,${C.sage} 100%)`, padding: "44px 20px 24px", color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.65, letterSpacing: 1, marginBottom: 6 }}>MINDBRIDGE</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>{stepTitles[step]}</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Step {step + 1} of 3</div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= step ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)", transition: "background 0.3s" }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px 8px" }}>
        {step === 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <FieldInput label="First Name *" placeholder="Jamie" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
              <FieldInput label="Last Name *" placeholder="Reyes" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
            </div>
            <FieldInput label="Date of Birth *" type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
            <FieldInput label="Email Address *" type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
            <FieldInput label="Phone Number" type="tel" placeholder="+31 6 …" value={form.phone} onChange={e => set("phone", e.target.value)} />
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 8 }}>Pronouns</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["He/Him", "She/Her", "They/Them", "Prefer not to say"].map(p => (
                  <button key={p} onClick={() => set("pronouns", p)} style={{ padding: "7px 13px", borderRadius: 99, fontSize: 13, cursor: "pointer", fontFamily: font, fontWeight: 500, transition: "all 0.15s", border: `1.5px solid ${form.pronouns === p ? C.sage : C.border}`, background: form.pronouns === p ? C.mint : C.white, color: form.pronouns === p ? C.sageDark : C.slate }}>{p}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>Helps your therapist prepare. All data is encrypted and HIPAA-protected.</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 8 }}>Current diagnoses <span style={{ fontWeight: 400, color: C.muted }}>(select all that apply)</span></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {dxOptions.map(d => (
                <button key={d} onClick={() => toggleDx(d)} style={{ padding: "8px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer", fontFamily: font, fontWeight: 500, transition: "all 0.15s", border: `1.5px solid ${form.diagnoses.includes(d) ? C.sage : C.border}`, background: form.diagnoses.includes(d) ? C.mint : C.white, color: form.diagnoses.includes(d) ? C.sageDark : C.slate }}>{form.diagnoses.includes(d) ? "✓ " : ""}{d}</button>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 5 }}>Current medications</div>
              <textarea placeholder="List any medications and dosages…" value={form.medications} onChange={e => set("medications", e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 13px", fontSize: 14, color: C.charcoal, outline: "none", fontFamily: font, resize: "none", height: 72 }} onFocus={e => { e.target.style.borderColor = C.sage; }} onBlur={e => { e.target.style.borderColor = C.border; }} />
            </div>
            <FieldInput label="Allergies" placeholder="Any known allergies…" value={form.allergies} onChange={e => set("allergies", e.target.value)} />
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 5 }}>Anything else your therapist should know?</div>
              <textarea placeholder="Optional notes or context…" value={form.notes} onChange={e => set("notes", e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 13px", fontSize: 14, color: C.charcoal, outline: "none", fontFamily: font, resize: "none", height: 88 }} onFocus={e => { e.target.style.borderColor = C.sage; }} onBlur={e => { e.target.style.borderColor = C.border; }} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>Please read and agree to the following before we begin.</div>
            {[
              { key: "consentTreatment", icon: "📋", title: "Informed Consent for Therapy *", desc: "I understand I am entering a therapeutic relationship with a licensed mental health professional." },
              { key: "consentData", icon: "🔒", title: "Data Privacy & HIPAA *", desc: "I consent to my health data being stored in an encrypted, HIPAA-compliant system shared only with my care team." },
              { key: "consentContact", icon: "🔔", title: "Appointment Reminders", desc: "I'd like to receive appointment reminders and session follow-ups via email or SMS." },
            ].map(item => (
              <div key={item.key} onClick={() => set(item.key, !form[item.key])} style={{ background: form[item.key] ? C.mint : C.white, borderRadius: 14, padding: 14, marginBottom: 10, border: `1.5px solid ${form[item.key] ? C.sage : C.border}`, cursor: "pointer", transition: "all 0.15s", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, background: form[item.key] ? C.sage : C.white, border: `2px solid ${form[item.key] ? C.sage : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, transition: "all 0.15s" }}>{form[item.key] ? "✓" : ""}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 4 }}><span style={{ marginRight: 6 }}>{item.icon}</span>{item.title}</div>
                  <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ background: C.sand, borderRadius: 14, padding: 14, marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>YOUR PROFILE SUMMARY</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                {[["Name", `${form.firstName} ${form.lastName}`], ["DOB", form.dob || "—"], ["Pronouns", form.pronouns || "—"]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div style={{ fontSize: 13, fontWeight: 500, color: C.charcoal }}>{v}</div></div>
                ))}
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ fontSize: 11, color: C.muted }}>Diagnoses</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.charcoal }}>{form.diagnoses.length ? form.diagnoses.join(", ") : "None listed"}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "12px 18px 22px", borderTop: `1px solid ${C.border}`, background: C.white }}>
        <Btn onClick={() => step < 2 ? setStep(s => s + 1) : onDone(form)} disabled={!canAdvance} style={{ width: "100%" }}>
          {step < 2 ? "Continue →" : "Complete Registration"}
        </Btn>
        {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ display: "block", width: "100%", background: "none", border: "none", color: C.muted, fontSize: 13, marginTop: 10, cursor: "pointer", fontFamily: font }}>← Back</button>}
      </div>
    </div>
  );
}
