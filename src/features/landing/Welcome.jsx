import { C, font } from '../../constants/theme';
import Btn from '../../components/ui/Btn';

export default function Welcome({ onStart, onLogin }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.cream, fontFamily: font, textAlign: "center", justifyContent: "space-between" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 30px" }}>
        <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${C.sage} 0%, ${C.sageDark} 100%)`, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 24, boxShadow: "0 12px 24px rgba(61, 122, 110, 0.2)" }}>
          🌿
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.charcoal, marginBottom: 12, letterSpacing: -0.5 }}>MindBridge</h1>
        <p style={{ fontSize: 16, color: C.slate, lineHeight: 1.6, marginBottom: 40, opacity: 0.8 }}>
          Bridging the gap between you and your mental well-being. Beautiful, secure, and professional.
        </p>
        
        <div style={{ width: "100%" }}>
          <Btn onClick={onStart} style={{ width: "100%", height: 54, fontSize: 16 }}>Create an Account</Btn>
        </div>
      </div>

      <div style={{ padding: "20px 30px 40px", borderTop: `1px solid ${C.border}`, background: C.white }}>
        <div style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>
          Login here if you have account <span style={{ color: C.sage, fontWeight: 700, cursor: "pointer" }} onClick={onLogin}>Sign in</span>
        </div>
      </div>
    </div>
  );
}
