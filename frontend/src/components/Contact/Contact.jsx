import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import './Contact.css';

/* ── 3D Scene Components ── */

function FloatingTorusKnot() {
  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!mesh.current) return;
    const { pointer } = state;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 0.8, 0.03);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 0.8, 0.03);

    mesh.current.rotation.x += 0.003;
    mesh.current.rotation.y += 0.005;
    mesh.current.position.x = mouse.current.x * 0.5;
    mesh.current.position.y = mouse.current.y * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color="#6a1b9a"
          emissive="#4a0e6e"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.4;
      ring2.current.rotation.x = Math.PI / 3;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.2;
      ring3.current.rotation.y = t * 0.15;
    }
  });

  return (
    <>
      <Torus ref={ring1} args={[1.8, 0.015, 16, 100]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} />
      </Torus>
      <Torus ref={ring2} args={[2.1, 0.01, 16, 100]}>
        <meshBasicMaterial color="#b347ea" transparent opacity={0.2} />
      </Torus>
      <Torus ref={ring3} args={[2.4, 0.008, 16, 100]}>
        <meshBasicMaterial color="#ff2d95" transparent opacity={0.12} />
      </Torus>
    </>
  );
}

function ContactParticles({ count = 80 }) {
  const points = useRef();

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00f0ff" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} className="contact__canvas">
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} color="#00f0ff" intensity={0.6} />
      <pointLight position={[-3, -2, 2]} color="#b347ea" intensity={0.4} />
      <pointLight position={[0, -3, 1]} color="#ff2d95" intensity={0.2} />
      <FloatingTorusKnot />
      <OrbitRings />
      <ContactParticles />
    </Canvas>
  );
}

/* ── Contact Info Data ── */
const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'savaliyamitesh99@gmail.com',
    href: 'mailto:savaliyamitesh99@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 63525 65284',
    href: 'tel:+916352565284',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Gujarat, India',
    href: null,
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Mitesh6440',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gec-ldce-it-dte-mitesh-savaliya-6440abcd',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/* ── Main Component ── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* ── Left: Form + Info ── */}
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Availability badge */}
            <div className="contact__availability">
              <span className="contact__availability-dot" />
              <span>Available for new projects</span>
            </div>

            {/* Form */}
            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
              <div className={`contact__field ${focusedField === 'name' ? 'contact__field--focused' : ''}`}>
                <label htmlFor="contact-name" className="contact__label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="contact__input hoverable"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`contact__field ${focusedField === 'email' ? 'contact__field--focused' : ''}`}>
                <label htmlFor="contact-email" className="contact__label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="contact__input hoverable"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`contact__field ${focusedField === 'message' ? 'contact__field--focused' : ''}`}>
                <label htmlFor="contact-message" className="contact__label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__input contact__textarea hoverable"
                  placeholder="Tell me about your project..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact__submit hoverable"
                disabled={loading}
                id="contact-submit"
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>

              {status && (
                <motion.div
                  className={`contact__toast contact__toast--${status}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {status === 'success' ? '✓ Message sent successfully!' : '✕ Something went wrong. Please try again.'}
                </motion.div>
              )}
            </form>

            {/* Contact info cards */}
            <div className="contact__info-cards">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href || '#'}
                  className="contact__info-card hoverable"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  onClick={info.href ? undefined : (e) => e.preventDefault()}
                >
                  <span className="contact__info-icon">{info.icon}</span>
                  <div className="contact__info-content">
                    <span className="contact__info-label">{info.label}</span>
                    <span className={`contact__info-value ${info.label === 'Location' || info.label === 'Phone' ? 'contact__info-value--wrap' : ''}`}>
                      {info.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="contact__socials">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="contact__social hoverable"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.1 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: 3D Scene ── */}
          <motion.div
            className="contact__right"
            initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="contact__3d-wrap">
              <ContactScene />
              {/* Decorative label */}
              <div className="contact__3d-label">
                <span className="contact__3d-label-dot" />
                Interactive 3D — Move your mouse
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
