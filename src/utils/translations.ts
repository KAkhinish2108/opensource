export type Language = 'en' | 'kn' | 'hi';

export const translations = {
  en: {
    // Header
    appTitle: 'Smart City Bengaluru',
    appSubtitle: 'Real-time Urban Intelligence Platform',
    currentWeather: 'Current Weather',
    partlyCloudy: 'Partly Cloudy',
    
    // Tabs
    overview: 'Overview',
    traffic: 'Traffic',
    airQuality: 'Air Quality',
    services: 'Services',
    sustainability: 'Sustainability',
    citizenHub: 'Citizen Hub',
    energy: 'Energy',
    insights: 'Insights',
    alerts: 'Alerts',
    
    // Dashboard Metrics
    trafficFlow: 'Traffic Flow',
    moderate: 'Moderate',
    airQualityIndex: 'Air Quality Index',
    unhealthy: 'Unhealthy',
    energyConsumption: 'Energy Consumption',
    normal: 'Normal',
    publicTransport: 'Public Transport',
    active: 'Active',
    wasteManagement: 'Waste Management',
    efficient: 'Efficient',
    waterQuality: 'Water Quality',
    good: 'Good',
    
    // Zone Performance
    zonePerformance: 'Zone-wise Performance',
    zonePerformanceDesc: 'Real-time metrics across major zones in Bengaluru',
    koramangala: 'Koramangala',
    indiranagar: 'Indiranagar',
    jayanagar: 'Jayanagar',
    malleshwaram: 'Malleshwaram',
    hsrLayout: 'HSR Layout',
    whitefield: 'Whitefield',
    aqi: 'AQI',
    
    // Recent Alerts
    recentAlerts: 'Recent Alerts',
    highTrafficCongestion: 'High traffic congestion on ORR near Silk Board',
    airQualityDeteriorating: 'Air quality deteriorating in Whitefield area',
    parkingMaintenance: 'Smart parking system maintenance in Koramangala',
    energySpike: 'Energy consumption spike detected in HSR Layout',
    minsAgo: 'mins ago',
    hourAgo: 'hour ago',
    hoursAgo: 'hours ago',
    
    // Quick Actions
    reportIssue: 'Report Issue',
    viewEvents: 'View Events',
    checkAQI: 'Check AQI',
    
    // Traffic Map
    trafficDensity: 'Traffic Density Map',
    trafficDesc: 'Real-time traffic monitoring across Bengaluru',
    congestionLevel: 'Congestion Level',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    averageSpeed: 'Average Speed',
    peakHours: 'Peak Hours',
    
    // Air Quality
    airQualityZones: 'Air Quality Zones',
    airQualityDesc: 'Real-time air quality monitoring',
    pm25Level: 'PM2.5 Level',
    pollutionIndex: 'Pollution Index',
    
    // Smart Services
    smartParking: 'Smart Parking',
    availableSpots: 'Available Spots',
    spots: 'spots',
    busTracking: 'Public Bus Tracking',
    activeBuses: 'Active Buses',
    buses: 'buses',
    metroStatus: 'Metro Status',
    onTime: 'On Time',
    bikeSharing: 'Bike Sharing',
    availableBikes: 'Available Bikes',
    bikes: 'bikes',
    
    // Sustainability
    carbonFootprint: 'Carbon Footprint Calculator',
    evCharging: 'EV Charging Stations',
    solarEnergy: 'Solar Energy Production',
    greenCover: 'Green Cover Index',
    
    // Citizen Engagement
    activePoll: 'Active Poll',
    reportAConcern: 'Report a Concern',
    communityEvents: 'Community Events',
    feedback: 'Feedback',
    
    // Energy Dashboard
    gridStatus: 'Smart Grid Status',
    consumption: 'Consumption',
    generation: 'Generation',
    renewableEnergy: 'Renewable Energy',
    
    // Footer
    footerDesc: 'Building a sustainable, efficient, and citizen-centric urban ecosystem through technology and innovation.',
    quickLinks: 'Quick Links',
    aboutProject: 'About the Project',
    dataPrivacy: 'Data Privacy',
    openDataPortal: 'Open Data Portal',
    contactUs: 'Contact Us',
    dataSources: 'Data Sources',
    dataSourcesDesc: 'Real-time data integrated from OpenWeatherMap, TomTom Traffic, Air Quality Index APIs, and Bengaluru Smart City Initiative.',
    copyright: '© 2024 Smart City Bengaluru. All rights reserved.',
  },
  
  kn: {
    // Header
    appTitle: 'ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಬೆಂಗಳೂರು',
    appSubtitle: 'ನೈಜ-ಸಮಯದ ನಗರ ಗುಪ್ತಚರ ವೇದಿಕೆ',
    currentWeather: 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ',
    partlyCloudy: 'ಭಾಗಶಃ ಮೋಡ',
    
    // Tabs
    overview: 'ಅವಲೋಕನ',
    traffic: 'ಸಂಚಾರ',
    airQuality: 'ಗಾಳಿ ಗುಣಮಟ್ಟ',
    services: 'ಸೇವೆಗಳು',
    sustainability: 'ಸುಸ್ಥಿರತೆ',
    citizenHub: 'ನಾಗರಿಕ ಕೇಂದ್ರ',
    energy: 'ಶಕ್ತಿ',
    insights: 'ಒಳನೋಟಗಳು',
    alerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    
    // Dashboard Metrics
    trafficFlow: 'ಸಂಚಾರ ಹರಿವು',
    moderate: 'ಮಧ್ಯಮ',
    airQualityIndex: 'ಗಾಳಿ ಗುಣಮಟ್ಟ ಸೂಚ್ಯಂಕ',
    unhealthy: 'ಅನಾರೋಗ್ಯಕಾರ',
    energyConsumption: 'ಶಕ್ತಿ ಬಳಕೆ',
    normal: 'ಸಾಮಾನ್ಯ',
    publicTransport: 'ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ',
    active: 'ಸಕ್ರಿಯ',
    wasteManagement: 'ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ',
    efficient: 'ಪರಿಣಾಮಕಾರಿ',
    waterQuality: 'ನೀರಿನ ಗುಣಮಟ್ಟ',
    good: 'ಉತ್ತಮ',
    
    // Zone Performance
    zonePerformance: 'ವಲಯ-ವಾರು ಕಾರ್ಯಕ್ಷಮತೆ',
    zonePerformanceDesc: 'ಬೆಂಗಳೂರಿನ ಪ್ರಮುಖ ವಲಯಗಳಾದ್ಯಂತ ನೈಜ-ಸಮಯದ ಮಾಪನಗಳು',
    koramangala: 'ಕೊರಮಂಗಲ',
    indiranagar: 'ಇಂದಿರಾನಗರ',
    jayanagar: 'ಜಯನಗರ',
    malleshwaram: 'ಮಲ್ಲೇಶ್ವರಂ',
    hsrLayout: 'ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್',
    whitefield: 'ವೈಟ್‌ಫೀಲ್ಡ್',
    aqi: 'ಎಕ್ಯೂಐ',
    
    // Recent Alerts
    recentAlerts: 'ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆಗಳು',
    highTrafficCongestion: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಬಳಿ ಓಆರ್‌ಆರ್‌ನಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಂಚಾರ ದಟ್ಟಣೆ',
    airQualityDeteriorating: 'ವೈಟ್‌ಫೀಲ್ಡ್ ಪ್ರದೇಶದಲ್ಲಿ ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಹದಗೆಡುತ್ತಿದೆ',
    parkingMaintenance: 'ಕೊರಮಂಗಲದಲ್ಲಿ ಸ್ಮಾರ್ಟ್ ಪಾರ್ಕಿಂಗ್ ವ್ಯವಸ್ಥೆ ನಿರ್ವಹಣೆ',
    energySpike: 'ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್‌ನಲ್ಲಿ ಶಕ್ತಿ ಬಳಕೆ ಏರಿಕೆ ಪತ್ತೆಯಾಗಿದೆ',
    minsAgo: 'ನಿಮಿಷಗಳ ಹಿಂದೆ',
    hourAgo: 'ಗಂಟೆಯ ಹಿಂದೆ',
    hoursAgo: 'ಗಂಟೆಗಳ ಹಿಂದೆ',
    
    // Quick Actions
    reportIssue: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
    viewEvents: 'ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ',
    checkAQI: 'ಎಕ್ಯೂಐ ಪರಿಶೀಲಿಸಿ',
    
    // Traffic Map
    trafficDensity: 'ಸಂಚಾರ ಸಾಂದ್ರತೆ ನಕ್ಷೆ',
    trafficDesc: 'ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ನೈಜ-ಸಮಯದ ಸಂಚಾರ ಮೇಲ್ವಿಚಾರಣೆ',
    congestionLevel: 'ದಟ್ಟಣೆ ಮಟ್ಟ',
    high: 'ಹೆಚ್ಚು',
    medium: 'ಮಧ್ಯಮ',
    low: 'ಕಡಿಮೆ',
    averageSpeed: 'ಸರಾಸರಿ ವೇಗ',
    peakHours: 'ಗರಿಷ್ಠ ಸಮಯ',
    
    // Air Quality
    airQualityZones: 'ಗಾಳಿ ಗುಣಮಟ್ಟ ವಲಯಗಳು',
    airQualityDesc: 'ನೈಜ-ಸಮಯದ ಗಾಳಿ ಗುಣಮಟ್ಟ ಮೇಲ್ವಿಚಾರಣೆ',
    pm25Level: 'PM2.5 ಮಟ್ಟ',
    pollutionIndex: 'ಮಾಲಿನ್ಯ ಸೂಚ್ಯಂಕ',
    
    // Smart Services
    smartParking: 'ಸ್ಮಾರ್ಟ್ ಪಾರ್ಕಿಂಗ್',
    availableSpots: 'ಲಭ್ಯ ಸ್ಥಳಗಳು',
    spots: 'ಸ್ಥಳಗಳು',
    busTracking: 'ಸಾರ್ವಜನಿಕ ಬಸ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    activeBuses: 'ಸಕ್ರಿಯ ಬಸ್‌ಗಳು',
    buses: 'ಬಸ್‌ಗಳು',
    metroStatus: 'ಮೆಟ್ರೋ ಸ್ಥಿತಿ',
    onTime: 'ಸಮಯಕ್ಕೆ',
    bikeSharing: 'ಬೈಕ್ ಹಂಚಿಕೆ',
    availableBikes: 'ಲಭ್ಯ ಬೈಕ್‌ಗಳು',
    bikes: 'ಬೈಕ್‌ಗಳು',
    
    // Sustainability
    carbonFootprint: 'ಕಾರ್ಬನ್ ಹೆಜ್ಜೆಗುರುತು ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    evCharging: 'ಇವಿ ಚಾರ್ಜಿಂಗ್ ಸ್ಟೇಷನ್‌ಗಳು',
    solarEnergy: 'ಸೌರ ಶಕ್ತಿ ಉತ್ಪಾದನೆ',
    greenCover: 'ಹಸಿರು ಹೊದಿಕೆ ಸೂಚ್ಯಂಕ',
    
    // Citizen Engagement
    activePoll: 'ಸಕ್ರಿಯ ಮತದಾನ',
    reportAConcern: 'ಕಾಳಜಿಯನ್ನು ವರದಿ ಮಾಡಿ',
    communityEvents: 'ಸಮುದಾಯ ಕಾರ್ಯಕ್ರಮಗಳು',
    feedback: 'ಪ್ರತಿಕ್ರಿಯೆ',
    
    // Energy Dashboard
    gridStatus: 'ಸ್ಮಾರ್ಟ್ ಗ್ರಿಡ್ ಸ್ಥಿತಿ',
    consumption: 'ಬಳಕೆ',
    generation: 'ಉತ್ಪಾದನೆ',
    renewableEnergy: 'ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ',
    
    // Footer
    footerDesc: 'ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ನಾವೀನ್ಯತೆಯ ಮೂಲಕ ಸುಸ್ಥಿರ, ಸಮರ್ಥ ಮತ್ತು ನಾಗರಿಕ-ಕೇಂದ್ರಿತ ನಗರ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ಮಿಸುವುದು.',
    quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    aboutProject: 'ಯೋಜನೆ ಬಗ್ಗೆ',
    dataPrivacy: 'ಡೇಟಾ ಗೌಪ್ಯತೆ',
    openDataPortal: 'ಮುಕ್ತ ಡೇಟಾ ಪೋರ್ಟಲ್',
    contactUs: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    dataSources: 'ಡೇಟಾ ಮೂಲಗಳು',
    dataSourcesDesc: 'OpenWeatherMap, TomTom Traffic, Air Quality Index APIs ಮತ್ತು ಬೆಂಗಳೂರು ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಇನಿಶಿಯೇಟಿವ್‌ನಿಂದ ಏಕೀಕೃತ ನೈಜ-ಸಮಯದ ಡೇಟಾ.',
    copyright: '© 2024 ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಬೆಂಗಳೂರು. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  },
  
  hi: {
    // Header
    appTitle: 'स्मार्ट सिटी बेंगलुरु',
    appSubtitle: 'रियल-टाइम शहरी खुफिया मंच',
    currentWeather: 'वर्तमान मौसम',
    partlyCloudy: 'आंशिक बादल',
    
    // Tabs
    overview: 'अवलोकन',
    traffic: 'यातायात',
    airQuality: 'वायु गुणवत्ता',
    services: 'सेवाएं',
    sustainability: 'स्थिरता',
    citizenHub: 'नागरिक केंद्र',
    energy: 'ऊर्जा',
    insights: 'अंतर्दृष्टि',
    alerts: 'अलर्ट',
    
    // Dashboard Metrics
    trafficFlow: 'यातायात प्रवाह',
    moderate: 'मध्यम',
    airQualityIndex: 'वायु गुणवत्ता सूचकांक',
    unhealthy: 'अस्वास्थ्यकर',
    energyConsumption: 'ऊर्जा खपत',
    normal: 'सामान्य',
    publicTransport: 'सार्वजनिक परिवहन',
    active: 'सक्रिय',
    wasteManagement: 'अपशिष्ट प्रबंधन',
    efficient: 'कुशल',
    waterQuality: 'जल गुणवत्ता',
    good: 'अच्छा',
    
    // Zone Performance
    zonePerformance: 'जोन-वार प्रदर्शन',
    zonePerformanceDesc: 'बेंगलुरु में प्रमुख जोनों में रियल-टाइम मेट्रिक्स',
    koramangala: 'कोरमंगला',
    indiranagar: 'इंदिरानगर',
    jayanagar: 'जयनगर',
    malleshwaram: 'मल्लेश्वरम',
    hsrLayout: 'एचएसआर लेआउट',
    whitefield: 'व्हाइटफील्ड',
    aqi: 'एक्यूआई',
    
    // Recent Alerts
    recentAlerts: 'हाल के अलर्ट',
    highTrafficCongestion: 'सिल्क बोर्ड के पास ओआरआर पर उच्च यातायात भीड़',
    airQualityDeteriorating: 'व्हाइटफील्ड क्षेत्र में वायु गुणवत्ता बिगड़ रही है',
    parkingMaintenance: 'कोरमंगला में स्मार्ट पार्किंग सिस्टम रखरखाव',
    energySpike: 'एचएसआर लेआउट में ऊर्जा खपत वृद्धि का पता चला',
    minsAgo: 'मिनट पहले',
    hourAgo: 'घंटे पहले',
    hoursAgo: 'घंटे पहले',
    
    // Quick Actions
    reportIssue: 'समस्या रिपोर्ट करें',
    viewEvents: 'कार्यक्रम देखें',
    checkAQI: 'एक्यूआई जांचें',
    
    // Traffic Map
    trafficDensity: 'यातायात घनत्व मानचित्र',
    trafficDesc: 'बेंगलुरु में रियल-टाइम यातायात निगरानी',
    congestionLevel: 'भीड़ स्तर',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    averageSpeed: 'औसत गति',
    peakHours: 'पीक समय',
    
    // Air Quality
    airQualityZones: 'वायु गुणवत्ता जोन',
    airQualityDesc: 'रियल-टाइम वायु गुणवत्ता निगरानी',
    pm25Level: 'PM2.5 स्तर',
    pollutionIndex: 'प्रदूषण सूचकांक',
    
    // Smart Services
    smartParking: 'स्मार्ट पार्किंग',
    availableSpots: 'उपलब्ध स्थान',
    spots: 'स्थान',
    busTracking: 'सार्वजनिक बस ट्रैकिंग',
    activeBuses: 'सक्रिय बसें',
    buses: 'बसें',
    metroStatus: 'मेट्रो स्थिति',
    onTime: 'समय पर',
    bikeSharing: 'बाइक शेयरिंग',
    availableBikes: 'उपलब्ध बाइक',
    bikes: 'बाइक',
    
    // Sustainability
    carbonFootprint: 'कार्बन फुटप्रिंट कैलकुलेटर',
    evCharging: 'ईवी चार्जिंग स्टेशन',
    solarEnergy: 'सौर ऊर्जा उत्पादन',
    greenCover: 'हरित आवरण सूचकांक',
    
    // Citizen Engagement
    activePoll: 'सक्रिय चुनाव',
    reportAConcern: 'चिंता रिपोर्ट करें',
    communityEvents: 'सामुदायिक कार्यक्रम',
    feedback: 'प्रतिक्रिया',
    
    // Energy Dashboard
    gridStatus: 'स्मार्ट ग्रिड स्थिति',
    consumption: 'खपत',
    generation: 'उत्पादन',
    renewableEnergy: 'नवीकरणीय ऊर्जा',
    
    // Footer
    footerDesc: 'प्रौद्योगिकी और नवाचार के माध्यम से एक स्थायी, कुशल और नागरिक-केंद्रित शहरी पारिस्थितिकी तंत्र का निर्माण।',
    quickLinks: 'त्वरित लिंक',
    aboutProject: 'परियोजना के बारे में',
    dataPrivacy: 'डेटा गोपनीयता',
    openDataPortal: 'खुला डेटा पोर्टल',
    contactUs: 'संपर्क करें',
    dataSources: 'डेटा स्रोत',
    dataSourcesDesc: 'OpenWeatherMap, TomTom Traffic, Air Quality Index APIs और बेंगलुरु स्मार्ट सिटी इनिशिएटिव से एकीकृत रियल-टाइम डेटा।',
    copyright: '© 2024 स्मार्ट सिटी बेंगलुरु। सर्वाधिकार सुरक्षित।',
  },
};

export const languageNames = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
};