
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- Branding Constants ---
const COLORS = {
  carolinaBlue: "#7BAFD4",
  navy: "#13294B",
  white: "#FFFFFF",
  offWhite: "#F8F9FA",
  text: "#1F2937",
  lightGray: "#E5E7EB",
};

// --- SVG Icons ---
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  ShoppingBag: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  ),
  Star: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  ),
};

// --- Styles (CSS-in-JS) ---
const styles = {
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
    
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: ${COLORS.offWhite};
      color: ${COLORS.text};
      overflow-x: hidden;
    }
    
    * { box-sizing: border-box; }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.carolinaBlue}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${COLORS.navy}; }

    /* Argyle Pattern Background */
    .argyle-bg {
      background-color: ${COLORS.carolinaBlue};
      background-image: 
        linear-gradient(45deg, ${COLORS.navy} 12.5%, transparent 12.5%, transparent 87.5%, ${COLORS.navy} 87.5%, ${COLORS.navy}),
        linear-gradient(135deg, ${COLORS.navy} 12.5%, transparent 12.5%, transparent 87.5%, ${COLORS.navy} 87.5%, ${COLORS.navy}),
        linear-gradient(45deg, ${COLORS.navy} 12.5%, transparent 12.5%, transparent 87.5%, ${COLORS.navy} 87.5%, ${COLORS.navy}),
        linear-gradient(135deg, ${COLORS.navy} 12.5%, transparent 12.5%, transparent 87.5%, ${COLORS.navy} 87.5%, ${COLORS.navy});
      background-size: 60px 60px;
      background-position: 0 0, 0 0, 30px 30px, 30px 30px;
      opacity: 1;
    }
    
    .argyle-overlay {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(5px);
    }
  `,
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  button: {
    primary: {
      backgroundColor: COLORS.navy,
      color: COLORS.white,
      padding: "12px 24px",
      borderRadius: "6px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "1rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    outline: {
      backgroundColor: "transparent",
      color: COLORS.navy,
      border: `2px solid ${COLORS.navy}`,
      padding: "12px 24px",
      borderRadius: "6px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  },
  section: {
    padding: "80px 0",
  },
};

// --- Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease",
        zIndex: 1000,
        padding: "20px 0",
      }}
    >
      <div style={{ ...styles.container, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: COLORS.carolinaBlue, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '4px',
            transform: 'rotate(45deg)',
            boxShadow: `0 4px 10px rgba(123, 175, 212, 0.5)`
          }}>
            <span style={{ transform: 'rotate(-45deg)', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>C</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
             <span style={{ fontSize: "1.25rem", fontWeight: "800", color: COLORS.navy, letterSpacing: "-0.02em", lineHeight: "1" }}>CAROLINA</span>
             <span style={{ fontSize: "1.25rem", fontWeight: "300", color: COLORS.carolinaBlue, letterSpacing: "0.15em", lineHeight: "1" }}>MINTED</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: window.innerWidth > 768 ? "flex" : "none", gap: "32px", alignItems: "center" }}>
          {["Home", "Shop Drops", "About Us", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ textDecoration: "none", color: COLORS.navy, fontWeight: "500", fontSize: "0.95rem" }}>
              {item}
            </a>
          ))}
          <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.navy }}>
            <Icons.ShoppingBag />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)} 
          style={{ display: "none", background: "none", border: "none", color: COLORS.navy, cursor: "pointer" }}
        >
          {isOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          {["Home", "Shop Drops", "About Us", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: "none", color: COLORS.navy, fontWeight: "600", fontSize: "1.1rem", textAlign: "center" }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", paddingTop: "80px" }}>
      {/* Background with Argyle Pattern */}
      <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, zIndex: -1 }}></div>
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        right: '-10%', 
        width: '600px', 
        height: '600px', 
        background: `radial-gradient(circle, ${COLORS.carolinaBlue} 0%, transparent 70%)`, 
        opacity: 0.2, 
        filter: 'blur(60px)',
        zIndex: -1 
      }}></div>

      <div style={styles.container}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{ 
            display: "inline-block", 
            padding: "6px 12px", 
            backgroundColor: "rgba(19, 41, 75, 0.1)", 
            color: COLORS.navy, 
            borderRadius: "50px", 
            fontSize: "0.875rem", 
            fontWeight: "600", 
            marginBottom: "24px",
            border: `1px solid rgba(19, 41, 75, 0.1)`
          }}>
            Est. 2024 • Chapel Hill, NC
          </div>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: "800", 
            color: COLORS.navy, 
            lineHeight: "1.1", 
            marginBottom: "24px" 
          }}>
            Collectibles <br />
            <span style={{ color: COLORS.carolinaBlue }}>Born & Bred.</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#4B5563", marginBottom: "40px", lineHeight: "1.6", maxWidth: "480px" }}>
            Premium trading cards, memorabilia, and exclusive drops for the true fan. Certified authentic, delivered with Southern hospitality.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button style={{...styles.button.primary, boxShadow: "0 10px 20px rgba(19, 41, 75, 0.2)"}}>
              Shop Latest Drop
            </button>
            <button style={styles.button.outline}>
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Icons.Shield />, title: "Certified Authentic", desc: "Every item is verified by our expert team or third-party graders." },
    { icon: <Icons.Zap />, title: "Lightning Fast Shipping", desc: "Same-day processing on all orders placed before 2PM EST." },
    { icon: <Icons.Star />, title: "Mint Condition", desc: "We specialize in Gem Mint 10s and pristine raw cards." },
  ];

  return (
    <section style={{ backgroundColor: COLORS.white, ...styles.section }}>
      <div style={styles.container}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "40px" 
        }}>
          {features.map((f, i) => (
            <div key={i} style={{ 
              padding: "32px", 
              borderRadius: "16px", 
              backgroundColor: COLORS.offWhite,
              border: `1px solid ${COLORS.lightGray}`,
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ 
                width: "48px", 
                height: "48px", 
                backgroundColor: "rgba(123, 175, 212, 0.15)", 
                borderRadius: "12px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: COLORS.navy, marginBottom: "12px" }}>{f.title}</h3>
              <p style={{ color: "#6B7280", lineHeight: "1.6" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ title, price, type, color }) => (
  <div style={{ 
    backgroundColor: COLORS.white, 
    borderRadius: "12px", 
    overflow: "hidden", 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${COLORS.lightGray}`,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative"
  }}
  className="product-card"
  >
    {/* Product Image Placeholder */}
    <div style={{ 
      height: "280px", 
      backgroundColor: "#F3F4F6", 
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Pattern on Card Background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1,
        backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.navy} 0, ${COLORS.navy} 1px, transparent 0, transparent 50%)`,
        backgroundSize: '10px 10px'
      }}></div>
      
      {/* The "Card" Object */}
      <div style={{
        width: "160px",
        height: "220px",
        backgroundColor: color === 'gold' ? '#FCD34D' : COLORS.carolinaBlue,
        borderRadius: "8px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        transform: "rotate(-5deg)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        border: '4px solid white'
      }}>
          <div style={{ width: '100%', height: '50%', background: 'rgba(255,255,255,0.3)', borderRadius: '4px 4px 0 0' }}></div>
          <div style={{ width: '60%', height: '40%', background: COLORS.navy, borderRadius: '50%', marginTop: '-20px', border: '2px solid white' }}></div>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: "12px", 
        left: "12px", 
        backgroundColor: COLORS.navy, 
        color: "white", 
        padding: "4px 8px", 
        borderRadius: "4px", 
        fontSize: "0.75rem", 
        fontWeight: "bold" 
      }}>
        {type}
      </div>
    </div>

    <div style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: COLORS.navy, marginBottom: "8px" }}>{title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "1.25rem", fontWeight: "600", color: COLORS.text }}>{price}</span>
        <span style={{ fontSize: "0.875rem", color: COLORS.carolinaBlue, fontWeight: "500" }}>Add to Cart</span>
      </div>
    </div>
  </div>
);

const ShopSection = () => {
  return (
    <section id="shop-drops" style={{ ...styles.section, backgroundColor: COLORS.offWhite }}>
      <div style={styles.container}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: COLORS.navy, marginBottom: "16px" }}>Latest Drops</h2>
          <p style={{ color: "#6B7280", maxWidth: "600px", margin: "0 auto" }}>
            Fresh from the vault. Secure your piece of history before they're gone.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "32px" 
        }}>
          <ProductCard title="#23 Retro Rookie Card (Mint 10)" price="$450.00" type="GRAIL" color="gold" />
          <ProductCard title="Carolina Blue Hobby Box '24" price="$120.00" type="SEALED" color="blue" />
          <ProductCard title="Championship Court Floor Piece" price="$85.00" type="MEMORABILIA" color="blue" />
          <ProductCard title="Coach's Signature Series" price="$299.00" type="AUTO" color="gold" />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button style={{...styles.button.outline, padding: "16px 48px"}}>View All Inventory</button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about-us" style={{ ...styles.section, backgroundColor: COLORS.navy, color: COLORS.white }}>
    <div style={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '32px'
          }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.navy }}>CM</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '24px' }}>Preserving History.</h2>
          <p style={{ maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.8', color: '#E0E7FF', marginBottom: '40px' }}>
            Carolina Minted Collectibles isn't just a shop; it's a tribute to the legends who paved the way. 
            We source the finest cards and memorabilia with a focus on North Carolina sports history. 
            Whether you are hunting for that elusive rookie card or a piece of the hardwood, we are your trusted partner.
          </p>
          <div style={{ width: '100px', height: '4px', backgroundColor: COLORS.carolinaBlue, borderRadius: '2px' }}></div>
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section style={{ padding: "100px 0", backgroundColor: COLORS.carolinaBlue }}>
    <div style={styles.container}>
       <div style={{ 
         backgroundColor: COLORS.white, 
         borderRadius: "24px", 
         padding: "40px", 
         textAlign: "center",
         boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
         maxWidth: "800px",
         margin: "0 auto"
       }}>
          <h3 style={{ fontSize: "2rem", fontWeight: "800", color: COLORS.navy, marginBottom: "16px" }}>Don't Miss the Next Drop</h3>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>Join the VIP list for early access to new arrivals and exclusive discounts.</p>
          
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              style={{ 
                padding: "16px 24px", 
                borderRadius: "8px", 
                border: `2px solid ${COLORS.lightGray}`, 
                width: "100%", 
                maxWidth: "350px",
                fontSize: "1rem",
                outline: "none"
              }} 
            />
            <button style={{...styles.button.primary, backgroundColor: COLORS.navy}}>
              Subscribe
            </button>
          </div>
       </div>
    </div>
  </section>
)

const Footer = () => (
  <footer style={{ backgroundColor: "#0F172A", color: "#94A3B8", padding: "60px 0 20px" }}>
    <div style={styles.container}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px" }}>
        <div>
          <h4 style={{ color: "white", fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px" }}>Carolina Minted</h4>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>The premier destination for high-end sports collectibles in the Tar Heel State.</p>
        </div>
        <div>
          <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>Shop</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>New Arrivals</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Best Sellers</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Graded Cards</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Memorabilia</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>Support</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>FAQ</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Shipping & Returns</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Authenticity Guarantee</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "inherit" }}>Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{ borderTop: "1px solid #1E293B", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem" }}>© 2024 Carolina Minted Collectibles, LLC. All rights reserved.</p>
        <div style={{ display: "flex", gap: "20px" }}>
           {/* Social Placeholders */}
           <div style={{ width: '20px', height: '20px', backgroundColor: '#334155', borderRadius: '4px' }}></div>
           <div style={{ width: '20px', height: '20px', backgroundColor: '#334155', borderRadius: '4px' }}></div>
           <div style={{ width: '20px', height: '20px', backgroundColor: '#334155', borderRadius: '4px' }}></div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  return (
    <>
      <style>{styles.global}</style>
      <Header />
      <main>
        <Hero />
        <Features />
        <ShopSection />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
