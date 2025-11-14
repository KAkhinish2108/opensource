import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, Calendar, AlertCircle, ThumbsUp, Send, MapPin, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';

export default function CitizenEngagement() {
  const [issueType, setIssueType] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const polls = [
    {
      id: 1,
      question: 'Should Bengaluru introduce congestion pricing in peak hours?',
      options: [
        { text: 'Yes, it will reduce traffic', votes: 1245, percentage: 62 },
        { text: 'No, it will burden citizens', votes: 758, percentage: 38 }
      ],
      totalVotes: 2003,
      active: true
    },
    {
      id: 2,
      question: 'Which area needs more green spaces?',
      options: [
        { text: 'Whitefield', votes: 890, percentage: 35 },
        { text: 'Electronic City', votes: 1120, percentage: 44 },
        { text: 'Koramangala', votes: 540, percentage: 21 }
      ],
      totalVotes: 2550,
      active: true
    },
    {
      id: 3,
      question: 'Priority for next infrastructure project?',
      options: [
        { text: 'Metro expansion', votes: 1567, percentage: 48 },
        { text: 'More cycling lanes', votes: 890, percentage: 27 },
        { text: 'Smart parking', votes: 823, percentage: 25 }
      ],
      totalVotes: 3280,
      active: true
    }
  ];

  const recentIssues = [
    { id: 1, type: 'Pothole', location: 'Koramangala 5th Block', status: 'in-progress', votes: 45, date: '2 days ago' },
    { id: 2, type: 'Street Light', location: 'Indiranagar Main Road', status: 'resolved', votes: 32, date: '5 days ago' },
    { id: 3, type: 'Waste Collection', location: 'HSR Layout Sector 2', status: 'pending', votes: 78, date: '1 day ago' },
    { id: 4, type: 'Water Supply', location: 'Whitefield Tech Park', status: 'in-progress', votes: 56, date: '3 days ago' },
    { id: 5, type: 'Traffic Signal', location: 'Silk Board Junction', status: 'pending', votes: 123, date: '4 hours ago' }
  ];

  const upcomingEvents = [
    {
      title: 'Clean Bengaluru Drive',
      date: 'Nov 20, 2024',
      time: '7:00 AM - 10:00 AM',
      location: 'Cubbon Park',
      participants: 234,
      category: 'Environment'
    },
    {
      title: 'Smart City Tech Summit',
      date: 'Nov 25, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'KTPO Convention Center',
      participants: 567,
      category: 'Technology'
    },
    {
      title: 'Cycle to Work Day',
      date: 'Nov 28, 2024',
      time: '6:00 AM - 9:00 AM',
      location: 'City Wide',
      participants: 892,
      category: 'Sustainability'
    },
    {
      title: 'Waste Segregation Workshop',
      date: 'Dec 1, 2024',
      time: '10:00 AM - 12:00 PM',
      location: 'Jayanagar Community Hall',
      participants: 156,
      category: 'Education'
    }
  ];

  const handleSubmitIssue = () => {
    if (issueType && issueLocation && issueDescription) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIssueType('');
        setIssueLocation('');
        setIssueDescription('');
      }, 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment': return 'bg-green-100 text-green-700';
      case 'Technology': return 'bg-blue-100 text-blue-700';
      case 'Sustainability': return 'bg-emerald-100 text-emerald-700';
      case 'Education': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report an Issue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Report a Civic Issue
          </CardTitle>
          <CardDescription>Help us improve the city by reporting problems</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg text-green-800 mb-2">Issue Reported Successfully!</h3>
              <p className="text-sm text-gray-600">Thank you for helping make Bengaluru better. We'll address this soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pothole">Pothole</SelectItem>
                      <SelectItem value="streetlight">Street Light</SelectItem>
                      <SelectItem value="waste">Waste Collection</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="traffic">Traffic Signal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      placeholder="Enter location or use GPS"
                      value={issueLocation}
                      onChange={(e) => setIssueLocation(e.target.value)}
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
                <Button onClick={handleSubmitIssue} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Issue
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Citizen Reports
          </CardTitle>
          <CardDescription>Issues reported by fellow citizens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm">{issue.type}</h4>
                      <Badge className={getStatusColor(issue.status)} variant="outline">
                        {issue.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {issue.location}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{issue.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {issue.votes} Support
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Polls and Surveys */}
      <Card>
        <CardHeader>
          <CardTitle>Active Polls</CardTitle>
          <CardDescription>Share your opinion on city matters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {polls.map((poll) => (
              <div key={poll.id} className="border rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="text-sm mb-1">{poll.question}</h4>
                  <p className="text-xs text-gray-500">{poll.totalVotes.toLocaleString()} votes</p>
                </div>
                <div className="space-y-3">
                  {poll.options.map((option, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{option.text}</span>
                        <span className="text-sm text-gray-600">{option.percentage}%</span>
                      </div>
                      <Progress value={option.percentage} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{option.votes.toLocaleString()} votes</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Cast Your Vote
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Community Events
          </CardTitle>
          <CardDescription>Join community initiatives and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm mb-2">{event.title}</h4>
                    <Badge className={getCategoryColor(event.category)} variant="outline">
                      {event.category}
                    </Badge>
                  </div>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-600">{event.participants} participants</span>
                  <Button size="sm" variant="outline">Register</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Citizen Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl text-blue-700">1,234</p>
            <p className="text-sm text-gray-600">Issues Reported</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6 text-center">
            <ThumbsUp className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <p className="text-2xl text-green-700">892</p>
            <p className="text-sm text-gray-600">Issues Resolved</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6 text-center">
            <MessageSquare className="w-10 h-10 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl text-purple-700">12.5K</p>
            <p className="text-sm text-gray-600">Active Citizens</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6 text-center">
            <Calendar className="w-10 h-10 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl text-orange-700">45</p>
            <p className="text-sm text-gray-600">Events This Month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
