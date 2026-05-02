import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    id: 1,
    title: 'AI & Machine Learning',
    description: 'Specializing in custom LLM integrations, NLP pipelines, and predictive models that transform raw data into intelligent business insights.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12L2.1 12.1" />
        <path d="M12 12v10" />
        <path d="M4.93 4.93l4.24 4.24" />
        <path d="M14.83 9.17l4.24-4.24" />
        <path d="M14.83 14.83l4.24 4.24" />
        <path d="M9.17 14.83l-4.24 4.24" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    tags: ['LLMs', 'NLP', 'Computer Vision'],
    color: '#00f0ff'
  },
  {
    id: 2,
    title: 'Full Stack Development',
    description: 'Building scalable, high-performance web applications using modern stacks like React, Next.js, and FastAPI with a focus on clean architecture.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    tags: ['React', 'FastAPI', 'Node.js'],
    color: '#b347ea'
  },
  {
    id: 3,
    title: 'Data Science & Analysis',
    description: 'Extracting actionable patterns from complex datasets through advanced statistical modeling, visualization, and automated processing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    tags: ['Python', 'Pandas', 'Big Data'],
    color: '#ff2d95'
  },
  {
    id: 4,
    title: 'API & Cloud Solutions',
    description: 'Designing robust REST & GraphQL APIs and deploying cloud-native infrastructure that ensures maximum uptime and performance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    tags: ['AWS', 'Docker', 'Microservices'],
    color: '#ff6b35'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="services__header"
        >
          <h2 className="section-title">Specialized Services</h2>
          <p className="section-subtitle">
            Bridging the gap between robust software engineering and cutting-edge Artificial Intelligence.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="services__card hoverable"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="services__card-inner">
                <div 
                  className="services__icon-wrap"
                  style={{ '--accent-color': service.color }}
                >
                  <div className="services__icon-glow" />
                  <span className="services__icon">{service.icon}</span>
                </div>

                <h3 className="services__title">{service.title}</h3>
                <p className="services__desc">{service.description}</p>

                <div className="services__tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="services__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div 
                className="services__card-border" 
                style={{ background: `linear-gradient(135deg, ${service.color}40, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Floating background elements */}
        <div className="services__ambient">
          <div className="services__orb services__orb--1" />
          <div className="services__orb services__orb--2" />
        </div>
      </div>
    </section>
  );
}
