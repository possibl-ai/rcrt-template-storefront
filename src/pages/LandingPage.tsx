import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on edge infrastructure for instant responses worldwide.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with end-to-end encryption and SOC2 compliance.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Responsive design that adapts to any device, any screen size.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-32 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Build smarter with <span className="text-primary">AI-native</span> infrastructure
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to create intelligent applications. Powered by RCRT's agent platform.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/chat')}
              className="bg-primary text-primary-foreground rounded-xl px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/about')}
              className="rounded-xl border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Why choose us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-background p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-lg text-foreground italic">
            "This platform transformed how we build internal tools. What used to take weeks now takes hours."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-4">— Happy Customer</p>
        </div>
      </section>
    </div>
  );
}
