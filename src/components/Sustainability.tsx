import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Leaf, MapPin, Zap, TreePine, Droplets, Recycle, Calculator } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function Sustainability() {
  const [transport, setTransport] = useState('');
  const [distance, setDistance] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);

  const greenSpaces = [
    { name: 'Cubbon Park', area: '300 acres', trees: 6000, distance: '2.5 km', rating: 4.8, type: 'Urban Park' },
    { name: 'Lalbagh Botanical Garden', area: '240 acres', trees: 1854, distance: '4.2 km', rating: 4.9, type: 'Botanical Garden' },
    { name: 'Bannerghatta National Park', area: '104 km²', trees: 15000, distance: '22 km', rating: 4.7, type: 'National Park' },
    { name: 'Sankey Tank', area: '37 acres', trees: 800, distance: '3.8 km', rating: 4.5, type: 'Lake Park' },
    { name: 'Ulsoor Lake', area: '125 acres', trees: 1200, distance: '5.1 km', rating: 4.4, type: 'Lake' },
    { name: 'JP Park', area: '85 acres', trees: 2500, distance: '6.3 km', rating: 4.6, type: 'Recreational Park' }
  ];

  const evStations = [
    { name: 'Koramangala EV Hub', available: 4, total: 6, type: 'Fast Charger', power: '50kW', distance: '1.2 km' },
    { name: 'Whitefield Tech Park', available: 2, total: 8, type: 'Fast Charger', power: '50kW', distance: '8.4 km' },
    { name: 'MG Road Station', available: 5, total: 5, type: 'Standard', power: '22kW', distance: '3.5 km' },
    { name: 'HSR Sector 2', available: 1, total: 4, type: 'Fast Charger', power: '50kW', distance: '4.8 km' },
    { name: 'Indiranagar Metro', available: 3, total: 6, type: 'Standard', power: '22kW', distance: '2.9 km' },
    { name: 'Electronic City Phase 1', available: 6, total: 10, type: 'Fast Charger', power: '100kW', distance: '18.2 km' }
  ];

  const wasteStats = [
    { category: 'Recyclable', collected: 2340, target: 3000, percentage: 78 },
    { category: 'Organic', collected: 4560, target: 5000, percentage: 91 },
    { category: 'E-Waste', collected: 890, target: 1000, percentage: 89 },
    { category: 'Plastic', collected: 1230, target: 1500, percentage: 82 }
  ];

  const calculateCarbon = () => {
    if (!transport || !distance) return;
    
    const emissions: { [key: string]: number } = {
      car: 0.21,
      bike: 0.12,
      bus: 0.089,
      metro: 0.041,
      bicycle: 0,
      walking: 0
    };
    
    const result = parseFloat(distance) * emissions[transport];
    setCarbonFootprint(result);
  };

  return (
    <div className="space-y-6">
      {/* Carbon Footprint Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Carbon Footprint Calculator
          </CardTitle>
          <CardDescription>Calculate and track your daily carbon emissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="transport">Mode of Transport</Label>
              <Select value={transport} onValueChange={setTransport}>
                <SelectTrigger id="transport">
                  <SelectValue placeholder="Select transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Personal Car</SelectItem>
                  <SelectItem value="bike">Motorcycle</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="metro">Metro</SelectItem>
                  <SelectItem value="bicycle">Bicycle</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={calculateCarbon} className="w-full">
                Calculate
              </Button>
            </div>
          </div>

          {carbonFootprint !== null && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Your Carbon Footprint</p>
                <p className="text-4xl text-green-700">{carbonFootprint.toFixed(2)} kg</p>
                <p className="text-xs text-gray-500">CO₂ emissions for this journey</p>
                {carbonFootprint > 0 && (
                  <div className="mt-4 p-4 bg-white rounded-lg text-left">
                    <p className="text-sm mb-2">💡 Eco-friendly alternatives:</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• Switch to Metro and save {(carbonFootprint - parseFloat(distance) * 0.041).toFixed(2)} kg CO₂</li>
                      <li>• Use Public Bus and save {(carbonFootprint - parseFloat(distance) * 0.089).toFixed(2)} kg CO₂</li>
                      <li>• Cycle or walk to eliminate all emissions</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Green Spaces */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-green-600" />
            Green Spaces & Parks
          </CardTitle>
          <CardDescription>Discover parks and green zones across Bengaluru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {greenSpaces.map((space, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{space.name}</h4>
                    <Badge variant="outline" className="text-xs">{space.type}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-600">★</span>
                    <span className="text-sm">{space.rating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Area:</span>
                    <span>{space.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees:</span>
                    <span className="text-green-600">{space.trees.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{space.distance}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Get Directions
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* EV Charging Stations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            EV Charging Stations
          </CardTitle>
          <CardDescription>Real-time availability of electric vehicle charging points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evStations.map((station, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm mb-1">{station.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={station.type === 'Fast Charger' ? 'default' : 'secondary'} className="text-xs">
                        {station.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{station.power}</span>
                    </div>
                  </div>
                  <Zap className={`w-5 h-5 ${station.available > 0 ? 'text-green-500' : 'text-gray-300'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available:</span>
                    <span className={station.available > 0 ? 'text-green-600' : 'text-red-600'}>
                      {station.available}/{station.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${station.available > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${(station.available / station.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {station.distance}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full" disabled={station.available === 0}>
                  {station.available > 0 ? 'Reserve Slot' : 'Fully Occupied'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waste Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-blue-600" />
            Waste Management Statistics
          </CardTitle>
          <CardDescription>City-wide waste collection and recycling data (in tons/month)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {wasteStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{stat.category}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.collected.toLocaleString()} / {stat.target.toLocaleString()} tons
                  </div>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      stat.percentage >= 90 ? 'bg-green-500' :
                      stat.percentage >= 75 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                  <span className="absolute right-2 top-0 text-xs text-white">{stat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm mb-3 dark:text-white dark:text-white dark:text-white">Recycling Tips</h4>
            <ul className="text-xs space-y-2 text-gray-700 dark:text-black dark:text-black dark:text-black">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400">•</span>
                <span>Segregate waste at source: Dry, Wet, and Hazardous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400">•</span>
                <span>Compost organic waste at home to reduce landfill burden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400">•</span>
                <span>Dispose e-waste at designated collection centers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400">•</span>
                <span>Use reusable bags and containers to minimize plastic waste</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Goals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6 text-center">
            <Leaf className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <p className="text-2xl text-green-700">487</p>
            <p className="text-sm text-gray-600">Green Spaces</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6 text-center">
            <Droplets className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl text-blue-700">94%</p>
            <p className="text-sm text-gray-600">Water Quality</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="pt-6 text-center">
            <Zap className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl text-yellow-700">156</p>
            <p className="text-sm text-gray-600">EV Stations</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6 text-center">
            <Recycle className="w-10 h-10 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl text-purple-700">85%</p>
            <p className="text-sm text-gray-600">Recycling Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}