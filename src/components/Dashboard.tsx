import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Activity, AlertTriangle, Wind, Droplets, Zap, Leaf, Car, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from './ui/progress';
import { useLanguage } from '../utils/LanguageContext';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { t } = useLanguage();
  const [aqiValue, setAqiValue] = useState('87');
  
  // Fetch real AQI data
  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=12.9716&lon=77.5946&appid=85825b41e4d2bbe49b60bd39e7e4e8c2`
        );
        const data = await response.json();
        if (data.list && data.list[0]) {
          const aqiIndex = data.list[0].main.aqi;
          const aqiVal = aqiIndex * 50; // Convert to US standard
          setAqiValue(aqiVal.toString());
        }
      } catch (error) {
        console.error('Error fetching AQI:', error);
      }
    };

    fetchAQI();
    const interval = setInterval(fetchAQI, 1800000); // Refresh every 30 minutes
    return () => clearInterval(interval);
  }, []);
  
  const metrics = [
    {
      title: t.airQualityIndex,
      value: aqiValue,
      status: t.moderate,
      icon: Wind,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+5%',
      trend: 'up'
    },
    {
      title: t.trafficFlow,
      value: '62%',
      status: t.high,
      icon: Car,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '-8%',
      trend: 'down'
    },
    {
      title: t.energyConsumption,
      value: '2.4 GW',
      status: t.normal,
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+3%',
      trend: 'up'
    },
    {
      title: t.publicTransport,
      value: '12.5K',
      status: t.active,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12%',
      trend: 'up'
    },
    {
      title: t.wasteManagement,
      value: '487',
      status: t.efficient,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+2',
      trend: 'up'
    },
    {
      title: t.waterQuality,
      value: '94%',
      status: t.good,
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      change: '+1%',
      trend: 'up'
    }
  ];

  const zones = [
    { name: t.whitefield, traffic: 75, aqi: 92, energy: 82 },
    { name: t.koramangala, traffic: 68, aqi: 78, energy: 71 },
    { name: t.indiranagar, traffic: 55, aqi: 85, energy: 65 },
    { name: t.jayanagar, traffic: 45, aqi: 68, energy: 58 },
    { name: t.malleshwaram, traffic: 52, aqi: 72, energy: 62 },
    { name: t.hsrLayout, traffic: 70, aqi: 88, energy: 78 }
  ];

  // Function to get level based on percentage
  const getLevel = (value: number, type: 'traffic' | 'aqi' | 'energy') => {
    if (type === 'traffic') {
      if (value >= 70) return 'High';
      if (value >= 50) return 'Medium';
      return 'Low';
    } else if (type === 'aqi') {
      if (value >= 85) return 'Unhealthy';
      if (value >= 70) return 'Moderate';
      return 'Good';
    } else {
      if (value >= 75) return 'High';
      if (value >= 60) return 'Medium';
      return 'Low';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-300">{metric.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor} dark:bg-opacity-20`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl dark:text-white">{metric.value}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.status}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {metric.change}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Zone-wise Performance */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">{t.zonePerformance}</CardTitle>
          <CardDescription className="dark:text-gray-400">{t.zonePerformanceDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {zones.map((zone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="dark:text-gray-200">{zone.name}</span>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{t.traffic}: {zone.traffic}% ({getLevel(zone.traffic, 'traffic')})</span>
                    <span>{t.aqi}: {zone.aqi} ({getLevel(zone.aqi, 'aqi')})</span>
                    <span>{t.energy}: {zone.energy}% ({getLevel(zone.energy, 'energy')})</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Progress value={zone.traffic} className="h-2" />
                  </div>
                  <div>
                    <Progress value={zone.aqi} className="h-2" />
                  </div>
                  <div>
                    <Progress value={zone.energy} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            {t.recentAlerts}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: `10 ${t.minsAgo}`, message: t.highTrafficCongestion, severity: 'high' },
              { time: `25 ${t.minsAgo}`, message: t.airQualityDeteriorating, severity: 'medium' },
              { time: `1 ${t.hourAgo}`, message: t.parkingMaintenance, severity: 'low' },
              { time: `2 ${t.hoursAgo}`, message: t.energySpike, severity: 'medium' }
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-red-600' :
                  alert.severity === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                }`} />
                <div className="flex-1">
                  <p className="text-sm dark:text-gray-200">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t.reportIssue, icon: AlertTriangle, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
          { label: t.findParking, icon: Car, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
          { label: t.viewEvents, icon: Activity, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
          { label: t.checkAQI, icon: Wind, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} p-6 rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-2`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}