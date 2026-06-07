import { AnimatePresence, motion } from 'framer-motion';
import HeroBento from '../components/desktop/HeroBento';
import EcosystemShowcase from '../components/desktop/EcosystemShowcase';
import PlacesMap from '../components/desktop/PlacesMap';
import SelectedWorks from '../components/desktop/SelectedWorks';
import RepositoriesShowcase from '../components/desktop/RepositoriesShowcase';
import ContactPage from '../components/desktop/ContactPage';
import Articles from '../components/desktop/Articles';
import Footer from '../components/desktop/Footer';

export default function DesktopLayout({ currentHash }) {
  const isWorkView = currentHash.startsWith('#/work') || currentHash.startsWith('#/live-projects');
  const isExperienceView = currentHash.startsWith('#/experience');
  const isRepositoriesView = currentHash.startsWith('#/repositories');
  const isContactView = currentHash.startsWith('#/contact');
  const isSubpage = isWorkView || isExperienceView || isRepositoriesView || isContactView;

  return (
    <div className="w-full">
      <main className="relative z-10">
        {/* Header for Subpages */}
        {isSubpage && (
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-4 flex justify-between items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Infant Ashil A
            </span>
            <button
              onClick={() => window.location.hash = '#/'}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-sm font-semibold tracking-wide text-zinc-350 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={
              isWorkView ? `work-${currentHash}` :
              isExperienceView ? 'experience' :
              isRepositoriesView ? 'repositories' :
              isContactView ? 'contact' : 'home'
            }
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {isWorkView && <SelectedWorks view={currentHash === '#/live-projects' ? 'live' : 'featured'} />}
            {isExperienceView && <Articles />}
            {isRepositoriesView && <RepositoriesShowcase />}
            {isContactView && <ContactPage />}
            {!isSubpage && (
              <>
                <HeroBento />
                <EcosystemShowcase />
                <PlacesMap />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {isSubpage && <Footer />}
    </div>
  );
}
