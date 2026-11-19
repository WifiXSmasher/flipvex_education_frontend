import { GraduationCap } from 'lucide-react'
import { site } from '@/config/site'
import SmartLink from './SmartLink'

export default function Logo({ className = '' }) {
  return (
    <SmartLink href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
        <GraduationCap size={25} />
      </span>
      <span className="text-xl font-extrabold tracking-tight">{site.brand}</span>
    </SmartLink>
  )
}