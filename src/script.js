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
}

let currentTemp = document.querySelector("#current-temp");
let currentWind = document.querySelector("#current-wind");
let currentHumidity = document.querySelector("#current-humidity");
let currentCity = document.querySelector("#city-label");
let currentDesc = document.querySelector("#current-desc");
let currentLow = document.querySelector("#current-low-temp");
let currentHigh = document.querySelector("#current-high-temp");
let currentCountry = document.querySelector("#country-label");

let updateCurrent = document.querySelector("#pin");
console.log(updateCurrent);
updateCurrent.addEventListener("click", callNavigationGeo);

function callNavigationGeo() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
