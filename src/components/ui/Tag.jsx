export default function Tag({ label, color = 'a1' }) {
  return (
    <span
      className="font-mono text-[9px] tracking-[.18em] px-2 py-[3px] rounded-[10px] border inline-block"
      style={{
        color: `var(--${color})`,
        background: `var(--${color}t)`,
        borderColor: `color-mix(in srgb, var(--${color}) 30%, transparent)`,
      }}
    >
      {label}
    </span>
  )
}
