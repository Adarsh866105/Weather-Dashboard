
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; 
  const cityInput = document.getElementById("city-input");
  const addCityBtn = document.getElementById("add-city-btn");
  const cityList = document.getElementById("city-list");
  const weatherContainer = document.getElementById("weather-container");

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  
  renderCities();

  
  addCityBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
      cities.push(city);
      saveCities();
      renderCities();
    }
    cityInput.value = ""; 
  });

  
  cityList.addEventListener("click", async (e) => {
    if (e.target.tagName === "LI") {
      const city = e.target.textContent;
      const weatherData = await fetchWeatherData(city);
      displayWeather(weatherData);
    }
  });

  
  function renderCities() {
    cityList.innerHTML = ""; 
    cities.forEach((city) => {
      const li = document.createElement("li");
      li.textContent = city;
      cityList.appendChild(li);
    });
  }

  
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();
    return data;
  }

  
  function displayWeather(data) {
    weatherContainer.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
  }

  
  function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }
});
