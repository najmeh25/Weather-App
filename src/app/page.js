'use client';

import { useState } from "react";
import './styles.css';  

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  async function fetchWeather() {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Fetch failed:", error);
      setWeather(null);
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && weather.cod === 200 ? (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p className="temp">{weather.main.temp}°C</p>
          <p>☁️ Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        weather && <p className="error-message">City not found or invalid input.</p>
      )}
    </div>
  );
}
