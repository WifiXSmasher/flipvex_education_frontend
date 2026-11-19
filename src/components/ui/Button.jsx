import SmartLink from './SmartLink'

const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition duration-300'
const variants = {
  primary:   'bg-brand-600 text-white shadow-lg shadow-brand-500/20 hover:-translate-y-0.5 hover:bg-brand-700',
  secondary: 'border border-slate-200 bg-white text-slate-900 hover:border-brand-300 hover:bg-brand-50',
}

export default function Button({ variant = 'primary', href, className = '', ...props }) {
  const cls = `${base} ${variants[variant]} ${className}`
  return href ? <SmartLink href={href} className={cls} {...props} /> : <button className={cls} {...props} />
}