
import type { GeoData } from "../common/fetchGeoData";
import { TempUnit, type WeatherData } from "../common/fetchWeather";
import WeatherNotFound from "./WeatherNotFound";

enum WeatherIcon {
    SUNNY,
    CLOUDY
}

type TodaysWeatherProps = {
    weather?: WeatherData | null
    geoData?: GeoData | null
    temperatureUnit: TempUnit
}

const TodaysWeather = (props: TodaysWeatherProps) => {
    const {weather, geoData, temperatureUnit} = props;

    if(weather == null || geoData == null || weather.current == null) {
        return <WeatherNotFound />
    }

    const currentWeather = weather.current;
    
    console.log(currentWeather);
    

    return <div className="flex bg-purple-300 text-white">
        <div id="left"
        className="w-1/2 bg-blue-500">
            <h1>City: {geoData.name}</h1>
            <h2>{geoData.country}</h2>
            <h1 className="text-9xl">{currentWeather.temperature.toFixed(0)} {temperatureUnit}</h1>
            <p>Feels like {currentWeather.apparentTemperature.toFixed(0)} {temperatureUnit}</p>
            <p>Relative Humidity: {currentWeather.relativeHumidity }%</p>
            <p>Chance to rain: {currentWeather.rain} mm</p>

        </div>
        
        <div className="w-1/2 bg-blue-800">
            <h1>{currentWeather.weatherCode}</h1>
            <p>{currentWeather.windSpeed} km/h</p>
        </div>
    </div>
}

export default TodaysWeather;