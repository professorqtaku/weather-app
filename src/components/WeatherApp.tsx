import { useState } from "react";
import Search from "./search/Search";
import TodaysWeather from "./today/TodaysWeather";
import UpcomingWeather from "./upcoming/UpcomingWeather";
import { TempUnit, type WeatherData } from "./common/fetchWeather";
import { Status, type GeoData } from "./common/fetchGeoData";
import WeatherNotFound from "./today/WeatherNotFound";
import TemperatureToggle from "./TemperatureToggle";

function WeatherApp() {
  // get from localStorage
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [searchStatus, setSearchStatus] = useState<Status>(Status.IDLE);
  const [temperatureUnit, setTemperatureUnit] = useState<TempUnit>(TempUnit.CELCIUS);

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md mesh-gradient flex flex-col">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 border-b border-white/40 bg-white/60 backdrop-blur-[20px] shadow-[0_30px_60px_-15px_rgba(54,116,181,0.15)]">
        <div className="flex justify-between items-center px-margin-mobile py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>cloudy_snowing</span>
            <h1 className="text-2xl font-bold tracking-tighter text-primary font-headline-lg">SkyGlass</h1>
          </div>
          <div className="flex items-center gap-2">
            <TemperatureToggle temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
            <button className="hover:bg-white/80 transition-all duration-300 p-2 rounded-full active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined text-primary">search</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow px-margin-mobile py-lg max-w-7xl mx-auto w-full">
        {/* Search Bar Component */}
        <div className="mb-lg">
          <Search setWeatherData={setWeatherData} setGeoData={setGeoData} setSearchStatus={setSearchStatus} searchStatus={searchStatus} />
        </div>

        {searchStatus === Status.SUCCESS && weatherData && geoData && (
          <>
            {/* Hero Weather Section */}
            <TodaysWeather weather={weatherData} geoData={geoData} temperatureUnit={temperatureUnit} />

            {/* 7-Day Forecast Section */}
            <UpcomingWeather weather={weatherData} temperatureUnit={temperatureUnit} />

            {/* Weather Alerts */}
            <div className="mb-xl">
              <div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-2xl p-md flex gap-md items-start">
                <span className="material-symbols-outlined text-tertiary-container" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                <div>
                  <p className="font-label-caps text-tertiary-container mb-xs">Weather Alert</p>
                  <p className="font-body-md font-bold text-on-surface">Dense Fog Advisory until 10:00 AM</p>
                  <p className="font-body-md text-on-surface-variant text-sm mt-xs">Visibility reduced to less than 1/4 mile in some areas. Drive with caution.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {searchStatus === Status.ERROR && <WeatherNotFound />}
        {searchStatus === Status.IDLE && <p className="text-on-surface">Search for a city to get started.</p>}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/40 bg-white/40 backdrop-blur-md mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 space-y-6 md:space-y-0 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-black text-primary mb-2">SkyGlass</span>
            <p className="text-sm font-body-md leading-relaxed text-on-surface-variant">© 2024 SkyGlass Meteorology. Radiant, Reliable, and Uplifting.</p>
          </div>
          <nav className="flex gap-gutter">
            <a className="text-primary underline decoration-2 font-body-md text-sm" href="#">Forecasts</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm" href="#">Air Quality</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm" href="#">Radar</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm" href="#">Settings</a>
          </nav>
        </div>
      </footer>

      {/* FAB */}
      <div className="fixed bottom-margin-mobile right-margin-mobile">
        <button className="bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>my_location</span>
        </button>
      </div>
    </div>
  );
}

export default WeatherApp;
