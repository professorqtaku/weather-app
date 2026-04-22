import { useState } from "react";
import Search from "./search/Search";
import TodaysWeather from "./today/TodaysWeather";
import UpcomingWeather from "./upcoming/UpcomingWeather";
import { TempUnit, type WeatherData } from "./common/fetchWeather";
import { Status, type GeoData } from "./common/fetchGeoData";
import WeatherNotFound from "./today/WeatherNotFound";
import Header from "./Header";
import Footer from "./Footer";

function WeatherApp() {
  // get from localStorage
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [searchStatus, setSearchStatus] = useState<Status>(Status.IDLE);
  const [temperatureUnit, setTemperatureUnit] = useState<TempUnit>(TempUnit.CELCIUS);

  return (
    <div className="bg-mesh min-h-screen flex flex-col font-body-md text-on-surface">
      <Header temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
          <section className="lg:col-span-4 flex flex-col gap-lg relative">
            <div id="search_bar" className="glass-panel p-xl rounded-[2rem] relative shadow-[0_30px_60px_-15px_rgba(54,116,181,0.15)]">
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFFDB5] blur-[80px] opacity-40"></div>
              <div className="relative z-10">
                <Search setWeatherData={setWeatherData} setGeoData={setGeoData} setSearchStatus={setSearchStatus} searchStatus={searchStatus} />
              </div>
            </div>

            {searchStatus === Status.SUCCESS && weatherData && geoData && (
              <>
                {/* Current Weather Hero */}
                <TodaysWeather weather={weatherData} geoData={geoData} temperatureUnit={temperatureUnit} />

                {/* Small Alert Card */}
                <div className="bg-tertiary-container/10 border-tertiary-container/20 border glass-panel p-md rounded-2xl flex items-center gap-4">
                  <div className="bg-tertiary text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-tertiary">WEATHER ALERT</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">High UV Index today</p>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Main Content Area */}
          <section className="lg:col-span-8 flex flex-col gap-lg">
            {searchStatus === Status.SUCCESS && weatherData && geoData && (
              <>
                {/* Hourly Forecast (Horizontal Scroll) */}
                <div className="glass-panel p-lg rounded-[2rem]">
                  <div className="flex justify-between items-center mb-lg">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Hourly Forecast</h2>
                  </div>
                  <div className="flex gap-md oveflow-x-auto pb-4 scrollbar-hide">
                    {/* Hour Items - Mock data for now */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-white/60 p-md rounded-2xl border border-white/40 min-w-[80px]">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">Now</span>
                      <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>sunny</span>
                      <span className="font-headline-md text-headline-md text-on-surface">24°</span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-primary-container text-white p-md rounded-2xl shadow-lg min-w-[80px]">
                      <span className="font-label-caps text-label-caps opacity-80">14:00</span>
                      <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>sunny</span>
                      <span className="font-headline-md text-headline-md">25°</span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-white/60 p-md rounded-2xl border border-white/40 min-w-[80px]">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">15:00</span>
                      <span className="material-symbols-outlined text-primary text-3xl">cloud</span>
                      <span className="font-headline-md text-headline-md text-on-surface">24°</span>
                    </div>
                  </div>
                </div>

                {/* Bento Grid of Detailed Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {/* Air Quality */}
                  <div className="glass-panel p-lg rounded-[2rem] flex flex-col">
                    <div className="flex items-center gap-2 mb-md">
                      <span className="material-symbols-outlined text-primary">air</span>
                      <h3 className="font-label-caps text-label-caps text-on-surface-variant">AIR QUALITY</h3>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-end mb-sm">
                        <span className="font-headline-md text-headline-md text-on-surface">Good (18)</span>
                        <span className="font-label-caps text-label-caps text-primary">OPTIMAL</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D1F8EF] to-primary w-[18%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* UV Index */}
                  <div className="glass-panel p-lg rounded-[2rem] flex flex-col">
                    <div className="flex items-center gap-2 mb-md">
                      <span className="material-symbols-outlined text-primary">wb_sunny</span>
                      <h3 className="font-label-caps text-label-caps text-on-surface-variant">UV INDEX</h3>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-end mb-sm">
                        <span className="font-headline-md text-headline-md text-on-surface">Low (2)</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">USE PROTECTION</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-200 to-tertiary-container w-[20%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Forecast (Full Width) */}
                  <div className="md:col-span-2">
                    <UpcomingWeather weather={weatherData} temperatureUnit={temperatureUnit} />
                  </div>
                </div>
              </>
            )}

            {searchStatus === Status.ERROR && <WeatherNotFound />}
          </section>
        </div>
      </main>

      <Footer />

      {/* FAB for adding location */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        <span className="material-symbols-outlined text-3xl">add_location</span>
      </button>
    </div>
  );
}

export default WeatherApp;
