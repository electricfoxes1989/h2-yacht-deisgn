import { Link, useLocation } from 'wouter'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const projectSubLinks = [
  { href: '/projects/category/exterior', label: 'Exterior Design' },
  { href: '/projects/category/interiors', label: 'Interiors' },
  { href: '/projects/category/concepts', label: 'Concepts' },
  { href: '/projects/category/in-build', label: 'In Build' },
  { href: '/projects/category/bespoke', label: 'Bespoke' },
]

const aboutSubLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/contact/team', label: 'Team' },
  { href: '/contact/careers', label: 'Careers' },
]

const navLinks = [
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
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

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [location] = useLocation()
  const projectsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const aboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setProjectsOpen(false)
    setAboutOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const showDark = scrolled || mobileOpen

  const handleProjectsEnter = () => {
    if (projectsTimer.current) clearTimeout(projectsTimer.current)
    setProjectsOpen(true)
  }
  const handleProjectsLeave = () => {
    projectsTimer.current = setTimeout(() => setProjectsOpen(false), 150)
  }
  const handleAboutEnter = () => {
    if (aboutTimer.current) clearTimeout(aboutTimer.current)
    setAboutOpen(true)
  }
  const handleAboutLeave = () => {
    aboutTimer.current = setTimeout(() => setAboutOpen(false), 150)
  }

  const allMobileLinks = [
    { href: '/projects', label: 'All Projects', indent: false },
    ...projectSubLinks.map(l => ({ ...l, indent: true })),
    { href: '/about', label: 'About', indent: false },
    ...aboutSubLinks.map(l => ({ ...l, indent: true })),
    ...navLinks.map(l => ({ ...l, indent: false })),
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ${
          showDark
            ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center shrink-0 transition-colors duration-500 ${
                showDark ? 'text-[var(--h2-navy)]' : 'text-white'
              }`}
            >
              <H2Logo className="h-12 w-auto" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {/* Projects dropdown */}
              <div
                className="relative"
                onMouseEnter={handleProjectsEnter}
                onMouseLeave={handleProjectsLeave}
              >
                <Link
                  href="/projects"
                  className={`inline-flex items-center gap-1 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:opacity-60 ${
                    showDark ? 'text-[var(--h2-dark)]' : 'text-white'
                  } ${location.startsWith('/projects') ? 'opacity-100' : ''}`}
                >
                  Projects
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      projectsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                    projectsOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 py-3 min-w-[200px]">
                    <Link
                      href="/projects"
                      className="block px-6 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[var(--h2-cyan)] hover:bg-gray-50 transition-colors"
                    >
                      View All
                    </Link>
                    <div className="h-px bg-gray-100 mx-4 my-1" />
                    {projectSubLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-6 py-2.5 text-sm text-[var(--h2-dark)] hover:text-[var(--h2-cyan)] hover:bg-gray-50 transition-colors tracking-[-0.01em]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* About dropdown */}
              <div
                className="relative"
                onMouseEnter={handleAboutEnter}
                onMouseLeave={handleAboutLeave}
              >
                <Link
                  href="/about"
                  className={`inline-flex items-center gap-1 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:opacity-60 ${
                    showDark ? 'text-[var(--h2-dark)]' : 'text-white'
                  } ${location.startsWith('/about') || location.startsWith('/contact/careers') || location.startsWith('/contact/team') || location === '/team' ? 'opacity-100' : ''}`}
                >
                  About
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      aboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                    aboutOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 py-3 min-w-[180px]">
                    {aboutSubLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-6 py-2.5 text-sm text-[var(--h2-dark)] hover:text-[var(--h2-cyan)] hover:bg-gray-50 transition-colors tracking-[-0.01em]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:opacity-60 ${
                    showDark ? 'text-[var(--h2-dark)]' : 'text-white'
                  } ${location === link.href ? 'opacity-100' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`md:hidden relative z-50 p-2 -mr-2 transition-colors duration-500 ${
                mobileOpen ? 'text-white' : showDark ? 'text-[var(--h2-dark)]' : 'text-white'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-6 h-5 flex flex-col justify-center items-center">
                <span
                  className={`block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                    mobileOpen
                      ? 'rotate-45 translate-y-[0.5px]'
                      : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                    mobileOpen
                      ? '-rotate-45 -translate-y-[0.5px]'
                      : 'translate-y-[3px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-500 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
          style={{ backgroundColor: 'var(--h2-navy)' }}
        >
          <div className="h-20 shrink-0" />

          <div className="flex-1 flex flex-col justify-center px-8 overflow-y-auto">
            <div className="flex flex-col gap-0">
              {allMobileLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-medium text-white tracking-[-0.01em] ${
                    link.indent
                      ? 'text-[1.1rem] pl-6 text-white/60'
                      : 'text-[1.75rem]'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${80 + i * 40}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.indent && (
                    <span className="inline-block w-4 text-white/30 mr-1">&mdash;</span>
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="px-8 pb-10"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: 'opacity 0.5s ease',
              transitionDelay: mobileOpen ? '400ms' : '0ms',
            }}
          >
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/50 text-[0.8125rem] font-medium uppercase tracking-[0.1em]">
                London &mdash; Nice
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
