export const getWeatherIcon = (code: number): string => {
  switch (code) {
    case 0: return 'sunny'; // Clear sky
    case 1: return 'sunny'; // Mainly clear
    case 2: return 'partly_cloudy_day'; // Partly cloudy
    case 3: return 'cloud'; // Overcast
    case 45: return 'foggy'; // Fog
    case 48: return 'foggy'; // Depositing rime fog
    case 51: return 'grain'; // Light drizzle
    case 53: return 'grain'; // Moderate drizzle
    case 55: return 'grain'; // Dense drizzle
    case 56: return 'ac_unit'; // Light freezing drizzle
    case 57: return 'ac_unit'; // Dense freezing drizzle
    case 61: return 'rainy'; // Slight rain
    case 63: return 'rainy'; // Moderate rain
    case 65: return 'rainy'; // Heavy rain
    case 66: return 'ac_unit'; // Light freezing rain
    case 67: return 'ac_unit'; // Heavy freezing rain
    case 71: return 'cloudy_snowing'; // Slight snow fall
    case 73: return 'cloudy_snowing'; // Moderate snow fall
    case 75: return 'cloudy_snowing'; // Heavy snow fall
    case 77: return 'ac_unit'; // Snow grains
    case 80: return 'rainy'; // Slight rain showers
    case 81: return 'rainy'; // Moderate rain showers
    case 82: return 'rainy'; // Violent rain showers
    case 85: return 'cloudy_snowing'; // Slight snow showers
    case 86: return 'cloudy_snowing'; // Heavy snow showers
    case 95: return 'thunderstorm'; // Thunderstorm
    case 96: return 'thunderstorm'; // Thunderstorm with slight hail
    case 99: return 'thunderstorm'; // Thunderstorm with heavy hail
    default: return 'sunny';
  }
};

export const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: return 'Fog';
    case 48: return 'Depositing rime fog';
    case 51: return 'Light drizzle';
    case 53: return 'Moderate drizzle';
    case 55: return 'Dense drizzle';
    case 56: return 'Light freezing drizzle';
    case 57: return 'Dense freezing drizzle';
    case 61: return 'Slight rain';
    case 63: return 'Moderate rain';
    case 65: return 'Heavy rain';
    case 66: return 'Light freezing rain';
    case 67: return 'Heavy freezing rain';
    case 71: return 'Slight snow fall';
    case 73: return 'Moderate snow fall';
    case 75: return 'Heavy snow fall';
    case 77: return 'Snow grains';
    case 80: return 'Slight rain showers';
    case 81: return 'Moderate rain showers';
    case 82: return 'Violent rain showers';
    case 85: return 'Slight snow showers';
    case 86: return 'Heavy snow showers';
    case 95: return 'Thunderstorm';
    case 96: return 'Thunderstorm with slight hail';
    case 99: return 'Thunderstorm with heavy hail';
    default: return 'Unknown';
  }
};