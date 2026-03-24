import { C } from '../../constants/theme';

export default function ProgressBar({ val, max, color = C.sage, h = 5 }) {
  return (
    <div style={{ background: C.border, borderRadius: 99, height: h, overflow: "hidden" }}>
      <div style={{ width: `${Math.round((val / max) * 100)}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.4s ease" }} />
    </div>
  );
}
