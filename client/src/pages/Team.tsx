import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTeamMembers, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'
import { ArrowRight } from 'lucide-react'

export default function Team() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeamMembers()
      .then(setTeam)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted">Loading team...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-24">
        <div className="container">
          <span className="label-text mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Our People
          </span>
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            The Team
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Since our founding, H2 Yacht Design has grown into one of the most innovative and
            technically skilled teams in the yacht design industry. Our passionate and dedicated
            designers bring over 30 years of expertise, continuously pushing creative boundaries
            to produce some of the world's most spectacular superyachts, private jets, and luxury
            residences.
          </p>
        </div>
      </section>

      {/* Team Grid or Fallback */}
      <section className="section-padding">
        <div className="container">
          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {team.map((member: any) => (
                <div key={member._id} className="group">
                  <div className="aspect-[3/4] bg-h2-light mb-6 img-zoom">
                    {member.image && (
                      <img
                        src={urlFor(member.image).width(600).quality(85).url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-[var(--h2-dark)] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-h2-muted mb-3">{member.role}</p>
                    {member.bio && member.bio[0] && (
                      <p className="text-sm text-h2-body leading-relaxed">
                        {member.bio[0].children?.[0]?.text || ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Beautiful fallback when no team data in Sanity */
            <div className="max-w-4xl mx-auto">
              {/* Team description */}
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-8">
                  A Multi-Disciplinary Studio
                </h2>
                <p className="text-base md:text-lg text-[var(--h2-body)] leading-relaxed max-w-3xl mx-auto">
                  Comprising a multi-disciplinary team, we bring together exterior stylists,
                  interior architects, 3D visualizers, and FF&E designers — all working in a
                  collaborative, dynamic environment to turn visionary concepts into reality.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--h2-border,#e5e5e5)]">
                {[
                  { value: '20+', label: 'Designers' },
                  { value: '30+', label: 'Years Experience' },
                  { value: '2', label: 'Studios' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white text-center py-14 px-8"
                  >
                    <span className="block text-5xl md:text-6xl font-light tracking-[-0.04em] text-[var(--h2-dark)] mb-3">
                      {stat.value}
                    </span>
                    <span className="label-text text-h2-muted">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Studio invitation */}
              <div className="mt-20 bg-h2-light py-16 px-8 md:px-16 text-center">
                <p className="label-text text-h2-muted mb-4">Visit Us</p>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-4">
                  Meet us in person
                </h3>
                <p className="text-[var(--h2-body)] leading-relaxed max-w-xl mx-auto mb-8">
                  Our doors are always open. Visit us at our London or Nice studios to meet the
                  team and discuss your next project face to face.
                </p>
                <Link href="/contact" className="btn-outline">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
            We're always looking for talented designers and creative thinkers to join our studios
            in London and Nice.
          </p>
          <Link href="/contact/careers" className="btn-outline-light">
            View Careers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
