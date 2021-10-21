//Time and date

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
let timeElement = document.querySelector("#time");
dayElement.innerHTML = `${day}, `;
timeElement.innerHTML = `${hours}:${minutes}`;

function getForecast(coordinates) {
  //alert(coordinates.lat);
  let apiKey = "23ab03a6498fafc28975a1bf7ad1e307";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconTodayElement = document.querySelector("#today-icon");
  iconTodayElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconTodayElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "23ab03a6498fafc28975a1bf7ad1e307";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
  // alert("here");
}

function HandleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  //  console.log(cityInputElement.value);
  //  alert(`${cityInputElement.value}`);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  //console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  //let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <span class="day-forecast">${formatDay(forecastDay.dt)}</span>
            </br>
              <img
                src="
                http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="30"
              />
              </br>
              <span class="min-forecast">${Math.round(
                forecastDay.temp.min
              )}°</span>
              <span class="max-forecast">${Math.round(
                forecastDay.temp.max
              )}°</span>
            </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", HandleSubmit);
let cityStart = "New York";
search(cityStart);
//displayForecast();
