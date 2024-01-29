$(document).ready(function () {
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    displayCities(savedCities);

    $("#search-form").submit(function (event) {
        event.preventDefault();
    
        const cityname = $("#search-input").val();
        const key = "33180eb70b4778f17b8aaca9485bd8ad";
        const queryURL1 = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${key}`;

        fetch(queryURL1)
        .then((Response) => Response.json())
        .then((data) => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const country = data[0].country;
            console.log(data);

            const queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

            fetch(queryURL2)
        .then((response) => response.json())
        .then((data) => {
            function displayWeatherData() {
            const forecastContainer = $("#weatherForecast");

            const groupedByDay = {};
            data.list.foreEach((forecast) => {
                const datOfWeek = dayjs(forcast.dt_text).format("dddd DD");

                if (dayjs(forecast.dt_txt).isAfter(dayjs(), "day")) {
                    if (!groupedByDay[dayOfWeek]) {
                    groupedByDay[dayOfWeek] = forecast;
                    }
                }
                }); 

                for (const dayOfWeek in groupedByDay) {
                    const dayContainer = $(
                    `<div class="day-container"><h3>${dayOfWeek}</h3></div>`
                    );
                    const forecast = groupedByDay[dayOfWeek];
    
                    const imageUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                    const tempK = forecast.main.temp;
                    const tempCel = `${Math.round(tempK - 273.15)}°C`;
    
                    dayContainer.append(
                    `<div><img src="${imageUrl}" alt="Weather Icon"><br> ${forecast.weather[0].description} <br>Temp: ${tempCel} |<br> Wind: ${forecast.wind.speed} m/ph | <br>Humidity: ${forecast.main.humidity}%</div> <hr>`
                    );

                    forecastContainer.append(dayContainer);
                }
                }
            
            }
        })
        );