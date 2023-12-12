localIcons = [
    "sct",
    "skc",
    "few",
    "snow",
    "rain",
    "wind"
]

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
                const iconName = icon.split('/')[6]
                var iconPath = "." + "/" + icon.split('/')[5] + "/" + icon.split('/')[6] + ".png"
                console.log(iconPath)
                if (!localIcons.includes(iconName)) {
                    iconPath = icon //uses one returned my API
                }
                console.log(iconPath)

                // Display weather information
                weatherWidget.innerHTML = `
                    <h1>Weather Widget</h1>
                    <div id="flex-container">
                    <img id="weather-icon" src="${iconPath}" alt="Weather Icon">
                    <div>${temperature} °F</div>
                    </div>
                    <div>${conditions}</div>
                    <div> Wind at ${windSpeed} in ${windDirection} direction</div>
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