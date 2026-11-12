import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SpatialHero from '@/components/spatial/SpatialHero';
import StudioFooter from '@/components/StudioFooter';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const {data: featured = [], isLoading: loading, isError, refetch} = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => (await base44.entities.Product.filter({featured: true}, {sort: '-created_date', limit: 6})).items,
  });

  return (
    <div>
      <SpatialHero />

      {/* MANIFESTO */}
      <section className="px-6 md:px-20 py-32 border-t border-border">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ 01</span>
          </div>
          <div className="md:col-span-7">
            <p className="font-heading font-light text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
              We reject the thumbnail. Every product here is a <span className="italic">digital sculpture</span> — machined from light, suspended in space, built to be felt before it is owned.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Founded as a laboratory for high-end objects. We treat commerce as choreography — a visceral act of discovery, not a transaction.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 md:px-20 py-20 border-t border-border">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ 02 — Featured</span>
            <h2 className="font-heading font-black text-5xl md:text-7xl tracking-tight mt-3">In orbit now</h2>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-accent transition">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div role="alert" className="py-12 text-center"><p>The collection could not be loaded.</p><button onClick={() => refetch()} className="mt-4 min-h-11 text-accent underline">Try again</button></div>
        ) : featured.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground"><p>No featured objects yet.</p><Link to="/products" className="mt-4 inline-flex min-h-11 items-center underline">Browse the archive</Link></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* CTA BAND */}
      <section className="px-6 md:px-20 py-32 border-t border-border">
        <div className="relative rounded-3xl border border-border bg-card text-card-foreground p-8 md:p-20 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">/ 03 — Connect</span>
            <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight mt-4 text-balance">
              Start a conversation.
            </h2>
            <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
              Explore the collection with ORBIT, or send a question about a featured object and the spatial storefront experience.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground rounded-full font-mono text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Contact the atelier
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function Footer() {
  return <StudioFooter />;
}