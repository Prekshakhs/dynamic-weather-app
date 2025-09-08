import React, { useState, useEffect } from 'react';
import { getWeatherData, getForecastData } from './api/weatherService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import './App.css';

// Import background images
import Clear from './assets/images/clear.jpg';
import Clouds from './assets/images/clouds.jpg';
import Rain from './assets/images/rain.jpg';
import Drizzle from './assets/images/drizzle.jpg';
import Thunderstorm from './assets/images/thunderstorm.jpg';
import Snow from './assets/images/snow.jpg';
import Mist from './assets/images/mist.jpg';
import Default from './assets/images/default.jpg';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [background, setBackground] = useState('default');

  // Fetch weather by geolocation on initial load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // The API doesn't have a direct weather by coords, so we'll use forecast which returns city info
        const forecastData = await getForecastData(latitude, longitude);
        handleSearch(forecastData[0].name || 'mangalore'); // Fallback city
      },
      (err) => {
        console.error(err);
        // If user denies location, fetch a default city
        handleSearch('mangalore');
      }
    );
  }, []);

  useEffect(() => {
    if (!weather) return;
    const weatherCondition = weather.weather[0].main;
    switch (weatherCondition) {
      case 'Clear':
        setBackground('Clear');
        break;
      case 'Clouds':
        setBackground('Clouds');
        break;
      case 'Rain':
        setBackground('Rain');
        break;
      case 'Drizzle':
        setBackground('Drizzle');
        break;
      case 'Thunderstorm':
        setBackground('Thunderstorm');
        break;
      case 'Snow':
        setBackground('Snow');
        break;
      case 'Mist':
      case 'Haze':
      case 'Fog':
        setBackground('Mist');
        break;
      default:
        setBackground('default');
    }
  }, [weather]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await getWeatherData(city);
      setWeather(weatherData);
      const forecastData = await getForecastData(weatherData.coord.lat, weatherData.coord.lon);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`App ${background}`}>
      <main className="weather-card">
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weather && <CurrentWeather data={weather} />}
        {forecast.length > 0 && <HourlyForecast forecast={forecast} />}
      </main>
    </div>
  );
};

export default App;