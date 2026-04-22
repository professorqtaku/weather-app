import { TempUnit } from "./common/fetchWeather";
import TemperatureToggle from "./TemperatureToggle";

type HeaderProps = {
  temperatureUnit: TempUnit;
  setTemperatureUnit: (unit: TempUnit) => void;
};

const Header = ({ temperatureUnit, setTemperatureUnit }: HeaderProps) => {
  return (
    <header className="sticky top-0 w-full z-50 border-b border-white/40 bg-white/60 backdrop-blur-[20px] shadow-[0_30px_60px_-15px_rgba(54,116,181,0.15)]">
      <div className="flex justify-between items-center px-5 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">cloudy_snowing</span>
          <span className="text-2xl font-bold tracking-tighter text-primary">SkyGlass</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border-white/60">
            <span className="material-symbols-outlined text-primary">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface-variant w-48" placeholder="Search city..." type="text"/>
          </div>
          <TemperatureToggle temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
          <button className="material-symbols-outlined text-primary text-2xl active:scale-95 transition-transform duration-200">settings</button>
        </div>
      </div>
    </header>
  );
};

export default Header;