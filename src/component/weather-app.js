import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './weather.css';

const api = {
  key: 'f7651e60dab1058908c6f69945200f95',
  base: 'https://api.openweathermap.org/data/2.5',
  currentWeather: '/weather'
};

function WeatherPage() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [currentTime, setCurrentTime] = useState("");

  const searchPressed = (query) => {
    fetch(`${api.base}${api.currentWeather}?q=${query}&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    searchPressed("New York");

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    

    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <div className="WeatherContainer">
      <div className="TimeDisplay">
        <img src="https://img.icons8.com/ios-filled/50/000000/clock.png" alt="Clock Icon" className="ClockIcon" />
        {currentTime}
      </div>
      <div className="GlassCard"> {/* Wrapper for glass effect */}
        <div className="Search-Box">
          <input
            className="Search-Box-Input text-center"
            type="text"
            placeholder="Enter location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            style={{ borderRadius: '10px', border: 'none' }}
            className="text-secondary"
            type="button"
            value="Search"
            onClick={() => searchPressed(search)}
          />
        </div>
        <div>
          <p className="text-white text-center">{weather.name || 'City'}</p>
        </div>
        <div className="textcolor">
          <p className="text-white text-center">
            {weather.main ? `${Math.round(weather.main.temp - 273.15)}°C` : 'Temperature'}
          </p>
          <p className="text-white text-center">
            {weather.weather ? weather.weather[0].description : 'Weather description'}
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default WeatherPage;
