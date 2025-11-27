import React, { useState, useEffect, useLayoutEffect, createContext, useContext } from "react";
import { createRoot } from "react-dom/client";

// --- Types & Interfaces ---

interface InventoryItem {
  id: string;
  title: string;
  price: string;
  type: string;
  color: string;
}

interface SocialPost {
  id: string;
  author: string;
  authorInitials: string;
  time: string;
  text: string;
  hasImage: boolean;
  imageColor?: string;
  likes: number;
  comments: number;
}

interface FeatureItem {
  title: string;
  desc: string;
  iconType: string;
}

interface NavContent {
  home: string;
  shopDrops: string;
  community: string;
  aboutUs: string;
  contact: string;
}

interface HeroContent {
  est: string;
  headlineStart: string;
  headlineHighlight: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface ShopContent {
  sectionTitle: string;
  pageTitle: string;
  sectionSubtitle: string;
  addToCart: string;
  viewAllButton: string;
  inventory: InventoryItem[];
}

interface MemorabiliaContent {
  title: string;
  subtitle: string;
  inventory: InventoryItem[];
}

interface AboutPageContent {
  header: string;
  missionStatement: string;
  storyTitle: string;
  storyBody: string;
  whatWeDoTitle: string;
  whatWeDoIntro: string;
  whatWeDoList: { title: string; desc: string }[];
  approachTitle: string;
  approachBody: string;
  lookingAheadTitle: string;
  lookingAheadBody: string;
  whyChooseUsTitle: string;
  whyChooseUsList: string[];
}

interface ContactPageContent {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailValue: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
}

interface CommunityPageContent {
  title: string;
  subtitle: string;
  feed: SocialPost[];
}

interface NewsletterContent {
  title: string;
  text: string;
  placeholder: string;
  button: string;
}

interface FooterContent {
  brandColumn: { title: string; text: string };
  shopColumn: { title: string; links: string[] };
  supportColumn: { title: string; links: string[] };
  copyright: string;
}

interface AppContent {
  common: {
    brandName: string;
    brandSuffix: string;
    currencyPrefix: string;
    loading: string;
  };
  nav: NavContent;
  hero: HeroContent;
  features: { items: FeatureItem[] };
  shop: ShopContent;
  memorabiliaPage: MemorabiliaContent;
  about: {
    initials: string;
    sectionTitle: string;
    sectionText: string;
    page: AboutPageContent;
  };
  communityPage: CommunityPageContent;
  contactPage: ContactPageContent;
  newsletter: NewsletterContent;
  footer: FooterContent;
}

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
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  ),
  MessageSquare: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  )
};

const getIconByName = (name: string) => {
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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
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
      border: 1px solid rgba(123, 175, 212, 0.5);
      background-color: rgba(123, 175, 212, 0.15);
      color: ${COLORS.navy};
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      transition: all 0.2s;
      outline: none;
    }
    .input-field::placeholder {
      color: rgba(19, 41, 75, 0.6);
    }
    .input-field:focus {
      border-color: ${COLORS.navy};
      background-color: rgba(123, 175, 212, 0.25);
      box-shadow: 0 0 0 3px rgba(123, 175, 212, 0.3);
    }
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${COLORS.navy};
      margin-bottom: 6px;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
      .hero-content {
        text-align: center;
        margin-left: auto !important;
        margin-right: auto !important;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .hero-buttons {
        justify-content: center !important;
      }
      
      .feature-card {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      /* About Page Mobile Optimizations */
      .about-wrapper {
        text-align: center;
      }
      .about-story-title {
        margin-left: auto;
        margin-right: auto;
      }
      .what-we-do-card {
        text-align: center;
        align-items: center;
        border-left: none !important;
        border-top: 4px solid ${COLORS.carolinaBlue};
      }
      
      .why-choose-us-item {
        /* Removed column flex direction to fix alignment issues */
      }

      /* Footer Mobile Styles */
      .footer-grid {
        text-align: center;
      }
      .footer-col {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .footer-list {
        align-items: center !important; 
      }
      .footer-bottom {
        flex-direction: column;
        align-items: center;
        justify-content: center !important;
        text-align: center;
      }
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
const ContentContext = createContext<AppContent | null>(null);

const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

// --- Components ---

const Header = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useContent();

  const navItems = [
    { label: content.nav.home, id: 'home' },
    { label: content.nav.shopDrops, id: 'shop' },
    { label: content.nav.community, id: 'community' },
    { label: content.nav.aboutUs, id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.carolinaBlue,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "20px 0",
      }}
    >
      <div className="header-container" style={{ ...styles.container, display: "flex", justifyContent: "space-between", alignItems: "center", position: 'relative' }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img 
            src="https://raw.githubusercontent.com/carolinaminted/carolina-minted-web-app/main/Charquaza.png" 
            alt="Carolina Minted Logo" 
            style={{ 
              height: '60px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '6px' }}>
             <span style={{ fontSize: "1.25rem", fontWeight: "800", color: COLORS.navy, letterSpacing: "0.1em", lineHeight: "1" }}>{content.common.brandName}</span>
             <span style={{ fontSize: "1.25rem", fontWeight: "300", color: "white", letterSpacing: "0.45em", lineHeight: "1" }}>{content.common.brandSuffix}</span>
             <span style={{ fontSize: "0.75rem", fontWeight: "600", color: COLORS.navy, letterSpacing: "0.22em", marginTop: "2px", textTransform: "uppercase", lineHeight: "1.2" }}>Collectibles</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: window.innerWidth > 768 ? "flex" : "none", gap: "32px", alignItems: "center" }}>
          {navItems.map((item) => (
            <button 
              key={item.id} 
              type="button"
              onClick={() => handleNavClick(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: "none", color: COLORS.navy, fontWeight: "600", fontSize: "0.95rem", fontFamily: 'inherit' }}>
              {item.label}
            </button>
          ))}
          <button 
            type="button"
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
          <button type="button" style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.navy }}>
            <Icons.ShoppingBag />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          type="button"
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
              type="button"
              onClick={() => handleNavClick(item.id)}
              style={{ background: 'none', border: 'none', textDecoration: "none", color: COLORS.navy, fontWeight: "600", fontSize: "1.1rem", textAlign: "center", fontFamily: 'inherit' }}
            >
              {item.label}
            </button>
          ))}
           <button 
              type="button"
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
          .mobile-toggle { 
            display: block !important;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
          .header-container {
             justify-content: center !important;
          }
        }
      `}</style>
    </header>
  );
};

const Hero = ({ onShopClick, onCommunityClick }: { onShopClick: () => void, onCommunityClick: () => void }) => {
  const content = useContent();
  
  return (
    <section id="home" style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", paddingTop: "100px" }}>
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
        <div className="hero-content" style={{ maxWidth: "600px" }}>
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
          <div className="hero-buttons" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button 
              type="button"
              onClick={onShopClick}
              style={{...styles.button.primary, boxShadow: "0 10px 20px rgba(19, 41, 75, 0.2)"}}>
              {content.hero.ctaPrimary}
            </button>
            <button 
              type="button"
              onClick={onCommunityClick}
              style={styles.button.outline}>
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
            <div key={i} className="feature-card" style={{ 
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

interface ProductCardProps {
  title: string;
  price: string;
  type: string;
  color: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, type, color }) => {
  const content = useContent();
  return (
    <article style={{ 
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
    </article>
  );
};

const ShopSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
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
              type="button"
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

const PostCard: React.FC<{ post: SocialPost }> = ({ post }) => {
  return (
    <div style={{
      backgroundColor: COLORS.white,
      borderRadius: '16px',
      border: `1px solid ${COLORS.lightGray}`,
      marginBottom: '24px',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: COLORS.navy,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.9rem',
            marginRight: '12px'
          }}>
            {post.authorInitials}
          </div>
          <div>
            <div style={{ fontWeight: '700', color: COLORS.navy }}>{post.author}</div>
            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{post.time}</div>
          </div>
        </div>

        {/* Text */}
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#1F2937', marginBottom: '16px' }}>
          {post.text}
        </p>
      </div>

      {/* Image (Optional) */}
      {post.hasImage && (
        <div style={{
          width: '100%',
          height: '300px',
          backgroundColor: post.imageColor === 'navy' ? COLORS.navy : COLORS.carolinaBlue,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15 }}></div>
           <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px' }}>IMAGE PREVIEW</div>
        </div>
      )}

      {/* Footer / Actions */}
      <div style={{ 
        padding: '16px 20px', 
        borderTop: `1px solid ${COLORS.lightGray}`,
        display: 'flex',
        gap: '24px',
        color: '#6B7280'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
           <Icons.Heart /> <span style={{ fontSize: '0.9rem' }}>{post.likes}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
           <Icons.MessageSquare /> <span style={{ fontSize: '0.9rem' }}>{post.comments}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
           <Icons.Share /> <span style={{ fontSize: '0.9rem' }}>Share</span>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const content = useContent();
  const page = content.communityPage;

  return (
    <div style={{ paddingTop: '100px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, padding: '60px 0 40px', color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '12px' }}>{page.title}</h1>
          <p style={{ fontSize: '1.1rem', color: COLORS.carolinaBlue }}>{page.subtitle}</p>
        </div>
      </div>

      <div style={{ ...styles.container, padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {/* Create Post Placeholder */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '20px', 
            marginBottom: '32px',
            border: `1px solid ${COLORS.lightGray}`,
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
             <input 
              type="text" 
              placeholder="What's on your mind?" 
              style={{ 
                flex: 1, 
                border: 'none', 
                backgroundColor: '#F3F4F6', 
                borderRadius: '24px', 
                padding: '12px 20px',
                outline: 'none'
              }} 
             />
          </div>

          {/* Feed */}
          {page.feed.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div style={{ textAlign: 'center', marginTop: '40px', color: '#9CA3AF' }}>
            <p>You're all caught up!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const content = useContent();
  const page = content.about.page;

  return (
    <div style={{ paddingTop: '100px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, padding: '100px 0 60px', color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{content.nav.aboutUs}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="about-wrapper" style={{ ...styles.container, padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
          
          {/* Mission */}
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.lightGray}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: COLORS.navy, fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px' }}>{page.header}</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', fontStyle: 'italic', color: '#4B5563' }}>"{page.missionStatement}"</p>
          </div>

          {/* Story */}
          <div>
            <h2 className="about-story-title" style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px', borderBottom: `4px solid ${COLORS.carolinaBlue}`, display: 'inline-block', paddingBottom: '8px' }}>{page.storyTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>{page.storyBody}</p>
          </div>

          {/* What We Do */}
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>{page.whatWeDoTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151', marginBottom: '24px' }}>{page.whatWeDoIntro}</p>
            <div style={{ display: 'grid', gap: '24px' }}>
              {page.whatWeDoList.map((item, idx) => (
                <div key={idx} className="what-we-do-card" style={{ padding: '24px', backgroundColor: COLORS.white, borderRadius: '12px', borderLeft: `4px solid ${COLORS.carolinaBlue}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
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
                 <div key={idx} className="why-choose-us-item" style={{ 
                   display: 'flex', 
                   alignItems: 'flex-start', 
                   gap: '16px',
                   backgroundColor: COLORS.white,
                   padding: '24px',
                   borderRadius: '12px',
                   border: `1px solid ${COLORS.lightGray}`,
                   boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                 }}>
                   <div style={{ 
                     flexShrink: 0, 
                     backgroundColor: 'rgba(123, 175, 212, 0.15)',
                     borderRadius: '50%',
                     padding: '8px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                   }}>
                    <Icons.Check />
                   </div>
                   <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#374151', margin: 0, textAlign: 'left' }}>{item}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Generic Inventory Page (Replaces ShopPage and MemorabiliaPage) ---

interface InventoryPageProps {
  title: string;
  subtitle: string;
  items: InventoryItem[];
}

const InventoryPage: React.FC<InventoryPageProps> = ({ title, subtitle, items }) => {
  return (
    <div style={{ paddingTop: '100px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      <div style={{ backgroundColor: COLORS.navy, padding: '80px 0', color: COLORS.white, marginBottom: '60px', position: 'relative' }}>
         <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
         <div style={{ ...styles.container, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px' }}>{title}</h1>
            <p style={{ fontSize: '1.2rem', color: COLORS.carolinaBlue }}>{subtitle}</p>
         </div>
      </div>

      <div style={{ ...styles.container, paddingBottom: '80px' }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "32px" 
        }}>
          {items.map((item) => (
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
    <div style={{ paddingTop: '100px', backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
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
    <section id="newsletter" style={{ padding: "100px 0", backgroundColor: COLORS.carolinaBlue }}>
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
                className="input-field"
                placeholder={content.newsletter.placeholder} 
                style={{ 
                  maxWidth: "350px"
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

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const content = useContent();

  const handleLinkClick = (e: React.MouseEvent, linkText: string) => {
    e.preventDefault();
    switch (linkText) {
      case "New Arrivals":
      case "Best Sellers":
      case "Graded Cards":
        onNavigate('shop');
        break;
      case "Memorabilia":
        onNavigate('memorabilia');
        break;
      case "FAQ":
      case "Shipping & Returns":
      case "Contact Us":
        onNavigate('contact');
        break;
      case "Authenticity Guarantee":
        onNavigate('about');
        break;
      default:
        console.warn(`No route defined for footer link: ${linkText}`);
        break;
    }
  };

  return (
    <footer style={{ backgroundColor: "#0F172A", color: "#94A3B8", padding: "60px 0 20px" }}>
      <div style={styles.container}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px" }}>
          <div className="footer-col">
            <h4 style={{ color: "white", fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px" }}>{content.footer.brandColumn.title}</h4>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{content.footer.brandColumn.text}</p>
          </div>
          <div className="footer-col">
            <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>{content.footer.shopColumn.title}</h4>
            <ul className="footer-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.footer.shopColumn.links.map((link, i) => (
                <li key={i}><a href="#" onClick={(e) => handleLinkClick(e, link)} style={{ textDecoration: "none", color: "inherit" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 style={{ color: "white", fontSize: "1rem", fontWeight: "600", marginBottom: "20px" }}>{content.footer.supportColumn.title}</h4>
            <ul className="footer-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.footer.supportColumn.links.map((link, i) => (
                 <li key={i}><a href="#" onClick={(e) => handleLinkClick(e, link)} style={{ textDecoration: "none", color: "inherit" }}>{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ borderTop: "1px solid #1E293B", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
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
  const [content, setContent] = useState<AppContent | null>(null);
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
      });
  }, []);

  // Use useLayoutEffect to ensure scroll happens before paint
  useLayoutEffect(() => {
    // Robust scroll to top logic for both window and document element
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (isLoading || !content) {
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
        return <InventoryPage title={content.shop.pageTitle} subtitle={content.shop.sectionSubtitle} items={content.shop.inventory} />;
      case 'memorabilia':
        return <InventoryPage title={content.memorabiliaPage.title} subtitle={content.memorabiliaPage.subtitle} items={content.memorabiliaPage.inventory} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'community':
        return <CommunityPage />;
      case 'home':
      default:
        return (
          <>
            <Hero 
              onShopClick={() => handleNavigation('shop')} 
              onCommunityClick={() => handleNavigation('community')}
            />
            <Features />
            <ShopSection onNavigate={handleNavigation} />
            <AboutSection />
          </>
        );
    }
  };

  return (
    <ContentContext.Provider value={content}>
      <style>{styles.global}</style>
      <Header onNavigate={handleNavigation} />
      <main>
        {renderPage()}
        <Newsletter />
      </main>
      <Footer onNavigate={handleNavigation} />
    </ContentContext.Provider>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);