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
  { id: 'india', name: 'India Region', zoom: 2.8, center: [78.9629, 20.5937] },
  { id: 'se-asia', name: 'Southeast Asia', zoom: 3.5, center: [102.0, 4.0] },
];

// ISO Numeric Code to Country Name mapping for rich hover tooltips
const getCountryName = (id) => {
  const codes = {
    356: 'India',
    458: 'Malaysia',
    702: 'Singapore',
    840: 'United States',
    826: 'United Kingdom',
    124: 'Canada',
    36: 'Australia',
    276: 'Germany',
    250: 'France',
    392: 'Japan',
    156: 'China',
    643: 'Russia',
    76: 'Brazil',
    360: 'Indonesia',
    764: 'Thailand',
    704: 'Vietnam',
    608: 'Philippines',
    144: 'Sri Lanka',
    784: 'United Arab Emirates',
    756: 'Switzerland',
    380: 'Italy',
    724: 'Spain',
    528: 'Netherlands',
    710: 'South Africa',
    554: 'New Zealand',
    818: 'Egypt',
    682: 'Saudi Arabia',
    410: 'South Korea',
    792: 'Turkey',
    484: 'Mexico',
    32: 'Argentina',
  };
  return codes[id] || 'International Region';
};

export default function PlacesMap() {
  const [countries, setCountries] = useState([]);
  const [activePreset, setActivePreset] = useState('global');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showHelp, setShowHelp] = useState(true);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  // Widescreen Map canvas size (designed aspect ratio)
  const width = 1400;
  const height = 470;

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

  // Set up geographic projection (Natural Earth curved grid scaled up for widescreen)
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(230) // Scaled up to fill width
      .translate([width / 2, height / 2 + 30]);
  }, [width, height]);

  // Set default cinematic zoom and focus on page load
  useEffect(() => {
    const defaultFocus = [11.0, 15.0]; // Centered horizontally to show entire world map without clipping
    const defaultZoom = 1.0;
    const projCenter = projection(defaultFocus);
    if (projCenter) {
      setZoom(defaultZoom);
      setPan({
        x: width / 2 - projCenter[0] * defaultZoom,
        y: height / 2 - projCenter[1] * defaultZoom,
      });
    }
  }, [projection]);

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

  // Project Asia center coordinate for background atmospheric glow
  const asiaProjected = useMemo(() => {
    return projection([82.0, 16.0]);
  }, [projection]);

  // Helper to check if a country is active in the current region preset
  const isCountryActive = (countryId) => {
    const id = Number(countryId);
    if (activePreset === 'global') return true;
    if (activePreset === 'india') return id === 356;
    if (activePreset === 'se-asia') return id === 458 || id === 702;
    return true;
  };

  // Helper to check if a city is active in the current region preset
  const isCityActive = (city) => {
    if (activePreset === 'global') return true;
    if (activePreset === 'india') return city.country === 'India';
    if (activePreset === 'se-asia') return city.country === 'Singapore' || city.country === 'Malaysia';
    return true;
  };

  // Helper to check if a route is highlighted (connected to a hovered country)
  const isRouteHighlighted = (route) => {
    if (!hoveredCountry) return false;
    const countryName = getCountryName(hoveredCountry);
    const fromCity = CITIES.find((c) => c.name === route.from);
    const toCity = CITIES.find((c) => c.name === route.to);
    return (fromCity && fromCity.country === countryName) || (toCity && toCity.country === countryName);
  };

  // Helper to check if a city is highlighted (inside a hovered country)
  const isCityHighlighted = (city) => {
    if (!hoveredCountry) return false;
    return city.country === getCountryName(hoveredCountry);
  };

  // Preset camera changes
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

  // Zoom on wheel handler - only triggers if Ctrl or Cmd key is held down to prevent page scroll interception
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        // Let the page scroll normally
        return;
      }
      e.preventDefault();
      const zoomFactor = 1.15;
      const nextZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
      const clampedZoom = Math.max(1, Math.min(8, nextZoom));

      setZoom(clampedZoom);
      if (showHelp) setShowHelp(false);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [zoom, showHelp]);

  // Tactile HUD Button Zoom handlers
  const handleZoomIn = () => {
    const nextZoom = Math.min(8, zoom * 1.25);
    setZoom(nextZoom);
    if (showHelp) setShowHelp(false);
  };

  const handleZoomOut = () => {
    const nextZoom = Math.max(1, zoom / 1.25);
    setZoom(nextZoom);
    if (nextZoom === 1) {
      setPan({ x: 0, y: 0 }); // Reset drag pan when zoomed out
    }
    if (showHelp) setShowHelp(false);
  };

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

  // Helper to check if a route is active in the current region preset
  const isRouteActive = (route) => {
    const fromCity = CITIES.find((c) => c.name === route.from);
    const toCity = CITIES.find((c) => c.name === route.to);
    if (!fromCity || !toCity) return false;
    return isCityActive(fromCity) && isCityActive(toCity);
  };

  // Generate flight paths using Quadratic Bezier Curves for airline arcs
  const routePaths = useMemo(() => {
    return ROUTES.map((route, i) => {
      const from = getProjectedCity(route.from);
      const to = getProjectedCity(route.to);
      if (!from || !to || !from.point || !to.point) return null;

      const [x1, y1] = from.point;
      const [x2, y2] = to.point;

      // Midpoint
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;

      // Distance and offset for curvature
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      // Bend curve perpendicular to path direction
      const curvature = 0.16; // Elegant flight arc bend ratio
      const cx = mx - dy * curvature;
      const cy = my + dx * curvature;

      const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

      return {
        id: `r-${i}`,
        d,
        from: route.from,
        to: route.to,
      };
    }).filter(Boolean);
  }, [projectedCities]);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden content-visibility-auto">
      {/* Dynamic travel line glow and grid movements */}
      <style>{`
        @keyframes routeFlow {
          from { stroke-dashoffset: 128; }
          to   { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          animation: routeFlow 4.5s linear infinite;
        }
        @keyframes gridDrift {
          from { background-position: 0px 0px; }
          to   { background-position: 16px 16px; }
        }
        .animate-grid-drift {
          animation: gridDrift 24s linear infinite;
        }
      `}</style>

      {/* Layered ambient backdrop glow - soft orange atmospheric glow */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vh] rounded-full bg-gradient-to-b from-orange-500/5 via-transparent to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Title */}
        <div className="mb-10 relative">
          <div className="relative">
            {/* Subtle glow behind title */}
            <div className="absolute -top-8 -left-8 w-48 h-20 bg-orange-500/10 rounded-full blur-3xl pointer-events-none z-0" />
            
            <p className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 animate-pulse" />
              Travel Logs
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-[0.03em] uppercase relative z-10">
              Places I've Been
            </h2>
            
            {/* Tiny orange accent line */}
            <div className="h-[2px] w-14 bg-gradient-to-r from-orange-500 to-transparent mt-3.5 rounded-full" />
          </div>
        </div>

        {/* Widescreen Cinematic Map Card container (Stretched to 1400px widescreen layout) */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[470px] border border-white/5 rounded-[32px] overflow-hidden cursor-grab active:cursor-grabbing select-none animate-fade-in"
          style={{
            background: 'radial-gradient(circle at center, #090a18 0%, #030307 100%)',
            boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.95), 0 25px 60px -15px rgba(0, 0, 0, 0.95)',
          }}
        >
          {/* Noise / grain overlay for film-grade luxury depth */}
          <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none mix-blend-overlay z-10" />

          {/* Subtle Grid dots overlay inside card - now drifting continuously */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.3] animate-grid-drift"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* D3 World Map Projection */}
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
            style={{ pointerEvents: 'none', willChange: 'transform' }}
          >
            <defs>
              {/* Subtle Asia regional glow definition */}
              <radialGradient id="asiaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff7a3d" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Camera Motion System - pivot locked at top-left for math accuracy, transitions slowed down for drone-pan feel */}
            <motion.g
              animate={{
                scale: zoom,
                x: pan.x,
                y: pan.y,
              }}
              transition={{ 
                type: 'spring', 
                damping: 32, 
                stiffness: 65, 
                mass: 1.2 
              }}
              style={{ transformOrigin: '0px 0px', willChange: 'transform' }}
            >
              {/* Subtle Asia regional breathing glow (pans and zooms with map elements) */}
              {asiaProjected && (
                <motion.circle
                  cx={asiaProjected[0]}
                  cy={asiaProjected[1]}
                  r={220}
                  fill="url(#asiaGlow)"
                  pointerEvents="none"
                  animate={{
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Graticule Curved Grid */}
              <path
                d={graticulesData.lines}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={0.5}
                strokeDasharray="1 5"
              />
              <path
                d={graticulesData.outline}
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth={0.6}
              />

              {/* Country Shapes - detailed vector styling with smooth hover fill transitions */}
              {countries.map((feature) => {
                const id = Number(feature.id);
                const isVisited = id === 356 || id === 458 || id === 702;
                const isActive = isCountryActive(feature.id);
                const isHovered = hoveredCountry === feature.id;

                let fill = isVisited ? 'rgba(255, 122, 61, 0.08)' : 'rgba(255, 255, 255, 0.04)';
                let stroke = isVisited ? 'rgba(255, 122, 61, 0.42)' : 'rgba(255, 255, 255, 0.15)';
                let strokeWidth = isVisited ? 0.95 : 0.55;

                if (isHovered) {
                  fill = isVisited ? 'rgba(255, 122, 61, 0.18)' : 'rgba(255, 255, 255, 0.09)';
                  stroke = isVisited ? 'rgba(255, 122, 61, 0.75)' : 'rgba(255, 255, 255, 0.35)';
                  strokeWidth = isVisited ? 1.25 : 0.85;
                }

                return (
                  <path
                    key={feature.id}
                    d={pathGenerator(feature)}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    className="cursor-pointer"
                    style={{
                      pointerEvents: 'auto',
                      opacity: isActive ? 1 : 0.22,
                      transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), fill 0.35s cubic-bezier(0.25, 1, 0.5, 1), stroke 0.35s cubic-bezier(0.25, 1, 0.5, 1), stroke-width 0.35s',
                    }}
                    onMouseEnter={() => setHoveredCountry(feature.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                );
              })}

              {/* Curved Connection Lines - brightens connected paths dynamically when hovered */}
              {routePaths.map((route) => {
                const isHoverActive =
                  hoveredCity && (route.from === hoveredCity || route.to === hoveredCity);
                const isCountryHoverActive = isRouteHighlighted(route);
                const isBright = isHoverActive || isCountryHoverActive;
                const isPresetActive = isRouteActive(route);

                return (
                  <g 
                    key={route.id}
                    style={{
                      opacity: isPresetActive ? 1 : 0.12,
                      transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Background travel trace underlay */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke={isBright ? 'rgba(255, 122, 61, 0.7)' : 'rgba(255, 122, 61, 0.18)'}
                      strokeWidth={isBright ? 1.3 : 0.6}
                      className="transition-all duration-300"
                    />
                    
                    {/* Glowing flow particle path (Comet overlay with bloom bloom effect) */}
                    <path
                      d={route.d}
                      fill="none"
                      stroke="#ff8f52"
                      strokeWidth={isBright ? 1.5 : 0.8}
                      strokeDasharray="8 120"
                      strokeLinecap="round"
                      className="animate-route-flow opacity-95"
                      style={{
                        filter: isBright ? 'drop-shadow(0 0 4.5px rgba(255, 122, 61, 0.95))' : 'drop-shadow(0 0 3px rgba(255, 122, 61, 0.85))',
                        transition: 'stroke-width 0.3s, filter 0.3s',
                      }}
                    />
                  </g>
                );
              })}

              {/* Pulsing Travel Node Markers with white core hotspots (lights up and pulses when country is hovered) */}
              {projectedCities.map((city) => {
                if (!city.point) return null;
                const [cx, cy] = city.point;
                const isHovered = hoveredCity === city.name;
                const isCountryHovered = isCityHighlighted(city);
                const isGlowActive = isHovered || isCountryHovered;
                const isPresetActive = isCityActive(city);

                return (
                  <g
                    key={city.name}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer"
                    style={{ 
                      pointerEvents: 'auto',
                      opacity: isPresetActive ? 1 : 0.12,
                      transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={() => setHoveredCity(city.name)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {/* Static luxury GPS target ring */}
                    {isPresetActive && (
                      <circle
                        r={isGlowActive ? 6.5 : 4.2}
                        fill="none"
                        stroke={isGlowActive ? 'rgba(255, 122, 61, 0.5)' : 'rgba(255, 122, 61, 0.3)'}
                        strokeWidth={0.5}
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Pulsing Outer Range circle */}
                    {isPresetActive && (
                      <motion.circle
                        r={isGlowActive ? 6.5 : 3.8}
                        stroke="#ff7a3d"
                        strokeWidth={0.5}
                        fill="rgba(255, 122, 61, 0.02)"
                        animate={{
                          scale: isGlowActive ? [1, 2.0] : [1, 1.8],
                          opacity: isGlowActive ? [0.7, 0] : [0.55, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isGlowActive ? 1.8 : 2.4,
                          ease: 'easeOut',
                          delay: Math.random() * 2,
                        }}
                      />
                    )}

                    {/* Glowing Core center pin - Layer 1: Orange glow boundary */}
                    <circle
                      r={isGlowActive ? 3.2 : 1.8}
                      fill="#ff7a3d"
                      style={{ filter: isGlowActive ? 'drop-shadow(0 0 5.5px rgba(255, 122, 61, 0.95))' : 'drop-shadow(0 0 4px rgba(255, 122, 61, 0.85))' }}
                      className="transition-all duration-300"
                    />

                    {/* Glowing Core center pin - Layer 2: White hotspot core (Apple Maps style) */}
                    {isPresetActive && (
                      <circle
                        r={isGlowActive ? 1.6 : 0.9}
                        fill="#ffffff"
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </motion.g>
          </svg>

          {/* Hover Country / City Tooltip Overlays (Smoothly transitions between states) */}
          <AnimatePresence mode="wait">
            {hoveredCity ? (
              <motion.div
                key="city-tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-6 left-6 p-4 rounded-2xl bg-[#030307]/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-1 min-w-[160px] z-20"
              >
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-semibold">Location Log</span>
                <span className="text-sm font-semibold text-white tracking-wide">{hoveredCity}</span>
                <span className="text-[10px] font-mono text-orange-400 font-semibold">
                  {CITIES.find((c) => c.name === hoveredCity)?.country}
                </span>
              </motion.div>
            ) : (hoveredCountry === 356 || hoveredCountry === 458 || hoveredCountry === 702) ? (
              <motion.div
                key="country-tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute top-6 left-6 p-5 rounded-2xl bg-[#030307]/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-3 min-w-[210px] z-20"
              >
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-semibold">Travel Intelligence</span>
                  <h3 className="text-base font-bold text-white tracking-wide mt-0.5">{getCountryName(hoveredCountry)}</h3>
                </div>
                
                <div className="h-px w-full bg-white/5" />
                
                <div className="flex flex-col gap-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-mono">STATUS</span>
                    <span className={`font-mono font-bold text-[10px] ${
                      hoveredCountry === 356 || hoveredCountry === 458 || hoveredCountry === 702
                        ? 'text-orange-400'
                        : 'text-zinc-500'
                    }`}>
                      {hoveredCountry === 356 || hoveredCountry === 458 || hoveredCountry === 702 ? '✦ VISITED' : '✧ EXPLORING SOON'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-mono">REGION</span>
                    <span className="text-zinc-300 font-mono font-semibold">
                      {getCountryName(hoveredCountry) === 'India' ? 'South Asia' : 
                       (hoveredCountry === 458 || hoveredCountry === 702 ? 'Southeast Asia' : 'Global')}
                    </span>
                  </div>
                </div>

                {(hoveredCountry === 356 || hoveredCountry === 458 || hoveredCountry === 702) && (
                  <>
                    <div className="h-px w-full bg-white/5" />
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block mb-1.5 font-semibold">Visited Cities</span>
                      <div className="flex flex-col gap-1">
                        {CITIES.filter((c) => c.country === getCountryName(hoveredCountry)).map((city) => (
                          <div key={city.name} className="flex items-center gap-2 text-xs text-zinc-200">
                            <span className="w-1 h-1 rounded-full bg-orange-400" />
                            <span>{city.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Bottom Center Help Text Overlay */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 border border-white/5 rounded-full shadow-lg backdrop-blur-md pointer-events-none z-20"
              >
                <p className="text-[10px] md:text-xs font-mono tracking-wider text-zinc-400 font-semibold">
                  Drag to pan • Ctrl + Scroll to zoom
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD Zoom Buttons (bottom-left) */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 z-20">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-zinc-400 hover:text-white transition-all backdrop-blur-md cursor-pointer hover:bg-orange-500/10 active:scale-95"
              title="Zoom In"
            >
              <span className="text-base font-semibold leading-none">+</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-zinc-400 hover:text-white transition-all backdrop-blur-md cursor-pointer hover:bg-orange-500/10 active:scale-95"
              title="Zoom Out"
            >
              <span className="text-base font-semibold leading-none">−</span>
            </button>
          </div>

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
