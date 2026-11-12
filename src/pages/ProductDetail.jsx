import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProductMedia from '@/components/spatial/ProductMedia';
import { useCart } from '@/lib/cart';
import { Footer } from '@/pages/Home';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, setIsOpen } = useCart();

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    setQty(1);
    setAdded(false);
    let active = true;
    base44.entities.Product
      .get(id)
      .then((p) => {
        if (active) { setProduct(p); setLoading(false); }
      })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="px-6 md:px-20 py-32 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-6 md:px-20 py-32 text-center">
        <p className="font-heading text-3xl">Object not found.</p>
        <Link to="/products" className="mt-6 inline-block font-mono text-xs uppercase tracking-widest underline">
          Back to archive
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 md:px-20 pt-10 pb-10">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to archive
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-20 pb-24">
        <ProductMedia key={product.id} product={product} initial3D />

        {/* HUD */}
        <div className="md:pt-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            / {product.category}
          </span>
          <h1 className="font-heading font-black text-5xl md:text-6xl tracking-tight mt-3 text-balance">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-sm text-muted-foreground italic">{product.tagline}</p>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-heading font-black text-4xl">€{product.price.toLocaleString()}</span>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">EUR</span>
          </div>

          <p className="mt-8 font-body text-base leading-relaxed text-foreground/80">
            {product.description}
          </p>

          {/* Specs */}
          <div className="mt-10 grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
            <div className="bg-card p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Material</p>
              <p className="font-heading font-bold text-sm mt-2">{product.material || '—'}</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Weight</p>
              <p className="font-heading font-bold text-sm mt-2">{product.weight || '—'}</p>
            </div>
          </div>

          {/* Quantity + add */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-3 border border-border rounded-full px-2">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:text-accent transition">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono text-sm w-6 text-center">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="p-3 hover:text-accent transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 py-4 bg-primary text-primary-foreground rounded-full font-mono text-xs uppercase tracking-widest hover:glow-accent transition-all flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to orbit
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to orbit — €{(product.price * qty).toLocaleString()}
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => {
              addItem(product, qty);
              setIsOpen(false);
              navigate('/cart');
            }}
            className="mt-3 w-full text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition"
          >
            Preview demo checkout →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}