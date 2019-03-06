const saveToHistory = () => {
    let rawHistory = localStorage.getItem('history') || JSON.stringify([]);
    let history = JSON.parse(rawHistory);

    const latestRequest = {
        city: localStorage.getItem('city') || '',
        country: localStorage.getItem('country') || '',
        date: Date.now(),
        forecast: false
    };

    history.push(latestRequest);

    localStorage.setItem('history', JSON.stringify(history));
};

const setForecastToLastEntry = () => {
    let rawHistory = localStorage.getItem('history');
    let history = JSON.parse(rawHistory);
    history[history.length - 1].forecast = true;

    localStorage.setItem('history', JSON.stringify(history));
};

const renderHistoryData = () => {
    let rawHistory = localStorage.getItem('history');
    let history = JSON.parse(rawHistory);
    let i = history.length;
    let tableBody = document.getElementById('history-data');
    tableBody.innerHTML = '';
    
    for (i >= 0; i--;) {
        const tableRow = document.createElement("tr");

        const cityData = document.createElement("td");
        cityData.innerText = history[i].city;
        tableRow.appendChild(cityData);

        const countryData = document.createElement("td");
        countryData.innerText = history[i].country;
        tableRow.appendChild(countryData);

        const forecastData = document.createElement("td");
        forecastData.innerText = history[i].forecast;
        tableRow.appendChild(forecastData);

        const date = new Date(history[i].date);
        const dateData = document.createElement("td");
        dateData.innerText = date.toString().slice(0, 21);
        tableRow.appendChild(dateData);

        const index = i;
        const remove = document.createElement("td");
        remove.innerText = 'remove';
        remove.style.cursor = 'pointer';
        remove.onclick = () => removeHistoryEntry(index);
        tableRow.appendChild(remove);

        tableBody.appendChild(tableRow);
    }
};

const removeHistoryEntry = (index) => {
    let rawHistory = localStorage.getItem('history');
    let history = JSON.parse(rawHistory);

    history.splice(index, 1);
;
    localStorage.setItem('history', JSON.stringify(history));
    renderHistoryData();
};

const removeAllHistoryData = () => {
    localStorage.setItem('history', JSON.stringify([]));
    renderHistoryData();
};