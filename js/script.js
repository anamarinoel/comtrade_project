const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');
const forecastWeather = urlParams.get('forecast_weather');

const handleApiCurrentWeatherResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);

    const currentWeather = document.getElementById("current-weather");
    currentWeather.appendChild(getDataList(responseObj));
};

const handleApiForecastWeatherResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);
    const container = document.createElement('div');

    const forecastWeatherDays = formatResponseListByDay(responseObj.list);
    let i = 1;
    for (let key in forecastWeatherDays) {
        if (forecastWeatherDays.hasOwnProperty(key)) {
            let id = `day-${i}`;

            //let day = new Date();
            //day.setAttribute('id', 'week-day');
            //document.getElementById('week-day').innerHTML = day.getDate();

            const dayContainer = document.getElementById(id);
            i++;

            forecastWeatherDays[key].map(element => {
                dayContainer.appendChild(getForecastDataList(responseObj, element));
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
    document.getElementById('city-name').value = city;

    ajaxCall(OPEN_WEATHER_API_URL_CURRENT + '&q=' + city,
        "GET",
        handleApiCurrentWeatherResponse
    );

    if (forecastWeather) {
        ajaxCall(OPEN_WEATHER_API_URL_FORECAST + '&q=' + city,
            "GET",
            handleApiForecastWeatherResponse
        );
    }
}

const handleFullCountryApiResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);

    document.getElementById('country-name').innerHTML = responseObj[0].name;
};



const handleWeekDayName = (responseText) => {
    
    const weekDayName = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log('test');
    weekDay.setAttribute('id', 'week-day');
    document.getElementById("week-day").innerHTML = weekDayName.getDate();
    
    handleWeekDayName();
};