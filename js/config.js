/**
 * const env - podaci za pristup API-ju podeljeni po jedinicama, radi lakse manipulacije usled promena na API-ju
 */
const env = {
    OPEN_WEATHER_API_HOST: "https://api.openweathermap.org/",
    OPEN_WEATHER_API_VERSION: "2.5",
    OPEN_WEATHER_API_KEY: "3026857486a41b9c56b16bf4da7a81f2",
    OPEN_WEATHER_API_FORECAST_FIVE_DAYS: "/forecast",
    OPEN_WEATHER_API_CURRENT: "/weather",
    COUNTRY_NAME_API_URL: "https://restcountries.eu/rest/v2/name/%country_code%?fullText=true"
};

const OPEN_WEATHER_API_UNITS = `&units=${getUnitsType()}`;

const OPEN_WEATHER_API_BASE_PATH = `data/${env.OPEN_WEATHER_API_VERSION}`;
const OPEN_WEATHER_API_QUERY_ID = `APPID=${env.OPEN_WEATHER_API_KEY}`;

const OPEN_WEATHER_API_URL_BASIC = `${env.OPEN_WEATHER_API_HOST}${OPEN_WEATHER_API_BASE_PATH}`;
const OPEN_WEATHER_API_QUERY_BASIC = `?${OPEN_WEATHER_API_QUERY_ID}${OPEN_WEATHER_API_UNITS}`;

/**
 * Lepsi nacin kreiranja duzeg stringa iz niza.
 *
 * @type {string}
 */
const OPEN_WEATHER_API_URL_CURRENT = [
    OPEN_WEATHER_API_URL_BASIC, env.OPEN_WEATHER_API_CURRENT, OPEN_WEATHER_API_QUERY_BASIC
].join('');

const OPEN_WEATHER_API_URL_FORECAST = [
    OPEN_WEATHER_API_URL_BASIC, env.OPEN_WEATHER_API_FORECAST_FIVE_DAYS, OPEN_WEATHER_API_QUERY_BASIC
].join('');
