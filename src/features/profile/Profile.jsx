import { useState } from 'react';
import { C, font } from '../../constants/theme';
import Btn from '../../components/ui/Btn';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';

export default function Profile({ user, onLogout, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, dob: user.dob, phone: user.phone, pronouns: user.pronouns });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    await onUpdate(form);
    setIsEditing(false);
  };

  const info = [
    { key: "email", label: "Email Address", value: user.email, icon: "✉️", type: "email" },
    { key: "dob", label: "Date of Birth", value: user.dob || "Not provided", icon: "📅", type: "date" },
    { key: "pronouns", label: "Pronouns", value: user.pronouns || "Not provided", icon: "👤", type: "text" },
    { key: "phone", label: "Phone", value: user.phone || "Not provided", icon: "📞", type: "tel" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: `linear-gradient(150deg,${C.sageDark} 0%,${C.sage} 100%)`, padding: "50px 20px 30px", color: "#fff", textAlign: "center", position: "relative" }}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={{ position: "absolute", top: 44, right: 20, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>✏️ Edit</button>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Avatar name={`${user.firstName} ${user.lastName}`} size={84} border={`4px solid rgba(255,255,255,0.2)`} />
        </div>
        {isEditing ? (
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <input value={form.firstName} onChange={e => set("firstName", e.target.value)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 18, fontWeight: 700, width: 100, textAlign: "center", outline: "none" }} />
            <input value={form.lastName} onChange={e => set("lastName", e.target.value)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 18, fontWeight: 700, width: 100, textAlign: "center", outline: "none" }} />
          </div>
        ) : (
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{user.firstName} {user.lastName}</h2>
        )}
        <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 500, marginTop: 4 }}>{user.role === "doctor" ? "Clinical Provider" : "Self-Care Member"}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 18px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>PERSONAL DETAILS</div>
        <Card style={{ padding: "4px 14px", marginBottom: 24 }}>
          {info.map((item, i) => (
            <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < info.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize: 18 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{item.label}</div>
                {isEditing ? (
                  <input type={item.type} value={form[item.key]} onChange={e => set(item.key, e.target.value)} style={{ width: "100%", border: "none", borderBottom: `1.5px solid ${C.border}`, padding: "4px 0", fontSize: 14, fontWeight: 500, color: C.charcoal, outline: "none", background: "transparent" }} />
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.charcoal }}>{item.value}</div>
                )}
              </div>
            </div>
          ))}
        </Card>

        {isEditing ? (
          <div style={{ display: "flex", gap: 12 }}>
            <Btn onClick={handleSave} style={{ flex: 2 }}>Save Changes</Btn>
            <Btn onClick={() => setIsEditing(false)} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>ACCOUNT SETTINGS</div>
            <Btn onClick={onLogout} variant="ghost" style={{ width: "100%", color: C.danger, background: C.dangerLight, border: `1px solid ${C.danger}22` }}>
               Log Out of Account
            </Btn>
          </>
        )}
        
        <div style={{ textAlign: "center", marginTop: 32, opacity: 0.3 }}>
           <div style={{ fontSize: 10, fontWeight: 700, color: C.muted }}>MINDBRIDGE v1.2</div>
           <div style={{ fontSize: 10, fontWeight: 500, color: C.muted }}>Secure HIPAA-Compliant Connection</div>
        </div>
      </div>
    </div>
  );
}
