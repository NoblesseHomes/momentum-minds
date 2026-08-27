// concept-doc §6 bilingual convention: section-level English labels/mottos
// render as an uppercase mono "eyebrow" above the Czech H2 — kept as one
// shared bit so the treatment stays identical everywhere it's used.
export default function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`block font-mono text-tag uppercase tracking-wide text-accent-primary lg:text-tag-desktop ${className}`}
    >
      {children}
    </span>
  );
}
