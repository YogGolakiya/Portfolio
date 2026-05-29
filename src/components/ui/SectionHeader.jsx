export default function SectionHeader({ num, title, italic, sub, colorLine = 'a1' }) {
  return (
    <div className="mb-12 reveal-up">
      <p className="font-mono text-[10px] tracking-[.35em] mb-2" style={{ color:'var(--a1)' }}>
        {num}
      </p>
      <h2
        className="font-serif text-[clamp(28px,4vw,46px)] font-black leading-[1.1] tracking-tight"
        style={{ color:'var(--text)' }}
      >
        {title} {italic && <em className="not-italic" style={{ color:'var(--a1)' }}>{italic}</em>}
      </h2>
      {sub && (
        <p className="text-[15px] font-light max-w-[500px] leading-[1.8] mt-2.5" style={{ color:'var(--muted)' }}>
          {sub}
        </p>
      )}
      <div
        className="w-12 h-[3px] rounded-full mt-4"
        style={{ background:`linear-gradient(90deg,var(--${colorLine}),var(--a3))` }}
      />
    </div>
  )
}
