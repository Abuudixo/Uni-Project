import { C } from '../../constants/theme';

export default function Badge({ label, color = C.sage, bg = C.mint }) {
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 0.3, background: bg, color }}>{label}</span>;
}
