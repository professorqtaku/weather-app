import { fetchWeatherApi } from "openmeteo";
import type { GeoData } from "./fetchGeoData";

const url = "https://api.open-meteo.com/v1/forecast";

export type WeatherData = {
  current: CurrentWeatherData;
  daily: DailyWeatherData[];
};

export type CurrentWeatherData = {
  time: Date;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  relativeHumidity: number;
  apparentTemperature: number;
  rain: number;
};

export type DailyWeatherData = {
  time: Date;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
};

export enum TempUnit {
  CELCIUS = "°C",
  FAHRENHEIT = "°F"
}

const fetchWeather = async (props: GeoData): Promise<WeatherData> => {
  const params = {
    latitude: props.latitude,
    longitude: props.longitude,
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "relative_humidity_2m",
      "apparent_temperature",
      "rain"
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min"
    ],
    timezone: "auto"
  };

  const responses = await fetchWeatherApi(url, params);

  // Process first location
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const daily = response.daily()!;

  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      weatherCode: current.variables(1)!.value(),
      windSpeed: current.variables(2)!.value(),
      windDirection: current.variables(3)!.value(),
      windGusts: current.variables(4)!.value(),
      relativeHumidity: current.variables(5)!.value(),
      apparentTemperature: current.variables(6)!.value(),
      rain: current.variables(7)!.value(),
    },
    daily: [],
  };

  const dailyLength = daily.variables(0)!.valuesLength();
  const startTime = Number(daily.time());
  for (let i = 0; i < dailyLength; i++) {
    weatherData.daily.push({
      time: new Date((startTime + utcOffsetSeconds + i * 86400) * 1000), // Add days in seconds
      weatherCode: daily.variables(0)!.valuesArray()![i],
      temperatureMax: daily.variables(1)!.valuesArray()![i],
      temperatureMin: daily.variables(2)!.valuesArray()![i],
    });
  }

  return weatherData;
};

export default fetchWeather;