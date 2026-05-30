import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroBento from './components/HeroBento';
import SelectedWorks from './components/SelectedWorks';
import Articles from './components/Articles';
import Footer from './components/Footer';

/**
 * Main App shell - reubence.com style portfolio
 * Single-page layout with bento grid hero, selected works, articles, and footer.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen">
          <Navbar />
          <main>
            <HeroBento />
            <SelectedWorks />
            <Articles />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
