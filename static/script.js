const citySearchInput = document.getElementById("citySearch");
const citySelect = document.getElementById("citySelect");
let data_option = null;

if (citySelect.options.length === 0) {
  citySelect.classList.add("hide");
}



citySearchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {

        const searchTerm = citySearchInput.value;
        const response = await fetch(`/search?term=${searchTerm}`);
        const data = await response.json();
        data_option = data;
        citySelect.innerHTML = "";  // Clear previous options
        for (const city in data) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
        updateWeather(data[Object.keys(data)[0]]);
        if (citySelect.options.length === 5){
    citySelect.classList.remove("hide");
}       if (citySelect.options.length === 0){
            citySelect.classList.remove("hide");
            }
    }
});

citySelect.addEventListener("change", async () => {
    const selectedCityData = data_option[citySelect.value];
    updateWeather(selectedCityData);
});

async function updateWeather(selectedCityData) {
    const lat = selectedCityData.lat;
    const lon = selectedCityData.lon;

    // Envoyer une nouvelle requête à l'API de météo en utilisant les coordonnées
    const weatherResponse = await fetch(`/weather?lat=${lat}&lon=${lon}`);
    const weatherData = await weatherResponse.json();


    // Mettre à jour les éléments HTML avec les données de la météo
    const dateElement = document.getElementById("date");
    const tempDayElement = document.getElementById("temp_day");
    const tempMinElement = document.getElementById("temp_min");
    const tempMaxElement = document.getElementById("temp_max");
    const feelsLikeElement = document.getElementById("description");
    const weatherIconElement = document.getElementById("icon");

    // Mettre à jour les prévisions météorologiques
    const forecastElement = document.getElementById("forecastContainer");

   if (forecastElement) {
    // Remove existing forecast cards
    while (forecastElement.firstChild) {
        forecastElement.removeChild(forecastElement.firstChild);
    }

    // Add updated forecast cards
    for (const day of weatherData) {
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-card");

        let forecastDate =` <h3>${day.date}</h3><br>`;
        forecastItem.innerHTML += forecastDate;

        forecastElement.appendChild(forecastItem)

        const imgElement = document.createElement("img");
        imgElement.src = `static/${day.icon}`;
        imgElement.alt = `Weather Icon for ${day.date}`;

        forecastItem.appendChild(imgElement);

        let forecastHtlm = `
            <h2><strong>${day.temp_day}°C</strong></h2> <br>
            <strong>${day.description}</strong><br>
            <strong>RealFeel:</strong> ${day.feels_like}°C<br>
            Min: ${day.temp_min}°C / Max: ${day.temp_max}°C <br>
        `;

        forecastItem.innerHTML += forecastHtlm;

        forecastElement.appendChild(forecastItem);
    }
}

}




