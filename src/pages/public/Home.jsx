import Hero from './components/Hero'
import Statistics from './components/Statistics'
import Courses from './components/Courses'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Enquiry from './components/Enquiry'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Statistics />
      <Courses />
      <Features />
      <Testimonials />
      <Enquiry />
    </div>
  )
}
