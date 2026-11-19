import { Code2, BrainCircuit, Palette, Cloud } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from './Reveal'
import CourseCard from './CourseCard'

const featuredCourses = [
  {
    title: 'Full Stack Web Development',
    category: 'Development',
    description:
      'Master modern frontend and backend with React, Node.js, Python, and PostgreSQL through practical live projects.',
    duration: '6 Months',
    students: '840+ Students',
    rating: '4.9',
    badge: 'Popular',
    level: 'Beginner to Pro',
    icon: Code2,
  },
  {
    title: 'Data Science & Machine Learning',
    category: 'AI & Data',
    description:
      'Learn Python, Pandas, statistical modeling, machine learning algorithms, and deep learning.',
    duration: '5 Months',
    students: '620+ Students',
    rating: '4.8',
    badge: 'Trending',
    level: 'Intermediate',
    icon: BrainCircuit,
  },
  {
    title: 'UI/UX Design Masterclass',
    category: 'Design',
    description:
      'Design intuitive web and mobile interfaces using Figma, user research, wireframing, and prototyping.',
    duration: '3 Months',
    students: '490+ Students',
    rating: '4.9',
    badge: 'Hands-on',
    level: 'All Levels',
    icon: Palette,
  },
  {
    title: 'Cloud & DevOps Engineering',
    category: 'Cloud',
    description:
      'Learn Docker, Kubernetes, CI/CD pipelines, AWS deployment, and infrastructure as code.',
    duration: '4 Months',
    students: '380+ Students',
    rating: '4.7',
    badge: 'High Demand',
    level: 'Intermediate',
    icon: Cloud,
  },
]

export default function Courses() {
  return (
    <section id="courses" className="bg-slate-50 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Industry-Ready Programs"
            title="Explore our featured courses."
            highlight="Built for real careers."
            description="Practical, curriculum-driven programs crafted with industry experts to prepare you for high-growth tech roles."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2">
          {featuredCourses.map((course, index) => (
            <Reveal key={course.title} delay={index * 80}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
