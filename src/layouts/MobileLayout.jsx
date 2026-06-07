import { AnimatePresence, motion } from 'framer-motion';
import MobileNavbar from '../components/mobile/MobileNavbar';
import MobileHero from '../components/mobile/MobileHero';
import MobileEcosystem from '../components/mobile/MobileEcosystem';
import MobilePlacesMap from '../components/mobile/MobilePlacesMap';
import MobileSelectedWorks from '../components/mobile/MobileSelectedWorks';
import MobileRepositoriesShowcase from '../components/mobile/MobileRepositoriesShowcase';
import MobileContactPage from '../components/mobile/MobileContactPage';
import MobileArticles from '../components/mobile/MobileArticles';
import MobileFooter from '../components/mobile/MobileFooter';

export default function MobileLayout({ currentHash }) {
  const isWorkView = currentHash.startsWith('#/work') || currentHash.startsWith('#/live-projects');
  const isExperienceView = currentHash.startsWith('#/experience');
  const isRepositoriesView = currentHash.startsWith('#/repositories');
  const isContactView = currentHash.startsWith('#/contact');
  const isSubpage = isWorkView || isExperienceView || isRepositoriesView || isContactView;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div>
        {/* Floating Mobile Hamburger Header */}
        <MobileNavbar currentHash={currentHash} />

        <main className="relative z-10 w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                isWorkView ? `mwork-${currentHash}` :
                isExperienceView ? 'mexperience' :
                isRepositoriesView ? 'mrepositories' :
                isContactView ? 'mcontact' : 'mhome'
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {isWorkView && <MobileSelectedWorks view={currentHash === '#/live-projects' ? 'live' : 'featured'} />}
              {isExperienceView && <MobileArticles />}
              {isRepositoriesView && <MobileRepositoriesShowcase />}
              {isContactView && <MobileContactPage />}
              {!isSubpage && (
                <>
                  <MobileHero />
                  <MobileEcosystem />
                  <MobilePlacesMap />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Show footer on subpages or when scrolled */}
      {isSubpage && <MobileFooter />}
      {!isSubpage && <MobileFooter />} {/* Render everywhere on mobile for better portrait closure */}
    </div>
  );
}
