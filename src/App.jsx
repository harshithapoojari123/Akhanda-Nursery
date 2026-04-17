import { useEffect, useMemo, useState } from 'react';
import logoSrc from './assets/image-optimized.png';
import { heroSlides, categories, plants } from './data/plants';

const whatsappNumber = '919948788149';
const whatsappBase = `https://wa.me/${whatsappNumber}`;

const Logo = ({ onClick }) => (
  <button className="logo-badge logo-button" type="button" onClick={onClick}>
    <img className="logo-image" src={logoSrc} alt="Akhanda Nursery logo" />
  </button>
);

const HeroCard = ({ slide, variant, priority = false }) => (
  <div className={`hero-card ${variant}`}>
      <img
        className="hero-card-image"
        src={slide.image}
        alt={slide.title}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    <div className="hero-card-overlay" />
    <div className="hero-card-copy">
      <span>{slide.title}</span>
      <p>{slide.subtitle}</p>
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
    <div className="loading-card">
      <div className="loading-logo-wrap">
        <img className="loading-logo" src={logoSrc} alt="Akhanda Nursery logo" />
      </div>
      <p className="loading-eyebrow">Akhanda Nursery</p>
      <h1>Growing a fresh garden experience</h1>
      <p className="loading-copy">
        Preparing beautiful plants, bold flowers, and lush greenery for you.
      </p>
      <div className="loading-chips" aria-hidden="true">
        <span>Fresh picks</span>
        <span>Seasonal blooms</span>
        <span>Garden ready</span>
      </div>
      <div className="loading-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="loading-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
);

function App() {
  const [route, setRoute] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompactViewport] = useState(() => window.innerWidth <= 768);
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const selectedCategory = categories.find((category) => category.name === activeCategory) ?? categories[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  const filteredPlants = useMemo(() => {
    const filterKey = selectedCategory.filter ?? selectedCategory.name;
    if (selectedCategory.name === 'Fruits plants') {
      return plants.filter((plant) => plant.category === 'Fruits plants' || plant.category === 'Exotic Plants');
    }
    return plants.filter((plant) => plant.category === filterKey);
  }, [selectedCategory]);

  const goHome = () => {
    setRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToCategories = () => {
    setRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const openCategory = (categoryName) => {
    setActiveCategory(categoryName);
    setRoute('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && !isCompactViewport) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Logo onClick={goHome} />
        <nav className="top-nav">
          <button className="nav-link" type="button" onClick={goHome}>
            Home
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => {
              goHome();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => {
              goHome();
              document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Categories
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => {
              goHome();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </button>
        </nav>
      </header>

      {route === 'home' ? (
        <>
          <section className="hero-section">
            <div className="hero-grid">
              <div className="hero-copy-panel">
                <span className="eyebrow">Akhanda Nursery</span>
                <h1>Jai Kissan... Jai Jawan 🌿</h1>
                <p className="hero-text">
                  Discover a beautiful range of indoor, outdoor, medicinal, and exotic plants curated for every
                  gardener. Bring home fresh greenery with expert care, vibrant blooms, and nature-inspired design.
                </p>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href={`${whatsappBase}?text=${encodeURIComponent('Hi, I want to learn more about Akhanda Nursery.')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message on WhatsApp
                  </a>
                  <a className="button button-secondary" href="#contact">
                    Contact Us
                  </a>
                </div>
                <p className="hero-email">
                  Email: <a href="mailto:akhandavarma@gmail.com">akhandavarma@gmail.com</a>
                </p>
                <div className="hero-stats">
                  <div>
                    <strong>Fruit plant nursery</strong>
                    <span>Specialized in fruit-bearing varieties</span>
                  </div>
                  <div>
                    <strong>Exotic & medicinal</strong>
                    <span>Flowers, exotic, and healing plants</span>
                  </div>
                  <div>
                    <strong>Mon–Sat 9:00 AM – 6:45 PM</strong>
                    <span>Sunday closed</span>
                  </div>
                </div>
              </div>

              <div className="hero-display-panel">
                <HeroCard slide={heroSlides[0]} variant="hero-large" priority />
                <div className="hero-smalls">
                  {heroSlides.slice(1).map((slide) => (
                    <HeroCard key={slide.title} slide={slide} variant="hero-small" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <main>
            <section id="about" className="section about-section">
              <div className="section-copy">
                <span className="eyebrow">Established 2021</span>
                <h2>About Akhanda Nursery</h2>
                <p>
                  Akhanda Nursery is a trusted fruit plant nursery located at Flat #106, Lotus Venture, Gokulam Apartment, Beside B-Zone Park, Sujatha Nagar, VISAKHAPATNAM - 230 051.
                  We specialize in fruit-bearing plants, exotic varieties, flowers, and medicinal plants.
                </p>
                <p>
                  Our mission is to cultivate beauty, health, and sustainability through premium plant
                  varieties and personalized service. We offer a wide selection of exotic, flowering, and
                  herbal plants to bring life and nourishment to your garden.
                </p>
              </div>
              <div className="about-card-grid">
                <article className="feature-card">
                  <h3>Trusted quality</h3>
                  <p>Every plant is nurtured to arrive healthy, happy, and ready to thrive.</p>
                </article>
                <article className="feature-card">
                  <h3>Plant care guidance</h3>
                  <p>Get simple tips for watering, placement, and seasonal maintenance.</p>
                </article>
                <article className="feature-card">
                  <h3>Fresh delivery</h3>
                  <p>Hassle-free orders with careful packaging and fast delivery.</p>
                </article>
              </div>
            </section>

            <section id="categories" className="section categories-section">
              <div className="section-header">
                <div>
                  <span className="eyebrow">Shop by category</span>
                  <h2>Browse Nursery Collections</h2>
                </div>
              </div>
              <div className="category-scroll">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`category-pill ${category.name === activeCategory ? 'active' : ''}`}
                    onClick={() => openCategory(category.name)}
                  >
                    <img src={category.image} alt={category.name} loading="lazy" decoding="async" />
                    <div>
                      <strong>{category.name}</strong>
                      <p>{category.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section id="contact" className="section contact-section">
              <div className="contact-grid">
                <div className="contact-card contact-card--accent">
                  <span className="eyebrow">Get in touch</span>
                  <h2>Contact Akhanda Nursery</h2>
                  <p>We are here to answer your plant questions and help you choose the best greenery.</p>
                  <div className="contact-list">
                    <div>
                      <strong>Phone</strong>
                      <a href="tel:+919948788149">+91 9948788149</a>
                    </div>
                    <div>
                      <strong>WhatsApp</strong>
                      <a
                        href={`${whatsappBase}?text=${encodeURIComponent('Hi, I would like to place a plant order.')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Chat now
                      </a>
                    </div>
                    <div>
                      <strong>Address</strong>
                      <address>
                        Flat #106, Lotus Venture, Gokulam Apartment,<br />
                        Beside B-Zone Park, Sujatha Nagar,<br />
                        VISAKHAPATNAM - 230 051
                      </address>
                    </div>
                  </div>
                </div>
                <div className="map-frame">
                  <iframe
                    title="Akhanda Nursery location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.786670410907!2d83.21289771895933!3d17.80172039140989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3967ee347a5a8f%3A0xd5e59c27dd54d9aa!2sGokulam%20Apartment!5e0!3m2!1sen!2sin!4v1776394516131!5m2!1sen!2sin" 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <main className="section category-page">
          <div className="category-page-card">
            <img src={selectedCategory.image} alt={selectedCategory.name} loading="eager" decoding="async" />
            <div className="category-page-copy">
              <button className="back-link back-link--inline" type="button" onClick={backToCategories}>
                ← Back to categories
              </button>
              <span className="eyebrow">{selectedCategory.name}</span>
              <h2>Explore {selectedCategory.name}</h2>
              <p>{selectedCategory.description}</p>
              <p>
                We have {filteredPlants.length} premium plant{filteredPlants.length !== 1 ? 's' : ''} available in this
                category. Select your favorite and order directly via WhatsApp.
              </p>
              {selectedCategory.name === 'Fruits plants' && (
                <p>All varieties of fruit and exotic plants are available.</p>
              )}
              {selectedCategory.name === 'Avenue Plants' && (
                <p>All varieties of avenue plants are available.</p>
              )}
            </div>
          </div>

          <div className="category-product-grid">
            {filteredPlants.map((plant) => (
              <article key={plant.id} className="category-product-card">
                <img src={plant.image} alt={plant.name} loading="lazy" decoding="async" />
                <div className="category-product-body">
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <a
                    className="button button-primary button-sm"
                    href={`${whatsappBase}?text=${encodeURIComponent(`Hi, I want this plant: ${plant.name}`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Order on WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-top">
              <img className="footer-logo" src={logoSrc} alt="Akhanda Nursery logo" />
              <div>
                <p className="footer-brand-title">Akhanda Nursery</p>
                <span>Greenery for every home, porch, and garden.</span>
              </div>
            </div>
            <p>We bring fresh, healthy plants and helpful greenery guidance to your doorstep. Shop with confidence and grow joy in every space.</p>
          </div>

          <div className="footer-links">
            <h3>Quick links</h3>
            <button type="button" className="footer-link" onClick={goHome}>Home</button>
            <button
              type="button"
              className="footer-link"
              onClick={() => {
                goHome();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => {
                goHome();
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Categories
            </button>
          </div>

          <div className="footer-contact">
            <h3>Reach us</h3>
            <p className="footer-contact-emphasis">+91 9948788149</p>
            <a
              className="button button-primary button-sm footer-whatsapp"
              href={`${whatsappBase}?text=${encodeURIComponent('Hi, I would like to place a plant order.')}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
            <p className="footer-contact-note">Available 24/7 for orders, advice, and plant care guidance.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Akhanda Nursery. All rights reserved.</p>
          <p>Jai Kissan... Jai Jawan 🌿</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
