async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'cc42978c68410f7c4495f367fbd409a8'; // Replace with your OpenWeatherMap API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (!city) {
    document.getElementById("weatherResult").innerHTML = "Please enter a city!";
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = "City not found!";
      return;
    }

    const { name, sys, main, weather, wind } = data;
    let condition = weather[0].main;
    let emoji = "🌈";

    switch (condition.toLowerCase()) {
      case 'clear':
        emoji = "☀️";
        break;
      case 'clouds':
        emoji = "☁️";
        break;
      case 'rain':
        emoji = "🌧️";
        break;
      case 'drizzle':
        emoji = "🌦️";
        break;
      case 'thunderstorm':
        emoji = "⛈️";
        break;
      case 'snow':
        emoji = "❄️";
        break;
      default:
        emoji = "🌈";
    }

    const result = `
      <h2>${emoji} ${name}, ${sys.country}</h2>
      <p>🌡️ Temp: ${main.temp} °C</p>
      <p>${emoji} Weather: ${weather[0].main}</p>
      <p>💨 Wind Speed: ${wind.speed} m/s</p>
    `;

    document.getElementById('weatherResult').innerHTML = result;
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = "Something went wrong!";
    console.error("Error:", error);
  }
}
