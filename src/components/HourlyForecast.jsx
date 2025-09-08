import React from 'react';

const HourlyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="hourly-forecast-container">
      <h3>Hourly Forecast</h3>
      <div className="hourly-forecast">
        {forecast.map((item, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
          const hour = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={index} className="forecast-item">
              <p className="forecast-time">{hour}</p>
              <img src={iconUrl} alt={item.weather[0].description} />
              <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;