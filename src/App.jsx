import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <DocumentTitle />
        <div className="flex flex-col min-h-screen bg-page-bg text-page-text transition-colors duration-300">
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/"               element={<HomePage />} />
              <Route path="/projects"       element={<ProjectsPage />} />
              <Route path="/about"          element={<AboutPage />} />
              {caseStudyRoutes.map(({ slug, component: CaseStudy }) => (
                <Route
                  key={slug}
                  path={`/projects/${slug}`}
                  element={<CaseStudy />}
                />
              ))}
              <Route path="/projects/:slug" element={<CaseStudyPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
