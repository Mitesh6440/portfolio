import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import './Skills.css';

const techs = skillsData.technologies;

// Duplicate the list so the marquee can loop seamlessly
const marqueeRow1 = [...techs.slice(0, 12), ...techs.slice(0, 12)];
const marqueeRow2 = [...techs.slice(12), ...techs.slice(12)];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to build intelligent systems.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="skills__marquee-wrapper">
        <div className="skills__marquee skills__marquee--left">
          {marqueeRow1.map((tech, i) => (
            <div className="skills__logo-item hoverable" key={`r1-${i}`}>
              <img
                src={tech.icon}
                alt={tech.name}
                className="skills__logo-img"
                loading="lazy"
              />
              <span className="skills__logo-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div className="skills__marquee-wrapper">
        <div className="skills__marquee skills__marquee--right">
          {marqueeRow2.map((tech, i) => (
            <div className="skills__logo-item hoverable" key={`r2-${i}`}>
              <img
                src={tech.icon}
                alt={tech.name}
                className="skills__logo-img"
                loading="lazy"
              />
              <span className="skills__logo-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
