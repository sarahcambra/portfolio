import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import CaseStudyPage from './pages/CaseStudyPage';
import DocumentTitle from './components/DocumentTitle';
import { caseStudyRoutes } from './data/caseStudyRegistry';

function App() {
  return (
    <ThemeProvider>
      {/* 1. The Basename handles the /portfolio/ sub-folder */}
      <Router basename={import.meta.env.BASE_URL}>
                <DocumentTitle />
        <div className="site-atmosphere flex flex-col min-h-screen text-page-text transition-colors duration-300">
          <Navbar />

          <div className="flex-grow">
            <Routes>
              {/* 2. Index route ensures HomePage loads immediately on the base URL */}
              <Route index element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* 3. Mapping your specific case studies */}
              {caseStudyRoutes.map(({ slug, component: CaseStudy }) => (
                <Route
                  key={slug}
                  path={`/projects/${slug}`}
                  element={<CaseStudy />}
                />
              ))}

              {/* 4. Catch-all for dynamic slugs or broken links */}
              <Route path="/projects/:slug" element={<CaseStudyPage />} />
              
              {/* 5. Emergency Redirect: If the user gets lost, send them Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;