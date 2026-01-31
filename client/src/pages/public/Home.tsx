import { Hero } from '@/components/landing/Hero'
import { Services } from '@/components/landing/Services'
import { Projects } from '@/components/landing/Projects'
import { Testimonials } from '@/components/landing/Testimonials'
import { Team } from '@/components/landing/Team'
import { Contact } from '@/components/landing/Contact'
import { Banner } from '@/components/landing/Banner'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Team />
      <Banner />
      <Contact />
    </main>
  )
}
