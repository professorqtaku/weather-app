import { fetchWeatherApi } from "openmeteo";
import type { GeoData } from "./fetchGeoData";

const url = "https://api.open-meteo.com/v1/forecast";

type FetchWeatherParams = {
  latitude: number;
  longitude: number;
  current?: string[];
  hourly?: string[];
  daily?: string[];
  temperatureUnit?: string
};

export type WeatherData = {
  current: CurrentWeatherData;
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

export enum TempUnit {
  CELCIUS = "°C",
  FAHRENHEIT = "°F"
}

const CURRENT_PARAMS = [
  "temperature_2m",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m",
  "relative_humidity_2m",
  "apparent_temperature",
  "rain",
];

const HOURLY_PARAMS = ["temperature_2m", "precipitation"];
const DAILY_PARAMS = ["weather_code", "temperature_2m_max,temperature_2m_min"];

const fetchWeather = async (props: GeoData) => {
  const params: FetchWeatherParams = {
    longitude: props.longitude,
    latitude: props.latitude,
    current: CURRENT_PARAMS,
    // hourly: HOURLY_PARAMS,
    // daily: DAILY_PARAMS
    // temperatureUnit: "fahrenheit"
  };

  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  // const range = (start: number, stop: number, step: number) =>
  //   Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
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
  };

  // 'weatherData' now contains a simple structure with arrays with datetime and weather data
  console.log(
    `\nCurrent time: ${weatherData.current.time}`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature}`,
    `\nCurrent weatherCode: ${weatherData.current.weatherCode}`,
    `\nCurrent windSpeed_10m: ${weatherData.current.windSpeed}`,
    `\nCurrent windDirection_10m: ${weatherData.current.windDirection}`,
    `\nCurrent windGusts_10m: ${weatherData.current.windGusts}`,
    `\nCurrent relativeHumidity_2m: ${weatherData.current.relativeHumidity}`,
    `\nCurrent apparentTemperature: ${weatherData.current.apparentTemperature}`,
    `\nCurrent rain: ${weatherData.current.rain}`
  );

  return weatherData;
};

export default fetchWeather;
