import { Star, Workflow, BarChart3, ShieldCheck } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from './Reveal'

const benefits = [
  {
    icon: Workflow,
    title: 'Automate daily operations',
    desc: 'Reduce manual work with automated admissions, fee reminders and attendance reports.',
  },
  {
    icon: BarChart3,
    title: 'Make smarter decisions',
    desc: 'Understand enrolment, revenue and student performance through detailed analytics.',
  },
  {
    icon: ShieldCheck,
    title: 'Everything stays secure',
    desc: "Role-based access and centralized records help protect your institute's data.",
  },
]

export default function Testimonials() {
  return (
    <>
      <section id="benefits" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Why Choose Us" title="Built to make your institute better." />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, desc }, index) => (
              <Reveal key={title} delay={index * 100}>
                <div className="h-full rounded-2xl bg-slate-50 p-8 transition hover:bg-blue-50">
                  <Icon className="text-blue-600" size={30} />
                  <h3 className="mt-6 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={19} fill="currentColor" />
            ))}
          </div>
          <h2 className="mt-7 text-2xl font-bold leading-relaxed sm:text-4xl">
            "Finally, one platform that brings our entire institute together. Managing students has never been this simple."
          </h2>
          <p className="mt-6 text-sm font-semibold text-slate-700">Institute Administrator</p>
          <p className="mt-1 text-xs text-slate-400">Sample testimonial</p>
        </Reveal>
      </section>
    </>
  )
}
