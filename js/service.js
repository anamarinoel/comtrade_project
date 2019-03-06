/**
 * Globalna funkcija za API poziv
 *
 * @param url
 * @param method
 * @param callback
 */
const ajaxCall = (url, method, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        } else if (this.readyState === 4 && this.status === 404) {
            alert("Please insert correct the name of the city");
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
};

/**
 * Kreira novi element i u njemu dodaje ime grada.
 *
 * @param {Object} responseObj
 * @returns {HTMLElement}
 */
const getCityName = responseObj => {
    const city = document.createElement("li");
    city.innerHTML = responseObj.name;
    localStorage.setItem('city', responseObj.name);

    return city;
};

/**
 * Kreira novi element i u njemu dodaje puno ime drzave i zastavu na osnovu koda drzave.
 *
 * @param {Object} responseObj
 * @returns {HTMLElement}
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
 * Dovlaci ikonicu vremenske prilike i dodaje u novo kreiranom elementu.
 *
 * @param responseObj
 * @returns {HTMLElement}
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
 * Dovlaci ikonicu vremenske prilike i dodaje u novo kreiranom elementu.
 *
 * @param element
 * @returns {HTMLElement}
 */
const getForecasWeatherCondition = element => {
    const weatherForecastCondition = document.createElement("li");
    weatherForecastCondition.innerHTML = `<img src="https://openweathermap.org/img/w/${
        element.weather[0].icon
        }.png" alt="${element.weather[0].main}" />`;

    return weatherForecastCondition;
};

/**
 * Dodaje trenutnu temperaturu.
 *
 * @param responseObj
 * @returns {HTMLElement}
 */
const getCurrentTemperature = responseObj => {
    const currentTemp = document.createElement("li");
    currentTemp.setAttribute("id", "current-temp");
    currentTemp.innerHTML =
        `<span style="font-size:12px">Current: </span>` +
        responseObj.main.temp +
        getTemperatureMark();

    return currentTemp;
};

/**
 * Dodaje prosecnu temperaturu.
 *
 * @param responseObj
 * @returns {HTMLElement}
 */
const getAverageTemperature = responseObj => {
    const currentTemp = document.createElement("li");
    currentTemp.setAttribute("id", "current-temp");
    currentTemp.innerHTML =
        `<span style="font-size:12px">Average: </span>` +
        responseObj.main.temp +
        getTemperatureMark();

    return currentTemp;
};

/**
 * Dodaje maximalnu temperaturu.
 *
 * @param responseObj
 * @returns {HTMLElement}
 */
const getMaxTemperature = responseObj => {
    const maxTemp = document.createElement("li");
    maxTemp.setAttribute("id", "max-temp");
    maxTemp.innerHTML =
        `<span style="font-size:12px; color:black">Max Temp: </span>` +
        responseObj.main.temp_max +
        getTemperatureMark();

    return maxTemp;
};

/**
 * Dodaje minimalnu temperaturu.
 *
 * @param responseObj
 * @returns {HTMLElement}
 */
const getMinTemperature = responseObj => {
    const minTemp = document.createElement("li");
    minTemp.setAttribute("id", "min-temp");
    minTemp.innerHTML =
        `<span style="font-size:12px; color:black">Min Temp: </span>` +
        responseObj.main.temp_min +
        getTemperatureMark();

    return minTemp;
};

/**
 * Dodaje vlaznost temperaturu.
 *
 * @param responseObj
 * @returns {HTMLElement}
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
 * Dodaje atmosferski pritisak.
 *
 * @param responseObj
 * @returns {HTMLElement}
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
 * Dodaje brzinu vetra.
 *
 * @param responseObj
 * @returns {HTMLElement}
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
 * Dodaje dan.
 *
 * @param day
 * @returns {HTMLElement}
 */
const getCurrentDayName = day => {
    const dayName = document.createElement("div");
    dayName.innerHTML = day;
    dayName.classList.add("day-name");

    return dayName;
};

// const buttonMoreDetails = day => {
//     const moreDetails = document.createElement("button");
//     moreDetails.onclick = () => handleMoreDetailsButtonClick(moreDetails, day);
//     moreDetails.innerHTML = "More details";
//
//     return moreDetails;
// };
//
// const handleMoreDetailsButtonClick = (element, day) => {
//     let showed = element.classList.contains("showed");
//     let modal = document.getElementById("modal-id");
//     const elements = document.getElementsByClassName(day);
//
//     if (showed) {
//         modal.style.visibility = "hidden";
//         for (let i = 0; i < elements.length; i++) {
//             elements[i].style.display = "none";
//         }
//
//         element.innerHTML = "More details";
//         element.classList.remove("showed");
//     } else {
//         modal.style.visibility = "visible";
//         for (let i = 0; i < elements.length; i++) {
//             elements[i].style.display = "block";
//             modal.appendChild(elements[i]);
//         }
//
//         element.innerHTML = "Less details";
//         element.classList.add("showed");
//     }
// };

/**
 * Kreira listu podataka za trenutnu prognozu.
 *
 * @param responseObj
 * @returns {HTMLElement}
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
 * Kreira listu podataka za buducu prognozu.
 *
 * @param responseObj
 * @param element
 * @param day
 * @param key
 * @param elementsLength
 * @returns {HTMLElement}
 */
const getForecastDataList = (responseObj, element, day, key, elementsLength) => {
    const list = document.createElement("ul");

    list.classList.add("hourly-display");
    list.classList.add(day);

    list.appendChild(getForecasWeatherCondition(element));
    list.appendChild(getAverageTemperature(element));
    list.appendChild(getMaxTemperature(element));
    list.appendChild(getMinTemperature(element));
    list.appendChild(getHumidity(element));
    list.appendChild(getPressure(element));
    list.appendChild(getWindSpeed(element));
    // if (key === 0 && elementsLength > 1) {
    //   list.appendChild(buttonMoreDetails(day));
    // }

    return list;
};
