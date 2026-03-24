import { C } from '../../constants/theme';

export default function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 16px", marginBottom: 10, cursor: onClick ? "pointer" : "default", transition: onClick ? "box-shadow 0.15s,border-color 0.15s" : undefined, ...style }}
      onMouseEnter={onClick ? e => { e.currentTarget.style.boxShadow = `0 0 0 3px ${C.mintDark}`; e.currentTarget.style.borderColor = C.sage; } : undefined}
      onMouseLeave={onClick ? e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; } : undefined}
    >{children}</div>
  );
}
