import { Link } from 'wouter'
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react'

const footerNav = {
  studio: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/about' },
    { label: 'Careers', href: '/contact/careers' },
  ],
  work: [
    { label: 'Projects', href: '/projects' },
    { label: 'Concepts', href: '/projects' },
    { label: 'News', href: '/news' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/h2yachtdesign/',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/h2-yacht-design/',
      external: true,
    },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/h2yachtdesign/',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/h2-yacht-design/',
    icon: Linkedin,
  },
]

function H2Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 127.6 84.8"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M46.7 54.4V31.1H7.8v23.3H0V0h7.8v23.3h38.9V0h7.7v54.4zM62.3 54.4V39.3c0-8.1 7.8-15.9 15.8-15.9h23.1c7.8 0 7.8-6.4 7.8-7.8 0-1.2-.1-7.8-7.5-7.8H77.8c-7.8 0-7.8 7.8-7.8 7.8h-7.8S62.2 0 77.8 0h23.5c7.9 0 15.4 6.9 15.4 15.6 0 8-7.8 15.6-15.6 15.6H77.8c-7.8 0-7.8 8.1-7.8 8.1v7.4h46.7v7.8H62.3zM122.8 4.7c.7 0 1.3-.1 1.3-.9 0-.7-.7-.7-1.2-.7h-1.1v1.6h1zm-1.1 3.1h-.9V2.3h2.1c1.3 0 2 .5 2 1.6 0 1-.6 1.4-1.4 1.5l1.5 2.4h-1l-1.4-2.4h-.9v2.4zm1-6.9c-2.2 0-3.8 1.7-3.8 4.1 0 2.3 1.5 4.1 3.8 4.1 2.1 0 3.8-1.7 3.8-4.1 0-2.4-1.6-4.1-3.8-4.1m0 9.1c-2.9 0-4.9-2.1-4.9-5 0-3 2.3-5 4.9-5 2.6 0 4.9 2 4.9 5s-2.3 5-4.9 5M6.3 74.1V80H5.2v-5.9l-5.2-9h1.2l4.6 8 4.5-8h1.1zM18.7 74.6l-3.7.3c-1.6.1-2.6.9-2.6 2.2 0 1.5 1.1 2.3 2.6 2.3 2.6 0 3.7-2.1 3.7-4.2v-.6zm1.7 5.5c-1.3 0-1.7-.9-1.7-2.1-.6 1.5-2.2 2.3-3.8 2.3-2 0-3.6-1.2-3.6-3.2 0-1.9 1.4-3 3.5-3.1l3.9-.3v-1c0-1.7-1.2-2.4-2.8-2.4-1.7 0-2.9.8-3 2.3h-1c.1-2.1 1.8-3.3 4.1-3.3 1.4 0 3 .5 3.5 1.9.3.6.3 1.3.3 2V78c0 .7.1 1.1.8 1.1h.3v.9c-.3.1-.3.1-.5.1M27.3 80.3c-1.3 0-2.4-.5-3.1-1.2-1.1-1.1-1.5-2.5-1.5-4.3 0-1.8.4-3.2 1.5-4.3.7-.7 1.8-1.2 3.1-1.2 2.2 0 3.8 1.4 4.1 3.5h-1.1c-.2-1.4-1.4-2.5-3-2.5-1 0-1.8.3-2.3.9-.9 1-1.2 2.2-1.2 3.6s.2 2.6 1.2 3.6c.5.6 1.3.9 2.3.9 1.6 0 2.7-1.1 3-2.6h1.1c-.3 2.1-1.9 3.6-4.1 3.6M41.1 80v-6.9c0-1.8-.8-2.9-2.7-2.9-2.6 0-3.5 2.3-3.5 4.5V80h-1.1V64.9h1.1v6.6c.6-1.3 2.1-2.2 3.5-2.2 2.4 0 3.7 1.5 3.7 3.8V80h-1zM48.8 80.2c-2 0-2.7-1.2-2.7-3.1v-6.6H44v-1h2.1v-2.9l1-.3v3.1h3.3v1h-3.3V77c0 1.2.3 2.1 1.7 2.1.6 0 1.1-.1 1.7-.2v.9c-.5.3-1.1.4-1.7.4M65.2 67.3c-.8-.7-1.8-1.1-3-1.1h-3.8V79h3.8c1.1 0 2.2-.4 3-1.1 1.4-1.3 1.5-3.5 1.5-5.3s-.1-3.9-1.5-5.3m.8 11.3c-.9.9-2.2 1.5-3.8 1.5h-4.9v-15h4.9c1.6 0 2.9.6 3.8 1.5 1.6 1.6 1.8 3.9 1.8 6s-.2 4.4-1.8 6M74.4 70.2c-2.2 0-3.5 1.7-3.5 3.8h6.9c0-1.9-1.2-3.8-3.4-3.8m4.5 4.8h-8c0 1.2.4 2.4 1.1 3.1.6.7 1.4 1.1 2.5 1.1.9 0 1.7-.3 2.3-.9.4-.4.7-.9.8-1.5h1.1c-.1.9-.6 1.6-1.2 2.2-.8.8-1.8 1.2-3 1.2-1.5 0-2.6-.6-3.3-1.5-.9-1-1.3-2.4-1.3-4 0-1.3.2-2.6 1-3.7.9-1.2 2.1-1.8 3.6-1.8 2.8 0 4.5 2.4 4.5 5.1-.1.3-.1.5-.1.7M88.4 79c-.8.8-2 1.3-3.4 1.3s-2.6-.4-3.4-1.3c-.6-.7-.8-1.3-.9-2.1h1.1c.1.6.3 1.2.8 1.6.6.6 1.5.8 2.5.8 1.1 0 2-.3 2.5-.8.4-.4.6-.7.6-1.3 0-.9-.7-1.7-1.9-1.9l-2-.3c-.9-.1-1.8-.4-2.4-1-.4-.4-.6-1-.6-1.7 0-.8.4-1.5.9-2 .8-.7 1.8-1 2.9-1 1.3 0 2.5.4 3.2 1.2.5.6.8 1.3.8 1.9h-1c0-.3-.2-.9-.5-1.3-.5-.6-1.3-.9-2.4-.9-.8 0-1.4.1-1.9.5s-.8.9-.8 1.4c0 .9.4 1.6 2 1.8l2 .3c2 .3 2.9 1.6 2.9 2.9-.2.8-.5 1.4-1 1.9M92.1 69.5h1.1V80h-1.1V69.5zm-.2-4.4h1.5v1.5h-1.5v-1.5zM100.6 70.2c-1.6 0-2.9 1-2.9 2.7 0 1.7 1.3 2.7 2.9 2.7 1.6 0 2.9-1 2.9-2.7 0-1.6-1.2-2.7-2.9-2.7m3.7 10.1c-.5-.5-1.3-.8-2.5-.8H99c-.9.2-1.7.9-1.7 2.2 0 .5.2 1 .6 1.3.8.7 2.1.8 3.1.8s2.5-.1 3.3-.9c.3-.3.5-.8.5-1.3 0-.6-.2-1-.5-1.3m.7 3.3c-.9.9-2.5 1.2-4.2 1.2-1.6 0-3-.3-3.9-1.2-.5-.5-.7-1.1-.7-1.9 0-1 .6-2 1.6-2.5-.7-.2-1.3-1-1.3-1.7 0-.9.5-1.5 1.3-2-.7-.6-1.1-1.5-1.1-2.6 0-2.3 1.7-3.7 3.9-3.7.9 0 1.8.3 2.5.7.3-.9 1.2-1.4 2.1-1.4h.4v.9h-.4c-.8 0-1.3.4-1.4 1.1.5.6.8 1.4.8 2.4 0 2.3-1.8 3.6-4 3.6-.8 0-1.5-.2-2.1-.5-.5.2-1 .7-1 1.3 0 .5.3.8.7 1 .4.1 1 .2 1.4.2h2.3c1.3 0 2.4.3 3.1 1 .5.5.8 1.1.8 2 0 .9-.3 1.6-.8 2.1M115.2 80v-6.9c0-1.8-.8-2.9-2.7-2.9-2.6 0-3.5 2.2-3.5 4.5V80h-1.1V69.5h.9l.1 1.9c.6-1.3 2.1-2.2 3.5-2.2 2.4 0 3.7 1.5 3.7 3.8v7h-.9z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* Hero image banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="/images/jeff-brown-footer.jpg"
          alt="Superyacht by H2 Yacht Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--h2-navy)]" />
      </div>

      {/* Main footer */}
      <div
        className="relative"
        style={{ backgroundColor: 'var(--h2-navy)' }}
      >
        {/* Subtle gradient texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(19,167,227,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="container relative z-10 pt-16 pb-20 lg:pt-20 lg:pb-28">
          {/* Top row: Logo + email CTA */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20 lg:mb-24">
            <div className="space-y-6">
              <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
                <H2Logo className="h-14 w-auto text-white" />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm text-white/50">
                Award-winning superyacht interior and exterior design studio,
                with offices in London and Nice.
              </p>
            </div>

            <a
              href="mailto:info@h2yachtdesign.com"
              className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
            >
              <span className="text-xl md:text-2xl lg:text-3xl tracking-[-0.03em] font-light">
                info@h2yachtdesign.com
              </span>
              <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-16" />

          {/* Navigation + offices grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
            {/* Studio */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                Studio
              </h4>
              <ul className="space-y-3">
                {footerNav.studio.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                Work
              </h4>
              <ul className="space-y-3">
                {footerNav.work.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerNav.connect.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* London */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                London
              </h4>
              <address className="not-italic text-sm leading-relaxed space-y-0.5 text-white/55">
                <p>8 Princeton Court</p>
                <p>53/55 Felsham Road</p>
                <p>Putney, SW15 1AZ</p>
              </address>
              <p className="mt-3">
                <a
                  href="tel:+442087885008"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                >
                  +44 (0)208 788 5008
                </a>
              </p>
            </div>

            {/* Nice */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                Nice
              </h4>
              <address className="not-italic text-sm leading-relaxed space-y-0.5 text-white/55">
                <p>4 Palais Jolienne</p>
                <p>43 Blvd Gambetta</p>
                <p>5th Floor, 06000</p>
              </address>
              <p className="mt-3">
                <a
                  href="tel:+33422328906"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                >
                  +33 422 328 906
                </a>
              </p>
            </div>

            {/* Social */}
            <div>
              <h4 className="label-text mb-5 text-white/35 tracking-[0.15em]">
                Follow
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/45 hover:text-white hover:border-white/50 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="container py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[0.7rem] tracking-widest uppercase text-white/30">
                &copy; 2026 H2 Yacht Design. All rights reserved.
              </p>
              <p className="text-[0.7rem] tracking-widest uppercase text-white/30">
                Design by{' '}
                <a
                  href="https://studio-cjn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white/60 transition-colors duration-300"
                >
                  Studio-cjn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
