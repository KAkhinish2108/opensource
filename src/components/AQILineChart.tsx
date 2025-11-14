import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function AQILineChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Load Chart.js dynamically
    if (!document.getElementById('chartjs-script')) {
      const script = document.createElement('script');
      script.id = 'chartjs-script';
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => initChart();
      document.head.appendChild(script);
    } else if (window.Chart) {
      initChart();
    }

    function initChart() {
      if (!window.Chart || !chartRef.current || chartInstance.current) return;

      const ctx = chartRef.current.getContext('2d');

      // AQI data (Jun–Nov)
      const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      const aqiValues = [92, 88, 85, 82, 80, 78];

      // Create Line Chart
      chartInstance.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Air Quality Index (Lower is Better)',
            data: aqiValues,
            fill: false,
            borderColor: '#eab308',
            backgroundColor: '#ef4444',
            tension: 0.3,
            pointBackgroundColor: '#f97316',
            pointBorderColor: '#a855f7',
            pointHoverRadius: 8,
            pointRadius: 6,
            pointHoverBackgroundColor: '#f97316',
            pointHoverBorderColor: '#fff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'top',
              labels: {
                font: {
                  size: 12
                },
                padding: 15,
                usePointStyle: true
              }
            },
            title: {
              display: true,
              text: 'Bangalore AQI Trend (Jun–Nov)',
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.parsed.y;
                  
                  // Add AQI category
                  const aqi = context.parsed.y;
                  let category = '';
                  if (aqi <= 50) category = ' (Good)';
                  else if (aqi <= 100) category = ' (Moderate)';
                  else if (aqi <= 150) category = ' (Unhealthy for Sensitive)';
                  else if (aqi <= 200) category = ' (Unhealthy)';
                  else category = ' (Very Unhealthy)';
                  
                  return label + category;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 70,
              max: 100,
              title: { 
                display: true, 
                text: 'AQI (Lower is Better)',
                font: {
                  size: 13,
                  weight: 'bold'
                },
                padding: {
                  top: 10,
                  bottom: 10
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            x: {
              title: { 
                display: true, 
                text: 'Month',
                font: {
                  size: 13,
                  weight: 'bold'
                },
                padding: {
                  top: 10
                }
              },
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-green-600" />
          Air Quality Trend
        </CardTitle>
        <CardDescription>
          Bangalore AQI showing improvement over last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <canvas ref={chartRef} id="aqiLineChart"></canvas>
        </div>
        
        {/* Key Insights */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-2xl text-green-600 dark:text-green-400">↓ 15%</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Improvement Since June
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-2xl text-blue-600 dark:text-blue-400">78</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Current AQI (Nov)
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-2xl text-yellow-600 dark:text-yellow-400">Moderate</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Air Quality Status
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
