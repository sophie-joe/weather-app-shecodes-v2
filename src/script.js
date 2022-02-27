//on page load default to Paris:
window.addEventListener("load", () => {
  onLoadDefault();
});

function onLoadDefault(event) {
  let cityName = "Paris";
  getAPI(cityName);
}

//update city name to label
function sendBackCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  let update = document.querySelector("#city-label");
  update.innerHTML = `${input.value}`;
  let cityName = `${input.value}`;
  if (cityName === "") {
    alert("Oops! You haven't typed a city ❌ Please add then press search 😁");
  } else {
    getAPI(cityName);
  }
}

//send api request

function getAPI(cityName) {
  let city = cityName;
  let apiKey = "d06e9073694a0fc6183b83aa2f9b6a1d";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showMyWeather);
}

let addCity = document.querySelector("#location-form");
addCity.addEventListener("submit", sendBackCity);

//get current location

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentApiKey = "d06e9073694a0fc6183b83aa2f9b6a1d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${currentApiKey}`;
  axios.get(url).then(showMyWeather);
}

//using api response update info

function showMyWeather(response) {
  let cel = Math.round(response.data.main.temp);
  celsiusTemp = Math.round(response.data.main.temp);
  let myCity = response.data.name;
  let myWind = Math.round(response.data.wind.speed);
  let myHumidity = Math.round(response.data.main.humidity);
  let myDesc = response.data.weather[0].description;
  let myLow = Math.round(response.data.main.temp_min);
  celsiusLow = Math.round(response.data.main.temp_min);
  let myHigh = Math.round(response.data.main.temp_max);
  celsiusHigh = Math.round(response.data.main.temp_max);
  let myCountry = response.data.sys.country;
  let myIcon = response.data.weather[0].icon;
  setCelBack();
  currentTemp.innerHTML = `${cel}°C`;
  currentCity.innerHTML = `${myCity}`;
  currentWind.innerHTML = `${myWind}m/s`;
  currentHumidity.innerHTML = `${myHumidity}%`;
  currentDesc.innerHTML = `${myDesc}`;
  currentLow.innerHTML = `${myLow}°C`;
  currentHigh.innerHTML = `${myHigh}°C`;
  currentCountry.innerHTML = `${myCountry}`;
  currentDate.innerHTML = getDate(response.data.dt * 1000);
  getForecast(response.data.coord);
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${myIcon}@2x.png`
  );
  currentIcon.setAttribute("alt", `${myDesc}`);
}

//get forcast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d06e9073694a0fc6183b83aa2f9b6a1d";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

//update where by ID
let currentTemp = document.querySelector("#current-temp");
let currentWind = document.querySelector("#current-wind");
let currentHumidity = document.querySelector("#current-humidity");
let currentCity = document.querySelector("#city-label");
let currentDesc = document.querySelector("#current-desc");
let currentLow = document.querySelector("#current-low-temp");
let currentHigh = document.querySelector("#current-high-temp");
let currentCountry = document.querySelector("#country-label");
let currentDate = document.querySelector("#date");
let currentIcon = document.querySelector("#icon");

//on pin, call geo
let updateCurrent = document.querySelector("#pin");
updateCurrent.addEventListener("click", callNavigationGeo);

function callNavigationGeo() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//set back celsius if fahrenheit is converted but new search started
function setCelBack() {
  document.getElementsByName("options")[0].checked = true;
  fahBtn.classList.remove("active");
  celBtn.classList.add("active");
}

//update date/time

function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
//get short date for forecast
function formatShortDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

//update cel to fah
function updateFah() {
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let fahLow = Math.round((celsiusLow * 9) / 5 + 32);
  let fahHigh = Math.round((celsiusHigh * 9) / 5 + 32);
  let changeTemp = document.querySelector("#current-temp");
  let changeFahLow = document.querySelector("#current-low-temp");
  let changeFahHigh = document.querySelector("#current-high-temp");
  changeTemp.innerHTML = `${fahrenheitTemp}°F`;
  changeFahLow.innerHTML = `${fahLow}°F`;
  changeFahHigh.innerHTML = `${fahHigh}°F`;
  fahBtn.classList.add("active");
  celBtn.classList.remove("active");
}

function updateCel() {
  let changeTemp = document.querySelector("#current-temp");
  let changeCelLow = document.querySelector("#current-low-temp");
  let changeCelHigh = document.querySelector("#current-high-temp");
  changeTemp.innerHTML = `${celsiusTemp}°C`;
  changeCelHigh.innerHTML = `${celsiusHigh}°C`;
  changeCelLow.innerHTML = `${celsiusLow}°C`;
  fahBtn.classList.remove("active");
  celBtn.classList.add("active");
}

//display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class='row'>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">${formatShortDay(
          forecastDay.dt
        )}</i><div><img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"width="42"/></div><div class="day-load-high">${Math.round(
          forecastDay.temp.max
        )}° <span class="day-load-low">${Math.round(
          forecastDay.temp.min
        )}°</span></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let changeFah = document.querySelector(`#fah`);
changeFah.addEventListener("click", updateFah);

let fahBtn = document.querySelector(`#fahBtn`);
let celBtn = document.querySelector(`#celBtn`);

let changeCel = document.querySelector(`#cel`);
changeCel.addEventListener("click", updateCel);

let celsiusTemp = null;
let celsiusLow = null;
let celsiusHigh = null;
