function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayElement = document.querySelector("#day");
dayElement.innerHTML = `${day}, `;
let timeElement = document.querySelector("#time");
timeElement.innerHTML = `${hours}:${minutes}`;

let apiKey = "23ab03a6498fafc28975a1bf7ad1e307";
let cityStart = "Amsterdam";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityStart}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
