import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Rules } from './pages/Rules';
import { StartGame } from './pages/StartGame';
import { FastestFinger } from './pages/FastestFinger';
import { Play } from './pages/Play';
import { Result } from './pages/Result';
import { Certificate } from './pages/Certificate';
import { Leaderboard } from './pages/Leaderboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-midnight font-body selection:bg-gold selection:text-deep">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/start" element={<StartGame />} />
              <Route path="/fastest-finger" element={<FastestFinger />} />
              <Route path="/play" element={<Play />} />
              <Route path="/result" element={<Result />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
};

export default App;