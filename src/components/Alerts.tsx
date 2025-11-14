import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Bell, CheckCircle, Info, XCircle, Clock, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Traffic Congestion',
      message: 'Major traffic jam on Outer Ring Road near Silk Board. Expected delay: 30+ minutes.',
      location: 'Silk Board Junction',
      time: '10 mins ago',
      status: 'active',
      category: 'traffic'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Air Quality Alert',
      message: 'AQI levels rising in Whitefield area. Sensitive groups should limit outdoor activities.',
      location: 'Whitefield',
      time: '25 mins ago',
      status: 'active',
      category: 'environment'
    },
    {
      id: 3,
      type: 'info',
      title: 'Metro Service Update',
      message: 'Yellow Line maintenance scheduled for tonight 11 PM - 2 AM. Plan accordingly.',
      location: 'Yellow Line Metro',
      time: '1 hour ago',
      status: 'active',
      category: 'transport'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Energy Peak Hours',
      message: 'Peak energy demand expected 6-9 PM. Consider reducing non-essential power usage.',
      location: 'City-wide',
      time: '2 hours ago',
      status: 'active',
      category: 'energy'
    },
    {
      id: 5,
      type: 'success',
      title: 'Issue Resolved',
      message: 'Street light maintenance completed in Indiranagar. All lights operational.',
      location: 'Indiranagar',
      time: '3 hours ago',
      status: 'resolved',
      category: 'maintenance'
    },
    {
      id: 6,
      type: 'critical',
      title: 'Water Supply Disruption',
      message: 'Temporary water supply interruption in HSR Layout Sector 3 due to pipeline repair.',
      location: 'HSR Layout Sector 3',
      time: '4 hours ago',
      status: 'active',
      category: 'utilities'
    },
    {
      id: 7,
      type: 'info',
      title: 'Weather Advisory',
      message: 'Thunderstorm expected in the evening. Carry umbrellas and drive safely.',
      location: 'City-wide',
      time: '5 hours ago',
      status: 'active',
      category: 'weather'
    },
    {
      id: 8,
      type: 'success',
      title: 'Road Repair Complete',
      message: 'Pothole repairs completed on Koramangala 5th Block road. Traffic flowing smoothly.',
      location: 'Koramangala',
      time: '6 hours ago',
      status: 'resolved',
      category: 'maintenance'
    }
  ];

  const notificationSettings = [
    { id: 'traffic', label: 'Traffic & Transportation', enabled: true },
    { id: 'environment', label: 'Air Quality & Environment', enabled: true },
    { id: 'energy', label: 'Energy & Utilities', enabled: false },
    { id: 'maintenance', label: 'City Maintenance', enabled: true },
    { id: 'weather', label: 'Weather Alerts', enabled: true },
    { id: 'events', label: 'Community Events', enabled: false }
  ];

  const upcomingAlerts = [
    {
      title: 'Scheduled Power Maintenance',
      description: 'Power outage in select areas of Whitefield',
      date: 'Nov 18, 2024',
      time: '2:00 AM - 4:00 AM',
      type: 'scheduled'
    },
    {
      title: 'Metro Line Extension Opening',
      description: 'New Purple Line extension to be inaugurated',
      date: 'Nov 22, 2024',
      time: '10:00 AM',
      type: 'event'
    },
    {
      title: 'Road Closure - Marathon',
      description: 'City Marathon will affect multiple routes',
      date: 'Nov 25, 2024',
      time: '5:00 AM - 12:00 PM',
      type: 'scheduled'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'success': return 'border-green-500 bg-green-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      traffic: 'bg-red-100 text-red-700',
      environment: 'bg-green-100 text-green-700',
      transport: 'bg-blue-100 text-blue-700',
      energy: 'bg-yellow-100 text-yellow-700',
      maintenance: 'bg-purple-100 text-purple-700',
      utilities: 'bg-cyan-100 text-cyan-700',
      weather: 'bg-indigo-100 text-indigo-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl text-red-600">2</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl text-yellow-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Info</p>
                <p className="text-2xl text-blue-600">2</p>
              </div>
              <Info className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl text-green-600">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Active Alerts
          </CardTitle>
          <CardDescription>Real-time notifications about city services and conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 ${getAlertColor(alert.type)} rounded-lg p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${getIconColor(alert.type)} mt-1`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm">{alert.title}</h4>
                          <Badge className={getCategoryBadge(alert.category)} variant="outline">
                            {alert.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{alert.message}</p>
                      </div>
                      {alert.status === 'resolved' && (
                        <Badge className="bg-green-100 text-green-700 flex-shrink-0">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage which alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-2">
                <Label htmlFor={setting.id} className="text-sm cursor-pointer">
                  {setting.label}
                </Label>
                <Switch id={setting.id} defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <Button className="w-full">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Scheduled Alerts
          </CardTitle>
          <CardDescription>Know about planned maintenance and events in advance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAlerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    {alert.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🕒</span>
                    {alert.time}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Add to Calendar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-red-900/20 dark:to-orange-900/20 dark:bg-gray-800 dark:border-gray-700 dark:from-red-900/20 dark:to-orange-900/20 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-400 dark:text-red-400 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Police</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">100</p>
            </div>
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Fire</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">101</p>
            </div>
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Ambulance</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">108</p>
            </div>
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Disaster Mgmt</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">1077</p>
            </div>
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Electricity</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">1912</p>
            </div>
            <div className="bg-white dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mb-1">Water Supply</p>
              <p className="text-xl dark:text-black dark:text-black dark:text-black">22944345</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}