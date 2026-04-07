import { C, font } from '../../constants/theme';

export default function FieldInput({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 5, fontFamily: font }}>{label}</div>}
      <input {...props} style={{ width: "100%", boxSizing: "border-box", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 13px", fontSize: 14, color: C.charcoal, outline: "none", fontFamily: font, transition: "border-color 0.15s", ...props.style }}
        onFocus={e => { e.target.style.borderColor = C.sage; }}
        onBlur={e => { e.target.style.borderColor = C.border; }}
      />
    </div>
  );
}
