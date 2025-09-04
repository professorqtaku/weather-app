import { useEffect, useMemo, useState } from "react";
import _debounce from "lodash/debounce";
import DebouncedButton from "./DebouncedButton";
import fetchWeather from "../common/fetchWeather";
import fetchGeoData from "../common/fetchGeoData";

type SearchProps = {
  setWeatherData: Function;
  setGeoData: Function;
};
const Search = (props: SearchProps) => {
  const { setWeatherData, setGeoData } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    console.log(inputValue);
    localStorage.setItem("latest-input", inputValue);
    const geoData = await fetchGeoData({ name: inputValue });

    if (geoData == null) {
      // handle error
      return;
    }

    // process the first location
    const weatherData = await fetchWeather(geoData[0]);
    setGeoData(geoData[0]);
    setWeatherData(weatherData);
  };

  // update onInput
  const debounceFn = useMemo(() => {
    return _debounce(handleInput, 1000);
  }, [handleInput]);

  // Clean up the debounced function on unmount
  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

  return (
    <div className="flex w-auto bg-pink-200 p-2 rounded-md place-items-center">
      <div className="w-5/6 bg-white rounded-full px-2 py-1">
        <input
          id="search-input"
          name="search"
          type="text"
          placeholder="Stad/land"
          className="min-w-0 rounded-lg h-auto py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 w-full focus:border-pink-500 focus:outline-none transition duration-300 ease-in-out" 
          value={inputValue}
          onChange={handleInput}
        />
      </div>
      <div className="w-1/6 ml-2">
        <DebouncedButton title="Searcha" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
