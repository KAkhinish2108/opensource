import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Zap, TrendingUp, TrendingDown, Sun, Wind, Battery, Lightbulb } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';
import EnergyConsumptionChart from './EnergyConsumptionChart';

export default function EnergyDashboard() {
  const [solarData, setSolarData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [currentSolarPower, setCurrentSolarPower] = useState(28);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(15);

  // Fetch solar and wind data from Open-Meteo API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current=wind_speed_10m&hourly=wind_speed_10m&forecast_days=1'
        );
        const data = await response.json();
        
        if (data.current) {
          const windSpeed = data.current.wind_speed_10m;
          setWindData(data);
          setCurrentWindSpeed(windSpeed);
          
          // Calculate solar power based on time of day (simplified)
          const hour = new Date().getHours();
          let solarPower = 0;
          if (hour >= 6 && hour <= 18) {
            // Peak solar hours (10 AM - 2 PM)
            if (hour >= 10 && hour <= 14) {
              solarPower = 85 + Math.random() * 10;
            } else if (hour >= 8 && hour <= 16) {
              solarPower = 60 + Math.random() * 20;
            } else {
              solarPower = 20 + Math.random() * 30;
            }
          }
          setCurrentSolarPower(Math.round(solarPower));
          setSolarData({ power: solarPower, hour });
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeatherData, 900000);
    return () => clearInterval(interval);
  }, []);

  const energyMix = [
    { source: 'Solar', percentage: currentSolarPower, capacity: '850 MW', color: 'bg-yellow-500' },
    { source: 'Wind', percentage: Math.min(currentWindSpeed * 3, 25), capacity: '450 MW', color: 'bg-blue-500' },
    { source: 'Hydro', percentage: 22, capacity: '670 MW', color: 'bg-cyan-500' },
    { source: 'Thermal', percentage: 30, capacity: '910 MW', color: 'bg-gray-500' },
    { source: 'Others', percentage: 5, capacity: '150 MW', color: 'bg-green-500' }
  ];

  const zoneConsumption = [
    { zone: 'Whitefield', consumption: 450, peak: 520, efficiency: 87, trend: 'up' },
    { zone: 'Koramangala', consumption: 320, peak: 380, efficiency: 92, trend: 'down' },
    { zone: 'Electronic City', consumption: 580, peak: 650, efficiency: 89, trend: 'up' },
    { zone: 'Indiranagar', consumption: 280, peak: 310, efficiency: 94, trend: 'down' },
    { zone: 'HSR Layout', consumption: 340, peak: 410, efficiency: 88, trend: 'down' },
    { zone: 'Malleshwaram', consumption: 220, peak: 260, efficiency: 91, trend: 'down' }
  ];

  const hourlyConsumption = [
    { hour: '00:00', consumption: 1200 },
    { hour: '03:00', consumption: 980 },
    { hour: '06:00', consumption: 1450 },
    { hour: '09:00', consumption: 2100 },
    { hour: '12:00', consumption: 2400 },
    { hour: '15:00', consumption: 2200 },
    { hour: '18:00', consumption: 2800 },
    { hour: '21:00', consumption: 2350 },
    { hour: '24:00', consumption: 1800 }
  ];

  const energySavingTips = [
    { tip: 'Switch to LED lighting', savings: '₹2,400/year', impact: 'High' },
    { tip: 'Use energy-efficient appliances', savings: '₹3,600/year', impact: 'High' },
    { tip: 'Install solar water heaters', savings: '₹1,800/year', impact: 'Medium' },
    { tip: 'Set AC to 24°C', savings: '₹4,200/year', impact: 'High' },
    { tip: 'Unplug devices when not in use', savings: '₹1,200/year', impact: 'Low' },
    { tip: 'Use natural lighting during day', savings: '₹800/year', impact: 'Low' }
  ];

  const smartGridStats = [
    { metric: 'Total Capacity', value: '3,030 MW', change: '+5.2%', trend: 'up' },
    { metric: 'Current Load', value: '2,190 MW', change: '-3.1%', trend: 'down' },
    { metric: 'Peak Demand', value: '2,530 MW', change: '+2.8%', trend: 'up' },
    { metric: 'Renewable Share', value: '43%', change: '+8.5%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {smartGridStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{stat.metric}</p>
                <p className="text-2xl">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Weather Conditions for Energy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
              <Sun className="w-6 h-6" />
              Solar Power Generation
            </CardTitle>
            <CardDescription className="dark:text-gray-300">Real-time solar energy output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-yellow-700 dark:text-yellow-400">{currentSolarPower}%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">capacity</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {solarData ? `Current output: ${Math.round((currentSolarPower / 100) * 850)} MW` : 'Loading...'}
                </p>
              </div>
              <Progress value={currentSolarPower} className="h-3 bg-yellow-200" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Peak Time</p>
                  <p className="text-yellow-700 dark:text-yellow-400">12:00 PM</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-green-600 dark:text-green-400">
                    {currentSolarPower > 60 ? 'Optimal' : currentSolarPower > 20 ? 'Active' : 'Low'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
              <Wind className="w-6 h-6" />
              Wind Energy Generation
            </CardTitle>
            <CardDescription className="dark:text-gray-300">Real-time wind speed and power</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-blue-700 dark:text-blue-400">{currentWindSpeed.toFixed(1)}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">km/h</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {windData ? `Power output: ${Math.min(Math.round((currentWindSpeed * 3) / 100 * 450), 450)} MW` : 'Loading...'}
                </p>
              </div>
              <Progress value={Math.min(currentWindSpeed * 3, 100)} className="h-3 bg-blue-200" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Wind Status</p>
                  <p className="text-blue-700 dark:text-blue-400">
                    {currentWindSpeed > 15 ? 'Strong' : currentWindSpeed > 8 ? 'Moderate' : 'Light'}
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Efficiency</p>
                  <p className="text-green-600 dark:text-green-400">
                    {Math.min(Math.round((currentWindSpeed / 20) * 100), 100)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Mix */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Energy Source Distribution
            </CardTitle>
            <CardDescription>Current energy generation mix</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {energyMix.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {source.source === 'Solar' && <Sun className="w-4 h-4 text-yellow-600" />}
                      {source.source === 'Wind' && <Wind className="w-4 h-4 text-blue-600" />}
                      {source.source === 'Hydro' && <Battery className="w-4 h-4 text-cyan-600" />}
                      {source.source === 'Thermal' && <Zap className="w-4 h-4 text-gray-600" />}
                      {source.source === 'Others' && <Lightbulb className="w-4 h-4 text-green-600" />}
                      <span className="text-sm">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{source.percentage}%</p>
                      <p className="text-xs text-gray-500">{source.capacity}</p>
                    </div>
                  </div>
                  <Progress value={source.percentage} className="h-3" />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-green-600" />
                <h4 className="text-sm text-green-800">Renewable Energy</h4>
              </div>
              <p className="text-2xl text-green-700 mb-1">43%</p>
              <p className="text-xs text-gray-600">
                Bengaluru is powered by 43% renewable energy, exceeding the national average of 38%.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 24-Hour Detailed Chart with Chart.js */}
      <EnergyConsumptionChart />

      {/* Zone-wise Consumption */}
      <Card>
        <CardHeader>
          <CardTitle>Zone-wise Energy Consumption</CardTitle>
          <CardDescription>Real-time consumption across major zones (in MW)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zoneConsumption.map((zone, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm mb-1">{zone.zone}</h4>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Current: {zone.consumption} MW</span>
                      <span>Peak: {zone.peak} MW</span>
                      <span className={`flex items-center gap-1 ${zone.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {zone.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {zone.trend === 'up' ? 'Increasing' : 'Decreasing'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Efficiency</p>
                    <p className={`text-lg ${zone.efficiency >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {zone.efficiency}%
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={(zone.consumption / zone.peak) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Load: {((zone.consumption / zone.peak) * 100).toFixed(0)}%</span>
                    <span>{zone.peak - zone.consumption} MW available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Energy Saving Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Energy Saving Recommendations
          </CardTitle>
          <CardDescription>Simple ways to reduce your energy consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {energySavingTips.map((tip, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    tip.impact === 'High' ? 'bg-green-100 text-green-700' :
                    tip.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {tip.impact} Impact
                  </span>
                </div>
                <p className="text-sm">{tip.tip}</p>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">Estimated Savings</p>
                  <p className="text-lg text-green-600">{tip.savings}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white dark:text-white dark:text-white">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400" />
            Smart Grid Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Grid stability: Excellent</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">All zones operating within normal parameters</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Peak hours approaching (6 PM - 9 PM)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">Consider reducing non-essential power usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Solar generation optimal</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">Peak solar output expected at 12:00 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}