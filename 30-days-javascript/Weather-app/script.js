// script.js
const apiKey = '62d2cb41508c42fca92220409242210';
const searchInput = document.querySelector('.search-container input');
const searchBtn = document.querySelector('.search-btn');

// Initialize with default location
window.addEventListener('load', () => {
    checkWeather('Nairobi');
});

// Function to format date and time
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

// Function to update weather display
function updateWeatherDisplay(data) {
    document.querySelector('.location').textContent = data.location.name;
    document.querySelector('.region').textContent = data.location.region;
    document.querySelector('.country').textContent = data.location.country;
    document.querySelector('.local-time').textContent = formatDateTime(data.location.localtime);
    document.querySelector('.temperature h2').textContent = `${Math.round(data.current.temp_c)}°C`;
    document.querySelector('.humidity-value').textContent = `${data.current.humidity}%`;
    document.querySelector('.wind-value').textContent = `${data.current.wind_kph} km/h`;

    // Update weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    // Use the weather condition code to set appropriate icon
    // You'll need to map the condition codes to your actual weather icons
    weatherIcon.src = data.current.condition.icon;
}

// Function to fetch weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        checkWeather(location);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const location = searchInput.value.trim();
        if (location) {
            checkWeather(location);
        }
    }
});