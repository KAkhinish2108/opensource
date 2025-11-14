import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function EnergyConsumptionChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Load Chart.js and annotation plugin
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
          // Load annotation plugin after Chart.js
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
      const currentHour = new Date().getHours();

      // 24-hour energy consumption data
      const timeLabels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
      const energyValues = [1200, 980, 1450, 2100, 2400, 2200, 2800, 2350, 1800];

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.25)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

      chartInstance.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Energy Consumption (MW)',
            data: energyValues,
            fill: true,
            backgroundColor: gradient,
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: energyValues.map((val, idx) => {
              if (val === 980) return 'rgb(34, 197, 94)'; // Off-peak - green
              if (val === 2800) return 'rgb(239, 68, 68)'; // Peak - red
              return 'rgb(59, 130, 246)'; // Normal - blue
            }),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBorderWidth: 3
          }]
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
                usePointStyle: true
              }
            },
            title: {
              display: true,
              text: '24-Hour Energy Consumption Pattern',
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
                  const value = context.parsed.y;
                  const time = context.label;
                  let label = `${value.toLocaleString()} MW`;
                  
                  if (value === 980) label += ' (Off-Peak)';
                  else if (value === 2800) label += ' (Peak)';
                  else if (value === 2190) label += ' (Current)';
                  
                  return label;
                }
              }
            },
            annotation: {
              annotations: {
                // Off-Peak annotation
                offPeak: {
                  type: 'point',
                  xValue: '03:00',
                  yValue: 980,
                  backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  borderColor: 'rgb(34, 197, 94)',
                  borderWidth: 2,
                  radius: 8
                },
                offPeakLabel: {
                  type: 'label',
                  xValue: '03:00',
                  yValue: 980,
                  backgroundColor: 'rgba(34, 197, 94, 0.9)',
                  content: ['Off-Peak', '980 MW', '03:00 AM'],
                  color: 'white',
                  font: { size: 11, weight: 'bold' },
                  padding: 8,
                  borderRadius: 4,
                  position: 'start',
                  yAdjust: -60
                },
                // Peak annotation
                peak: {
                  type: 'point',
                  xValue: '18:00',
                  yValue: 2800,
                  backgroundColor: 'rgba(239, 68, 68, 0.8)',
                  borderColor: 'rgb(239, 68, 68)',
                  borderWidth: 2,
                  radius: 8
                },
                peakLabel: {
                  type: 'label',
                  xValue: '18:00',
                  yValue: 2800,
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  content: ['Peak Usage', '2,800 MW', '06:00 PM'],
                  color: 'white',
                  font: { size: 11, weight: 'bold' },
                  padding: 8,
                  borderRadius: 4,
                  position: 'end',
                  yAdjust: -60
                },
                // Current usage annotation (approximated)
                currentLine: {
                  type: 'line',
                  xMin: timeLabels[Math.floor(currentHour / 3)],
                  xMax: timeLabels[Math.floor(currentHour / 3)],
                  borderColor: 'rgb(168, 85, 247)',
                  borderWidth: 2,
                  borderDash: [5, 5],
                  label: {
                    display: true,
                    content: 'Now',
                    position: 'start',
                    backgroundColor: 'rgba(168, 85, 247, 0.9)',
                    color: 'white',
                    font: { size: 11, weight: 'bold' },
                    padding: 6,
                    borderRadius: 4
                  }
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time (24-hour format)',
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
              title: {
                display: true,
                text: 'Energy Consumption (MW)',
                font: { size: 13, weight: 'bold' },
                padding: { bottom: 10 }
              },
              beginAtZero: false,
              min: 800,
              max: 3000,
              grid: {
                color: 'rgba(0, 0, 0, 0.06)'
              },
              ticks: {
                font: { size: 12 },
                callback: function(value) {
                  return value.toLocaleString() + ' MW';
                }
              }
            }
          }
        }
      });

      // Expose updateWithLive function globally
      window.updateEnergyChartWithLive = function(value, timeLabel) {
        if (!chartInstance.current) return;

        const chart = chartInstance.current;
        const timeIndex = chart.data.labels.indexOf(timeLabel);

        if (timeIndex !== -1) {
          // Update existing time point
          chart.data.datasets[0].data[timeIndex] = value;
        } else {
          // Add new time point
          chart.data.labels.push(timeLabel);
          chart.data.datasets[0].data.push(value);
          
          // Keep only last 24 data points (if adding continuously)
          if (chart.data.labels.length > 24) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
          }
        }

        chart.update();
        console.log(`Energy chart updated: ${timeLabel} = ${value} MW`);
      };
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      if (window.updateEnergyChartWithLive) {
        delete window.updateEnergyChartWithLive;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          24-Hour Energy Consumption
        </CardTitle>
        <CardDescription>Real-time energy usage pattern with peak and off-peak indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[450px]">
          <canvas ref={chartRef} id="energyConsumptionChart"></canvas>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div className="text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Off-Peak</p>
            <p className="text-2xl text-green-600 dark:text-green-400">980 MW</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">03:00 AM</p>
          </div>
          <div className="text-center bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Current Usage</p>
            <p className="text-2xl text-purple-600 dark:text-purple-400">2,190 MW</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Now</p>
          </div>
          <div className="text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Peak Usage</p>
            <p className="text-2xl text-red-600 dark:text-red-400">2,800 MW</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">06:00 PM</p>
          </div>
        </div>

        {/* Developer Note */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <strong>API Integration:</strong> Use <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">updateEnergyChartWithLive(value, timeLabel)</code> to update with real-time data.
            <br />
            Example: <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">updateEnergyChartWithLive(2450, "15:00")</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
