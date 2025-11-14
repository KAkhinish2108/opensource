import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Car, Bus, Lightbulb, MapPin, Clock, Battery, Navigation2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function SmartServices() {
  const parkingSpots = [
    { name: 'Koramangala Central', available: 45, total: 200, price: '₹20/hr', distance: '1.2 km' },
    { name: 'MG Road Plaza', available: 12, total: 150, price: '₹30/hr', distance: '2.5 km' },
    { name: 'Indiranagar Metro', available: 78, total: 180, price: '₹15/hr', distance: '3.1 km' },
    { name: 'Whitefield Tech Park', available: 5, total: 300, price: '₹25/hr', distance: '8.4 km' },
    { name: 'HSR Sector 1', available: 34, total: 120, price: '₹18/hr', distance: '4.2 km' },
    { name: 'Jayanagar 4th Block', available: 67, total: 100, price: '₹15/hr', distance: '5.8 km' }
  ];

  const busRoutes = [
    { route: 'Route 335E', from: 'Silk Board', to: 'KR Market', eta: '5 mins', seats: 12, status: 'on-time' },
    { route: 'Route 500C', from: 'Whitefield', to: 'Shivaji Nagar', eta: '12 mins', seats: 4, status: 'delayed' },
    { route: 'Route G-4', from: 'Electronic City', to: 'Majestic', eta: '3 mins', seats: 18, status: 'on-time' },
    { route: 'Route 201', from: 'HSR Layout', to: 'Banashankari', eta: '8 mins', seats: 8, status: 'on-time' }
  ];

  const metroLines = [
    { line: 'Purple Line', from: 'Baiyappanahalli', to: 'Mysore Road', status: 'operational', nextTrain: '3 mins' },
    { line: 'Green Line', from: 'Nagasandra', to: 'Silk Institute', status: 'operational', nextTrain: '5 mins' },
    { line: 'Yellow Line', from: 'RV Road', to: 'Bommasandra', status: 'maintenance', nextTrain: 'N/A' }
  ];

  const smartLighting = [
    { zone: 'Koramangala', lights: 450, active: 420, efficiency: 93, mode: 'auto' },
    { zone: 'Whitefield', lights: 680, active: 650, efficiency: 96, mode: 'auto' },
    { zone: 'Indiranagar', lights: 320, active: 310, efficiency: 97, mode: 'auto' },
    { zone: 'HSR Layout', lights: 280, active: 250, efficiency: 89, mode: 'manual' }
  ];

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return 'text-red-600 bg-red-100';
    if (percentage < 30) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Smart Parking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Smart Parking Availability
          </CardTitle>
          <CardDescription>Real-time parking spot availability across major locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingSpots.map((spot, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm mb-1">{spot.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {spot.distance}
                    </div>
                  </div>
                  <Badge className={getOccupancyColor(spot.available, spot.total)}>
                    {spot.available}/{spot.total}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{spot.price}</span>
                  <Button size="sm" variant="outline">Navigate</Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (spot.available / spot.total) * 100 < 10 ? 'bg-red-500' :
                      (spot.available / spot.total) * 100 < 30 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(spot.available / spot.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Public Transport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Live Bus Tracking
            </CardTitle>
            <CardDescription>Real-time bus locations and ETAs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {busRoutes.map((bus, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bus className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">{bus.route}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          ETA: {bus.eta}
                        </div>
                      </div>
                    </div>
                    <Badge variant={bus.status === 'on-time' ? 'default' : 'destructive'}>
                      {bus.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      <span className="text-xs text-gray-500">From:</span> {bus.from}
                    </div>
                    <Navigation2 className="w-4 h-4 text-gray-400" />
                    <div className="text-gray-600">
                      <span className="text-xs text-gray-500">To:</span> {bus.to}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Available Seats:</span>
                    <span className={bus.seats < 5 ? 'text-orange-600' : 'text-green-600'}>
                      {bus.seats} seats
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metro Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation2 className="w-5 h-5" />
              Metro Status
            </CardTitle>
            <CardDescription>Live metro line status and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metroLines.map((metro, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-12 rounded ${
                        metro.line === 'Purple Line' ? 'bg-purple-500' :
                        metro.line === 'Green Line' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="text-sm">{metro.line}</p>
                        <p className="text-xs text-gray-500">
                          {metro.from} → {metro.to}
                        </p>
                      </div>
                    </div>
                    <Badge variant={metro.status === 'operational' ? 'default' : 'secondary'}>
                      {metro.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Next Train:</span>
                    <span className={metro.nextTrain === 'N/A' ? 'text-gray-400' : 'text-blue-600'}>
                      {metro.nextTrain}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View Full Metro Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Lighting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Smart Street Lighting
          </CardTitle>
          <CardDescription>Energy-efficient lighting system status across zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartLighting.map((zone, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm">{zone.zone}</h4>
                  <Lightbulb className={`w-5 h-5 ${zone.mode === 'auto' ? 'text-yellow-500' : 'text-gray-400'}`} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Lights:</span>
                    <span>{zone.lights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active:</span>
                    <span className="text-green-600">{zone.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className={zone.efficiency > 90 ? 'text-green-600' : 'text-orange-600'}>
                      {zone.efficiency}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <Badge variant="outline" className="text-xs">
                      {zone.mode}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Battery className="w-4 h-4 text-green-600" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${zone.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Service Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-24 flex flex-col gap-2" variant="outline">
          <Bus className="w-6 h-6" />
          <span>Plan Journey</span>
        </Button>
        <Button className="h-24 flex flex-col gap-2" variant="outline">
          <MapPin className="w-6 h-6" />
          <span>Nearby Services</span>
        </Button>
        <Button className="h-24 flex flex-col gap-2" variant="outline">
          <Navigation2 className="w-6 h-6" />
          <span>Live Traffic</span>
        </Button>
      </div>
    </div>
  );
}