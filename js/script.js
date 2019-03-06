/**
 * Cuva vrednost grada iz search URL dela u promenljivoj.
 *
 * @type {string}
 */
const city = urlParams.get("city");

/**
 * Cuva informaciju da li je zatrazena buduca vremenska prognoza.
 *
 * @type {string}
 */
const forecastWeather = urlParams.get("forecast_weather");

/**
 * Obradjuje podatke sa servera za trenutnu prognozu
 *
 * @param responseText
 */
const handleApiCurrentWeatherResponse = responseText => {
    const responseObj = JSON.parse(responseText);
    const currentWeather = document.getElementById("current-weather");

    currentWeather.appendChild(getDataList(responseObj));
    handleCityMapCoordinates(responseObj);
    saveToHistory();
};

/**
 * Dodaje marker izabranog grada na mapi.
 *
 * @param responseObj
 */
const handleCityMapCoordinates = responseObj => {
    createMap([responseObj.coord.lat, responseObj.coord.lon], city);
};

/**
 * Obradjuje podatke sa servera za buducu prognozu
 *
 * @param responseText
 */
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

            if (dayContainer) {
                if (forecastWeatherDays[day].length === 8) {
                    dayContainer.classList.add("day-display");

                    dayContainer.appendChild(getCurrentDayName(day));
                    i++;

                    forecastWeatherDays[day].map((element, key) => {
                        dayContainer.appendChild(
                            getForecastDataList(responseObj, element, day, key, forecastWeatherDays[day].length)
                        );
                    });
                }
            }
        }
    }

    document.body.appendChild(container);
    setForecastToLastEntry();
};

/**
 * Razdvaja veliki odgovor sa servera na podatke po danima
 * svaki dan ima 8 rezultata na po 3 sata.
 *
 * @param list
 */
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

/**
 * Proverava da li vrednost grada postoji
 */
if (city) {
    document.getElementById("city-name").value = city;

    /**
     * Poziva API i dovlaci podatke za trenutnu prognozu.
     */
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

/**
 * Dovlaci puno ime drzave na osnovu koda drzave
 *
 * @param responseText
 */
const handleFullCountryApiResponse = responseText => {
    const responseObj = JSON.parse(responseText);

    localStorage.setItem('country', responseObj[0].name);
    document.getElementById("country").value = responseObj[0].name;
    document.getElementById("country-name").innerHTML = responseObj[0].name;
};

/**
 * Formatira trenutni dan u nedelji, iz broja dana vraca ime dana.
 *
 * @param day
 * @returns {string}
 */
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
