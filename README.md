# Weather Forecast Application 🌦️

A modern, responsive single-page application for weather forecasts. Built using React, this application allows users to search for weather information by city, receive auto-suggestions with city names, and view detailed weather forecasts based on their location. The app offers a sleek user interface and seamless functionality using various APIs.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [APIs Used](#apis-used)
- [Approach](#approach)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features ✨
- **City Weather Search**: Enter a city name to get the current weather details.
- **Auto-Suggestions**: As you type, get suggestions for city names.
- **Debounced API Requests**: Efficient search with debouncing to reduce unnecessary API calls.
- **Weather by Coordinates**: Click on a suggestion to get weather details by latitude and longitude for precise information.
- **Responsive Design**: Fully responsive and user-friendly interface.
- **Toggle Temperature Unit**: Easily switch between Celsius and Fahrenheit.

## Tech Stack 🛠️
- **Frontend**: React, JavaScript, HTML, CSS, Tailwind CSS
- **State Management**: Redux
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Backend**: OpenWeatherMap API (public API)

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/weather-forecast-app.git
    ```
   
2. Navigate to the project directory:
    ```bash
    cd weather-forecast-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```plaintext
    VITE_WEATHER_API_KEY=your_api_key
    VITE_WEATHER_API_URI=https://api.openweathermap.org/data/2.5/weather
    ```

5. Start the development server:
    ```bash
    npm start
    ```

## APIs Used 🌐

1. **OpenWeatherMap Geo Direct API**: Used for fetching city suggestions based on user input.
   - Endpoint: `https://api.openweathermap.org/geo/1.0/direct`
2. **OpenWeatherMap Weather API**: Used to fetch weather details by city name.
   - Endpoint: `https://api.openweathermap.org/data/2.5/weather`
3. **OpenWeatherMap Weather by Coordinates API**: Used to fetch weather details by latitude and longitude.
   - Endpoint: `https://api.openweathermap.org/data/2.5/weather`

## Approach 🧠

### 1. **City Search with Auto-Suggestions**
- Users can start typing a city name into the search bar.
- The app implements a debouncing mechanism (2 seconds) to minimize API calls.
- If the user stops typing for 2 seconds and has entered more than 3 characters, the app fetches city suggestions using the Geo Direct API.

### 2. **Dropdown with City Suggestions**
- City suggestions are displayed in a dropdown menu.
- Users can click on any suggestion to select a city, triggering a weather fetch by coordinates.

### 3. **Search Button Functionality**
- If the user clicks the "Search" button without selecting a suggestion, the app fetches weather data by city name.

### 4. **Displaying Weather Data**
- The app displays current weather conditions, hourly forecasts, and an 5-day forecast.
- Users can toggle between Celsius and Fahrenheit for temperature display.

## Usage 📖

- Enter a city name in the search bar.
- Choose a city from the dropdown or click the "Search" button.
- View current weather, hourly, and 8-day forecasts.
- Switch between Celsius and Fahrenheit as needed.

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

Distributed under the Upadhyay License. See `LICENSE` for more information.
