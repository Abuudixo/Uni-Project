import { C, font } from '../../constants/theme';

export default function Btn({ children, onClick, variant = "primary", disabled = false, style = {} }) {
  const vs = { primary: { background: C.sage, color: "#fff", border: "none" }, outline: { background: "transparent", color: C.sage, border: `1.5px solid ${C.sage}` }, ghost: { background: C.mint, color: C.sageDark, border: "none" }, dark: { background: "#243B55", color: "#fff", border: "none" } };
  return (
    <button onClick={onClick} disabled={disabled} style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 13, padding: "13px 20px", fontWeight: 600, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font, transition: "opacity 0.15s,transform 0.1s", opacity: disabled ? 0.4 : 1, ...vs[variant], ...style }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >{children}</button>
  );
}
