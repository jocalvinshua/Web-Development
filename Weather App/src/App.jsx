import { useState } from "react";
import { fetchWeather } from "./container/FetchAPI";
import WeatherDetails from "./container/WeatherDetails"
import Navbar from "./container/Navbar";


import './style.css'

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (cityName) => {
    if (!cityName.trim()) return;
  
    setLoading(true);
    setError('');
  
    try {
      const data = await fetchWeather(cityName);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to get City Weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md">
        <Navbar query={handleSearch} />
        {loading && <p className="text-center text-white">Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weather && <WeatherDetails weather={weather} />}
      </div>
    </div>
  );
}