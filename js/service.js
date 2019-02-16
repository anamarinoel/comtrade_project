const ajaxCall = (url, method, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
};

const getCityName = (responseObj) => {
    const city = document.createElement('li');
    city.innerHTML = responseObj.name;

    return city;
};

const getCountry = (responseObj) => {
    const country = document.createElement('li');
    country.innerHTML = `<span id="country-name"><!-- County Name --></span><img src="https://www.countryflags.io/
${responseObj.sys.country}/shiny/64.png" alt="${responseObj.sys.country}" />`;
    // find and replace '%country_code%' with real country code
    const url = env.COUNTRY_NAME_API_URL.replace("%country_code%", responseObj.sys.country);

    ajaxCall(url, "GET", handleFullCountryApiResponse);

    return country;
};

const getCurrentTemperature = (responseObj) => {
    const currentTemp = document.createElement('li');
    currentTemp.innerHTML = responseObj.main.temp + ' &#8451;';

    return currentTemp;
};

const getWeatherCondition = (responseObj) => {
    const weatherCondition = document.createElement('li');
    weatherCondition.innerHTML = `<span>${responseObj.weather[0].main}</span><img src="https://openweathermap.org/img/w/
${responseObj.weather[0].icon}.png" alt="${responseObj.weather[0].main}" />`;

    return weatherCondition;
};

const getMaxTemperature = (responseObj) => {
    const maxTemp = document.createElement('li');
    maxTemp.innerHTML = responseObj.main.temp_max + ' &#8451;';

    return maxTemp;
};

const getMinTemperature = (responseObj) => {
    const minTemp = document.createElement('li');
    minTemp.innerHTML = responseObj.main.temp_min + ' &#8451;';

    return minTemp;
};

const getHumidity = (responseObj) => {
    const humidity = document.createElement('li');
    humidity.innerHTML = responseObj.main.humidity + " %";

    return humidity;
};

const getPressure = (responseObj) => {
    const pressure = document.createElement('li');
    pressure.innerHTML = responseObj.main.pressure + " hPa";

    return pressure;
};

const getWindDeg = (responseObj) => {
    const windDeg = document.createElement('li');
    windDeg.innerHTML = responseObj.wind.deg + " nedostaje slicica";

    return windDeg;
};

const getWindSpeed = (responseObj) => {
    const windSpeed = document.createElement('li');
    windSpeed.innerHTML = responseObj.wind.speed + " km/h";

    return windSpeed;
};

const forecastDayOption = (dayNumber, selected = false) => {
    const option = document.createElement('option');
    option.attributes.value = dayNumber;
    if (selected) {
        option.selected = selected;
    }
    option.innerHTML = `${dayNumber} days`;
    return option;
};

const getSelectWithDayOptions = () => {
    const daysNumber = document.createElement('select');
    daysNumber.setAttribute('id', 'days-number');
    daysNumber.setAttribute('name', 'days-number');
    daysNumber.setAttribute('disabled', 'disabled');

    for (let i = 1; i <= env.OPEN_WEATHER_API_FORECAST_DAYS_MAX; i++) {
        daysNumber.appendChild(
            forecastDayOption(
                i,
                env.OPEN_WEATHER_API_FORECAST_DAYS_DEFAULT === i
            )
        );
    }
    return daysNumber;
};

const getDataList = (responseObj) => {
    const list = document.createElement('ul');

    list.appendChild(getCityName(responseObj));
    list.appendChild(getCountry(responseObj));
    list.appendChild(getCurrentTemperature(responseObj));
    list.appendChild(getWeatherCondition(responseObj));
    list.appendChild(getMaxTemperature(responseObj));
    list.appendChild(getMinTemperature(responseObj));
    list.appendChild(getHumidity(responseObj));
    list.appendChild(getPressure(responseObj));
    list.appendChild(getWindDeg(responseObj));
    list.appendChild(getWindSpeed(responseObj));

    return list;
};

const getForecastDataList = (responseObj, element) => {
    const list = document.createElement('ul');

    list.appendChild(getCurrentTemperature(element));
    // list.appendChild(getWeatherCondition(responseObj));
    list.appendChild(getMaxTemperature(element));
    list.appendChild(getMinTemperature(element));
    list.appendChild(getHumidity(element));
    list.appendChild(getPressure(element));
    list.appendChild(getWindDeg(element));
    list.appendChild(getWindSpeed(element));

    return list;
};



