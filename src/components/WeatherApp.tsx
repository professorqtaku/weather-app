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
        <h1 className="m-5 text-gray-800 text-lg">Weather app in React.js + TypeScript using Open Meteo API</h1>
        <div className="m-5">
          <Search setWeatherData={setWeatherData} setGeoData={setGeoData} setSearchStatus={setSearchStatus} searchStatus={searchStatus} />
        </div>
        <div className="m-5">
          {searchStatus == Status.SUCCESS && <TodaysWeather weather={weatherData} geoData={geoData} temperatureUnit={temperatureUnit} />}
          {searchStatus == Status.ERROR && <WeatherNotFound />}
          {searchStatus == Status.IDLE && <p className="text-black">Search something OuO</p>}
          {/* {searchStatus == Status.LOADING && <Loading />} */}
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
