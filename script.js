const apiKey = "78c6f3a7fa231275315ddb5c39a6e226";
const locations = [];
const history = [document.getElementById("history");]
const locationFormSearchEl = document.getElementById("location-search-form");
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

function submit(e) {
  e.preventDefault();
  const city = cityEl.value.trim();
  getWeather(city);
  fiveDays(city);
  saveSearch(city);
  previousSearch(city);
};

function saveSearch() {
  localStorage.setItem("cities", JSON.stringify(locations));
};

function displayWeather(weather, searchCity) {

  weatherContainerEl.textContent = "";
  locationSearchEl.textContent = searchCity;

  const temperatureEl = document.createElement("span");
  temperatureEl.textContent = `Temperature: ${weather.main.temp} °F`;
  temperatureEl.classList = "list-group-item"
  weatherContainerEl.appendChild(temperatureEl);

  const humidityEl = document.createElement("span");
  humidityEl.textContent = `Humidity: ${weather.main.humidity} %`;
  humidityEl.classList = "list-group-item"
  weatherContainerEl.appendChild(humidityEl);

  const windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = `Wind Speed: ${weather.wind.speed} MPH`;
  windSpeedEl.classList = "list-group-item"
  weatherContainerEl.appendChild(windSpeedEl);

  const weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  citySearchInputEl.appendChild(weatherIcon);

  let currentDate = document.createElement("span")
  currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  const lat = weather.coord.lat;
  const lon = weather.coord.lon;
  uvIndex(lat, lon);
};

function searchHistory() {
  history.innerHTML = '';

  // Start at end of history array and count down to show the most recent at the top.
  for (let i = locations.length - 1; i >= 0; i--) {
    let btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}
locationFormSearchEl.addEventListener("submit", submitSearch);
history.addEventListener("click", historySearch)