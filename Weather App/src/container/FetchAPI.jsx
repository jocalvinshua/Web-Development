const API_KEY = ''; // Add With Your Own API Key

export async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();

  if (data.cod === '404') {
    throw new Error('City not found');
  }

  return {
    location: data.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon
  };
}