import { C, font } from '../../constants/theme';

export default function NavBar({ title, onBack, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 8px", borderBottom: `1px solid ${C.border}`, background: C.white, position: "sticky", top: 0, zIndex: 20 }}>
      {onBack && <button onClick={onBack} style={{ background: C.mint, border: "none", borderRadius: 10, width: 32, height: 32, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.sage, flexShrink: 0 }}>‹</button>}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal, fontFamily: font }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}
