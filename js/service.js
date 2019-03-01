/**
 * 
 * @param {*} url 
 * @param {*} method 
 * @param {*} callback 
 */

const ajaxCall = (url, method, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callback(this.responseText);
    } else if (this.readyState === 4 && this.status === 404) {
        alert('Please insert correct the name of the city');
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
};

/**
 * 
 * @param {*} responseObj 
 */
const getCityName = responseObj => {
  const city = document.createElement("li");
  city.innerHTML = responseObj.name;

  return city;
};

/**
 * 
 * @param {*} responseObj 
 */
const getCountry = responseObj => {
  const country = document.createElement("li");

  country.innerHTML = `<span id="country-name"></span><img src="https://www.countryflags.io/${
    responseObj.sys.country
  }/shiny/64.png" alt="${responseObj.sys.country}" />`;
  // find and replace '%country_code%' with real country code
  const url = env.COUNTRY_NAME_API_URL.replace(
    "%country_code%",
    responseObj.sys.country
  );

  ajaxCall(url, "GET", handleFullCountryApiResponse);

  return country;
};

/**
 * 
 * @param {*} responseObj 
 */
const getWeatherCondition = responseObj => {
  const weatherCondition = document.createElement("li");
  weatherCondition.innerHTML = `<img src="https://openweathermap.org/img/w/${
    responseObj.weather[0].icon
  }.png" alt="${responseObj.weather[0].main}" /><span>${
    responseObj.weather[0].main
  }</span>`;

  return weatherCondition;
};

/**
 * 
 * @param {*} element 
 */
const getForecasWeatherCondition = element => {
  const weatherForecastCondition = document.createElement("li");
  weatherForecastCondition.innerHTML = `<img src="https://openweathermap.org/img/w/${
    element.weather[0].icon
  }.png" alt="${element.weather[0].main}" />`;

  return weatherForecastCondition;
};

/**
 * 
 * @param {*} responseObj 
 */
 const getCurrentTemperature = responseObj => {
  const currentTemp = document.createElement("li");
  currentTemp.setAttribute("id", "current-temp");
  currentTemp.innerHTML =
    `<span style="font-size:12px">Current: </span>` +
    responseObj.main.temp +
    " &#8451;";

  return currentTemp;
};

/**
 * 
 * @param {*} responseObj 
 */
const getMaxTemperature = responseObj => {
  const maxTemp = document.createElement("li");
  maxTemp.setAttribute("id", "max-temp");
  maxTemp.innerHTML =
    `<span style="font-size:12px; color:black">Max: </span>` +
    responseObj.main.temp_max +
    " &#8451;";

  return maxTemp;
};

/**
 * 
 * @param {*} responseObj 
 */
const getMinTemperature = responseObj => {
  const minTemp = document.createElement("li");
  minTemp.setAttribute("id", "min-temp");
  minTemp.innerHTML =
    `<span style="font-size:12px; color:black">Min: </span>` +
    responseObj.main.temp_min +
    " &#8451;";

  return minTemp;
};

/**
 * 
 * @param {*} responseObj 
 */
const getHumidity = responseObj => {
  const humidity = document.createElement("li");
  humidity.innerHTML =
    `<span style="font-size:12px">Humidity: </span>` +
    responseObj.main.humidity +
    " %";

  return humidity;
};

/**
 * 
 * @param {*} responseObj 
 */
const getPressure = responseObj => {
  const pressure = document.createElement("li");
  pressure.innerHTML =
    `<span style="font-size:12px">Pressure: </span>` +
    responseObj.main.pressure +
    " hPa";
  return pressure;
};

/**
 * 
 * @param {*} responseObj 
 */
const getWindSpeed = responseObj => {
  const windSpeed = document.createElement("li");
  windSpeed.innerHTML =
    `<span style="font-size:12px">Wind Speed: </span>` +
    responseObj.wind.speed +
    " km/h";

  return windSpeed;
};

/**
 * 
 * @param {*} day 
 */
const getCurrentDayName = day => {
  const dayName = document.createElement("div");
  dayName.innerHTML = day;
  dayName.classList.add("day-name");

  return dayName;
};

/**
 * 
 * @param {*} day 
 */
const buttonReadMore = day => {
  const moreDetails = document.createElement("button");
    moreDetails.onclick = () => handleMoreDetailsButtonClick(moreDetails, day);
    moreDetails.innerHTML = "More details";
    
  return moreDetails;
};

/**
 * 
 * @param {*} element 
 * @param {*} day 
 */
const handleMoreDetailsButtonClick = (element, day) => {
  let showed = element.classList.contains("showed");
  const elements = document.getElementsByClassName(day);

  if (showed) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    element.innerHTML = "More details";
    element.classList.remove("showed");
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }

    element.innerHTML = "Less details";
    element.classList.add("showed");
  }
};

/**
 * 
 * @param {*} responseObj 
 */
const getDataList = responseObj => {
  const list = document.createElement("ul");

  list.appendChild(getCityName(responseObj));
  list.appendChild(getCountry(responseObj));
  list.appendChild(getWeatherCondition(responseObj));
  list.appendChild(getCurrentTemperature(responseObj));
  list.appendChild(getMaxTemperature(responseObj));
  list.appendChild(getMinTemperature(responseObj));
  list.appendChild(getHumidity(responseObj));
  list.appendChild(getPressure(responseObj));
  list.appendChild(getWindSpeed(responseObj));

  return list;
};

/**
 * 
 * @param {*} responseObj 
 * @param {*} element 
 * @param {*} day 
 * @param {*} key 
 * @param {*} elementsLength 
 */
const getForecastDataList = (
  responseObj,
  element,
  day,
  key,
  elementsLength
) => {
  const list = document.createElement("ul");
  list.classList.add("hourly-display");
  list.classList.add(day);

  list.appendChild(getForecasWeatherCondition(element));
  list.appendChild(getCurrentTemperature(element));
  list.appendChild(getMaxTemperature(element));
  list.appendChild(getMinTemperature(element));
  list.appendChild(getHumidity(element));
  list.appendChild(getPressure(element));
  list.appendChild(getWindSpeed(element));
  if (key === 0 && elementsLength > 1) {
    list.appendChild(buttonReadMore(day));
  }

  return list;
};