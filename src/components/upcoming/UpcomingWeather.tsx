import { useState } from "react";
import { TempUnit, type WeatherData } from "../common/fetchWeather";
import { getWeatherIcon, getWeatherDescription } from "../../utils/weatherIcons";

type UpcomingWeatherProps = {
  weather: WeatherData;
  temperatureUnit: TempUnit;
};

const UpcomingWeather = ({ weather, temperatureUnit }: UpcomingWeatherProps) => {
  const [view, setView] = useState<'hourly' | 'daily'>('daily');

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

  const getHourString = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <div className="glass-panel p-xl rounded-[2rem] relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(54,116,181,0.15)]">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFFDB5] blur-[80px] opacity-40"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Weather</h2>
          <div className="flex bg-white/40 rounded-full p-1 border border-white/20">
            <button
              onClick={() => setView('hourly')}
              className={`px-4 py-2 rounded-full font-body-md text-body-md transition-all ${
                view === 'hourly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setView('daily')}
              className={`px-4 py-2 rounded-full font-body-md text-body-md transition-all ${
                view === 'daily'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Daily
            </button>
          </div>
        </div>

        <div className="space-y-sm">
          {view === 'daily' ? (
            weather.daily.slice(0, 7).map((day, index) => {
              const icon = getWeatherIcon(day.weatherCode);

              return (
                <div key={index} className="flex items-center justify-between p-md bg-white/40 rounded-2xl border border-white/20">
                  <span className="w-24 font-body-md text-body-md text-on-surface">{getDayName(day.time)}</span>
                  <div className="flex items-center gap-3 flex-grow justify-center">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>{icon}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{getWeatherDescription(day.weatherCode)}</span>
                  </div>
                  <div className="flex items-center gap-4 w-24 justify-end">
                    <span className="font-headline-md text-headline-md text-on-surface">{convertTemp(day.temperatureMax)}°</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{convertTemp(day.temperatureMin)}°</span>
                  </div>
                </div>
              );
            })
          ) : (
            weather.hourly.slice(0, 24).map((hour, index) => {
              const icon = getWeatherIcon(hour.weatherCode);

              return (
                <div key={index} className="flex items-center justify-between p-md bg-white/40 rounded-2xl border border-white/20">
                  <span className="w-24 font-body-md text-body-md text-on-surface">{getHourString(hour.time)}</span>
                  <div className="flex items-center gap-3 flex-grow justify-center">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>{icon}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{getWeatherDescription(hour.weatherCode)}</span>
                  </div>
                  <div className="flex items-center gap-4 w-24 justify-end">
                    <span className="font-headline-md text-headline-md text-on-surface">{convertTemp(hour.temperature)}°</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingWeather;