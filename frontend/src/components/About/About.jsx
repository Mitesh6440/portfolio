import { motion } from 'framer-motion';
import './About.css';

const timelineData = [
  {
    year: 'July 2025 – Present',
    title: 'AI Developer',
    subtitle: 'Meditab Software Inc.',
    description:
      'Building AI-powered solutions, integrating LLMs into healthcare workflows, and developing intelligent automation systems.',
    accent: 'cyan',
  },
  {
    year: '2022 – 2026',
    title: 'B.E. in Information Technology',
    subtitle: 'L.D. College of Engineering, Ahmedabad',
    description:
      'Focused on machine learning, deep learning, and full-stack development. Built multiple AI projects and contributed to open-source.',
    accent: 'purple',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function About() {
  return (
    <section className="about" id="about">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about building intelligent systems that make a real-world impact.
          </p>
        </motion.div>

        <div className="about__grid">
          {/* Intro text */}
          <motion.div
            className="about__intro"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I'm an <span className="about__highlight">AI Developer</span> at{' '}
              <span className="about__highlight">Meditab Software</span>, where I build
              intelligent systems that bridge the gap between cutting-edge AI research
              and practical applications.
            </p>
            <p>
              With a strong foundation in{' '}
              <span className="about__highlight">Information Technology</span> from L.D.
              College of Engineering, I specialize in machine learning, deep learning,
              and modern web technologies.
            </p>
            <p>
              I believe in writing clean, scalable code and creating experiences that
              feel alive and futuristic.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="about__timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`about__timeline-card glass-card about__timeline-card--${item.accent}`}
                variants={cardVariants}
              >
                <div className="about__timeline-dot" />
                <span className="about__timeline-year">{item.year}</span>
                <h3 className="about__timeline-title">{item.title}</h3>
                <h4 className="about__timeline-subtitle">{item.subtitle}</h4>
                <p className="about__timeline-desc">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
