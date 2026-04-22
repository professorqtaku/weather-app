import { TempUnit, type WeatherData } from "../common/fetchWeather";
import { getWeatherIcon, getWeatherDescription } from "../../utils/weatherIcons";

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

  return (
    <div className="space-y-sm">
      {weather.daily.slice(0, 7).map((day, index) => {
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
      })}
    </div>
  );
};

export default UpcomingWeather;