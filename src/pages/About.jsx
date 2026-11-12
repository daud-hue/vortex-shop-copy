import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from '@/pages/Home';
import CatalogueStats from '@/components/catalogue/CatalogueStats';

const PRINCIPLES = [
  { n: '01', t: 'Sculpture first', d: 'Every object is designed as a 3D sculpture before it is a product. Form dictates function, never the reverse.' },
  { n: '02', t: 'Zero gravity', d: 'We photograph nothing flat. Every object is suspended, lit as architecture, and rendered in motion.' },
  { n: '03', t: 'Negative space', d: 'We remove as much as possible. Weight, seams, friction — stripped until only the essential remains.' },
  { n: '04', t: 'Material honesty', d: 'Cobalt aluminum, brushed steel, sulfur glass. Real materials, machined to tolerance, finished by hand.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 md:px-20 pt-16 md:pt-24 pb-24">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ The Atelier</span>
        <h1 className="font-heading font-black text-[12vw] md:text-[8vw] leading-[0.85] tracking-[-0.05em] mt-4 text-balance">
          A laboratory
          <br />
          for <span className="italic font-light">objects.</span>
        </h1>
        <div className="grid md:grid-cols-12 gap-8 mt-12">
          <p className="md:col-span-7 md:col-start-6 font-mono text-sm text-muted-foreground leading-relaxed">
            Kinetic Atelier is a fictional design studio created for this spatial commerce demo. We build a living product environment — a spatial commerce gallery where every object is a digital sculpture, suspended in light and rendered in motion. We treat commerce as choreography: a visceral act of discovery, not a transaction.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 md:px-20 py-24 border-t border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ Principles</span>
        <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight mt-3 mb-16">Four laws of the atelier.</h2>
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="bg-card p-8 md:p-10">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-xs text-accent">{p.n}</span>
                <h3 className="font-heading font-black text-2xl tracking-tight">{p.t}</h3>
              </div>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CatalogueStats />

      {/* Process */}
      <section className="px-6 md:px-20 py-24 border-t border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ Process</span>
        <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight mt-3 mb-16">From light to object.</h2>
        <div className="space-y-px bg-border rounded-2xl overflow-hidden">
          {[
            { s: '01', t: 'Sculpt', d: 'Each object is modeled as a 3D sculpture in our spatial engine, lit as architecture.' },
            { s: '02', t: 'Machine', d: 'Real materials — cobalt aluminum, brushed steel, sulfur glass — machined to tolerance.' },
            { s: '03', t: 'Suspend', d: 'Photographed in zero gravity, rendered in motion, never flat.' },
            { s: '04', t: 'Release', d: 'Objects enter the gallery as living sculptures, available to acquire.' },
          ].map((p) => (
            <div key={p.s} className="bg-card p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-12 md:items-center group hover:bg-muted/40 transition">
              <span className="font-mono text-xs text-accent w-12">{p.s}</span>
              <h3 className="font-heading font-black text-2xl md:text-3xl tracking-tight md:w-64">{p.t}</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed flex-1">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-24 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight text-balance max-w-xl">
              Enter the gallery.
            </h2>
            <p className="mt-4 font-mono text-sm text-muted-foreground max-w-md">
              Every object is a sculpture. Every purchase is a discovery.
            </p>
          </div>
          <Link
            to="/products"
            className="group flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground rounded-full font-mono text-xs uppercase tracking-widest hover:glow-accent transition shrink-0"
          >
            Browse the archive
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}