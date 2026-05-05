import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import projectsData from '../../data/projects.json';
import './Projects.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
    setMousePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const categoryColors = {
    'AI/ML': { gradient: 'linear-gradient(135deg, #00f0ff, #4361ee)', icon: '🤖', glow: 'rgba(0,240,255,0.15)' },
    'Deep Learning': { gradient: 'linear-gradient(135deg, #b347ea, #ff2d95)', icon: '🧠', glow: 'rgba(179,71,234,0.15)' },
    'Full Stack': { gradient: 'linear-gradient(135deg, #ff2d95, #ff6b35)', icon: '📊', glow: 'rgba(255,45,149,0.15)' },
  };

  const cat = categoryColors[project.category] || categoryColors['Full Stack'];

  return (
    <motion.div
      ref={cardRef}
      className={`project-card ${isHovering ? 'project-card--active' : ''}`}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.slug}`)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.03 : 1})`,
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        '--card-glow': cat.glow,
      }}
    >
      {/* Animated gradient border */}
      <div className="project-card__border" />

      {/* Mouse spotlight glow */}
      <div className="project-card__spotlight" />

      {/* Shine sweep effect */}
      <div className="project-card__shine" />

      {/* Content */}
      <div className="project-card__inner">
        {/* Header with icon and category */}
        <div className="project-card__header">
          <div className="project-card__icon-wrap" style={{ background: cat.gradient }}>
            <span className="project-card__icon">{cat.icon}</span>
          </div>
          <div className="project-card__header-text">
            <h3 className="project-card__title">{project.title}</h3>
            <span className="project-card__category" style={{ color: cat.gradient.includes('#00f0ff') ? '#00f0ff' : cat.gradient.includes('#b347ea') ? '#b347ea' : '#ff2d95' }}>
              {project.category}
            </span>
          </div>
          <motion.div
            className="project-card__number"
            initial={{ opacity: 0.1 }}
            whileHover={{ opacity: 0.2 }}
          >
            0{index + 1}
          </motion.div>
        </div>

        {/* Description */}
        <p className="project-card__desc">{project.description}</p>

        {/* Tech stack tags — animate in on hover */}
        <div className="project-card__tags">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="project-card__tag hoverable"
              initial={false}
              animate={isHovering ? {
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.05, duration: 0.3 },
              } : {
                opacity: 0.7,
                y: 0,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action buttons — slide up on hover */}
        <motion.div
          className="project-card__actions"
          initial={false}
          animate={isHovering ? {
            opacity: 1,
            y: 0,
            transition: { delay: 0.1, duration: 0.3 },
          } : {
            opacity: 0.6,
            y: 8,
          }}
        >
          <div
            className="project-card__btn project-card__btn--primary hoverable"
          >
            <span>Learn More</span>
            <svg className="project-card__btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects showcasing my expertise in AI, ML, and web development.
          </p>
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
