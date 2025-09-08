import axios from 'axios';

// ⚠️ PASTE YOUR API KEY HERE!
const API_KEY = '3dab63ede4039847b9c54dcda0045745';
const API_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (city) => {
  try {
    const { data } = await axios.get(`${API_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });
    return data;
  } catch (error) {
    throw new Error('City not found. Please try again.');
  }
};

const getForecastData = async (lat, lon) => {
  try {
    const { data } = await axios.get(`${API_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    // Return only the next 24 hours (8 intervals of 3 hours)
    return data.list.slice(0, 8);
  } catch (error) {
    throw new Error('Could not fetch forecast data.');
  }
};

export { getWeatherData, getForecastData };