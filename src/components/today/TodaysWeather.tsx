
import type { GeoData } from "../common/fetchGeoData";
import { TempUnit, type WeatherData } from "../common/fetchWeather";
import { getWeatherIcon, getWeatherDescription } from "../../utils/weatherIcons";

type TodaysWeatherProps = {
  weather?: WeatherData | null;
  geoData?: GeoData | null;
  temperatureUnit: TempUnit;
};

const TodaysWeather = (props: TodaysWeatherProps) => {
  const { weather, geoData, temperatureUnit } = props;

  if (weather == null || geoData == null || weather.current == null) {
    return null;
  }

  const currentWeather = weather.current;
  const icon = getWeatherIcon(currentWeather.weatherCode);
  const description = getWeatherDescription(currentWeather.weatherCode);

  const convertTemp = (temp: number) => {
    if (temperatureUnit === TempUnit.FAHRENHEIT) {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <>
      {/* Hero Weather Section */}
      <section className="glass-panel rounded-[32px] p-xl mb-lg text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFFDB5] rounded-full blur-[60px] opacity-40"></div>
        <div className="relative z-10">
          <p className="font-label-caps text-primary uppercase mb-xs">Current Location</p>
          <h2 className="font-headline-lg text-on-surface mb-md">{geoData.name}, {geoData.country}</h2>
          <div className="flex flex-col items-center mb-md">
            <span className="material-symbols-outlined text-[80px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>{icon}</span>
            <div className="flex items-start justify-center">
              <span className="font-display-temp text-primary">{convertTemp(currentWeather.temperature)}</span>
              <span className="font-headline-md text-primary-container mt-4">{temperatureUnit}</span>
            </div>
            <p className="font-body-lg text-on-surface-variant font-semibold">{description}</p>
          </div>
          <div className="grid grid-cols-3 gap-md border-t border-white/40 pt-lg mt-md">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary mb-xs" style={{fontVariationSettings: "'FILL' 0"}}>air</span>
              <p className="font-label-caps text-on-surface-variant">Wind</p>
              <p className="font-body-md font-bold text-on-surface">{Math.round(currentWeather.windSpeed)} mph</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary mb-xs" style={{fontVariationSettings: "'FILL' 0"}}>humidity_mid</span>
              <p className="font-label-caps text-on-surface-variant">Humidity</p>
              <p className="font-body-md font-bold text-on-surface">{Math.round(currentWeather.relativeHumidity)}%</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary mb-xs" style={{fontVariationSettings: "'FILL' 0"}}>umbrella</span>
              <p className="font-label-caps text-on-surface-variant">Rain</p>
              <p className="font-body-md font-bold text-on-surface">{Math.round(currentWeather.rain * 100)}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Highlights */}
      <div className="grid grid-cols-2 gap-lg mb-lg">
        {/* Air Quality */}
        <div className="glass-panel rounded-2xl p-md">
          <div className="flex items-center gap-sm mb-sm">
            <span className="material-symbols-outlined text-primary text-sm">aq</span>
            <p className="font-label-caps text-on-surface-variant">Air Quality</p>
          </div>
          <p className="font-headline-md text-on-surface">24 — Good</p>
          <div className="w-full h-1.5 bg-secondary-fixed rounded-full mt-md overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D1F8EF] to-[#3674B5]" style={{width: '24%'}}></div>
          </div>
        </div>
        {/* UV Index */}
        <div className="glass-panel rounded-2xl p-md">
          <div className="flex items-center gap-sm mb-sm">
            <span className="material-symbols-outlined text-primary text-sm">wb_sunny</span>
            <p className="font-label-caps text-on-surface-variant">UV Index</p>
          </div>
          <p className="font-headline-md text-on-surface">4 — Moderate</p>
          <div className="w-full h-1.5 bg-secondary-fixed rounded-full mt-md overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D1F8EF] to-[#3674B5]" style={{width: '40%'}}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysWeather;