document.addEventListener('DOMContentLoaded', () => {
    const weatherDataElement = document.getElementById('weather-data');

    const latitude = 20.2117; // Tulum, Mexico latitude
    const longitude = -87.4633; // Tulum, Mexico longitude

    const apiUrl = `/api/weather?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;

    console.log("Fetching weather data from:", apiUrl); // Added log

    fetch(apiUrl)
        .then(response => {
            console.log("API Response received:", response); // Added log
            if (!response.ok) { // Check if response was successful
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Data received:", data); // Added log
            if (data.current_weather) {
                const weather = data.current_weather;
                weatherDataElement.innerHTML = `
                    <p>Temperature: ${weather.temperature}°F</p>
                    <p>Wind Speed: ${weather.windspeed} mph</p>
                    <p>Wind Direction: ${weather.winddirection}°</p>
                    <p>Weather Code: ${weather.weathercode}</p>
                    <p>Time: ${new Date(weather.time).toLocaleString()}</p>
                `;
            } else {
                weatherDataElement.innerHTML = '<p>Could not retrieve current weather data. Check `current_weather` in console.</p>'; // Modified error message
            }
        })
        .catch(error => {
            console.error('Error fetching weather data in browser:', error); // Modified error message
            weatherDataElement.innerHTML = '<p>Failed to load weather data. Check console for details.</p>'; // Modified error message
        });
});