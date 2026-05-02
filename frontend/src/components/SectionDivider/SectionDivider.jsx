import { motion } from 'framer-motion';
import './SectionDivider.css';

/**
 * Animated divider placed between page sections.
 * Props:
 *   variant — 'glow' | 'dots' | 'wave' (visual style)
 *   flip    — mirror the gradient direction
 */
export default function SectionDivider({ variant = 'glow', flip = false }) {
  return (
    <motion.div
      className={`section-divider section-divider--${variant} ${flip ? 'section-divider--flip' : ''}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {variant === 'dots' && (
        <div className="section-divider__dots">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="section-divider__dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.4, type: 'spring' }}
            />
          ))}
        </div>
      )}

      {variant === 'wave' && (
        <svg
          className="section-divider__wave"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30"
            fill="none"
            stroke="url(#wave-grad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#00f0ff" />
              <stop offset="70%" stopColor="#b347ea" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </motion.div>
  );
}
