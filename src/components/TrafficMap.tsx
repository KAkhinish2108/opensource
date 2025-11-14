import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Navigation, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { useEffect, useRef, useState } from 'react';

export default function TrafficMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [showPanel, setShowPanel] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const trafficData = [
    { 
      location: 'Outer Ring Road - Silk Board', 
      status: 'Heavy', 
      delay: '25 mins', 
      severity: 'high',
      lat: 12.9165,
      lng: 77.6221,
      incidents: 2
    },
    { 
      location: 'MG Road - Trinity Junction', 
      status: 'Moderate', 
      delay: '12 mins', 
      severity: 'medium',
      lat: 12.9756,
      lng: 77.6063,
      incidents: 0
    },
    { 
      location: 'Hebbal Flyover', 
      status: 'Heavy', 
      delay: '18 mins', 
      severity: 'high',
      lat: 13.0358,
      lng: 77.5970,
      incidents: 1
    },
    { 
      location: 'Electronic City Flyover', 
      status: 'Light', 
      delay: '5 mins', 
      severity: 'low',
      lat: 12.8456,
      lng: 77.6603,
      incidents: 0
    },
    { 
      location: 'Marathahalli Bridge', 
      status: 'Moderate', 
      delay: '10 mins', 
      severity: 'medium',
      lat: 12.9591,
      lng: 77.6974,
      incidents: 0
    },
    { 
      location: 'Bannerghatta Road', 
      status: 'Heavy', 
      delay: '20 mins', 
      severity: 'high',
      lat: 12.8881,
      lng: 77.5970,
      incidents: 1
    }
  ];

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        // Load heatmap after Leaflet loads
        if (!document.getElementById('leaflet-heat-js')) {
          const heatScript = document.createElement('script');
          heatScript.id = 'leaflet-heat-js';
          heatScript.src = 'https://unpkg.com/leaflet.heat/dist/leaflet-heat.js';
          document.head.appendChild(heatScript);
        }
      };
      document.head.appendChild(script);
    }

    const initMap = () => {
      if (!window.L || !window.L.heatLayer || mapInstance.current || !mapRef.current) return;

      try {
        const lightTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        const map = window.L.map(mapRef.current).setView([12.9716, 77.5946], 12);
        const tileLayer = window.L.tileLayer(lightTiles, { maxZoom: 19 }).addTo(map);

        mapInstance.current = { map, tileLayer, layers: {} };

        // Add traffic markers and heatmap
        const markers = [];
        const heatPoints = [];

        trafficData.forEach(point => {
          const color = point.severity === 'high' ? '#ef4444' : 
                       point.severity === 'medium' ? '#eab308' : '#22c55e';
          
          const marker = window.L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            fillOpacity: 0.8
          }).addTo(map);

          marker.bindPopup(`
            <div style="font-family: Arial; min-width: 150px;">
              <strong>${point.location}</strong><br/>
              <span style="color: ${color};">Status: ${point.status}</span><br/>
              Delay: ${point.delay}<br/>
              ${point.incidents > 0 ? `Incidents: ${point.incidents}` : ''}
            </div>
          `);

          markers.push(marker);

          // Add to heatmap
          const intensity = point.severity === 'high' ? 1 : 
                           point.severity === 'medium' ? 0.6 : 0.3;
          heatPoints.push([point.lat, point.lng, intensity]);
        });

        // Create heatmap layer
        if (window.L.heatLayer) {
          const heatLayer = window.L.heatLayer(heatPoints, {
            radius: 25,
            blur: 30,
            maxZoom: 13,
            gradient: {
              0.0: '#22c55e',
              0.5: '#eab308',
              1.0: '#ef4444'
            }
          }).addTo(map);

          mapInstance.current.layers = { markers, heatLayer, tileLayer };
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Wait for Leaflet to load with timeout
    const timer = setTimeout(() => {
      if (window.L && window.L.heatLayer) {
        initMap();
      } else {
        const checkLeaflet = setInterval(() => {
          if (window.L && window.L.heatLayer) {
            clearInterval(checkLeaflet);
            initMap();
          }
        }, 100);
        
        // Stop checking after 10 seconds
        setTimeout(() => clearInterval(checkLeaflet), 10000);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstance.current?.map) {
        try {
          mapInstance.current.map.remove();
        } catch (error) {
          console.error('Error removing map:', error);
        }
        mapInstance.current = null;
      }
    };
  }, []);

  // Handle heatmap toggle
  useEffect(() => {
    if (mapInstance.current?.layers?.heatLayer && mapInstance.current?.map) {
      if (showHeatmap) {
        mapInstance.current.layers.heatLayer.addTo(mapInstance.current.map);
      } else {
        mapInstance.current.map.removeLayer(mapInstance.current.layers.heatLayer);
      }
    }
  }, [showHeatmap]);

  // Handle dark mode toggle
  useEffect(() => {
    if (mapInstance.current?.map) {
      const lightTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

      mapInstance.current.map.removeLayer(mapInstance.current.layers.tileLayer);
      const newTileLayer = window.L.tileLayer(darkMode ? darkTiles : lightTiles, { maxZoom: 19 });
      newTileLayer.addTo(mapInstance.current.map);
      mapInstance.current.layers.tileLayer = newTileLayer;
    }
  }, [darkMode]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Heavy': return 'bg-red-100 text-red-700 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Light': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Interactive Map */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Live Traffic Map
            </CardTitle>
            <CardDescription>Real-time traffic density across Bengaluru</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
              {/* Map Container */}
              <div ref={mapRef} className="w-full h-full" />

              {/* Control Panel */}
              {showPanel && (
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[1000] max-w-[260px]">
                  <button
                    onClick={() => setShowPanel(false)}
                    className="float-right bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    ×
                  </button>
                  <strong className="block mb-3 dark:text-white">Map Controls</strong>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={(e) => setShowHeatmap(e.target.checked)}
                      />
                      Show Heatmap
                    </label>
                    
                    <label className="flex items-center gap-2 text-sm dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                      Dark Mode Map
                    </label>
                  </div>
                </div>
              )}

              {/* Open Panel Button */}
              {!showPanel && (
                <button
                  onClick={() => setShowPanel(true)}
                  className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-[999]"
                >
                  Open Controls
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Details Sidebar */}
      <div className="space-y-6">
        {/* Current Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Speed</span>
              <span className="text-lg">24 km/h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Incidents</span>
              <span className="text-lg text-red-600">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Road Closures</span>
              <span className="text-lg">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Peak Hour</span>
              <span className="text-lg">Yes</span>
            </div>
          </CardContent>
        </Card>

        {/* Live Traffic Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Traffic Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.map((point, index) => (
                <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{point.location}</p>
                        <p className="text-xs text-gray-500">{point.lat}, {point.lng}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadge(point.status)} text-xs flex-shrink-0`}>
                      {point.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 ml-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {point.delay}
                    </div>
                    {point.incidents > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {point.incidents} incident{point.incidents > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Next Hour Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Expected traffic conditions in the next 60 minutes:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Traffic</span>
                <span className="text-orange-600">Increasing</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Best Route</span>
                <span className="text-green-600">Hosur Road</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Avoid</span>
                <span className="text-red-600">ORR South</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}