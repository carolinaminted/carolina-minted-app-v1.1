import React, { useState, useEffect, createContext, useContext } from "react";
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
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  ),
};

const getIconByName = (name) => {
  switch(name) {
    case 'shield': return <Icons.Shield />;
    case 'star': return <Icons.Star />;
    case 'zap': return <Icons.Zap />;
    default: return <Icons.Star />;
  }
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

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: ${COLORS.offWhite};
      flex-direction: column;
      gap: 20px;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid ${COLORS.lightGray};
      border-top: 5px solid ${COLORS.carolinaBlue};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .input-field {
      width: 100%;
      padding: 14px 16px;
      border-radius: 8px;
      border: 1px solid ${COLORS.lightGray};
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      transition: all 0.2s;
      outline: none;
    }
    .input-field:focus {
      border-color: ${COLORS.carolinaBlue};
      box-shadow: 0 0 0 3px rgba(123, 175, 212, 0.2);
    }
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${COLORS.navy};
      margin-bottom: 6px;
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
      justifyContent: "center",
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

// --- Localization Context ---
const ContentContext = createContext(null);

const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

// --- Components ---

const Header = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const content = useContent();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: content.nav.home, id: 'home' },
    { label: content.nav.shopDrops, id: 'shop' },
    { label: content.nav.aboutUs, id: 'about' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
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
             <span style={{ fontSize: "1.25rem", fontWeight: "800", color: COLORS.navy, letterSpacing: "-0.02em", lineHeight: "1" }}>{content.common.brandName}</span>
             <span style={{ fontSize: "1.25rem", fontWeight: "300", color: COLORS.carolinaBlue, letterSpacing: "0.15em", lineHeight: "1" }}>{content.common.brandSuffix}</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: window.innerWidth > 768 ? "flex" : "none", gap: "32px", alignItems: "center" }}>
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: "none", color: COLORS.navy, fontWeight: "500", fontSize: "0.95rem", fontFamily: 'inherit' }}>
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            style={{ 
              background: COLORS.navy, 
              border: "none", 
              cursor: "pointer", 
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
            {content.nav.contact}
          </button>
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
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              style={{ background: 'none', border: 'none', textDecoration: "none", color: COLORS.navy, fontWeight: "600", fontSize: "1.1rem", textAlign: "center", fontFamily: 'inherit' }}
            >
              {item.label}
            </button>
          ))}
           <button 
              onClick={() => handleNavClick('contact')}
              style={{ background: 'none', border: 'none', textDecoration: "none", color: COLORS.navy, fontWeight: "600", fontSize: "1.1rem", textAlign: "center", fontFamily: 'inherit' }}
            >
              {content.nav.contact}
            </button>
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

const Hero = ({ onShopClick }) => {
  const content = useContent();
  
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
            {content.hero.est}
          </div>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: "800", 
            color: COLORS.navy, 
            lineHeight: "1.1", 
            marginBottom: "24px" 
          }}>
            {content.hero.headlineStart} <br />
            <span style={{ color: COLORS.carolinaBlue }}>{content.hero.headlineHighlight}</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#4B5563", marginBottom: "40px", lineHeight: "1.6", maxWidth: "480px" }}>
            {content.hero.subtext}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button 
              onClick={onShopClick}
              style={{...styles.button.primary, boxShadow: "0 10px 20px rgba(19, 41, 75, 0.2)"}}>
              {content.hero.ctaPrimary}
            </button>
            <button style={styles.button.outline}>
              {content.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const content = useContent();

  return (
    <section style={{ backgroundColor: COLORS.white, ...styles.section }}>
      <div style={styles.container}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "40px" 
        }}>
          {content.features.items.map((f, i) => (
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
                {getIconByName(f.iconType)}
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

const ProductCard = ({ title, price, type, color }) => {
  const content = useContent();
  return (
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
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.navy} 0, ${COLORS.navy} 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px'
        }}></div>
        
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
          <span style={{ fontSize: "1.25rem", fontWeight: "600", color: COLORS.text }}>{content.common.currencyPrefix}{price}</span>
          <span style={{ fontSize: "0.875rem", color: COLORS.carolinaBlue, fontWeight: "500" }}>{content.shop.addToCart}</span>
        </div>
      </div>
    </div>
  );
};

const ShopSection = ({ onNavigate }) => {
  const content = useContent();
  const previewInventory = content.shop.inventory.slice(0, 4);

  return (
    <section id="shop-preview" style={{ ...styles.section, backgroundColor: COLORS.offWhite }}>
      <div style={styles.container}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: COLORS.navy, marginBottom: "16px" }}>{content.shop.sectionTitle}</h2>
          <p style={{ color: "#6B7280", maxWidth: "600px", margin: "0 auto" }}>
            {content.shop.sectionSubtitle}
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "32px" 
        }}>
          {previewInventory.map((item) => (
             <ProductCard 
                key={item.id}
                title={item.title} 
                price={item.price} 
                type={item.type} 
                color={item.color} 
             />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button 
              onClick={() => onNavigate('shop')}
              style={{...styles.button.outline, padding: "16px 48px"}}
            >
              {content.shop.viewAllButton}
            </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const content = useContent();

  return (
    <section id="about-preview" style={{ ...styles.section, backgroundColor: COLORS.navy, color: COLORS.white }}>
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
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.navy }}>{content.about.initials}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '24px' }}>{content.about.sectionTitle}</h2>
            <p style={{ maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.8', color: '#E0E7FF', marginBottom: '40px' }}>
              {content.about.sectionText}
            </p>
            <div style={{ width: '100px', height: '4px', backgroundColor: COLORS.carolinaBlue, borderRadius: '2px' }}></div>
        </div>
      </div>
    </section>
  );
};

// --- New Pages ---

const AboutPage = () => {
  const content = useContent();
  const page = content.about.page;

  return (
    <div style={{ paddingTop: '80px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, padding: '100px 0 60px', color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{content.nav.aboutUs}</h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ ...styles.container, padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
          
          {/* Mission */}
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.lightGray}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: COLORS.navy, fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px' }}>{page.header}</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', fontStyle: 'italic', color: '#4B5563' }}>"{page.missionStatement}"</p>
          </div>

          {/* Story */}
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px', borderBottom: `4px solid ${COLORS.carolinaBlue}`, display: 'inline-block', paddingBottom: '8px' }}>{page.storyTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>{page.storyBody}</p>
          </div>

          {/* What We Do */}
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>{page.whatWeDoTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151', marginBottom: '24px' }}>{page.whatWeDoIntro}</p>
            <div style={{ display: 'grid', gap: '24px' }}>
              {page.whatWeDoList.map((item, idx) => (
                <div key={idx} style={{ padding: '24px', backgroundColor: COLORS.white, borderRadius: '12px', borderLeft: `4px solid ${COLORS.carolinaBlue}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: COLORS.navy, marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#4B5563', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div style={{ backgroundColor: COLORS.navy, color: COLORS.white, padding: '40px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>{page.approachTitle}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#E0E7FF' }}>{page.approachBody}</p>
            </div>
            <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 1 }}></div>
          </div>

          {/* Looking Ahead */}
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>{page.lookingAheadTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>{page.lookingAheadBody}</p>
          </div>

          {/* Why Choose Us */}
          <div>
             <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '30px' }}>{page.whyChooseUsTitle}</h2>
             <div style={{ display: 'grid', gap: '16px' }}>
               {page.whyChooseUsList.map((item, idx) => (
                 <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                   <div style={{ flexShrink: 0, marginTop: '4px' }}><Icons.Check /></div>
                   <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#374151', margin: 0 }}>{item}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const content = useContent();

  return (
    <div style={{ paddingTop: '80px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      <div style={{ backgroundColor: COLORS.navy, padding: '80px 0', color: COLORS.white, marginBottom: '60px', position: 'relative' }}>
         <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
         <div style={{ ...styles.container, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px' }}>{content.shop.pageTitle}</h1>
            <p style={{ fontSize: '1.2rem', color: COLORS.carolinaBlue }}>{content.shop.sectionSubtitle}</p>
         </div>
      </div>

      <div style={{ ...styles.container, paddingBottom: '80px' }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "32px" 
        }}>
          {content.shop.inventory.map((item) => (
             <ProductCard 
                key={item.id}
                title={item.title} 
                price={item.price} 
                type={item.type} 
                color={item.color} 
             />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const content = useContent();
  const page = content.contactPage;

  return (
    <div style={{ paddingTop: '80px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      <div style={{ backgroundColor: COLORS.navy, padding: '80px 0 60px', color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{page.title}</h1>
          <p style={{ fontSize: '1.2rem', color: COLORS.carolinaBlue, maxWidth: '600px', margin: '0 auto' }}>{page.subtitle}</p>
        </div>
      </div>

      <div style={{ ...styles.container, padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             <div style={{ padding: '32px', backgroundColor: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.lightGray}`, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ padding: '12px', background: 'rgba(123, 175, 212, 0.1)', borderRadius: '12px', color: COLORS.carolinaBlue }}>
                    <Icons.Mail />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: COLORS.navy }}>{page.emailLabel}</h3>
               </div>
               <p style={{ color: '#4B5563', fontSize: '1.1rem', marginBottom: '8px' }}>
                 We're here to help with any questions.
               </p>
               <a href={`mailto:${page.emailValue}`} style={{ fontSize: '1.25rem', color: COLORS.carolinaBlue, fontWeight: '600', textDecoration: 'none' }}>
                 {page.emailValue}
               </a>
             </div>
             
             <div style={{ padding: '32px', backgroundColor: COLORS.navy, borderRadius: '16px', color: 'white' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '16px' }}>FAQ</h3>
                <p style={{ color: '#E0E7FF', lineHeight: '1.6' }}>
                  Typically, we respond to all inquiries within 24-48 hours. For immediate assistance with an existing order, please include your order number in the subject line.
                </p>
             </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">{page.form.name}</label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label className="label">{page.form.email}</label>
                <input type="email" className="input-field" placeholder="john@example.com" />
              </div>
              <div>
                <label className="label">{page.form.subject}</label>
                <select className="input-field">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Valuation Request</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="label">{page.form.message}</label>
                <textarea className="input-field" rows={5} placeholder="How can we help you?" style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" style={{ ...styles.button.primary, width: '100%', marginTop: '10px' }}>
                {page.form.submit}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const content = useContent();

  return (
    <section id="contact" style={{ padding: "100px 0", backgroundColor: COLORS.carolinaBlue }}>
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
            <h3 style={{ fontSize: "2rem", fontWeight: "800", color: COLORS.navy, marginBottom: "16px" }}>{content.newsletter.title}</h3>
            <p style={{ color: "#6B7280", marginBottom: "32px" }}>{content.newsletter.text}</p>
            
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <input 
                type="email" 
                placeholder={content.newsletter.placeholder} 
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
                {content.newsletter.button}
              </button>
            </div>
         </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }) => {
  const content = useContent();

  const handleLinkClick = (e, linkText) => {
    e.preventDefault();
    if (linkText === "Contact Us") {
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ backgroundColor: "#0F172A", color: "#94A3B8", padding: "60px 0 20px" }}>
      <div style={styles.container}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px" }}>
          <div>
            <h4 style={{ color: "white", fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px" }}>{content.footer.brandColumn.title}</h4>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{content.footer.brandColumn.text}</p>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>{content.footer.shopColumn.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.footer.shopColumn.links.map((link, i) => (
                <li key={i}><a href="#" style={{ textDecoration: "none", color: "inherit" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>{content.footer.supportColumn.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.footer.supportColumn.links.map((link, i) => (
                 <li key={i}><a href="#" onClick={(e) => handleLinkClick(e, link)} style={{ textDecoration: "none", color: "inherit" }}>{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: "1px solid #1E293B", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <p style={{ fontSize: "0.875rem" }}>{content.footer.copyright}</p>
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
};

// --- Main App Component ---

const App = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    fetch('./en.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load language file", err);
        // Fallback or error state
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <style>{styles.global}</style>
        <div className="spinner"></div>
        <p>Loading Experience...</p>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <>
            <Hero onShopClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            <Features />
            <ShopSection onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            <AboutSection />
          </>
        );
    }
  };

  return (
    <ContentContext.Provider value={content}>
      <style>{styles.global}</style>
      <Header onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
        <Newsletter />
      </main>
      <Footer onNavigate={setCurrentPage} />
    </ContentContext.Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);