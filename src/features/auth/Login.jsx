import { useState } from "react";
import { C, font } from '../../constants/theme';
import FieldInput from '../../components/ui/FieldInput';
import Btn from '../../components/ui/Btn';
import { login as apiLogin } from '../../api';

export default function Login({ onDone, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await apiLogin(email, password);
      onDone(user);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font }}>
      <div style={{ background: `linear-gradient(150deg,${C.sageDark} 0%,${C.sage} 100%)`, padding: "44px 20px 24px", color: "#fff" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", marginBottom: 12, padding: 0, opacity: 0.8 }}>← Back</button>
        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.65, letterSpacing: 1, marginBottom: 6 }}>MINDBRIDGE</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Welcome Back</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>Please sign in to continue</div>
      </div>

      <div style={{ flex: 1, padding: "30px 20px" }}>
        <form onSubmit={handleLogin}>
          <FieldInput label="Email Address" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <FieldInput label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          
          {error && <div style={{ color: C.danger, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>⚠️ {error}</div>}
          
          <Btn type="submit" disabled={loading} style={{ width: "100%", marginTop: 10, height: 50 }}>
            {loading ? "Signing in..." : "Sign In →"}
          </Btn>
        </form>
        
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Don't have an account? </span>
          <span style={{ fontSize: 13, color: C.sage, fontWeight: 700, cursor: "pointer" }} onClick={onBack}>Register</span>
        </div>
      </div>
    </div>
  );
}
