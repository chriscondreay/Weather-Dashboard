const apiKey = "78c6f3a7fa231275315ddb5c39a6e226";
const locations = [];
const history = document.getElementById("history");
const locationFormEl = document.getElementById("location-search-form");
const cityEl = document.getElementById("city");
const locationSearchEl = document.getElementById("searched-location");
const weatherContainerEl = document.getElementById("current-weather");
const forecastTitle = document.getElementById("forecast");
const forecastContainerEl = document.getElementById("fiveday-forcast");

const getWeather = () => {
  const url = `api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
  fetch(url)
    .then(function (res) {
      res.json()
        .then(function (data) {
          displayWeather(data, city);
        });
    });
}