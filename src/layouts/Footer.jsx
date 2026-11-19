import { GraduationCap } from 'lucide-react'
import { site } from '@/config/site'
import SmartLink from '@/components/ui/SmartLink'

const columns = [
  ['Product', ['Features', 'Programs', 'Pricing']],
  ['Resources', ['Help Centre', 'Documentation', 'Contact']],
  ['Company', ['About Us', 'Privacy Policy', 'Terms']],
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
        <div>
          <SmartLink href="/" className="flex items-center gap-2 text-xl font-extrabold">
            <GraduationCap className="text-blue-600" size={25} />
            {site.brand}
          </SmartLink>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
            Smart institute management. Better learning experiences. Stronger student outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          {columns.map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold">{heading}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 transition hover:text-blue-600">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
        © 2026 {site.brand}. All rights reserved.
      </div>
    </footer>
  )
}
