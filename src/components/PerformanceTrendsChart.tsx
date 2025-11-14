import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingDown, TrendingUp, Activity, Play, Pause, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

// Validation function for live data
function validateLiveData({ aqi, trafficPct, energyMW, month }) {
  const errors = [];
  
  // Validate AQI (0-500 range)
  if (aqi !== undefined) {
    if (typeof aqi !== 'number' || aqi < 0 || aqi > 500) {
      errors.push('AQI must be a number between 0 and 500');
    }
  }
  
  // Validate Traffic Percentage (0-100 range)
  if (trafficPct !== undefined) {
    if (typeof trafficPct !== 'number' || trafficPct < 0 || trafficPct > 100) {
      errors.push('Traffic percentage must be a number between 0 and 100');
    }
  }
  
  // Validate Energy MW (must be positive)
  if (energyMW !== undefined) {
    if (typeof energyMW !== 'number' || energyMW < 0) {
      errors.push('Energy MW must be a positive number');
    }
  }
  
  // Validate Month (3-letter format)
  if (month !== undefined) {
    if (typeof month !== 'string' || month.length !== 3) {
      errors.push('Month must be a 3-letter string (e.g., Jan, Feb, Mar)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Default data source function (can be replaced with real API)
async function defaultDataSource() {
  // Simulate API call
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = months[new Date().getMonth()];
  
  // Simulate live data with small random variations
  return {
    aqi: Math.round(75 + Math.random() * 10), // 75-85
    trafficPct: Math.round(50 + Math.random() * 10), // 50-60
    energyMW: Math.round(2000 + Math.random() * 100), // 2000-2100
    month: currentMonth
  };
}

export default function PerformanceTrendsChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const updateIntervalRef = useRef(null);
  const dataSourceFn = useRef(defaultDataSource);
  
  const [stats, setStats] = useState({
    aqi: { min: 78, max: 92, avg: 84.2, trend: 'Improving' },
    traffic: { min: 55, max: 68, avg: 61.3, trend: 'Decreasing' },
    energy: { min: 2050, max: 2300, avg: 2183, trend: 'Optimizing' }
  });
  
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false);
  const [updateInterval, setUpdateInterval] = useState(60000); // 60 seconds default
  const [lastUpdate, setLastUpdate] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('Ready');

  useEffect(() => {
    const loadChartJS = () => {
      if (window.Chart && !chartInstance.current && chartRef.current) {
        initChart();
        return;
      }

      if (!document.getElementById('chartjs-script')) {
        const script = document.createElement('script');
        script.id = 'chartjs-script';
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        script.onload = () => {
          const annotationScript = document.createElement('script');
          annotationScript.id = 'chartjs-annotation-script';
          annotationScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js';
          annotationScript.onload = () => initChart();
          document.head.appendChild(annotationScript);
        };
        document.head.appendChild(script);
      }
    };

    loadChartJS();

    function initChart() {
      if (!window.Chart || !chartRef.current || chartInstance.current) return;

      const ctx = chartRef.current.getContext('2d');

      // Data
      const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      const aqiData = [92, 88, 85, 82, 80, 78];
      const trafficData = [68, 65, 62, 60, 58, 55];
      const energyData = [2300, 2250, 2200, 2150, 2100, 2050];

      // Create gradients
      const energyGradient = ctx.createLinearGradient(0, 0, 0, 400);
      energyGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      energyGradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

      chartInstance.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Air Quality Index',
              data: aqiData,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              yAxisID: 'y'
            },
            {
              label: 'Traffic Congestion (%)',
              data: trafficData,
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderWidth: 3,
              borderDash: [5, 5],
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: 'rgb(245, 158, 11)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              yAxisID: 'y'
            },
            {
              label: 'Energy Consumption (MW)',
              data: energyData,
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: energyGradient,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: 'rgb(16, 185, 129)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: { size: 13, weight: 'bold' },
                padding: 15,
                usePointStyle: true,
                boxWidth: 8,
                boxHeight: 8
              }
            },
            title: {
              display: true,
              text: '6-Month Performance Trends (Jun - Nov)',
              font: { size: 18, weight: 'bold' },
              padding: { top: 10, bottom: 20 }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              padding: 14,
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 13 },
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  
                  if (label.includes('Traffic')) {
                    return `${label}: ${value}%`;
                  } else if (label.includes('Energy')) {
                    return `${label}: ${value.toLocaleString()} MW`;
                  } else {
                    return `${label}: ${value} AQI`;
                  }
                }
              }
            },
            annotation: {
              annotations: {
                // AQI November annotation
                aqiNov: {
                  type: 'label',
                  xValue: 'Nov',
                  yValue: 78,
                  backgroundColor: 'rgba(59, 130, 246, 0.9)',
                  content: ['AQI: 78', '(Improving)'],
                  color: 'white',
                  font: { size: 10, weight: 'bold' },
                  padding: 6,
                  borderRadius: 4,
                  yAdjust: -40
                },
                // Traffic November annotation
                trafficNov: {
                  type: 'label',
                  xValue: 'Nov',
                  yValue: 55,
                  backgroundColor: 'rgba(245, 158, 11, 0.9)',
                  content: ['Traffic: 55%', '(Decreasing)'],
                  color: 'white',
                  font: { size: 10, weight: 'bold' },
                  padding: 6,
                  borderRadius: 4,
                  yAdjust: 30
                },
                // Energy November annotation (on right axis)
                energyNov: {
                  type: 'label',
                  xValue: 'Nov',
                  yValue: 2050,
                  backgroundColor: 'rgba(16, 185, 129, 0.9)',
                  content: ['Energy: 2,050 MW', '(Optimizing)'],
                  color: 'white',
                  font: { size: 10, weight: 'bold' },
                  padding: 6,
                  borderRadius: 4,
                  yAdjust: 35,
                  xAdjust: -10
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
                font: { size: 13, weight: 'bold' },
                padding: { top: 10 }
              },
              grid: {
                display: false
              },
              ticks: {
                font: { size: 12 }
              }
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Index / % (Lower is Better)',
                font: { size: 13, weight: 'bold' },
                padding: { bottom: 10 }
              },
              min: 0,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.06)'
              },
              ticks: {
                font: { size: 12 }
              }
            },
            y1: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Energy (MW)',
                font: { size: 13, weight: 'bold' },
                padding: { bottom: 10 }
              },
              min: 2000,
              max: 2400,
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                font: { size: 12 },
                callback: function(value) {
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      });

      // Expose updateWithLive function globally
      window.updatePerformanceTrendsWithLive = function({ aqi, trafficPct, energyMW, month }) {
        if (!chartInstance.current) return;

        const chart = chartInstance.current;
        const monthIndex = chart.data.labels.indexOf(month);

        if (monthIndex !== -1) {
          // Update existing month
          if (aqi !== undefined) chart.data.datasets[0].data[monthIndex] = aqi;
          if (trafficPct !== undefined) chart.data.datasets[1].data[monthIndex] = trafficPct;
          if (energyMW !== undefined) chart.data.datasets[2].data[monthIndex] = energyMW;
        } else {
          // Add new month
          chart.data.labels.push(month);
          if (aqi !== undefined) chart.data.datasets[0].data.push(aqi);
          if (trafficPct !== undefined) chart.data.datasets[1].data.push(trafficPct);
          if (energyMW !== undefined) chart.data.datasets[2].data.push(energyMW);

          // Keep only last 12 months
          if (chart.data.labels.length > 12) {
            chart.data.labels.shift();
            chart.data.datasets.forEach(dataset => dataset.data.shift());
          }
        }

        // Recalculate stats
        const aqiValues = chart.data.datasets[0].data;
        const trafficValues = chart.data.datasets[1].data;
        const energyValues = chart.data.datasets[2].data;

        setStats({
          aqi: {
            min: Math.min(...aqiValues),
            max: Math.max(...aqiValues),
            avg: Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length * 10) / 10,
            trend: 'Improving'
          },
          traffic: {
            min: Math.min(...trafficValues),
            max: Math.max(...trafficValues),
            avg: Math.round(trafficValues.reduce((a, b) => a + b, 0) / trafficValues.length * 10) / 10,
            trend: 'Decreasing'
          },
          energy: {
            min: Math.min(...energyValues),
            max: Math.max(...energyValues),
            avg: Math.round(energyValues.reduce((a, b) => a + b, 0) / energyValues.length),
            trend: 'Optimizing'
          }
        });

        chart.update();
        console.log(`Performance trends updated for ${month}`);
      };
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      if (window.updatePerformanceTrendsWithLive) {
        delete window.updatePerformanceTrendsWithLive;
      }
    };
  }, []);

  // Function to handle auto-update
  const handleAutoUpdate = async () => {
    if (autoUpdateEnabled) {
      setUpdateStatus('Updating...');
      try {
        const liveData = await dataSourceFn.current();
        const validation = validateLiveData(liveData);
        
        if (validation.isValid) {
          window.updatePerformanceTrendsWithLive(liveData);
          setLastUpdate(new Date());
          setUpdateStatus('Updated');
        } else {
          setUpdateStatus('Error: ' + validation.errors.join(', '));
        }
      } catch (error) {
        setUpdateStatus('Error: ' + error.message);
      }
    }
  };

  // Function to toggle auto-update
  const toggleAutoUpdate = () => {
    if (autoUpdateEnabled) {
      clearInterval(updateIntervalRef.current);
      setAutoUpdateEnabled(false);
      setUpdateStatus('Ready');
    } else {
      updateIntervalRef.current = setInterval(handleAutoUpdate, updateInterval);
      setAutoUpdateEnabled(true);
      setUpdateStatus('Updating...');
      handleAutoUpdate(); // Initial update
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          6-Month Performance Trends
        </CardTitle>
        <CardDescription>
          Comparative analysis of key city metrics showing improvement trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* AQI Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-blue-900 dark:text-blue-300">Air Quality Index</h4>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Min</p>
                <p className="text-blue-700 dark:text-blue-400">{stats.aqi.min}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Max</p>
                <p className="text-blue-700 dark:text-blue-400">{stats.aqi.max}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg</p>
                <p className="text-blue-700 dark:text-blue-400">{stats.aqi.avg}</p>
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ {stats.aqi.trend}</p>
          </div>

          {/* Traffic Summary */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-amber-900 dark:text-amber-300">Traffic Congestion</h4>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Min</p>
                <p className="text-amber-700 dark:text-amber-400">{stats.traffic.min}%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Max</p>
                <p className="text-amber-700 dark:text-amber-400">{stats.traffic.max}%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg</p>
                <p className="text-amber-700 dark:text-amber-400">{stats.traffic.avg}%</p>
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ {stats.traffic.trend}</p>
          </div>

          {/* Energy Summary */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-emerald-900 dark:text-emerald-300">Energy Consumption</h4>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Min</p>
                <p className="text-emerald-700 dark:text-emerald-400">{stats.energy.min.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Max</p>
                <p className="text-emerald-700 dark:text-emerald-400">{stats.energy.max.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg</p>
                <p className="text-emerald-700 dark:text-emerald-400">{stats.energy.avg.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ {stats.energy.trend}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[500px]">
          <canvas ref={chartRef} id="performanceTrendsChart"></canvas>
        </div>

        {/* Developer Note */}
        <div className="mt-6 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <strong>API Integration:</strong> Use <code className="bg-indigo-100 dark:bg-indigo-800 px-1 py-0.5 rounded">updatePerformanceTrendsWithLive(&#123; aqi, trafficPct, energyMW, month &#125;)</code> to update with new data.
            <br />
            Example: <code className="bg-indigo-100 dark:bg-indigo-800 px-1 py-0.5 rounded">updatePerformanceTrendsWithLive(&#123; aqi: 76, trafficPct: 53, energyMW: 2000, month: "Dec" &#125;)</code>
          </p>
        </div>

        {/* Auto-Update Controls */}
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Button
                onClick={toggleAutoUpdate}
                className={`mr-2 ${autoUpdateEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
              >
                {autoUpdateEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {autoUpdateEnabled ? 'Pause' : 'Start'} Auto-Update
              </Button>
              <Button
                onClick={handleAutoUpdate}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <RefreshCw className="w-4 h-4" />
                Update Now
              </Button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {lastUpdate ? `Last Update: ${lastUpdate.toLocaleTimeString()}` : 'No updates yet'}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {updateStatus}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}