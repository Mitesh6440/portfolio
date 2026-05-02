import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import SectionDivider from './components/SectionDivider/SectionDivider';
import Footer from './components/Footer/Footer';

// Lazy load below-fold sections
const About = lazy(() => import('./components/About/About'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Services = lazy(() => import('./components/Services/Services'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail/ProjectDetail'));

function SectionLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
    }}>
      <div className="glow-dot" />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <SectionDivider variant="glow" />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <SectionDivider variant="dots" />

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <SectionDivider variant="wave" />

        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        <SectionDivider variant="dots" />

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <SectionDivider variant="glow" flip />

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/project/:slug"
          element={
            <Suspense fallback={<SectionLoader />}>
              <ProjectDetail />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
