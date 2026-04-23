# Weather App

A modern weather application built with React, TypeScript, and Vite that displays current and upcoming weather conditions.

## Preview

Project deployed on Vercel: https://www.professorqtaku-weather-app.vercel.app

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **HTTP Client**: Axios
- **Weather Data**: [Open Meteo API](https://open-meteo.com/en/docs)
- **Utilities**: Lodash (debounce/throttle)

## Features

1. **Search** - Search for any city using Open Meteo's Geocoding API with autocomplete suggestions
2. **Current Weather** - Display today's weather with hourly forecast
3. **Upcoming Days** - 7-day weather forecast with min/max temperatures
4. **Temperature Toggle** - Switch between Celsius and Fahrenheit

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared utilities (API fetch functions)
│   ├── search/          # Search bar with debounce/throttle
│   ├── today/           # Current weather display
│   ├── upcoming/       # 7-day forecast
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TemperatureToggle.tsx
│   └── WeatherApp.tsx
├── utils/
│   ├── weatherIcons.ts
│   └── weatherCode.json
├── App.tsx
├── main.tsx
└── index.css
```

## How to Run

In the root of the folder, run these following commands:

> npm install

> npm run dev

> visit https://localhost:5173

### Features

#### 1. Search Bar
The [Open Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) converts city names to latitude/longitude coordinates. Search returns a dropdown of matching locations.

- **Debounce**: 300ms delay before triggering search
- **Throttle**: 500ms cooldown between API calls

#### 2. Current Weather
Display today's weather with hourly forecasts. Shows:
- Temperature (current, high/low)
- Weather condition with icon
- Hourly forecast for the next 24 hours

#### 3. Upcoming Days
7-day forecast showing:
- Date
- Weather icon
- Min/Max temperature

### Further Development Ideas
- Add more weather details (humidity, wind speed, UV index)
- Improve hourly forecast to show all 24 hours
- Add weather alerts and notifications
- Implement local storage for favorite locations
- Add dark mode support
- Create a share feature for current weather

## Known Issues
- Hourly forecast limited to next 2 hours
- Search dropdown doesn't close after selecting a city
