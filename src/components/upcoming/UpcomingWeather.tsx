import { TempUnit, type WeatherData } from "../common/fetchWeather";
import { getWeatherIcon } from "../../utils/weatherIcons";

type UpcomingWeatherProps = {
  weather: WeatherData;
  temperatureUnit: TempUnit;
};

const UpcomingWeather = ({ weather, temperatureUnit }: UpcomingWeatherProps) => {
  const convertTemp = (temp: number) => {
    if (temperatureUnit === TempUnit.FAHRENHEIT) {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getDayName = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getPrecipitationChance = (code: number) => {
    // Simplified precipitation chance based on weather code
    if (code >= 80 && code <= 82) return 80; // Rain showers
    if (code >= 85 && code <= 86) return 70; // Snow showers
    if (code >= 61 && code <= 65) return 60; // Rain
    if (code >= 71 && code <= 75) return 50; // Snow
    if (code >= 51 && code <= 55) return 30; // Drizzle
    return 0;
  };

  return (
    <section className="glass-panel rounded-[24px] overflow-hidden mb-xl">
      <div className="px-md py-lg border-b border-white/20 bg-white/20">
        <div className="flex justify-between items-center">
          <h3 className="font-label-caps text-primary flex items-center gap-sm">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            7-Day Forecast
          </h3>
          <button className="font-label-caps text-tertiary-container hover:underline">See Details</button>
        </div>
      </div>
      <div className="divide-y divide-white/20">
        {weather.daily.slice(0, 7).map((day, index) => {
          const icon = getWeatherIcon(day.weatherCode);
          const precipChance = getPrecipitationChance(day.weatherCode);
          const isAlert = precipChance > 70; // Mock alert for high precipitation

          return (
            <div key={index} className="flex items-center justify-between px-md py-4 hover:bg-white/40 transition-colors">
              <p className="font-body-md font-bold text-on-surface w-16">{getDayName(day.time)}</p>
              <div className="flex items-center gap-md">
                <span className={`material-symbols-outlined ${isAlert ? 'text-tertiary' : 'text-primary'}`} style={{fontVariationSettings: "'FILL' 1"}}>{icon}</span>
                <span className={`font-body-md ${isAlert ? 'text-tertiary font-bold' : 'text-on-surface-variant'}`}>{precipChance}%</span>
              </div>
              <div className="flex items-center gap-md">
                <p className="font-body-md font-bold text-on-surface">{convertTemp(day.temperatureMax)}°</p>
                <p className="font-body-md text-on-surface-variant">{convertTemp(day.temperatureMin)}°</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingWeather;