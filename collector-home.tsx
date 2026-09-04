import React, { useState } from "react";
import type { AppContent } from "./index";
import "./collector-home.css";

type Navigation = (page: string) => void;

export function CollectorHeader({
  page,
  onNavigate,
}: {
  page: string;
  onNavigate: Navigation;
}) {
  const [open, setOpen] = useState(false);
  const navigate = (destination: string) => {
    onNavigate(destination);
    setOpen(false);
  };
  return (
    <header className="cmc-header">
      <div className="cmc-utility">
        <span>INDEPENDENT SPIRIT. CAROLINA ROOTS.</span>
        <span>EST. 2025 · GASTONIA, NC</span>
      </div>
      <div className="cmc-nav">
        <button
          className="cmc-wordmark"
          onClick={() => navigate("home")}
          aria-label="Carolina Minted Collectibles home"
        >
          CAROLINA
          <br />
          MINTED<span>COLLECTIBLES</span>
        </button>
        <button
          className="cmc-menu"
          aria-expanded={open}
          aria-controls="cmc-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="cmc-navigation"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["home", "Home"],
            ["community", "Community"],
            ["about", "Our story"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-current={page === id ? "page" : undefined}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
          <button className="cmc-pill" onClick={() => navigate("contact")}>
            Let’s talk <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export function CollectorHome({
  content,
  onNavigate,
}: {
  content: AppContent;
  onNavigate: Navigation;
}) {
  const heroPost = content.communityPage.feed.find((post) => post.id === "p1");
  const storyTitles: Record<string, string> = {
    p4: "Max Verstappen",
    p5: "Charles Leclerc",
    p6: "Lewis Hamilton",
  };
  const stories = content.communityPage.feed.filter(
    (post) => post.id in storyTitles,
  );
  return (
    <div className="cmc-home">
      <section className="cmc-campaign" aria-labelledby="campaign-title">
        <div className="cmc-campaign-copy">
          <span className="cmc-eyebrow">FOR THE TRUE COLLECTORS</span>
          <h1 id="campaign-title">
            COLLECT.
            <br />
            VAULT.
            <br />
            <span>SELL.</span>
          </h1>
          <p>{content.hero.subtext}</p>
          <button
            className="cmc-pill cmc-pill-light"
            onClick={() => onNavigate("community")}
          >
            Explore the community <span aria-hidden="true">↗</span>
          </button>
          <div className="cmc-campaign-index">
            <span>CAROLINA MINTED COLLECTIBLES</span>
            <span>01 / THE COLLECTOR’S MINDSET</span>
          </div>
        </div>
        <div className="cmc-campaign-art">
          <div className="cmc-art-label">
            <span>FROM THE COLLECTION</span>
            <span>POKÉMON / PSA 10</span>
          </div>
          <span className="cmc-art-word" aria-hidden="true">
            MINTED
          </span>
          {heroPost?.imageUrl && (
            <img
              src={heroPost.imageUrl}
              alt="Gengar and Mimikyu GX graded collectible from CMC’s card-show story"
              fetchPriority="high"
            />
          )}
          <div className="cmc-art-caption">
            <span>
              GENGAR & MIMIKYU GX
              <br />
              <small>THE GHOST GRAIL.</small>
            </span>
            <button
              onClick={() => onNavigate("community")}
              aria-label="Read the Gengar and Mimikyu community story"
            >
              ↗
            </button>
          </div>
        </div>
      </section>

      <div className="cmc-category-strip" aria-label="Collecting specialties">
        <span>POKÉMON</span>
        <span aria-hidden="true">✳</span>
        <span>SPORTS CARDS</span>
        <span aria-hidden="true">✳</span>
        <span>STAR WARS UNLIMITED</span>
        <span aria-hidden="true">✳</span>
        <span>MEMORABILIA</span>
      </div>

      <section className="cmc-section">
        <div className="cmc-section-heading">
          <div>
            <span className="cmc-eyebrow">FROM THE MINTED COMMUNITY</span>
            <h2>
              EVERY PIECE.
              <br />A STORY.
            </h2>
          </div>
          <button
            className="cmc-text-link"
            onClick={() => onNavigate("community")}
          >
            All community stories <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="cmc-stories">
          {stories.map((post) => (
            <article key={post.id}>
              <button
                className="cmc-story-image"
                onClick={() => onNavigate("community")}
                aria-label={`Read the ${storyTitles[post.id]} community story`}
              >
                <span className="cmc-story-tag">SIGNED MEMORABILIA</span>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={`${storyTitles[post.id]} signed collectibles featured by CMC`}
                    loading="lazy"
                  />
                )}
                <span className="cmc-story-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
              <div className="cmc-story-meta">
                <span>THE COLLECTION JOURNAL</span>
                <span>{post.time}</span>
              </div>
              <h3>{storyTitles[post.id]}</h3>
              <p>{post.text.split("\n")[0].replace(/^[^A-Za-z]+/, "")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cmc-standard">
        <div>
          <span className="cmc-eyebrow">THE CAROLINA STANDARD</span>
          <h2>
            THE HOBBY.
            <br />
            TAKEN
            <br />
            <span>SERIOUSLY.</span>
          </h2>
          <button className="cmc-pill" onClick={() => onNavigate("about")}>
            Get to know CMC <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="cmc-principles">
          {content.features.items.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
          <p className="cmc-ethos">{content.home.ethos.body}</p>
        </div>
      </section>

      <section className="cmc-event cmc-section">
        <div className="cmc-event-heading">
          <span className="cmc-eyebrow">
            {content.home.recentEvents.highlight.date} / OUT IN THE COMMUNITY
          </span>
          <h2>
            BEYOND
            <br />
            THE SLAB.
          </h2>
        </div>
        <div>
          <h3>{content.home.recentEvents.highlight.title}</h3>
          <p>{content.home.recentEvents.highlight.desc}</p>
          <button
            className="cmc-text-link"
            onClick={() => onNavigate("community")}
          >
            Meet the community <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section className="cmc-contact-band">
        <span className="cmc-eyebrow">SOURCING · TRADING · TALKING CARDS</span>
        <h2>
          WHAT’S YOUR
          <br />
          NEXT GRAIL?
        </h2>
        <p>{content.contactPage.subtitle}</p>
        <button className="cmc-pill" onClick={() => onNavigate("contact")}>
          Let’s talk collectibles <span aria-hidden="true">↗</span>
        </button>
      </section>
    </div>
  );
}

export function CollectorFooter({ onNavigate }: { onNavigate: Navigation }) {
  return (
    <footer className="cmc-footer">
      <div>
        <strong>CAROLINA MINTED.</strong>
        <p>Collectibles. Community. Carolina.</p>
      </div>
      <nav aria-label="Footer navigation">
        <button onClick={() => onNavigate("about")}>Our story</button>
        <button onClick={() => onNavigate("community")}>Community</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
      </nav>
      <div className="cmc-footer-bottom">
        <span>© {new Date().getFullYear()} Carolina Minted Collectibles</span>
        <span>GASTONIA, NORTH CAROLINA</span>
      </div>
    </footer>
  );
}
