import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Calendar } from 'lucide-react';
import { Progress } from './ui/progress';
import PerformanceTrendsChart from './PerformanceTrendsChart';

export default function Insights() {
  const trends = [
    {
      title: 'Air Quality Improvement',
      value: '+12%',
      description: 'Average AQI decreased by 12% compared to last month',
      trend: 'positive',
      period: 'Last 30 days'
    },
    {
      title: 'Public Transport Usage',
      value: '+18%',
      description: 'Metro and bus ridership increased significantly',
      trend: 'positive',
      period: 'Last quarter'
    },
    {
      title: 'Energy Efficiency',
      value: '+8%',
      description: 'Smart lighting and grid optimization improvements',
      trend: 'positive',
      period: 'Last 6 months'
    },
    {
      title: 'Traffic Congestion',
      value: '-5%',
      description: 'Average travel time reduced through smart traffic management',
      trend: 'positive',
      period: 'Last 3 months'
    }
  ];

  const sustainabilityGoals = [
    { goal: 'Reduce AQI to <50', current: 78, target: 50, progress: 44, deadline: 'Dec 2025' },
    { goal: '60% Renewable Energy', current: 43, target: 60, progress: 72, deadline: 'Jun 2025' },
    { goal: '90% Recycling Rate', current: 85, target: 90, progress: 94, deadline: 'Dec 2024' },
    { goal: '30% Traffic Reduction', current: 15, target: 30, progress: 50, deadline: 'Mar 2025' }
  ];

  const citizenEngagement = [
    { category: 'Issues Reported', count: 1234, change: '+8%', trend: 'up' },
    { category: 'Issues Resolved', count: 892, change: '+15%', trend: 'up' },
    { category: 'Active Citizens', count: 12543, change: '+22%', trend: 'up' },
    { category: 'Poll Participation', count: 8932, change: '+12%', trend: 'up' }
  ];

  const zonePerformance = [
    { zone: 'Koramangala', score: 8.5, improvements: ['Air Quality', 'Waste Management'] },
    { zone: 'Indiranagar', score: 8.2, improvements: ['Traffic Flow', 'Energy Efficiency'] },
    { zone: 'Whitefield', score: 7.8, improvements: ['Public Transport', 'Green Spaces'] },
    { zone: 'Electronic City', score: 7.5, improvements: ['Air Quality', 'Traffic Congestion'] },
    { zone: 'HSR Layout', score: 8.1, improvements: ['Smart Lighting', 'Waste Collection'] },
    { zone: 'Jayanagar', score: 8.7, improvements: ['All Parameters Excellent'] }
  ];

  const predictions = [
    {
      title: 'Air Quality Forecast',
      prediction: 'AQI expected to improve to 72 by next month due to monsoon season',
      confidence: 85,
      icon: Activity
    },
    {
      title: 'Traffic Pattern',
      prediction: 'Peak hour traffic expected to reduce by 10% with new metro line opening',
      confidence: 78,
      icon: TrendingDown
    },
    {
      title: 'Energy Demand',
      prediction: 'Summer peak demand forecasted at 3,200 MW, up 15% from current levels',
      confidence: 92,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trends.map((trend, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrendingUp className={`w-5 h-5 ${trend.trend === 'positive' ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-2xl ${trend.trend === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.value}
                  </span>
                </div>
                <h4 className="text-sm">{trend.title}</h4>
                <p className="text-xs text-gray-500">{trend.description}</p>
                <p className="text-xs text-gray-400">{trend.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trends Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            6-Month Performance Trends
          </CardTitle>
          <CardDescription>Key metrics comparison over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceTrendsChart />
        </CardContent>
      </Card>

      {/* Sustainability Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Sustainability Goals Progress
          </CardTitle>
          <CardDescription>Tracking progress towards key sustainability targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sustainabilityGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm">{goal.goal}</h4>
                    <p className="text-xs text-gray-500">Target by {goal.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{goal.current} / {goal.target}</p>
                    <p className="text-xs text-gray-500">{goal.progress}% complete</p>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Citizen Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Citizen Engagement Analytics</CardTitle>
          <CardDescription>Community participation and activity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {citizenEngagement.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-500">{item.category}</p>
                <p className="text-2xl">{item.count.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zone Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Zone-wise Smart City Score</CardTitle>
          <CardDescription>Overall performance rating for each zone (out of 10)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zonePerformance.map((zone, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm mb-1">{zone.zone}</h4>
                    <div className="flex flex-wrap gap-1">
                      {zone.improvements.map((improvement, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-blue-600">{zone.score}</p>
                    <p className="text-xs text-gray-500">/ 10</p>
                  </div>
                </div>
                <Progress value={zone.score * 10} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            AI-Powered Predictions
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Data-driven forecasts for city metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction, index) => {
              const Icon = prediction.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm mb-1 dark:text-white">{prediction.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{prediction.prediction}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Confidence:</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-purple-500 dark:bg-purple-400 h-2 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{prediction.confidence}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-green-900/20 dark:to-blue-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-green-900/20 dark:to-blue-900/20 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white dark:text-white dark:text-white">
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 dark:text-green-400 dark:text-green-400" />
            Key Insights Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Bengaluru's air quality has shown consistent improvement over the past 6 months, with AQI dropping from 92 to 78.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Public transport usage has increased by 18%, indicating successful citizen adoption of sustainable mobility.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Citizen engagement is at an all-time high with 12,500+ active users participating in smart city initiatives.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm dark:text-black dark:text-black dark:text-black">Energy efficiency improvements have resulted in 8% reduction in consumption while maintaining service quality.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}