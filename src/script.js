//update city name to label

function sendBackCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  let update = document.querySelector("#city-label");
  update.innerHTML = `${input.value}`;
  let cityName = `${input.value}`;

  let apiKey = "d06e9073694a0fc6183b83aa2f9b6a1d";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(weatherUrl).then(showMyWeather);
}

let addCity = document.querySelector("#location-form");
addCity.addEventListener("submit", sendBackCity);

//get current location

function handlePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentApiKey = "d06e9073694a0fc6183b83aa2f9b6a1d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${currentApiKey}`;
  axios.get(url).then(showMyWeather);
}

function showMyWeather(response) {
  console.log(response);
  let cel = Math.round(response.data.main.temp);
  let myCity = response.data.name;
  let myWind = Math.round(response.data.wind.speed);
  let myHumidity = Math.round(response.data.main.humidity);
  let myDesc = response.data.weather[0].description;
  let myLow = Math.round(response.data.main.temp_min);
  let myHigh = Math.round(response.data.main.temp_max);
  let myCountry = response.data.sys.country;

  currentTemp.innerHTML = `${cel}°C`;
  currentCity.innerHTML = `${myCity}`;
  currentWind.innerHTML = `${myWind}m/s`;
  currentHumidity.innerHTML = `${myHumidity}%`;
  currentDesc.innerHTML = `${myDesc}`;
  currentLow.innerHTML = `${myLow}°C`;
  currentHigh.innerHTML = `${myHigh}°C`;
  currentCountry.innerHTML = `${myCountry}`;
  currentDate.innerHTML = getDate(response.data.dt * 1000);
  console.log(getDate);
}

let currentTemp = document.querySelector("#current-temp");
let currentWind = document.querySelector("#current-wind");
let currentHumidity = document.querySelector("#current-humidity");
let currentCity = document.querySelector("#city-label");
let currentDesc = document.querySelector("#current-desc");
let currentLow = document.querySelector("#current-low-temp");
let currentHigh = document.querySelector("#current-high-temp");
let currentCountry = document.querySelector("#country-label");
let currentDate = document.querySelector("#date");

let updateCurrent = document.querySelector("#pin");
console.log(updateCurrent);
updateCurrent.addEventListener("click", callNavigationGeo);

function callNavigationGeo() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

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

//update cel to fah
function updateCel() {
  let input = document.querySelector("#current-temp");
  input.innerHTML = `19`;
}

let changeCel = document.querySelector("#option1");
changeCel.addEventListener("change", updateCel);
