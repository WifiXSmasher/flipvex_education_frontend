import { Users, CalendarCheck, CreditCard, FileText, Award, Briefcase, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from './Reveal'

const features = [
  {
    icon: Users,
    title: 'Student Management',
    desc: 'Manage student profiles, enquiries, admissions and academic records from one place.',
  },
  {
    icon: CalendarCheck,
    title: 'Batches & Attendance',
    desc: 'Organize batches, class schedules and attendance with real-time updates.',
  },
  {
    icon: CreditCard,
    title: 'Fees & Payments',
    desc: 'Manage fee structures, installments, receipts and automated reminders.',
  },
  {
    icon: FileText,
    title: 'Exams & Results',
    desc: 'Create assessments, publish results and track student performance.',
  },
  {
    icon: Award,
    title: 'Certificates',
    desc: 'Generate and issue professional certificates after course completion.',
  },
  {
    icon: Briefcase,
    title: 'Placement Management',
    desc: 'Connect students with hiring partners and track placement opportunities.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Powerful Features"
            title="Everything your institute needs."
            highlight="Nothing you don't."
            description="Simplify everyday operations with one integrated platform designed for modern educational institutions."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <Reveal key={title} delay={(index % 3) * 90}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={23} />
                </div>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p>
                <a href="#enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Learn more <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
