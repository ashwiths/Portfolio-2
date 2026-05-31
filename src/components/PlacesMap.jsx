import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feature } from 'topojson-client';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo';

// Travel coordinates [Longitude, Latitude]
const CITIES = [
  { name: 'Coimbatore', coords: [76.9558, 11.0168], country: 'India' },
  { name: 'Chennai', coords: [80.2707, 13.0827], country: 'India' },
  { name: 'Bangalore', coords: [77.5946, 12.9716], country: 'India' },
  { name: 'Hyderabad', coords: [78.4867, 17.3850], country: 'India' },
  { name: 'Kolkata', coords: [88.3639, 22.5726], country: 'India' },
  { name: 'Delhi', coords: [77.2090, 28.6139], country: 'India' },
  { name: 'Singapore', coords: [103.8198, 1.3521], country: 'Singapore' },
  { name: 'Kuala Lumpur', coords: [101.6869, 3.1390], country: 'Malaysia' },
];

// Flight arcs
const ROUTES = [
  { from: 'Coimbatore', to: 'Chennai' },
  { from: 'Chennai', to: 'Bangalore' },
  { from: 'Bangalore', to: 'Hyderabad' },
  { from: 'Hyderabad', to: 'Delhi' },
  { from: 'Delhi', to: 'Kolkata' },
  { from: 'Chennai', to: 'Singapore' },
  { from: 'Singapore', to: 'Kuala Lumpur' },
  { from: 'Delhi', to: 'Singapore' },
];

const PRESETS = [
  { id: 'global', name: 'Global Overview', zoom: 1, center: null },
  { id: 'india', name: 'India Region', zoom: 3.2, center: [78.9629, 20.5937] },
  { id: 'se-asia', name: 'Southeast Asia', zoom: 4.0, center: [102.0, 4.0] },
];

export default function PlacesMap() {
  const [countries, setCountries] = useState([]);
  const [activePreset, setActivePreset] = useState('global');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showHelp, setShowHelp] = useState(true);
  const [hoveredCity, setHoveredCity] = useState(null);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  // Map canvas size (designed aspect ratio)
  const width = 1000;
  const height = 520;

  // Load countries TopoJSON from local folder
  useEffect(() => {
    fetch('/world-110m.json')
      .then((res) => res.json())
      .then((data) => {
        const geojson = feature(data, data.objects.countries);
        setCountries(geojson.features);
      })
      .catch((err) => console.error('Failed loading world map data:', err));
  }, []);

  // Set up geographic projection (Natural Earth curved grid)
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(165)
      .translate([width / 2, height / 2 + 10]);
  }, [width, height]);

  // SVG path generator bound to our projection
  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // World grid (graticules) generator
  const graticulesData = useMemo(() => {
    const graticule = geoGraticule();
    return {
      lines: pathGenerator(graticule()),
      outline: pathGenerator(graticule.outline()),
    };
  }, [pathGenerator]);

  // Center/Zoom Preset Trigger
  const handlePresetChange = (preset) => {
    setActivePreset(preset.id);
    if (preset.center) {
      const projCenter = projection(preset.center);
      if (projCenter) {
        setZoom(preset.zoom);
        setPan({
          x: width / 2 - projCenter[0] * preset.zoom,
          y: height / 2 - projCenter[1] * preset.zoom,
        });
      }
    } else {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    if (showHelp) setShowHelp(false);
  };

  // Dragging interaction handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { x: pan.x, y: pan.y };
    if (showHelp) setShowHelp(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Zoom on wheel handler (attaches directly with passive option in DOM ref)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 1.15;
      const nextZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
      const clampedZoom = Math.max(1, Math.min(8, nextZoom));

      // Adjust panning relative to zoom anchor point (center of viewport)
      setZoom(clampedZoom);
      if (showHelp) setShowHelp(false);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [zoom, showHelp]);

  // Plot coordinates of cities to projected SVG points
  const projectedCities = useMemo(() => {
    return CITIES.map((city) => {
      const point = projection(city.coords);
      return { ...city, point };
    });
  }, [projection]);

  // Helper to find projected coordinates by city name
  const getProjectedCity = (name) => {
    return projectedCities.find((c) => c.name === name);
  };

  // Generate flight paths
  const routePaths = useMemo(() => {
    return ROUTES.map((route, i) => {
      const from = getProjectedCity(route.from);
      const to = getProjectedCity(route.to);
      if (!from || !to) return null;

      // Using great circle LineString GeoJSON so D3 handles curved projections naturally
      const geojsonLine = {
        type: 'LineString',
        coordinates: [CITIES.find((c) => c.name === route.from).coords, CITIES.find((c) => c.name === route.to).coords],
      };

      return {
        id: `r-${i}`,
        d: pathGenerator(geojsonLine),
        from: route.from,
        to: route.to,
      };
    }).filter(Boolean);
  }, [projectedCities, pathGenerator]);

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Dynamic travel line glow animation */}
      <style>{`
        @keyframes routeFlow {
          from { stroke-dashoffset: 50; }
          to   { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          animation: routeFlow 2.8s linear infinite;
        }
      `}</style>

      {/* Layered ambient backdrop glow */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vh] rounded-full bg-gradient-to-b from-orange-600/5 via-violet-500/3 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] md:text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase mb-3">
              ✦ Travel Logs
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white/90 uppercase tracking-[0.05em]">
              Places I've Been
            </h2>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/5 rounded-xl backdrop-blur-md self-start md:self-end">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-300 ${
                  activePreset === preset.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Frosted Card */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[520px] bg-[#050505]/45 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Grid dots overlay inside card */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* D3 World Map Projection */}
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
            style={{ pointerEvents: 'none' }}
          >
            {/* Camera Motion System */}
            <motion.g
              animate={{
                scale: zoom,
                x: pan.x,
                y: pan.y,
              }}
              transition={{ type: 'spring', damping: 28, stiffness: 85 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Graticule Curved Grid */}
              <path
                d={graticulesData.lines}
                fill="none"
                stroke="rgba(255, 255, 255, 0.02)"
                strokeWidth={0.7}
                strokeDasharray="2 4"
              />
              <path
                d={graticulesData.outline}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={0.8}
              />

              {/* Country Shapes */}
              {countries.map((feature) => {
                const id = Number(feature.id);
                // India (356), Malaysia (458), Singapore (702)
                const isVisited = id === 356 || id === 458 || id === 702;

                return (
                  <path
                    key={feature.id}
                    d={pathGenerator(feature)}
                    fill={isVisited ? 'rgba(255, 122, 61, 0.07)' : 'rgba(255, 255, 255, 0.02)'}
                    stroke={isVisited ? 'rgba(255, 122, 61, 0.15)' : 'rgba(255, 255, 255, 0.04)'}
                    strokeWidth={0.6}
                    className="transition-colors duration-500"
                  />
                );
              })}

              {/* Curved Connection Lines */}
              {routePaths.map((route) => {
                const isActive =
                  hoveredCity && (route.from === hoveredCity || route.to === hoveredCity);
                return (
                  <g key={route.id}>
                    {/* Background travel trace underlay */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke={isActive ? 'rgba(255, 122, 61, 0.45)' : 'rgba(255, 122, 61, 0.14)'}
                      strokeWidth={isActive ? 1.5 : 1}
                      transition="stroke-width 0.3s ease"
                    />
                    {/* Animated running pulse dot overlay */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke="#ff7a3d"
                      strokeWidth={isActive ? 2 : 1.3}
                      strokeDasharray="6 24"
                      strokeLinecap="round"
                      className="animate-route-flow opacity-75"
                    />
                  </g>
                );
              })}

              {/* Pulsing Travel Node Markers */}
              {projectedCities.map((city) => {
                if (!city.point) return null;
                const [cx, cy] = city.point;
                const isHovered = hoveredCity === city.name;

                return (
                  <g
                    key={city.name}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    onMouseEnter={() => setHoveredCity(city.name)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {/* Pulsing Outer Range circle */}
                    <motion.circle
                      r={isHovered ? 15 : 9}
                      stroke="#ff7a3d"
                      strokeWidth={0.8}
                      fill="rgba(255, 122, 61, 0.06)"
                      animate={{
                        scale: [1, 2.3],
                        opacity: [0.65, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.0,
                        ease: 'easeOut',
                        delay: Math.random() * 2,
                      }}
                    />

                    {/* Glowing Core center pin */}
                    <circle
                      r={isHovered ? 4.5 : 3}
                      fill="#ff7a3d"
                      className="shadow-lg transition-transform duration-300 ease-out"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(255, 122, 61, 0.75))' }}
                    />
                  </g>
                );
              })}
            </motion.g>
          </svg>

          {/* Hover City Tooltip Overlay */}
          <AnimatePresence>
            {hoveredCity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute top-6 left-6 p-4 rounded-2xl bg-[#09090b]/85 border border-white/10 shadow-2xl backdrop-blur-lg flex flex-col gap-1 min-w-[150px]"
              >
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Location Log</span>
                <span className="text-sm font-semibold text-white tracking-wide">{hoveredCity}</span>
                <span className="text-[10px] font-mono text-orange-400">
                  {CITIES.find((c) => c.name === hoveredCity)?.country}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Center Help Text Overlay */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 border border-white/5 rounded-full shadow-lg backdrop-blur-md pointer-events-none"
              >
                <p className="text-[10px] md:text-xs font-mono tracking-wider text-zinc-400">
                  Drag to pan, scroll to zoom
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Right Handwritten Label */}
          <div className="absolute bottom-6 right-8 opacity-40 select-none pointer-events-none">
            <span
              className="text-sm md:text-base text-zinc-200 tracking-wider font-serif italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              places I've been
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
