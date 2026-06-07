import { useState, useEffect, useMemo } from 'react';
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
  { id: 'india', name: 'India Region', zoom: 2.2, center: [78.9629, 20.5937] },
];

const getCountryName = (id) => {
  const codes = {
    356: 'India',
    458: 'Malaysia',
    702: 'Singapore',
  };
  return codes[id] || 'International Region';
};

export default function MobilePlacesMap() {
  const [countries, setCountries] = useState([]);
  const [activePreset, setActivePreset] = useState('global');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Mobile Map canvas dimensions
  const width = 800;
  const height = 500;

  // Load world countries TopoJSON
  useEffect(() => {
    fetch('/world-110m.json')
      .then((res) => res.json())
      .then((data) => {
        const geojson = feature(data, data.objects.countries);
        setCountries(geojson.features);
      })
      .catch((err) => console.error('Failed loading world map data:', err));
  }, []);

  // Set up geographic projection scaled down for Mobile viewports
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(125) // Scaled down to fit mobile width cleanly
      .translate([width / 2, height / 2 + 30]);
  }, [width, height]);

  // Set default centering
  useEffect(() => {
    const defaultFocus = [11.0, 15.0];
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

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  const graticulesData = useMemo(() => {
    const graticule = geoGraticule();
    return {
      lines: pathGenerator(graticule()),
      outline: pathGenerator(graticule.outline()),
    };
  }, [pathGenerator]);

  const asiaProjected = useMemo(() => {
    return projection([82.0, 16.0]);
  }, [projection]);

  const isCountryActive = (countryId) => {
    const id = Number(countryId);
    if (activePreset === 'global') return true;
    if (activePreset === 'india') return id === 356;
    return true;
  };

  const isCityActive = (city) => {
    if (activePreset === 'global') return true;
    if (activePreset === 'india') return city.country === 'India';
    return true;
  };

  const isRouteActive = (route) => {
    const fromCity = CITIES.find((c) => c.name === route.from);
    const toCity = CITIES.find((c) => c.name === route.to);
    if (!fromCity || !toCity) return false;
    return isCityActive(fromCity) && isCityActive(toCity);
  };

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
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(6, z * 1.3));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const nextZ = Math.max(1, z / 1.3);
      if (nextZ === 1) setPan({ x: 0, y: 0 });
      return nextZ;
    });
  };

  const projectedCities = useMemo(() => {
    return CITIES.map((city) => {
      const point = projection(city.coords);
      return { ...city, point };
    });
  }, [projection]);

  const getProjectedCity = (name) => {
    return projectedCities.find((c) => c.name === name);
  };

  const routePaths = useMemo(() => {
    return ROUTES.map((route, i) => {
      const from = getProjectedCity(route.from);
      const to = getProjectedCity(route.to);
      if (!from || !to || !from.point || !to.point) return null;

      const [x1, y1] = from.point;
      const [x2, y2] = to.point;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      const curvature = 0.16;
      const cx = mx - dy * curvature;
      const cy = my + dx * curvature;

      return {
        id: `mr-${i}`,
        d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
        from: route.from,
        to: route.to,
      };
    }).filter(Boolean);
  }, [projectedCities]);

  return (
    <section className="w-full px-4 py-8 relative select-none">
      
      {/* Travel Title header */}
      <div className="mb-6 text-left">
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 animate-pulse" />
          Travel Logs
        </p>
        <h2 className="font-display font-semibold text-2xl text-white tracking-wide uppercase">
          Places I've Been
        </h2>
        <div className="h-[2px] w-10 bg-gradient-to-r from-orange-500 to-transparent mt-2 rounded-full" />
      </div>

      {/* Map Box (No pan-drag listener here to avoid scroll lock hijacking on mobile) */}
      <div
        className="relative w-full h-[320px] border border-white/5 rounded-3xl overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, #090a18 0%, #030307 100%)',
          boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.9), 0 10px 30px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Subtle noise and drifting grid */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none mix-blend-overlay z-10" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.2] animate-grid-drift"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />

        {/* Map SVG Canvas */}
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} style={{ pointerEvents: 'none' }}>
          <defs>
            <radialGradient id="mobileAsiaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7a3d" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.g
            animate={{
              scale: zoom,
              x: pan.x,
              y: pan.y,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 60 }}
            style={{ transformOrigin: '0px 0px' }}
          >
            {/* Ambient orange regional glow */}
            {asiaProjected && (
              <circle
                cx={asiaProjected[0]}
                cy={asiaProjected[1]}
                r={140}
                fill="url(#mobileAsiaGlow)"
                pointerEvents="none"
              />
            )}

            {/* Grid graticules */}
            <path
              d={graticulesData.lines}
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={0.5}
              strokeDasharray="1 4"
            />

            {/* Countries detailed paths */}
            {countries.map((feature) => {
              const id = Number(feature.id);
              const isVisited = id === 356 || id === 458 || id === 702;
              const isActive = isCountryActive(feature.id);

              const fill = isVisited ? 'rgba(255, 122, 61, 0.08)' : 'rgba(255, 255, 255, 0.03)';
              const stroke = isVisited ? 'rgba(255, 122, 61, 0.35)' : 'rgba(255, 255, 255, 0.1)';
              const strokeWidth = isVisited ? 0.8 : 0.45;

              return (
                <path
                  key={feature.id}
                  d={pathGenerator(feature)}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  style={{
                    opacity: isActive ? 1 : 0.2,
                  }}
                />
              );
            })}

            {/* Connection Arcs */}
            {routePaths.map((route) => {
              const isPresetActive = isRouteActive(route);
              return (
                <g key={route.id} style={{ opacity: isPresetActive ? 1 : 0.1 }}>
                  <path
                    d={route.d}
                    fill="none"
                    stroke="rgba(255, 122, 61, 0.15)"
                    strokeWidth={0.5}
                  />
                  <path
                    d={route.d}
                    fill="none"
                    stroke="#ff8f52"
                    strokeWidth={0.8}
                    strokeDasharray="5 60"
                    strokeLinecap="round"
                    className="animate-route-flow opacity-90"
                    style={{
                      filter: 'drop-shadow(0 0 3px rgba(255, 122, 61, 0.75))',
                    }}
                  />
                </g>
              );
            })}

            {/* Visited Cities Pins */}
            {projectedCities.map((city) => {
              if (!city.point) return null;
              const [cx, cy] = city.point;
              const isPresetActive = isCityActive(city);

              return (
                <g
                  key={city.name}
                  transform={`translate(${cx}, ${cy})`}
                  style={{ opacity: isPresetActive ? 1 : 0.1 }}
                >
                  <circle
                    r={3}
                    stroke="#ff7a3d"
                    strokeWidth={0.5}
                    fill="rgba(255, 122, 61, 0.02)"
                  />
                  <circle
                    r={1.2}
                    fill="#ff7a3d"
                    style={{ filter: 'drop-shadow(0 0 3px rgba(255, 122, 61, 0.8))' }}
                  />
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* Dynamic Preset Toggle HUD overlay (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePresetChange(p)}
              className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono tracking-wider font-semibold transition-all cursor-pointer backdrop-blur-md ${
                activePreset === p.id
                  ? 'bg-orange-500/10 border-orange-500/40 text-orange-400'
                  : 'bg-black/40 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Zoom Controls HUD Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-20">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-zinc-350 hover:text-white transition-all backdrop-blur-md active:scale-90 cursor-pointer"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-zinc-350 hover:text-white transition-all backdrop-blur-md active:scale-90 cursor-pointer"
          >
            −
          </button>
        </div>

        {/* Static HUD Help Text Overlay */}
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50 z-20">
          <span className="text-[9px] font-mono text-zinc-400">Coimbatore • Singapore • KL</span>
        </div>
      </div>
    </section>
  );
}
