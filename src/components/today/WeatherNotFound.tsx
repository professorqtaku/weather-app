const WeatherNotFound = () => {
  return (
    <div className="mb-lg">
      <div className="bg-error-container/20 border border-error/20 rounded-2xl p-md flex items-center gap-md">
        <span className="material-symbols-outlined text-error">error</span>
        <p className="font-body-md text-on-error-container font-medium">City not found. Please try again.</p>
      </div>
    </div>
  );
};

export default WeatherNotFound;