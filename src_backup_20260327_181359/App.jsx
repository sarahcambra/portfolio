import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/Aboutpage';
import CaseStudyPage from './pages/CaseStudyPage';
import AxessLabCaseStudy from './pages/AxessLabCaseStudy';

// ── Global styles (order matters) ──
import './styles/tokens.css';
import './styles/animations.css';
import './styles/shared.css';
// Keep your existing Tailwind/index.css too
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-page-bg text-page-text transition-colors duration-300">
          <Navbar />

          <main id="main-content" className="flex-grow">
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/projects"       element={<ProjectsPage />} />
              <Route path="/about"          element={<AboutPage />} />
              <Route path="/projects/axesslab-design-system" element={<AxessLabCaseStudy />} />
              <Route path="/projects/:slug" element={<CaseStudyPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
