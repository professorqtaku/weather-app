import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import _debounce from "lodash/debounce";
import fetchWeather, { type WeatherData } from "../common/fetchWeather";
import fetchGeoData, { Status, type GeoData } from "../common/fetchGeoData";

type SearchProps = {
  setWeatherData: (data: WeatherData) => void;
  setGeoData: (data: GeoData) => void;
  setSearchStatus: (status: Status) => void;
  searchStatus: Status;
};

const Search = (props: SearchProps) => {
  const { setWeatherData, setGeoData, setSearchStatus } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<GeoData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(
    _debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }
      const geoData = await fetchGeoData({ name: query, count: 10 });
      if (geoData) {
        setSuggestions(geoData);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(inputValue);
  }, [inputValue, fetchSuggestions]);

  useEffect(() => {
    if (showDropdown && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectSuggestion = async (suggestion: GeoData) => {
    setInputValue(`${suggestion.name}, ${suggestion.country}`);
    setShowDropdown(false);
    setSearchStatus(Status.LOADING);
    localStorage.setItem("latest-input", suggestion.name);
    const weatherData = await fetchWeather(suggestion);
    setGeoData(suggestion);
    setWeatherData(weatherData);
    setSearchStatus(Status.SUCCESS);
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    setSearchStatus(Status.LOADING);
    localStorage.setItem("latest-input", inputValue);
    const geoData = await fetchGeoData({ name: inputValue });

    if (geoData == null || geoData.length === 0) {
      setSearchStatus(Status.ERROR);
      return;
    }

    // process the first location
    const weatherData = await fetchWeather(geoData[0]);
    setGeoData(geoData[0]);
    setWeatherData(weatherData);
    setSearchStatus(Status.SUCCESS);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="glass-panel rounded-xl flex items-center px-md py-3 shadow-[0_30px_60px_-15px_rgba(54,116,181,0.1)] focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <span className="material-symbols-outlined text-outline mr-sm">search</span>
        <input
          className="bg-transparent border-none focus:ring-0 w-full font-body-md text-on-surface placeholder-outline"
          placeholder="Search for a city or airport"
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
      </div>
      {showDropdown && suggestions.length > 0 && createPortal(
        <div
          id="search_dropdown"
          className="fixed z-[10000] glass-panel rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          style={{
            top: `${dropdownPosition.top + 8}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-md py-3 hover:bg-white/40 cursor-pointer border-b border-white/20 last:border-b-0"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <p className="font-body-md text-on-surface">{suggestion.name}, {suggestion.country}</p>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Search;
