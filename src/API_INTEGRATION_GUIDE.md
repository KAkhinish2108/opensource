# Smart City Bangalore - Live Data Integration API Guide

## Overview
This guide explains how to integrate real-time data updates into the Smart City Bangalore Dashboard using the Performance Trends Chart API.

---

## Performance Trends Live Data Integration

### Function Signature
```javascript
updatePerformanceTrendsWithLive({ aqi, trafficPct, energyMW, month })
```

### Parameters

| Parameter | Type | Range | Required | Description |
|-----------|------|-------|----------|-------------|
| `aqi` | number | 0-500 | Optional | Air Quality Index value |
| `trafficPct` | number | 0-100 | Optional | Traffic congestion percentage |
| `energyMW` | number | >0 | Optional | Energy consumption in megawatts |
| `month` | string | 3 chars | Optional | Month abbreviation (e.g., "Jan", "Feb") |

### Validation Rules

#### AQI (Air Quality Index)
- **Type**: Number
- **Range**: 0 to 500
- **Description**: Standard AQI measurement
- **Example**: `78` (Good air quality)

#### Traffic Percentage
- **Type**: Number
- **Range**: 0 to 100
- **Description**: Percentage of traffic congestion
- **Example**: `55` (55% congestion)

#### Energy (MW)
- **Type**: Number
- **Range**: Must be positive (> 0)
- **Description**: Energy consumption in megawatts
- **Example**: `2050` (2050 MW)

#### Month
- **Type**: String
- **Format**: 3-letter abbreviation
- **Examples**: "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"

---

## Usage Examples

### 1. Basic Manual Update
```javascript
// Update data for December
updatePerformanceTrendsWithLive({
  aqi: 76,
  trafficPct: 53,
  energyMW: 2000,
  month: "Dec"
});
```

### 2. Update Specific Metrics
```javascript
// Update only AQI for current month
updatePerformanceTrendsWithLive({
  aqi: 82,
  month: "Nov"
});

// Update only traffic for November
updatePerformanceTrendsWithLive({
  trafficPct: 58,
  month: "Nov"
});
```

### 3. Integration with Real API

```javascript
// Example: Fetch from your backend API
async function fetchLiveData() {
  try {
    const response = await fetch('https://your-api.com/city-metrics');
    const data = await response.json();
    
    updatePerformanceTrendsWithLive({
      aqi: data.airQuality.index,
      trafficPct: data.traffic.congestionLevel,
      energyMW: data.energy.totalConsumption,
      month: data.currentMonth
    });
    
    console.log('Successfully updated performance trends');
  } catch (error) {
    console.error('Error fetching live data:', error);
  }
}

// Call immediately
fetchLiveData();

// Set up auto-refresh every 5 minutes
setInterval(fetchLiveData, 300000);
```

### 4. Custom Data Source Function

```javascript
// Define your custom data source
async function myCustomDataSource() {
  // Fetch from multiple APIs
  const aqiData = await fetch('https://api.airquality.com/bangalore').then(r => r.json());
  const trafficData = await fetch('https://api.traffic.com/bangalore').then(r => r.json());
  const energyData = await fetch('https://api.energy.com/bangalore').then(r => r.json());
  
  return {
    aqi: aqiData.current.aqi,
    trafficPct: trafficData.congestion.percentage,
    energyMW: energyData.consumption.current,
    month: new Date().toLocaleString('en-US', { month: 'short' })
  };
}

// Use the custom data source
setInterval(async () => {
  const liveData = await myCustomDataSource();
  updatePerformanceTrendsWithLive(liveData);
}, 60000); // Update every minute
```

---

## Auto-Update System

### Built-in Auto-Update Controls

The Performance Trends Chart includes built-in UI controls for auto-updates:

1. **Start/Pause Button**: Toggle automatic updates on/off
2. **Update Now Button**: Trigger an immediate manual update
3. **Status Display**: Shows last update time and current status

### Programmatic Control

```javascript
// Enable auto-updates with custom interval (in milliseconds)
const updateInterval = 60000; // 60 seconds

const autoUpdateId = setInterval(async () => {
  const liveData = await fetchLiveData();
  updatePerformanceTrendsWithLive(liveData);
}, updateInterval);

// Disable auto-updates
clearInterval(autoUpdateId);
```

---

## Data Source Configuration

### Default Data Source
The chart comes with a default data source that simulates live data:

```javascript
async function defaultDataSource() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = months[new Date().getMonth()];
  
  return {
    aqi: Math.round(75 + Math.random() * 10), // 75-85
    trafficPct: Math.round(50 + Math.random() * 10), // 50-60
    energyMW: Math.round(2000 + Math.random() * 100), // 2000-2100
    month: currentMonth
  };
}
```

### Replace with Real Data Source

You can replace the default data source by modifying the `dataSourceFn.current` reference in the component:

```javascript
// In your initialization code
if (window.performanceTrendsChart) {
  window.performanceTrendsChart.dataSourceFn = myCustomDataSource;
}
```

---

## Error Handling

### Validation Errors

The system automatically validates all input data. Invalid data will be rejected with error messages:

```javascript
// This will fail validation (AQI > 500)
updatePerformanceTrendsWithLive({
  aqi: 600, // ERROR: AQI must be between 0-500
  month: "Dec"
});

// This will fail validation (traffic > 100%)
updatePerformanceTrendsWithLive({
  trafficPct: 150, // ERROR: Traffic must be between 0-100
  month: "Dec"
});

// This will fail validation (negative energy)
updatePerformanceTrendsWithLive({
  energyMW: -50, // ERROR: Energy must be positive
  month: "Dec"
});

// This will fail validation (invalid month format)
updatePerformanceTrendsWithLive({
  aqi: 78,
  month: "December" // ERROR: Month must be 3 characters
});
```

### Handle Validation in Code

```javascript
async function safeUpdate(data) {
  try {
    // Validate data before updating
    if (data.aqi < 0 || data.aqi > 500) {
      throw new Error('Invalid AQI value');
    }
    if (data.trafficPct < 0 || data.trafficPct > 100) {
      throw new Error('Invalid traffic percentage');
    }
    if (data.energyMW <= 0) {
      throw new Error('Invalid energy value');
    }
    
    updatePerformanceTrendsWithLive(data);
    console.log('Update successful');
  } catch (error) {
    console.error('Update failed:', error.message);
    // Handle error (e.g., show notification to user)
  }
}
```

---

## Real-World Integration Examples

### Example 1: OpenWeatherMap AQI Integration

```javascript
async function fetchAQIFromOpenWeather() {
  const API_KEY = 'your_api_key';
  const lat = 12.9716;
  const lon = 77.5946;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  
  const aqiValue = data.list[0].main.aqi * 50; // Convert to standard AQI
  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
  
  updatePerformanceTrendsWithLive({
    aqi: aqiValue,
    month: currentMonth
  });
}

// Update every 30 minutes
setInterval(fetchAQIFromOpenWeather, 1800000);
```

### Example 2: Multiple API Integration

```javascript
async function updateAllMetrics() {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
  
  // Fetch AQI
  const aqiResponse = await fetch('https://api.airquality.com/bangalore');
  const aqiData = await aqiResponse.json();
  
  // Fetch Traffic
  const trafficResponse = await fetch('https://api.traffic.com/bangalore');
  const trafficData = await trafficResponse.json();
  
  // Fetch Energy
  const energyResponse = await fetch('https://api.energy.com/bangalore');
  const energyData = await energyResponse.json();
  
  // Update chart with all metrics
  updatePerformanceTrendsWithLive({
    aqi: aqiData.current,
    trafficPct: trafficData.congestion,
    energyMW: energyData.consumption,
    month: currentMonth
  });
}

// Update every 5 minutes
setInterval(updateAllMetrics, 300000);
```

### Example 3: Supabase Real-time Integration

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

// Subscribe to real-time updates
const channel = supabase
  .channel('city-metrics')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'metrics'
  }, (payload) => {
    updatePerformanceTrendsWithLive({
      aqi: payload.new.aqi,
      trafficPct: payload.new.traffic,
      energyMW: payload.new.energy,
      month: payload.new.month
    });
  })
  .subscribe();
```

---

## Performance Optimization

### Debouncing Updates

If you're receiving frequent updates, consider debouncing:

```javascript
let updateTimeout;

function debouncedUpdate(data) {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    updatePerformanceTrendsWithLive(data);
  }, 1000); // Wait 1 second after last update
}
```

### Batch Updates

Collect multiple updates and apply them in batches:

```javascript
let updateQueue = [];
let processingQueue = false;

async function queueUpdate(data) {
  updateQueue.push(data);
  
  if (!processingQueue) {
    processingQueue = true;
    await processQueue();
  }
}

async function processQueue() {
  while (updateQueue.length > 0) {
    const data = updateQueue.shift();
    updatePerformanceTrendsWithLive(data);
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms between updates
  }
  processingQueue = false;
}
```

---

## Monitoring and Debugging

### Enable Console Logging

All updates are automatically logged to the console:

```javascript
updatePerformanceTrendsWithLive({ aqi: 78, month: "Dec" });
// Console output: "Performance trends updated for Dec"
```

### Check Last Update Time

The UI displays the last update time automatically. You can also track it programmatically:

```javascript
let lastUpdateTime = null;

function trackedUpdate(data) {
  updatePerformanceTrendsWithLive(data);
  lastUpdateTime = new Date();
  console.log(`Last update: ${lastUpdateTime.toLocaleString()}`);
}
```

---

## Best Practices

1. **Validate Before Updating**: Always validate data before calling the update function
2. **Handle Errors Gracefully**: Implement try-catch blocks for API calls
3. **Use Appropriate Intervals**: Don't update too frequently (recommended: 1-5 minutes)
4. **Monitor API Limits**: Be aware of rate limits on external APIs
5. **Cache Data**: Cache API responses to reduce unnecessary calls
6. **User Feedback**: Show loading states and error messages to users
7. **Clean Up**: Clear intervals when component unmounts

---

## Support

For issues or questions:
- Check the browser console for validation errors
- Verify API credentials and endpoints
- Ensure data is in the correct format
- Review the validation rules above

---

## Summary

The Performance Trends Live Data Integration system provides:
- ✅ Real-time data updates
- ✅ Automatic validation
- ✅ Flexible data sources
- ✅ Auto-update scheduling
- ✅ Error handling
- ✅ Easy integration with external APIs
- ✅ Built-in UI controls
- ✅ Console logging for debugging

Start integrating live data into your Smart City Dashboard today!
