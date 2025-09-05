import { useState } from "react";
import Search from "./search/Search";
import TodaysWeather from "./today/TodaysWeather";
import { TempUnit, type WeatherData } from "./common/fetchWeather";
import { Status, type GeoData } from "./common/fetchGeoData";
import WeatherNotFound from "./today/WeatherNotFound";

function WeatherApp() {
  // get from localStorage
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [searchStatus, setSearchStatus] = useState<Status>(Status.IDLE);
  const [temperatureUnit, setTemperaturUnit] = useState<TempUnit>(TempUnit.CELCIUS);
  
  return (
    <>
      <div className="p-10 w-screen h-auto">
        <Search setWeatherData={setWeatherData} setGeoData={setGeoData} setSearchStatus={setSearchStatus} />

        {searchStatus == Status.SUCCESS && <TodaysWeather weather={weatherData} geoData={geoData} temperatureUnit={temperatureUnit} />}
        {searchStatus == Status.ERROR && <WeatherNotFound />}
        {searchStatus == Status.IDLE && <p className="text-black">Search something OuO</p>}
      </div>
    </>
  );
}

export default WeatherApp;
