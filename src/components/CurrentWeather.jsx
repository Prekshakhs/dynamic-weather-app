import React from 'react';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="current-weather">
      <h2 className="city-name">{data.name}, {data.sys.country}</h2>
      <div className="main-info">
        <img src={iconUrl} alt={data.weather[0].description} className="weather-icon" />
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
      </div>
      <p className="weather-description">{data.weather[0].main}</p>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">High / Low</span>
          <span className="value">{Math.round(data.main.temp_max)}° / {Math.round(data.main.temp_min)}°</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{data.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;