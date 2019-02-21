const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city");
const forecastWeather = urlParams.get("forecast_weather");
//const hourlyDisplay = urlParams.get("hourly-display");

const handleApiCurrentWeatherResponse = responseText => {
  const responseObj = JSON.parse(responseText);
  const currentWeather = document.getElementById("current-weather");

  currentWeather.appendChild(getDataList(responseObj));
  handleCityMapCoordinates(responseObj);
};

const handleCityMapCoordinates = responseObj => {
  createMap([responseObj.coord.lat, responseObj.coord.lon], city);
};

const handleApiForecastWeatherResponse = responseText => {
  document.getElementById("checkedbox").checked = true;

  const responseObj = JSON.parse(responseText);
  const container = document.createElement("div");
  document.getElementById("general-info").style.visibility = "visible";

  const forecastWeatherDays = formatResponseListByDay(responseObj.list);

  let i = 1;
  for (let day in forecastWeatherDays) {
    if (forecastWeatherDays.hasOwnProperty(day)) {
      let id = `day-${i}`;

      const dayContainer = document.getElementById(id);
      // dayContainer.classList.add("day-display");

      dayContainer.appendChild(getCurrentDayName(day));
      i++;

      forecastWeatherDays[day].map(element => {
        dayContainer.appendChild(
          getForecastDataList(responseObj, element, day)
        );
      });
    }
  }

  document.body.appendChild(container);
};

const showHouryDisplay = responseObj => {
  document.getElementById("button").addEventListener("click", function(e) {
    e.preventDefault();
  });
  const hourlyDisplay = document.getElementById("hourly-display");

  if (buttonReadMore == true) {
    document.getElementById("hourly-display").style.display = "none";
  }
  return hourlyDisplay;
};

const formatResponseListByDay = list => {
  const forecastWeatherDays = {};

  list.map(element => {
    let timeObj = new Date(element.dt * 1000);
    let weekDay = handleWeekDayName(timeObj.getDay());

    if (forecastWeatherDays[weekDay] === undefined) {
      forecastWeatherDays[weekDay] = [];
    }

    forecastWeatherDays[weekDay].push(element);
  });

  return forecastWeatherDays;
};

if (city) {
  document.getElementById("city-name").value = city;

  ajaxCall(
    OPEN_WEATHER_API_URL_CURRENT + "&q=" + city,
    "GET",
    handleApiCurrentWeatherResponse
  );

  if (forecastWeather) {
    ajaxCall(
      OPEN_WEATHER_API_URL_FORECAST + "&q=" + city,
      "GET",
      handleApiForecastWeatherResponse
    );
  }
}

const handleFullCountryApiResponse = responseText => {
  const responseObj = JSON.parse(responseText);

  document.getElementById("country").value = responseObj[0].name;
  document.getElementById("country-name").innerHTML = responseObj[0].name;
};

const handleWeekDayName = day => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return dayNames[day];
};
