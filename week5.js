function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "ft01o336fa01b0d041f3cbcd1c5dc250";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then(displayWeather)
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

function displayWeather(response) {
  console.log(response); // Log the response to inspect its structure

  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperatureIconElement = document.querySelector(
    ".current-temperature-icon"
  );

  // Check the path to access the temperature data in the response
  let temperature = Math.round(response.data.temperature.current);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  if (temperature < 10) {
    temperatureIconElement.innerHTML = "❄️";
  } else if (temperature >= 10 && temperature < 20) {
    temperatureIconElement.innerHTML = "🌤";
  } else {
    temperatureIconElement.innerHTML = "☀️";
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
