const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');

const handleApiResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);

    console.warn(responseObj);

    const container = document.createElement('div');
    container.appendChild(getDataList(responseObj));

    document.body.appendChild(container);
};

if (city) {
    const url = OPEN_WEATHER_API_URL_CURRENT + "&q=" + city;

    ajaxCall(url, "GET", handleApiResponse);
}

const handleFullCountryApiResponse = (responseText) => {
    const responseObj = JSON.parse(responseText);

    console.warn(responseObj);
    document.getElementById("country-name").innerHTML = responseObj[0].name;
};
const weatherForcastCheckBox = document.getElementById('forecast_weather');
weatherForcastCheckBox.addEventListener('click', (event) => {
    console.log(event);
    if (weatherForcastCheckBox.checked === true) {
        const submitButton = document.getElementById('form-submit');

        const daysNumber = document.createElement('select');
        daysNumber.setAttribute('id', 'days-number');
        document.getElementById('form').insertBefore(daysNumber, submitButton);
    } else {
        document.getElementById('form').removeChild(document.getElementById('days-number'));
    }
});



