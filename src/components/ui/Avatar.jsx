import { C, font } from '../../constants/theme';

export default function Avatar({ name, size = 40, bg = C.sage }) {
  const ini = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, color: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.36, fontFamily: font }}>{ini}</div>
  );
}
