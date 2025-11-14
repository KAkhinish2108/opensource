import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/ui/card';
import Dashboard from './components/Dashboard';
import TrafficMap from './components/TrafficMap';
import AirQualityMap from './components/AirQualityMap';
import SmartServices from './components/SmartServices';
import Sustainability from './components/Sustainability';
import CitizenEngagement from './components/CitizenEngagement';
import EnergyDashboard from './components/EnergyDashboard';
import Insights from './components/Insights';
import Alerts from './components/Alerts';
import { Cloud, MapPin, Clock, Moon, Sun, Languages } from 'lucide-react';
import { Button } from './components/ui/button';
import { LanguageProvider, useLanguage } from './utils/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Language, languageNames } from './utils/translations';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=85825b41e4d2bbe49b60bd39e7e4e8c2&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    // Refresh every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-xl transition-colors duration-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg backdrop-blur-sm">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl tracking-tight">{t.appTitle}</h1>
                <p className="text-blue-100 dark:text-gray-300 text-sm">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 dark:bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="text-xs text-blue-100 dark:text-gray-300">IST (UTC+5:30)</p>
                  <p className="text-lg">{formatTime(currentTime)}</p>
                  <p className="text-xs text-blue-100 dark:text-gray-300">{formatDate(currentTime)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 dark:bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Cloud className="w-5 h-5" />
                <div>
                  <p className="text-xs text-blue-100 dark:text-gray-300">{t.currentWeather}</p>
                  <p className="text-lg">
                    {weatherData ? (
                      <>
                        {Math.round(weatherData.main.temp)}°C {weatherData.weather[0].description}
                      </>
                    ) : (
                      <>24°C {t.partlyCloudy}</>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Language Selector */}
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-[140px] bg-white/20 dark:bg-white/10 border-white/30 text-white hover:bg-white/30">
                  <Languages className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{languageNames.en}</SelectItem>
                  <SelectItem value="kn">{languageNames.kn}</SelectItem>
                  <SelectItem value="hi">{languageNames.hi}</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 rounded-lg"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 transition-colors duration-200">
            <TabsList className="grid grid-cols-5 lg:grid-cols-9 w-full dark:bg-gray-700">
              <TabsTrigger value="overview">{t.overview}</TabsTrigger>
              <TabsTrigger value="traffic">{t.traffic}</TabsTrigger>
              <TabsTrigger value="air-quality">{t.airQuality}</TabsTrigger>
              <TabsTrigger value="services">{t.services}</TabsTrigger>
              <TabsTrigger value="sustainability">{t.sustainability}</TabsTrigger>
              <TabsTrigger value="citizen">{t.citizenHub}</TabsTrigger>
              <TabsTrigger value="energy">{t.energy}</TabsTrigger>
              <TabsTrigger value="insights">{t.insights}</TabsTrigger>
              <TabsTrigger value="alerts">{t.alerts}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="traffic">
            <TrafficMap />
          </TabsContent>

          <TabsContent value="air-quality">
            <AirQualityMap />
          </TabsContent>

          <TabsContent value="services">
            <SmartServices />
          </TabsContent>

          <TabsContent value="sustainability">
            <Sustainability />
          </TabsContent>

          <TabsContent value="citizen">
            <CitizenEngagement />
          </TabsContent>

          <TabsContent value="energy">
            <EnergyDashboard />
          </TabsContent>

          <TabsContent value="insights">
            <Insights />
          </TabsContent>

          <TabsContent value="alerts">
            <Alerts />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-16 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">{t.appTitle}</h3>
              <p className="text-sm">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h3 className="text-white mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.aboutProject}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.dataPrivacy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.openDataPortal}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.contactUs}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">{t.dataSources}</h3>
              <p className="text-sm">
                {t.dataSourcesDesc}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}