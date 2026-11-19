import { useState } from 'react'
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react'
import Reveal from './Reveal'

export default function Enquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="enquiry" className="px-5 pb-20 pt-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-600 to-sky-500 px-6 py-16 text-white sm:py-20 sm:px-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-5xl">Ready to transform your institute?</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100">
              Bring admissions, learning, payments and student management into one powerful platform. Send us an enquiry or request a demo today.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Get Started Today <ArrowRight size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 size={48} className="mx-auto text-emerald-300" />
                  <h3 className="mt-4 text-xl font-bold">Thank You!</h3>
                  <p className="mt-2 text-sm text-blue-100">We have received your enquiry and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
                  <h3 className="text-lg font-bold text-white">Send an Enquiry</h3>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="3"
                      placeholder="Message or specific requirement..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white transition hover:bg-slate-900"
                  >
                    Submit Enquiry <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
