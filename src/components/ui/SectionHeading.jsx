export default function SectionHeading({ eyebrow, title, highlight, description, align = 'center', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow && <span className="text-sm font-bold uppercase tracking-widest text-brand-600">{eyebrow}</span>}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
        {title}{highlight && <span className="text-brand-600"> {highlight}</span>}
      </h2>
      {description && <p className="mt-5 leading-7 text-slate-500">{description}</p>}
    </div>
  )
}