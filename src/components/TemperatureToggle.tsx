import { TempUnit } from "./common/fetchWeather";

type TemperatureToggleProps = {
  temperatureUnit: TempUnit;
  setTemperatureUnit: (unit: TempUnit) => void;
};

const TemperatureToggle = ({ temperatureUnit, setTemperatureUnit }: TemperatureToggleProps) => {
  return (
    <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant">
      <button
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
          temperatureUnit === TempUnit.FAHRENHEIT ? 'bg-primary text-on-primary shadow-sm' : 'text-primary hover:bg-surface-container-high'
        }`}
        onClick={() => setTemperatureUnit(TempUnit.FAHRENHEIT)}
      >
        °F
      </button>
      <button
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
          temperatureUnit === TempUnit.CELCIUS ? 'bg-primary text-on-primary shadow-sm' : 'text-primary hover:bg-surface-container-high'
        }`}
        onClick={() => setTemperatureUnit(TempUnit.CELCIUS)}
      >
        °C
      </button>
    </div>
  );
};

export default TemperatureToggle;