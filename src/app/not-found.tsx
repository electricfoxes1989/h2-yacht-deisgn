import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="text-center max-w-md px-6">
        <p className="label-text mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-h2-dark mb-4">
          Page Not Found
        </h1>
        <p className="text-h2-body mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
