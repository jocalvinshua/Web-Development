import { Wind,Droplets } from 'lucide-react'

export default function WeatherDetails({ weather }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 text-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold mb-2">{weather.location}</h2>
        <p className="text-5xl font-bold mb-4">{weather.temperature}°C</p>
        <p className="text-xl capitalize">{weather.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
          <Droplets className="text-blue-200"/>
          <div>
            <p className="text-sm opacity-70">Humidity: </p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
          <Wind className="text-blue-200"/>
          <div>
            <p className="text-sm opacity-70">Wind Speed</p>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}