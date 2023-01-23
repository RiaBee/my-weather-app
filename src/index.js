function stringify(value) {
  if (value < 10) {
    return "0" + value;
  }
  return `${value}`;
}
let now = new Date();
let minutes = stringify(now.getMinutes());
let hours = stringify(now.getHours());
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
let formattedDate = `${day} ${hours}:${minutes}`;
// console.log(formattedDate);
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = document.querySelector("#cityName");
  let currentTemp = document.querySelector("#current-temp");

  cityName.innerHTML = searchInput.value;

  let apiKey = "db9bdc6df0bbc8b7154e18e925e9b03b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.innerHTML}&units=metric&appid=${apiKey}`;
  axios(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    currentTemp.innerHTML = `${temperature}`;
  });
}

// function changeToCelcius() {
//   let currentTemp = document.querySelector("#current-temp");
//   currentTemp.innerHTML = "15";
// }
// function changeToFahrenheit() {
//   let currentTemp = document.querySelector("#current-temp");
//   currentTemp.innerHTML = "59";
// }

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// let celciusLink = document.querySelector("#celcius-link");
// celciusLink.addEventListener("click", changeToCelcius);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", changeToFahrenheit);

function showPosition(position) {
  console.log("showPosition");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "db9bdc6df0bbc8b7154e18e925e9b03b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(function (response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${temperature}`;
    let cityName = document.querySelector("#cityName");
    cityName.innerHTML = response.data.name;
  });
}

let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});
