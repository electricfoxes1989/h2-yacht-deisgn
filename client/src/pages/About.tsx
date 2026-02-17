import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Link } from "wouter"
import { ArrowRight } from "lucide-react"

const interiorSteps = [
  "GA Room Plan",
  "Reference Images / Mood Boards",
  "Concept Sketches",
  "White 3D Model",
  "Fabric & Materials Boards",
  "Finished Renderings",
  "Schedules",
  "Production Drawings",
  "Art Works & Accessories",
]

const exteriorSteps = [
  "Concepts / Sketches",
  "Computer 3D Model",
  "3D Rendering",
  "Exterior Deck Areas",
  "Exterior Fabrics / Furniture",
  "Supervision of Construction",
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-24">
        <div className="container">
          <span className="label-text inline-block mb-6 tracking-[0.2em] text-white/50">
            Est. 1994
          </span>
          <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-8 max-w-4xl">
            About H2 Yacht Design
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-white/70">
            Established in London over 30 years ago
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left -- Pull quote */}
            <div>
              <span className="label-text inline-block mb-8 text-h2-muted">Our Story</span>
              <blockquote className="heading-serif text-3xl md:text-4xl lg:text-[2.75rem] text-h2-dark leading-[1.2]">
                "We pride ourselves in not having a house style"
              </blockquote>
              <div className="mt-8 h-px w-16 bg-[var(--h2-cyan)]" />
            </div>

            {/* Right -- History text */}
            <div className="space-y-6 text-base leading-[1.8] text-h2-body">
              <p>
                Jonny Horsfield established the H2 design studio in London during 1994. In the early
                years of the business they worked almost exclusively on yacht refit projects which
                gave them a broad experience of working to strict time frames in different design
                styles with varying budgets.
              </p>
              <p>
                During this period H2 built an enviable reputation amongst the yacht community for
                being the refit design experts. Word spread quickly, and before long the studio was
                being approached for new-build interior and exterior commissions alike.
              </p>
              <p>
                Established in 1994, we are a leading superyacht design studio with two prime
                locations: London, near the world's top fabric and furniture houses, and Nice, South
                of France, just steps from the yachts themselves. Our studios are designed to inspire
                creativity, featuring open-plan, light-filled workspaces. Our extensive fabric rooms
                house thousands of samples, enabling us to craft cohesive and imaginative colour
                boards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-h2-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--h2-border)]">
            {[
              { value: "30+", label: "Years of Excellence" },
              { value: "200+", label: "Completed Projects" },
              { value: "20+", label: "Multi-Disciplinary Designers" },
            ].map((stat) => (
              <div key={stat.label} className="py-12 md:py-16 text-center">
                <span className="heading-serif text-4xl md:text-5xl text-h2-navy block mb-3">
                  {stat.value}
                </span>
                <span className="label-text text-h2-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="section-padding bg-h2-cream">
        <div className="container max-w-4xl mx-auto">
          <span className="label-text inline-block mb-8 text-h2-muted">Design Philosophy</span>

          <blockquote className="heading-serif text-3xl md:text-4xl lg:text-5xl text-h2-dark mb-12 leading-[1.15]">
            "Our portfolio is wonderfully diverse, enabling us to work in any style the client
            prefers"
          </blockquote>

          <div className="space-y-6 text-base leading-[1.8] text-h2-body max-w-3xl">
            <p>
              We are a design company here to serve our customers and, as such, H2 pride ourselves
              in not having a 'house style' that is replicated for each client. Instead our portfolio
              is wonderfully diverse, enabling us to work in any style the client prefers. This is
              both stimulating for us as designers and comforting for our customers.
            </p>
            <p>
              Every project begins with a blank canvas and a conversation -- understanding each
              owner's vision, lifestyle and aspirations before a single line is drawn. By combining
              timeless elegance with cutting-edge technology, we ensure that every H2 yacht is not
              only beautiful but also functional, efficient and built to the highest standards of
              craftsmanship.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-[var(--h2-gold)]" />
            <span className="text-sm font-medium tracking-wide text-h2-dark">
              Jonny Horsfield, Founder
            </span>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <span className="label-text inline-block mb-6 text-white/50">Our Process</span>
            <h2 className="heading-serif text-4xl md:text-5xl">
              From Concept to Completion
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Interior Design Process */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium tracking-[-0.03em] mb-10 text-white">
                Interior Design
              </h3>
              <ol className="space-y-0">
                {interiorSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-5 group">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-sm font-medium text-white/60 group-hover:border-[var(--h2-cyan)] group-hover:text-[var(--h2-cyan)] transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < interiorSteps.length - 1 && (
                        <div className="w-px h-8 bg-white/10 mt-1" />
                      )}
                    </div>
                    <span className="text-white/75 pt-1.5 text-[0.95rem] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Exterior Design Process */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium tracking-[-0.03em] mb-10 text-white">
                Exterior Design
              </h3>
              <ol className="space-y-0">
                {exteriorSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-5 group">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-sm font-medium text-white/60 group-hover:border-[var(--h2-cyan)] group-hover:text-[var(--h2-cyan)] transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < exteriorSteps.length - 1 && (
                        <div className="w-px h-8 bg-white/10 mt-1" />
                      )}
                    </div>
                    <span className="text-white/75 pt-1.5 text-[0.95rem] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Our Studios */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <span className="label-text inline-block mb-6 text-h2-muted">Our Studios</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-h2-dark">
              London & Nice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 max-w-4xl mx-auto">
            {/* London */}
            <div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-h2-dark mb-2">
                London
              </h3>
              <div className="h-px w-10 bg-[var(--h2-cyan)] mb-6" />
              <address className="not-italic text-h2-body leading-[1.8] space-y-0.5 mb-5">
                <p>8 Princeton Court</p>
                <p>53/55 Felsham Road</p>
                <p>Putney, SW15 1AZ</p>
                <p>London, UK</p>
              </address>
              <p className="text-h2-body">
                <a
                  href="tel:+442087885008"
                  className="hover:text-h2-dark transition-colors"
                >
                  +44 (0)208 788 5008
                </a>
              </p>
            </div>

            {/* Nice */}
            <div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-h2-dark mb-2">
                Nice
              </h3>
              <div className="h-px w-10 bg-[var(--h2-cyan)] mb-6" />
              <address className="not-italic text-h2-body leading-[1.8] space-y-0.5 mb-5">
                <p>4 Palais Jolienne</p>
                <p>43 Boulevard Gambetta</p>
                <p>5th Floor, 06000</p>
                <p>Nice, France</p>
              </address>
              <p className="text-h2-body">
                <a
                  href="tel:+33422328906"
                  className="hover:text-h2-dark transition-colors"
                >
                  +33 422 328 906
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-h2-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <span className="label-text inline-block mb-8 text-h2-muted">Our Team</span>
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-h2-dark mb-10">
              A Multi-Disciplinary Studio
            </h2>
            <div className="space-y-6 text-base leading-[1.8] text-h2-body max-w-3xl">
              <p>
                Since our founding, H2 Yacht Design has grown into one of the most innovative and
                technically skilled teams in the yacht design industry. Our passionate and dedicated
                designers bring over 30 years of expertise, continuously pushing creative boundaries
                to produce some of the world's most spectacular superyachts, private jets, and luxury
                residences.
              </p>
              <p>
                Comprising a multi-disciplinary team, we bring together exterior stylists, interior
                architects, 3D visualizers, and FF&E designers -- all working in a collaborative,
                dynamic environment to turn visionary concepts into reality.
              </p>
            </div>
            <div className="mt-10">
              <Link href="/team" className="btn-outline inline-flex items-center gap-2">
                Meet the Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <span className="label-text inline-block mb-6 text-white/50">Get in Touch</span>
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Begin Your Journey
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-10 text-white/65 leading-relaxed">
            Whether you're planning a new build or a comprehensive refit, our team is ready to bring
            your vision to life.
          </p>
          <Link href="/contact" className="btn-outline-light inline-flex items-center gap-2">
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
