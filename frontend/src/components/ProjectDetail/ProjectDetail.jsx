import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './ProjectDetail.css';

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═══════════════════════════════════════════
   Category Color Mapping
   ═══════════════════════════════════════════ */
const categoryColors = {
  'AI/ML': { gradient: 'linear-gradient(135deg, #00f0ff, #4361ee)', color: '#00f0ff', glow: 'rgba(0,240,255,0.12)' },
  'Deep Learning': { gradient: 'linear-gradient(135deg, #b347ea, #ff2d95)', color: '#b347ea', glow: 'rgba(179,71,234,0.12)' },
  'Full Stack': { gradient: 'linear-gradient(135deg, #ff2d95, #ff6b35)', color: '#ff2d95', glow: 'rgba(255,45,149,0.12)' },
};

/* ═══════════════════════════════════════════
   Section Label (Shared)
   ═══════════════════════════════════════════ */
function SectionLabel({ label, color }) {
  return (
    <motion.div className="pd-section-label" variants={fadeUp} custom={0}>
      <span className="pd-section-label__dot" style={{ background: color }} />
      {label}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════ */
function HeroSection({ project, cat }) {
  return (
    <section className="pd-hero">
      {/* Background ambient orbs */}
      <div className="pd-hero__orb pd-hero__orb--1" style={{ background: cat.gradient }} />
      <div className="pd-hero__orb pd-hero__orb--2" style={{ background: cat.gradient }} />

      <div className="pd-hero__content">
        <motion.div
          initial="hidden"
          animate="visible"
          className="pd-hero__text"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Link to="/" className="pd-back-link hoverable">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.span
            className="pd-hero__badge"
            style={{ borderColor: cat.color + '40', color: cat.color, background: cat.glow }}
            variants={fadeUp}
            custom={0.1}
          >
            {project.category}
          </motion.span>

          <motion.h1 className="pd-hero__title" variants={fadeUp} custom={0.2}>
            {project.title}
          </motion.h1>

          <motion.p className="pd-hero__tagline" variants={fadeUp} custom={0.3}>
            {project.tagline}
          </motion.p>

          <motion.div className="pd-hero__tags" variants={fadeUp} custom={0.4}>
            {project.techStack.map((tech) => (
              <span key={tech} className="pd-hero__tag">{tech}</span>
            ))}
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Problem Section
   ═══════════════════════════════════════════ */
function ProblemSection({ detail, cat }) {
  return (
    <section className="pd-section">
      <div className="pd-container">
        <motion.div
          className="pd-problem"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionLabel label="The Problem" color={cat.color} />
          <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
            Why This Project Exists
          </motion.h2>
          <motion.div className="pd-problem__card" variants={fadeUp} custom={0.2}>
            <div className="pd-problem__icon">💡</div>
            <p className="pd-problem__text">{detail.problem}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Features Section
   ═══════════════════════════════════════════ */
function FeaturesSection({ detail, cat }) {
  return (
    <section className="pd-section pd-section--alt">
      <div className="pd-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionLabel label="Key Features" color={cat.color} />
          <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
            What It Does
          </motion.h2>
        </motion.div>

        <motion.div
          className="pd-features"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {detail.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="pd-feature-card"
              variants={staggerItem}
            >
              <div className="pd-feature-card__icon" style={{ background: cat.glow, borderColor: cat.color + '30' }}>
                {feature.icon}
              </div>
              <h3 className="pd-feature-card__title">{feature.title}</h3>
              <p className="pd-feature-card__desc">{feature.description}</p>
              <div className="pd-feature-card__number" style={{ color: cat.color + '08' }}>
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Architecture Section
   ═══════════════════════════════════════════ */
function ArchitectureSection({ detail, cat }) {
  return (
    <section className="pd-section">
      <div className="pd-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionLabel label="Under the Hood" color={cat.color} />
          <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
            Architecture & Tech Stack
          </motion.h2>
          <motion.p className="pd-arch-desc" variants={fadeUp} custom={0.2}>
            {detail.architecture.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="pd-tech-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {detail.architecture.techDetails.map((tech) => (
            <motion.div
              key={tech.name}
              className="pd-tech-card"
              variants={staggerItem}
            >
              <div className="pd-tech-card__header">
                <div className="pd-tech-card__indicator" style={{ background: cat.gradient }} />
                <h4 className="pd-tech-card__name">{tech.name}</h4>
              </div>
              <p className="pd-tech-card__role">{tech.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Results Section
   ═══════════════════════════════════════════ */
function ResultsSection({ detail, cat }) {
  return (
    <section className="pd-section pd-section--alt">
      <div className="pd-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionLabel label="Results" color={cat.color} />
          <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
            Impact & Outcomes
          </motion.h2>
          <motion.p className="pd-results-desc" variants={fadeUp} custom={0.2}>
            {detail.results.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="pd-metrics"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {detail.results.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              className="pd-metric-card"
              variants={staggerItem}
            >
              <span className="pd-metric-card__value" style={{ background: cat.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {metric.value}
              </span>
              <span className="pd-metric-card__label">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Screenshot Gallery with Lightbox
   ═══════════════════════════════════════════ */
function ScreenshotGallery({ screenshots, projectTitle, cat }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  }, [screenshots.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  }, [screenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <section className="pd-section">
        <div className="pd-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionLabel label="Gallery" color={cat.color} />
            <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
              Screenshots & Demo
            </motion.h2>
            <motion.p className="pd-gallery-desc" variants={fadeUp} custom={0.2}>
              Walk through the complete user journey — from audio upload to intelligent task assignment.
            </motion.p>
          </motion.div>

          <motion.div
            className="pd-gallery"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {screenshots.map((shot, i) => (
              <motion.div
                key={i}
                className="pd-gallery__item"
                variants={staggerItem}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                aria-label={`View screenshot: ${shot.caption}`}
              >
                <div className="pd-gallery__img-wrap">
                  <img
                    src={typeof shot === 'string' ? shot : shot.src}
                    alt={typeof shot === 'string' ? `${projectTitle} screenshot ${i + 1}` : shot.alt}
                    loading="lazy"
                  />
                  <div className="pd-gallery__overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
                {typeof shot !== 'string' && shot.caption && (
                  <div className="pd-gallery__caption">
                    <span className="pd-gallery__caption-num">0{i + 1}</span>
                    {shot.caption}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="pd-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="pd-lightbox__close hoverable"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              className="pd-lightbox__nav pd-lightbox__nav--prev hoverable"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="Previous screenshot"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="pd-lightbox__content"
              onClick={(e) => e.stopPropagation()}
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={typeof screenshots[lightboxIndex] === 'string' ? screenshots[lightboxIndex] : screenshots[lightboxIndex].src}
                alt={typeof screenshots[lightboxIndex] === 'string' ? `${projectTitle} screenshot` : screenshots[lightboxIndex].alt}
              />
              {typeof screenshots[lightboxIndex] !== 'string' && screenshots[lightboxIndex].caption && (
                <div className="pd-lightbox__caption">
                  <span className="pd-lightbox__caption-num">{lightboxIndex + 1} / {screenshots.length}</span>
                  {screenshots[lightboxIndex].caption}
                </div>
              )}
            </motion.div>

            {/* Next button */}
            <button
              className="pd-lightbox__nav pd-lightbox__nav--next hoverable"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Next screenshot"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   Business Impact Section
   ═══════════════════════════════════════════ */
function BusinessImpactSection({ businessHighlights, cat }) {
  if (!businessHighlights) return null;

  return (
    <section className="pd-section pd-section--alt">
      <div className="pd-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionLabel label="Business Impact" color={cat.color} />
          <motion.h2 className="pd-section-title" variants={fadeUp} custom={0.1}>
            {businessHighlights.sectionTitle || 'Business Impact'}
          </motion.h2>
          <motion.p className="pd-business-desc" variants={fadeUp} custom={0.2}>
            {businessHighlights.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="pd-business-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {businessHighlights.highlights.map((item) => (
            <motion.div
              key={item.title}
              className="pd-business-card"
              variants={staggerItem}
            >
              <div className="pd-business-card__icon-wrap" style={{ background: cat.glow, borderColor: cat.color + '30' }}>
                <span className="pd-business-card__icon">{item.icon}</span>
              </div>
              <h3 className="pd-business-card__title">{item.title}</h3>
              <p className="pd-business-card__text">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Bottom Navigation
   ═══════════════════════════════════════════ */
function BottomNavigation({ slug }) {
  return (
    <section className="pd-section pd-bottom-nav">
      <div className="pd-container">
        <motion.div
          className="pd-bottom-nav__inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <Link to="/" className="pd-btn pd-btn--outline hoverable">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Navigate to adjacent projects */}
          <motion.div className="pd-bottom-nav__projects" variants={fadeUp} custom={0.15}>
            {projectsData
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/project/${p.slug}`}
                  className="pd-next-project hoverable"
                >
                  <span className="pd-next-project__label">Next Project</span>
                  <span className="pd-next-project__title">{p.title}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Main ProjectDetail Page
   ═══════════════════════════════════════════ */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="pd-not-found">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/" className="pd-back-btn hoverable">
              ← Back to Portfolio
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  const cat = categoryColors[project.category] || categoryColors['Full Stack'];
  const detail = project.detail;

  return (
    <>
      <Navbar />
      <main className="pd">
        <HeroSection project={project} cat={cat} />
        <ProblemSection detail={detail} cat={cat} />
        <FeaturesSection detail={detail} cat={cat} />
        <ArchitectureSection detail={detail} cat={cat} />
        <ResultsSection detail={detail} cat={cat} />
        <ScreenshotGallery
          screenshots={detail.screenshots}
          projectTitle={project.title}
          cat={cat}
        />
        <BusinessImpactSection
          businessHighlights={detail.businessHighlights}
          cat={cat}
        />
        <BottomNavigation slug={slug} />
      </main>
      <Footer />
    </>
  );
}
