import Reveal from './Reveal'

const stats = [
  ['2,480+', 'Active Students'],
  ['120+', 'Expert Trainers'],
  ['36+', 'Active Batches'],
  ['92%', 'Placement Rate'],
]

export default function Statistics() {
  return (
    <section className="border-b border-slate-100 px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center text-sm font-medium text-slate-500">
            Everything your institute needs to grow
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <Reveal key={label} delay={index * 90}>
              <div className="text-center">
                <p className="text-3xl font-extrabold tracking-tight text-blue-600 sm:text-4xl">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
