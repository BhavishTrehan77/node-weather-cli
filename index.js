const city = process.argv[2];

if (!city) {
  console.error('Please provide a city name as an argument.');
  process.exit(1);
}

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual OpenWeatherMap API key
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.cod !== 200) {
      console.error(`Error: ${data.message}`);
      return;
    }
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    console.log(`Weather in ${city}: ${temp}°C, ${description}`);
  })
  .catch(error => {
    console.error('Failed to fetch weather data:', error.message);
  });