import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Link } from "wouter"
import { useState } from "react"
import { toast } from "sonner"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Message sent successfully! We'll be in touch soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-20">
        <div className="container">
          <span className="label-text mb-4 block">Get in Touch</span>
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Contact
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Whether you're planning a new build, a comprehensive refit, or a luxury residence, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: Contact Form */}
            <div className="bg-white p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-2">
                Send us a message
              </h2>
              <p className="text-[var(--h2-body)] mb-8">
                Fill in the form below and a member of our team will get back to you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[var(--h2-dark)] text-sm font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 rounded-none border-[var(--h2-border)] focus:ring-1 focus:ring-[var(--h2-navy)] focus:border-[var(--h2-navy)]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[var(--h2-dark)] text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 rounded-none border-[var(--h2-border)] focus:ring-1 focus:ring-[var(--h2-navy)] focus:border-[var(--h2-navy)]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[var(--h2-dark)] text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 rounded-none border-[var(--h2-border)] focus:ring-1 focus:ring-[var(--h2-navy)] focus:border-[var(--h2-navy)]"
                    placeholder="+44 (0)000 000 0000"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-[var(--h2-dark)] text-sm font-medium">
                    Subject
                  </Label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-2 w-full h-10 px-3 border border-[var(--h2-border)] bg-white text-sm text-[var(--h2-dark)] rounded-none focus:outline-none focus:ring-1 focus:ring-[var(--h2-navy)] focus:border-[var(--h2-navy)]"
                  >
                    <option value="">Select a subject</option>
                    <option value="new-build">New Build</option>
                    <option value="refit">Refit</option>
                    <option value="residential">Residential</option>
                    <option value="general">General Enquiry</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[var(--h2-dark)] text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 rounded-none border-[var(--h2-border)] focus:ring-1 focus:ring-[var(--h2-navy)] focus:border-[var(--h2-navy)]"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right: Office Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-2">
                Our Offices
              </h2>
              <p className="text-[var(--h2-body)] mb-8">
                Visit us at our studios in London and Nice.
              </p>

              <div className="space-y-6">
                {/* London Office */}
                <div className="bg-h2-light p-6 md:p-8">
                  <h3 className="text-lg font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-4">
                    London
                  </h3>
                  <address className="not-italic text-[var(--h2-body)] leading-relaxed space-y-0.5 mb-4">
                    <p>8 Princeton Court</p>
                    <p>53/55 Felsham Road</p>
                    <p>Putney</p>
                    <p>SW15 1AZ</p>
                    <p>London, United Kingdom</p>
                  </address>
                  <p className="text-[var(--h2-body)] mb-1">
                    <span className="text-xs uppercase tracking-wider text-[var(--h2-body)]/60 mr-2">Tel</span>
                    <a
                      href="tel:+442087885008"
                      className="hover:text-[var(--h2-dark)] transition-colors"
                    >
                      +44 (0)208 788 5008
                    </a>
                  </p>
                  <p className="text-[var(--h2-body)]">
                    <span className="text-xs uppercase tracking-wider text-[var(--h2-body)]/60 mr-2">Email</span>
                    <a
                      href="mailto:info@h2yachtdesign.com"
                      className="hover:text-[var(--h2-dark)] transition-colors"
                    >
                      info@h2yachtdesign.com
                    </a>
                  </p>
                </div>

                {/* Nice Office */}
                <div className="bg-h2-light p-6 md:p-8">
                  <h3 className="text-lg font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-4">
                    Nice
                  </h3>
                  <address className="not-italic text-[var(--h2-body)] leading-relaxed space-y-0.5 mb-4">
                    <p>4 Palais Jolienne</p>
                    <p>43 Boulevard Gambetta</p>
                    <p>5th Floor</p>
                    <p>06000, Nice, France</p>
                  </address>
                  <p className="text-[var(--h2-body)] mb-1">
                    <span className="text-xs uppercase tracking-wider text-[var(--h2-body)]/60 mr-2">Tel</span>
                    <a
                      href="tel:+33422328906"
                      className="hover:text-[var(--h2-dark)] transition-colors"
                    >
                      +33 422 328 906
                    </a>
                  </p>
                  <p className="text-[var(--h2-body)]">
                    <span className="text-xs uppercase tracking-wider text-[var(--h2-body)]/60 mr-2">Email</span>
                    <a
                      href="mailto:info@h2yachtdesign.com"
                      className="hover:text-[var(--h2-dark)] transition-colors"
                    >
                      info@h2yachtdesign.com
                    </a>
                  </p>
                </div>

                {/* General Enquiries */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold tracking-[-0.04em] text-[var(--h2-dark)] mb-3">
                    General Enquiries
                  </h3>
                  <p className="text-[var(--h2-body)]">
                    <a
                      href="mailto:info@h2yachtdesign.com"
                      className="hover:text-[var(--h2-dark)] transition-colors"
                    >
                      info@h2yachtdesign.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
