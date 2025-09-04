import { useState } from "react";
import Search from "./search/Search";
import TodaysWeather from "./today/TodaysWeather";
import { TempUnit, type WeatherData } from "./common/fetchWeather";
import type { GeoData } from "./common/fetchGeoData";

enum SearchStatus {
    SUCCESS,
    LOADING,
    ERROR,
    IDLE
}

function WeatherApp() {
  // get from localStorage
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(SearchStatus.IDLE);
  const [temperatureUnit, setTemperaturUnit] = useState<TempUnit>(TempUnit.CELCIUS);
  
  return (
    <>
      <div className="p-10 w-screen h-auto">
        <Search setWeatherData={setWeatherData} setGeoData={setGeoData} />
        <TodaysWeather weather={weatherData} geoData={geoData} temperatureUnit={temperatureUnit} />
      </div>
    </>
  );
}

export default WeatherApp;
