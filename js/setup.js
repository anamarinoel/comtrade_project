const UNITS_ALLOWED_TYPES = ['metric', 'imperial'];
const TEMERATURE_MARK_METRIC = ' &#8451;';
const TEMERATURE_MARK_IMPERIAL = ' &#8457;';

const setUnitsType = (type) => {
    localStorage.setItem('units', type);
};

const getUnitsType = () => {
    return localStorage.getItem('units') || 'metric';
};

const urlParams = new URLSearchParams(window.location.search);
const units = urlParams.get("units");

if (units && UNITS_ALLOWED_TYPES.includes(units)) {
    setUnitsType(units);
}

const getTemperatureMark = () => {
    let mark = TEMERATURE_MARK_METRIC;

    if (getUnitsType() === 'imperial') {
        mark = TEMERATURE_MARK_IMPERIAL;
    }

    return mark;
};

