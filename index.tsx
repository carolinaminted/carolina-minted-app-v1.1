import React, { useState, useEffect, useLayoutEffect, createContext, useContext } from "react";
import { createRoot } from "react-dom/client";

// --- Types & Interfaces ---

interface InventoryItem {
  id: string;
  title: string;
  price: string;
  type: string;
  color: string;
  image?: string;
}

interface SocialPost {
  id: string;
  author: string;
  authorInitials: string;
  time: string;
  text: string;
  hasImage: boolean;
  imageColor?: string;
  imageUrl?: string;
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
  community: string;
  aboutUs: string;
  contact: string;
}

interface HeroContent {
  est: string;
  headlineStart: string;
  headlineHighlight: string;
  subtext: string;
  ctaSecondary: string;
}

interface HomeEthosContent {
  title: string;
  body: string;
}

interface HomeExpertiseContent {
  title: string;
  intro: string;
  list: { title: string; desc: string }[];
}

interface HomeValuesContent {
  title: string;
  list: string[];
}

interface HomeEventContent {
  title: string;
  highlight: {
    title: string;
    date: string;
    desc: string;
    imageLabel: string;
  };
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
  lookingAheadTitle: string;
  lookingAheadBody: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageContent {
  title: string;
  subtitle: string;
  items: FAQItem[];
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
  home: {
    ethos: HomeEthosContent;
    expertise: HomeExpertiseContent;
    values: HomeValuesContent;
    recentEvents: HomeEventContent;
  };
  memorabiliaPage: MemorabiliaContent;
  about: {
    page: AboutPageContent;
  };
  faqPage: FAQPageContent;
  communityPage: CommunityPageContent;
  contactPage: ContactPageContent;
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
  Box: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.carolinaBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
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
  ),
  ArrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  ),
  ChevronDown: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  )
};

const getIconByName = (name: string) => {
  switch(name) {
    case 'shield': return <Icons.Shield />;
    case 'star': return <Icons.Star />;
    case 'zap': return <Icons.Zap />;
    case 'box': return <Icons.Box />;
    default: return <Icons.Star />;
  }
};

// --- Styles (CSS-in-JS) ---
const styles = {
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Graduate&family=Inter:wght@300;400;500;600;700;800&display=swap');
    
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

    /* Argyle Pattern Background (Seamless SVG) */
    .argyle-bg {
      background-color: ${COLORS.carolinaBlue};
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 50-30 50L0 50z' fill='%2313294B' fill-opacity='0.1'/%3E%3C/svg%3E");
      background-size: 60px 100px;
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

    /* Hero Section Base */
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
    
    /* Features Grid System */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;
      max-width: 1000px;
      margin: 0 auto;
    }

    /* Layout & Responsive Architecture */
    
    @media (min-width: 769px) {
      /* Desktop: Sidebar Layout */
      main, footer {
        margin-left: 260px; /* Sidebar width */
        width: calc(100% - 260px);
      }
      
      .app-page-offset {
        padding-top: 0;
      }

      .page-header {
        padding: 30px 0 30px;
      }

      /* Desktop: Enforce 2x2 Grid for Features - Adjusted for 3 items */
      .features-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      /* Mobile: Top Header Layout */
      main, footer {
        margin-left: 0;
        width: 100%;
      }
      
      .app-page-offset {
        padding-top: 85px; /* Reduced header height */
      }
      
      .page-header {
        padding: 60px 0 40px;
      }

      /* Hero Mobile Updates */
      .hero-section {
         min-height: auto;
         padding-top: 135px; /* Overrides app-page-offset with desired gap */
         padding-bottom: 60px;
         align-items: flex-start;
      }

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
    { label: content.nav.community, id: 'community' },
    { label: content.nav.aboutUs, id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar Navigation (Visible on Desktop) */}
      <aside className="desktop-sidebar">
        <div 
          className="sidebar-logo-container"
          onClick={() => handleNavClick('home')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.8' }}>
            <span className="brand-main">CAROLINA</span>
            <span className="brand-main">MINTED</span>
            <span className="brand-sub">COLLECTIBLES</span>
          </div>

          <div style={{ 
            marginTop: '12px', 
            fontSize: '0.75rem', 
            fontWeight: '600', 
            color: 'rgba(19, 41, 75, 0.7)', 
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em'
          }}>
            {content.hero.est}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              type="button"
              className="sidebar-link"
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button 
            type="button"
            className="sidebar-link sidebar-cta"
            onClick={() => handleNavClick('contact')}
          >
            {content.nav.contact}
          </button>
        </nav>
        
        <div className="sidebar-footer">
           <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>© 2025 CMC</div>
        </div>
      </aside>

      {/* Mobile Compact Header (Visible on Mobile) */}
      <header className="mobile-header">
        <div className="header-container" style={{ ...styles.container, position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          
          {/* Centered Mobile Logo */}
          <div 
            className="logo-container"
            onClick={() => handleNavClick('home')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.8' }}>
              <span className="brand-main mobile-brand-main">CAROLINA</span>
              <span className="brand-main mobile-brand-main">MINTED</span>
              <span className="brand-sub mobile-brand-sub">COLLECTIBLES</span>
              <span className="mobile-est">{content.hero.est}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle (Right Aligned) */}
          <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
            <button 
              type="button"
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)} 
            >
              {isOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="mobile-dropdown">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
             <button 
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick('contact')}
              >
                {content.nav.contact}
              </button>
          </div>
        )}
      </header>
      
      <style>{`
        /* --- Sidebar Styles (Desktop) --- */
        .desktop-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 260px;
          background-color: ${COLORS.carolinaBlue};
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 50-30 50L0 50z' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E");
          background-size: 60px 100px;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          overflow-y: auto;
        }

        .sidebar-logo-container {
          cursor: pointer;
          margin-bottom: 60px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .sidebar-link {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: ${COLORS.navy};
          font-weight: 700;
          font-size: 1.1rem;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .sidebar-link:hover {
          background-color: rgba(19, 41, 75, 0.1);
          padding-left: 24px;
        }

        .sidebar-cta {
          margin-top: 20px;
          background-color: ${COLORS.navy};
          color: white;
          text-align: center;
        }
        .sidebar-cta:hover {
          background-color: #0F2240;
          padding-left: 16px; /* Reset padding shift for CTA */
          transform: translateY(-2px);
        }

        .sidebar-footer {
          margin-top: 40px;
          text-align: center;
          color: ${COLORS.navy};
        }

        /* Branding Text Styles */
        .brand-main {
          font-family: 'Graduate', serif;
          font-size: 2.5rem; /* Large for Sidebar */
          color: ${COLORS.carolinaBlue};
          text-shadow: 3px 3px 0 ${COLORS.navy}, -1px -1px 0 ${COLORS.navy}, 1px -1px 0 ${COLORS.navy}, -1px 1px 0 ${COLORS.navy}, 1px 1px 0 ${COLORS.navy};
          letter-spacing: 0.05em;
        }
        .brand-sub {
          font-family: 'Graduate', serif;
          font-size: 1rem;
          color: ${COLORS.navy};
          margin-top: 8px;
          letter-spacing: 0.25em;
        }

        /* --- Mobile Header Styles --- */
        .mobile-header {
          display: none; /* Hidden by default (Desktop) */
        }
        
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none;
          }

          .mobile-header {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 85px; /* Compact height (increased for est line) */
            background-color: ${COLORS.carolinaBlue};
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 50-30 50L0 50z' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E");
            background-size: 60px 100px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .logo-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            width: 100%;
            text-align: center;
            pointer-events: none;
          }
          .logo-container > div {
             pointer-events: auto;
          }

          /* Scaled down logo for compact mobile header */
          .mobile-brand-main {
            font-size: 1.6rem; 
            text-shadow: 2px 2px 0 ${COLORS.navy}, -1px -1px 0 ${COLORS.navy}, 1px -1px 0 ${COLORS.navy}, -1px 1px 0 ${COLORS.navy}, 1px 1px 0 ${COLORS.navy};
          }
          .mobile-brand-sub {
            font-size: 0.7rem;
            margin-top: 4px;
          }
          .mobile-est {
            font-size: 0.65rem;
            color: ${COLORS.navy};
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            margin-top: 4px;
            letter-spacing: 0.05em;
            opacity: 0.85;
            text-transform: uppercase;
          }

          .mobile-toggle {
             background: none;
             border: none;
             color: ${COLORS.navy};
             cursor: pointer;
             display: block;
          }

          .mobile-dropdown {
            position: absolute;
            top: 85px; /* Matches header height */
            left: 0;
            right: 0;
            background-color: white;
            padding: 20px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 16px;
            border-top: 1px solid ${COLORS.carolinaBlue};
          }

          .mobile-nav-item {
             background: none;
             border: none;
             text-decoration: none;
             color: ${COLORS.navy};
             font-weight: 600;
             font-size: 1.1rem;
             text-align: center;
             font-family: inherit;
             padding: 10px;
          }
        }
      `}</style>
    </>
  );
};

const Hero = ({ onCommunityClick }: { onCommunityClick: () => void }) => {
  const content = useContent();
  
  return (
    <section id="home" className="app-page-offset hero-section">
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
        <div className="hero-content" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: "800", 
            color: COLORS.navy, 
            lineHeight: "1.1", 
            marginBottom: "24px",
            marginTop: 0,
          }}>
            {content.hero.headlineStart} <br />
            <span style={{ color: COLORS.carolinaBlue }}>{content.hero.headlineHighlight}</span>
          </h1>
          <p style={{ 
            fontSize: "1.25rem", 
            color: "#4B5563", 
            marginBottom: "40px", 
            lineHeight: "1.6", 
            maxWidth: "480px", 
            marginLeft: "auto", 
            marginRight: "auto" 
          }}>
            {content.hero.subtext}
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
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
        <div className="features-grid">
          {content.features.items.map((f, i) => (
            <div key={i} className="feature-card" style={{ 
              padding: "32px", 
              borderRadius: "16px", 
              backgroundColor: COLORS.offWhite,
              border: `1px solid ${COLORS.lightGray}`,
              transition: "transform 0.2s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
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

// --- New Home Sections ---

const EthosSection = () => {
  const content = useContent();
  const ethos = content.home.ethos;
  
  return (
    <div style={{ backgroundColor: COLORS.navy, color: COLORS.white, padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
      <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '24px' }}>{ethos.title}</h2>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#E0E7FF' }}>{ethos.body}</p>
      </div>
    </div>
  );
};

const ExpertiseSection = () => {
  const content = useContent();
  const expertise = content.home.expertise;

  return (
    <section style={{ ...styles.section, backgroundColor: COLORS.offWhite }}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: COLORS.navy, marginBottom: '16px' }}>{expertise.title}</h2>
          <p style={{ fontSize: '1.1rem', color: '#4B5563' }}>{expertise.intro}</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {expertise.list.map((item, idx) => (
            <div key={idx} className="what-we-do-card" style={{ 
              padding: '32px', 
              backgroundColor: COLORS.white, 
              borderRadius: '16px', 
              borderLeft: `4px solid ${COLORS.carolinaBlue}`, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: COLORS.navy, marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '1.05rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentEventsSection = () => {
  const content = useContent();
  const event = content.home.recentEvents;

  return (
    <section style={{ padding: '80px 0', backgroundColor: COLORS.white }}>
      <div style={styles.container}>
         <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: COLORS.navy, marginBottom: '40px', textAlign: 'center' }}>{event.title}</h2>
         
         <div style={{ 
           display: 'grid', 
           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
           gap: '40px',
           alignItems: 'center'
         }}>
            <div style={{ order: 2 }}>
              <div style={{ 
                backgroundColor: COLORS.carolinaBlue, 
                height: '350px', 
                borderRadius: '16px', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2 }}></div>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {event.highlight.imageLabel}
                </span>
              </div>
            </div>
            
            <div style={{ order: 1 }}>
               <div style={{ 
                 display: 'inline-block', 
                 padding: '6px 12px', 
                 backgroundColor: COLORS.navy, 
                 color: 'white', 
                 borderRadius: '20px', 
                 fontSize: '0.85rem', 
                 fontWeight: '600',
                 marginBottom: '16px'
               }}>
                 {event.highlight.date}
               </div>
               <h3 style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.navy, marginBottom: '16px' }}>{event.highlight.title}</h3>
               <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4B5563', marginBottom: '24px' }}>
                 {event.highlight.desc}
               </p>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: COLORS.carolinaBlue, fontWeight: '700', cursor: 'pointer' }}>
                  See More in Community <Icons.ArrowRight />
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const content = useContent();
  const values = content.home.values;

  return (
    <section style={{ ...styles.section, backgroundColor: COLORS.offWhite }}>
      <div style={styles.container}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: COLORS.navy, marginBottom: '40px', textAlign: 'center' }}>{values.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
           {values.list.map((item, idx) => (
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
    </section>
  );
};

interface ProductCardProps {
  title: string;
  price: string;
  type: string;
  color: string;
  image?: string; 
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, type, color, image }) => {
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
      {/* Product Image Placeholder or Image */}
      <div style={{ 
        height: "280px", 
        backgroundColor: "#F3F4F6", 
        position: "relative", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {image ? (
           <img 
             src={image.startsWith('http') ? image : `./images/${image}`} 
             alt={title}
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />
        ) : (
          <>
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
          </>
        )}
        
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
      </div>
    </article>
  );
};

const PostCard: React.FC<{ post: SocialPost; onImageClick?: (url: string) => void }> = ({ post, onImageClick }) => {
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
        post.imageUrl ? (
           <div 
             style={{ 
               width: '100%', 
               backgroundColor: '#f9fafb', 
               display: 'flex', 
               justifyContent: 'center', 
               borderTop: `1px solid ${COLORS.lightGray}`, 
               borderBottom: `1px solid ${COLORS.lightGray}`,
               cursor: onImageClick ? 'zoom-in' : 'default'
             }}
             onClick={() => onImageClick && post.imageUrl && onImageClick(post.imageUrl)}
           >
               <img src={post.imageUrl} alt="Post Attachment" style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain', display: 'block' }} />
           </div>
        ) : (
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
        )
      )}

      {/* Footer / Actions */}
      <div style={{ 
        padding: '16px 20px', 
        borderTop: post.imageUrl ? 'none' : `1px solid ${COLORS.lightGray}`,
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (previewImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [previewImage]);

  return (
    <div className="app-page-offset" style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header" style={{ backgroundColor: COLORS.navy, color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{page.title}</h1>
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
            <PostCard 
              key={post.id} 
              post={post} 
              onImageClick={(url) => setPreviewImage(url)} 
            />
          ))}

          <div style={{ textAlign: 'center', marginTop: '40px', color: '#9CA3AF' }}>
            <p>You're all caught up!</p>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(19, 41, 75, 0.95)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setPreviewImage(null)}
        >
          <button 
            onClick={() => setPreviewImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              zIndex: 3001,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <Icons.X />
          </button>

          <img 
            src={previewImage} 
            alt="Full Preview" 
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const AboutPage = () => {
  const content = useContent();
  const page = content.about.page;

  return (
    <div className="app-page-offset" style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header" style={{ backgroundColor: COLORS.navy, color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
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

          {/* Looking Ahead */}
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>{page.lookingAheadTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>{page.lookingAheadBody}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const content = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="app-page-offset" style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
       {/* Reuse Header Style */}
       <div className="page-header" style={{ backgroundColor: COLORS.navy, color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
        <div className="argyle-bg" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}></div>
        <div style={{ ...styles.container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{content.faqPage.title}</h1>
          <p style={{ fontSize: '1.2rem', color: COLORS.carolinaBlue, maxWidth: '600px', margin: '0 auto' }}>{content.faqPage.subtitle}</p>
        </div>
      </div>

      <div style={{ ...styles.container, padding: '60px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {content.faqPage.items.map((item, index) => (
            <div key={index} style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: `1px solid ${COLORS.lightGray}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <button 
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: COLORS.navy }}>{item.question}</span>
                <span style={{ 
                  color: COLORS.carolinaBlue, 
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              {openIndex === index && (
                <div style={{ padding: '0 24px 24px', color: '#4B5563', lineHeight: '1.6' }}>
                  {item.answer}
                </div>
              )}
            </div>
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
    <div className="app-page-offset" style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>
      <div className="page-header" style={{ backgroundColor: COLORS.navy, color: COLORS.white, position: 'relative', overflow: 'hidden' }}>
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
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'community':
        return <CommunityPage />;
      case 'home':
      default:
        return (
          <>
            <Hero 
              onCommunityClick={() => handleNavigation('community')}
            />
            <Features />
            <EthosSection />
            <ExpertiseSection />
            <RecentEventsSection />
            <ValuesSection />
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
      </main>
      {/* Footer removed globally */}
    </ContentContext.Provider>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);