
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
    <div id="todays_weather" className="glass-panel p-xl rounded-[2rem] relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(54,116,181,0.15)]">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFFDB5] blur-[80px] opacity-40"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">{geoData.name}, {geoData.country}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Monday, 12 Aug 2024</p>
          </div>
          <span className="bg-primary-container text-white px-3 py-1 rounded-full font-label-caps text-label-caps">LIVE</span>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <span className="material-symbols-outlined text-[80px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>{icon}</span>
          <div className="flex flex-col gap-4">
            <span className="font-display-temp text-display-temp text-on-surface">{convertTemp(currentWeather.temperature)}</span>
            <span className="font-headline-md text-headline-md text-on-surface-variant -mt-4">{description}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-md">
          <div className="bg-white/40 p-md rounded-xl border border-white/20">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">FEELS LIKE</p>
            <p className="font-headline-md text-headline-md text-on-surface">{convertTemp(currentWeather.apparentTemperature)}°</p>
          </div>
          <div className="bg-white/40 p-md rounded-xl border border-white/20">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">HUMIDITY</p>
            <p className="font-headline-md text-headline-md text-on-surface">{Math.round(currentWeather.relativeHumidity)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;