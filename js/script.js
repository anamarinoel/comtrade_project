const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');
const forecastDaysNumber = urlParams.get('days-number');

const handleApiCurrentWeatherResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);
    const container = document.createElement('div');
    container.appendChild(getDataList(responseObj));

    document.body.appendChild(container);
};

const handleApiForecastWeatherResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);
    const container = document.createElement('div');

    const forecastWeatherDays = formatResponseListByDay(responseObj.list);

    for (let key in forecastWeatherDays) {
        if (forecastWeatherDays.hasOwnProperty(key)) {
            forecastWeatherDays[key].map(element => {
                container.appendChild(getForecastDataList(responseObj, element));
            });
        }
    }

    document.body.appendChild(container);
};

const formatResponseListByDay = (list) => {
    const forecastWeatherDays = {};

    list.map(element => {
        let timeObj = new Date(element.dt * 1000);

        if (forecastWeatherDays[timeObj.getDate()] === undefined) {
            forecastWeatherDays[timeObj.getDate()] = [];
        }

        forecastWeatherDays[timeObj.getDate()].push(element);
    });

    return forecastWeatherDays;
};

if (city) {
    ajaxCall(OPEN_WEATHER_API_URL_CURRENT + '&q=' + city,
        "GET",
        handleApiCurrentWeatherResponse
    );

    if(forecastDaysNumber) {
        ajaxCall(OPEN_WEATHER_API_URL_FORECAST +'&q=' + city,
            "GET",
            handleApiForecastWeatherResponse
        );
    }
}

const handleFullCountryApiResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);

    document.getElementById('country-name').innerHTML = responseObj[0].name;
};

const weatherForecastCheckBox = document.getElementById('forecast_weather');
weatherForecastCheckBox.addEventListener('click', (event) => {
    const daysNumber = document.getElementById('days-number');
    if (weatherForecastCheckBox.checked === true) {
        daysNumber.removeAttribute('disabled');
        daysNumber.classList.add('show');
    } else {
        daysNumber.classList.remove('show');
        daysNumber.setAttribute('disabled', 'disabled');
    }
});

void function () {
    const submitButton = document.getElementById('form-submit');

    document.getElementById('form').insertBefore(
        getSelectWithDayOptions(),
        submitButton
    );
}();


