import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Link } from 'wouter'
import { ArrowRight } from 'lucide-react'

const positions = [
  {
    title: 'Mid-Weight Designer',
    location: 'Bath, UK',
    type: 'Full-time',
    deadline: '16/03/2026',
    desc: 'We are looking for a talented mid-weight designer to join our studio in Bath. The ideal candidate will have a strong eye for detail, experience in luxury interior or exterior design, and a passion for creating beautifully crafted spaces on board superyachts.',
  },
  {
    title: 'Senior Yacht Designer',
    location: 'Bath, UK',
    type: 'Full-time',
    deadline: 'Open',
    desc: 'We are seeking an experienced yacht designer to join our multi-disciplinary team. The ideal candidate will have 5+ years of experience in superyacht design with a strong portfolio demonstrating innovation and technical competence.',
  },
]

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Join Our Team
            </p>
            <h1 className="heading-serif mb-8">Careers at H2</h1>
            <p className="text-lg leading-relaxed" style={{ maxWidth: '640px' }}>
              A close-knit team of multi-disciplinary interior and exterior yacht
              designers, producing some of the world's most spectacular yachts and
              residential properties.
            </p>
          </div>
        </div>
      </section>

      {/* About working at H2 */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="heading-serif">A world-class design team</h2>
            </div>
            <div className="space-y-6">
              <p className="text-h2-body leading-relaxed">
                Here at H2 we are a close-knit team of 20 multi-disciplinary
                interior &amp; exterior yacht designers, producing some of the
                world's most spectacular yachts and residential properties. Since
                the studio was first established in 1994, the team has grown, and
                now boasts a world class reputation as one of the most innovative
                and technically competent design teams in the yacht world.
              </p>
              <p className="text-h2-body leading-relaxed">
                Each member of the team shares a deep commitment to their work, as
                well as enthusiasm for each completely unique and bespoke project
                we work on. We encourage creativity, innovation and work in a
                relaxed and friendly environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="section-padding" style={{ backgroundColor: 'var(--h2-light-bg)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="label-text mb-4">Open Positions</p>
            <h2 className="heading-serif mb-12">Current opportunities</h2>

            <div className="space-y-6">
              {positions.map((job, i) => (
                <div
                  key={i}
                  className="bg-white border border-[var(--h2-border)] p-8 lg:p-10 hover:border-[var(--h2-navy)] transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <h3 className="text-xl font-medium tracking-[-0.02em]">
                      {job.title}
                    </h3>
                    {job.deadline !== 'Open' && (
                      <span className="text-sm text-h2-muted whitespace-nowrap">
                        Deadline: {job.deadline}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="tag">{job.location}</span>
                    <span className="tag">{job.type}</span>
                  </div>
                  <p className="text-h2-body mb-8 leading-relaxed">{job.desc}</p>
                  <a
                    href="mailto:info@h2yachtdesign.com"
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    Apply
                    <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speculative Applications */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-h2-cream p-10 lg:p-16">
              <h2 className="heading-serif mb-6">Don't see your role?</h2>
              <p className="text-h2-body leading-relaxed mb-8 max-w-2xl">
                We are always interested in hearing from talented designers,
                architects and creative professionals. Send us your CV and
                portfolio, and we will keep you in mind for future opportunities
                at the studio.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-serif mb-6">Ready to join us?</h2>
            <p className="mb-10 text-lg">
              Become part of a studio with nearly three decades of experience
              designing the world's finest yachts.
            </p>
            <Link href="/contact" className="btn-outline-light inline-flex items-center gap-2">
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
