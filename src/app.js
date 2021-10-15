function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
}

let apiKey = "23ab03a6498fafc28975a1bf7ad1e307";
let cityStart = "Amsterdam";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityStart}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
