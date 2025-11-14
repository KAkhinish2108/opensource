import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Wind, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useRef, useState } from 'react';
import AQILineChart from './AQILineChart';

export default function AirQualityMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [showPanel, setShowPanel] = useState(true);
  const [showAQI, setShowAQI] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [aqiData, setAqiData] = useState(null);
  const [cityAQI, setCityAQI] = useState(87);

  // Fetch AQI data for Bengaluru
  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=12.9716&lon=77.5946&appid=85825b41e4d2bbe49b60bd39e7e4e8c2`
        );
        const data = await response.json();
        setAqiData(data);
        if (data.list && data.list[0]) {
          // Convert AQI index to US standard (1-5 to 0-500)
          const aqiIndex = data.list[0].main.aqi;
          const aqiValue = aqiIndex * 50; // Approximate conversion
          setCityAQI(aqiValue);
        }
      } catch (error) {
        console.error('Error fetching AQI data:', error);
      }
    };

    fetchAQI();
    // Refresh every 30 minutes
    const aqiInterval = setInterval(fetchAQI, 1800000);
    return () => clearInterval(aqiInterval);
  }, []);

  const aqiZones = [
    { name: 'Whitefield', aqi: 105, level: 'Unhealthy for Sensitive Groups', pm25: 45, pm10: 95, color: 'orange', lat: 12.9698, lng: 77.7500 },
    { name: 'Koramangala', aqi: 78, level: 'Moderate', pm25: 32, pm10: 68, color: 'yellow', lat: 12.9352, lng: 77.6245 },
    { name: 'Indiranagar', aqi: 92, level: 'Moderate', pm25: 38, pm10: 82, color: 'yellow', lat: 12.9716, lng: 77.6412 },
    { name: 'Electronic City', aqi: 118, level: 'Unhealthy for Sensitive Groups', pm25: 52, pm10: 108, color: 'orange', lat: 12.8456, lng: 77.6603 },
    { name: 'Jayanagar', aqi: 65, level: 'Moderate', pm25: 25, pm10: 58, color: 'yellow', lat: 12.9250, lng: 77.5838 },
    { name: 'Malleshwaram', aqi: 72, level: 'Moderate', pm25: 28, pm10: 64, color: 'yellow', lat: 13.0039, lng: 77.5712 },
    { name: 'HSR Layout', aqi: 88, level: 'Moderate', pm25: 36, pm10: 78, color: 'yellow', lat: 12.9082, lng: 77.6476 },
    { name: 'Hebbal', aqi: 95, level: 'Moderate', pm25: 40, pm10: 85, color: 'yellow', lat: 13.0358, lng: 77.5970 }
  ];

  const pollutants = [
    { name: 'PM2.5', value: 38, unit: 'µg/m³', status: 'Moderate', trend: 'up' },
    { name: 'PM10', value: 82, unit: 'µg/m³', status: 'Moderate', trend: 'down' },
    { name: 'NO₂', value: 42, unit: 'ppb', status: 'Good', trend: 'down' },
    { name: 'O₃', value: 28, unit: 'ppb', status: 'Good', trend: 'up' },
    { name: 'SO₂', value: 12, unit: 'ppb', status: 'Good', trend: 'down' },
    { name: 'CO', value: 0.6, unit: 'ppm', status: 'Good', trend: 'down' }
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

        // Add AQI markers and heatmap
        const markers = [];
        const heatPoints = [];

        aqiZones.forEach(zone => {
          const getColor = (aqi) => {
            if (aqi <= 50) return '#22c55e';
            if (aqi <= 100) return '#eab308';
            if (aqi <= 150) return '#f97316';
            if (aqi <= 200) return '#ef4444';
            return '#a855f7';
          };

          const color = getColor(zone.aqi);
          
          const marker = window.L.circleMarker([zone.lat, zone.lng], {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            fillOpacity: 0.8
          }).addTo(map);

          marker.bindPopup(`
            <div style="font-family: Arial; min-width: 180px;">
              <strong>${zone.name}</strong><br/>
              <span style="color: ${color}; font-size: 20px; font-weight: bold;">AQI: ${zone.aqi}</span><br/>
              <span style="color: ${color};">${zone.level}</span><br/>
              <div style="margin-top: 8px; font-size: 12px;">
                PM2.5: ${zone.pm25} µg/m³<br/>
                PM10: ${zone.pm10} µg/m³
              </div>
            </div>
          `);

          markers.push(marker);

          // Add to heatmap (normalize AQI to 0-1)
          const intensity = Math.min(zone.aqi / 150, 1);
          heatPoints.push([zone.lat, zone.lng, intensity]);
        });

        // Create heatmap layer
        if (window.L.heatLayer) {
          const heatLayer = window.L.heatLayer(heatPoints, {
            radius: 30,
            blur: 35,
            maxZoom: 13,
            gradient: {
              0.0: '#22c55e',
              0.33: '#eab308',
              0.66: '#f97316',
              1.0: '#ef4444'
            }
          }).addTo(map);

          mapInstance.current.layers = { markers, heatLayer, tileLayer };
        }
      } catch (error) {
        console.error('Error initializing AQI map:', error);
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

  // Handle AQI markers toggle
  useEffect(() => {
    if (mapInstance.current?.layers?.markers && mapInstance.current?.map) {
      mapInstance.current.layers.markers.forEach(marker => {
        if (showAQI) {
          marker.addTo(mapInstance.current.map);
        } else {
          mapInstance.current.map.removeLayer(marker);
        }
      });
    }
  }, [showAQI]);

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

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    return 'bg-purple-500';
  };

  const getAQITextColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    return 'text-purple-600';
  };

  return (
    <div className="space-y-6">
      {/* Main AQI Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5" />
                Air Quality Index - Bengaluru
              </CardTitle>
              <CardDescription>Real-time air quality monitoring across city zones</CardDescription>
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
                          checked={showAQI}
                          onChange={(e) => setShowAQI(e.target.checked)}
                        />
                        Show AQI Markers
                      </label>
                      
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

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-[1000]">
                  <p className="text-xs mb-2 dark:text-white">AQI Scale</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="dark:text-gray-300">0-50 Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="dark:text-gray-300">51-100 Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span className="dark:text-gray-300">101-150 Unhealthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="dark:text-gray-300">151+ Very Unhealthy</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AQI Details Sidebar */}
        <div className="space-y-6">
          {/* Current AQI Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">City Average AQI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-5xl text-yellow-600">{cityAQI}</div>
                <p className="text-sm text-gray-600">Moderate</p>
                <Progress value={58} className="h-2 mt-4" />
                <p className="text-xs text-gray-500 mt-2">Better than 42% of Indian cities</p>
              </div>
            </CardContent>
          </Card>

          {/* Health Recommendations */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Health Advisory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-yellow-900">Sensitive groups should:</p>
                <ul className="list-disc list-inside space-y-1 text-yellow-800 text-xs">
                  <li>Limit prolonged outdoor activities</li>
                  <li>Wear masks when outdoors</li>
                  <li>Keep windows closed during peak hours</li>
                  <li>Use air purifiers indoors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pollutant Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pollutant Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pollutants.map((pollutant, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{pollutant.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">{pollutant.value} {pollutant.unit}</span>
                        {pollutant.trend === 'up' ? 
                          <TrendingUp className="w-3 h-3 text-red-500" /> : 
                          <TrendingDown className="w-3 h-3 text-green-500" />
                        }
                      </div>
                    </div>
                    <Progress 
                      value={pollutant.name.includes('PM') ? pollutant.value : pollutant.value * 2} 
                      className="h-1.5" 
                    />
                    <p className="text-xs text-gray-500">{pollutant.status}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zone Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aqiZones.map((zone, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm">{zone.name}</h4>
                  <div className={`w-10 h-10 ${getAQIColor(zone.aqi)} rounded-full flex items-center justify-center text-white text-sm`}>
                    {zone.aqi}
                  </div>
                </div>
                <p className={`text-xs ${getAQITextColor(zone.aqi)}`}>{zone.level}</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>PM2.5:</span>
                    <span>{zone.pm25} µg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PM10:</span>
                    <span>{zone.pm10} µg/m³</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AQI Line Chart */}
      <div className="mt-6">
        <AQILineChart />
      </div>
    </div>
  );
}