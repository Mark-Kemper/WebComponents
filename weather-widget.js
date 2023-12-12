document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.querySelector("weather-widget");
    const apiUrl = `https://api.weather.gov/gridpoints/SGX/55,22/forecast`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Log the response for debugging

            // Check if the required properties exist
            if (data.properties && data.properties.periods && data.properties.periods.length > 0) {
                const temperature = data.properties.periods[0].temperature;
                const conditions = data.properties.periods[0].shortForecast;
                const windSpeed = data.properties.periods[0].windSpeed;
                const windDirection = data.properties.periods[0].windDirection;

                const icon = data.properties.periods[0].icon;
                console.log(icon)
                // Display weather information
                weatherWidget.innerHTML = `
                    <div>${temperature} °F</div>
                    <div>${conditions}</div>
                    <div> Wind at ${windSpeed} in ${windDirection} direction</div>
                    <img id="weather-icon" src="${icon}" alt="Weather Icon">
                `;
            } else {
                console.error("Invalid API response structure");
                weatherWidget.innerHTML = "Current Weather Conditions Unavailable";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherWidget.innerHTML = "Current Weather Conditions Unavailable";
        });
},
);