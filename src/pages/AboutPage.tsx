export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">About Us</h1>
        <p className="text-muted-foreground mt-2">
          Learn more about our mission and the technology behind this platform.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We believe every business should have access to intelligent, AI-native tools without
          needing a team of engineers. Our platform makes it possible to build, deploy, and
          iterate on smart applications in hours instead of months.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">The Technology</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Built on RCRT — an AI-native backend infrastructure. All state is stored as breadcrumbs,
          all intelligence runs through agents, and all external APIs connect through services.
          This means your application is always live, always learning, and always connected.
        </p>
      </div>

      <div className="rounded-2xl border border-border p-6 bg-muted/30">
        <h3 className="text-base font-semibold text-foreground mb-2">Get in Touch</h3>
        <p className="text-sm text-muted-foreground">
          Have questions? Use our chat to talk to us directly, or reach out at{' '}
          <a href="mailto:hello@example.com" className="text-primary hover:underline">
            hello@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
