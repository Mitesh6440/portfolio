import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './Hero.css';

/* ── Particle Field ── */
function Particles({ count = 600 }) {
  const mesh = useRef();
  const { viewport } = useThree();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Floating Icosahedron that follows mouse ── */
function FloatingShape() {
  const mesh = useRef();
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse position
  useFrame((state) => {
    if (!mesh.current) return;
    const { pointer } = state;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 1.5, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 1.5, 0.05);

    mesh.current.position.x = mouse.current.x;
    mesh.current.position.y = mouse.current.y;
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.008;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={mesh} args={[1.2, 1]} position={[2, 0, 0]}>
        <MeshDistortMaterial
          color="#b347ea"
          emissive="#6a1b9a"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </Icosahedron>
    </Float>
  );
}

/* ── Neural Network Lines ── */
function NeuralLines() {
  const linesRef = useRef();
  const lineCount = 30;

  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < lineCount; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 6,
        start.y + (Math.random() - 0.5) * 6,
        start.z + (Math.random() - 0.5) * 4
      );
      points.push(start, end);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/* ── 3D Scene ── */
function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      className="hero__canvas"
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={0.8} />
      <pointLight position={[-5, -3, 3]} color="#b347ea" intensity={0.5} />
      <pointLight position={[0, -5, 2]} color="#ff2d95" intensity={0.3} />
      <Particles count={500} />
      <NeuralLines />
      <FloatingShape />
    </Canvas>
  );
}

/* ── Typing / Rotating Roles ── */
const roles = ['AI Developer', 'Web Developer', 'ML Engineer', 'Full Stack Builder'];

function RotatingRoles() {
  return (
    <motion.div className="hero__roles">
      {roles.map((role, index) => (
        <motion.span
          key={role}
          className="hero__role"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 3,
            delay: index * 3,
            repeat: Infinity,
            repeatDelay: (roles.length - 1) * 3,
            ease: 'easeInOut',
          }}
        >
          {role}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* 3D Background */}
      <div className="hero__scene">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mitesh Savaliya
        </motion.h1>

        <RotatingRoles />

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Building intelligent systems at the intersection of AI & modern web development
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            className="btn-neon btn-neon--primary hoverable"
            onClick={() => handleScroll('#projects')}
            id="hero-cta-projects"
          >
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="btn-neon btn-neon--secondary hoverable"
            onClick={() => handleScroll('#contact')}
            id="hero-cta-contact"
          >
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span>Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}
