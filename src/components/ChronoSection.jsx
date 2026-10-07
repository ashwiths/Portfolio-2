import { useEffect } from 'react';
import '../styles/chrono.css';
import { initChrono } from '../scene3/boot3.js';

export default function ChronoSection() {
  useEffect(() => {
    let cleanupFn = null;
    let isMounted = true;

    initChrono().then((res) => {
      if (res && isMounted) {
        cleanupFn = res.destroy;
      } else if (res && !isMounted) {
        res.destroy();
      }
    });

    return () => {
      isMounted = false;
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, []);

  return (
    <section className="chrono" id="chrono" aria-labelledby="chronoTitle">
      <div className="chrono__pin">
        <canvas id="chronoStage" aria-hidden="true" />

        <h2 className="chrono__title" id="chronoTitle">
          <span>A</span>
          <span>Journey</span>
          <span>Through</span>
          <span>Time</span>
        </h2>

        <p className="chrono__rail" aria-hidden="true">
          <i />
          <span>Ideas</span>
          <span>Experiences</span>
          <span>People</span>
          <span>Projects</span>
          <span>Me</span>
          <i />
        </p>

        <p className="chrono__hint" aria-hidden="true">
          Move<br />to travel<br />through time<i />
        </p>

        <p className="chrono__note chrono__note--bl" aria-hidden="true">
          Same<br />curiosity<br />a brighter<br />tomorrow
        </p>

        <p className="chrono__note chrono__note--br" aria-hidden="true">
          Still<br />designing<br />what's<br />next<i />
        </p>

        <div className="chrono__deck" id="chronoDeck" />

        <canvas id="chronoFront" aria-hidden="true" />
      </div>
    </section>
  );
}
