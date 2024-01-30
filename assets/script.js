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
            
                const currentDate = dayjs().format("dddd DD MMM YYYY | HH:mm");
            const txt1 = $("<h2>").text(currentDate);
            $("#today").append(txt1);
            const location = `${cityname}, ${country}`;
            const locationParagraph = $("<h2>").text(location);
            const description0 = $("<span>").text(
            data.list[0].weather[0].description
            );
            $("#today").append(locationParagraph, description0);


            const imageUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
            const image = $("<img>")
            .attr("src", imageUrl)
            .attr("alt", "Weather Icon");
            $("#today").append(image, "<hr>");

            
            const tempKelvin = data.list[0].main.temp;
            const tempC = $("<p>").text(
            `Temp: ${Math.round(tempKelvin - 273.15)}°C`
            );
            const wind = $("<p>").text(`Wind: ${data.list[0].wind.speed} m/ph`);
            const humidity = $("<p>").text(
            `Humidity: ${data.list[0].main.humidity}%`
            );
            $("#today").append(tempC, wind, humidity);

            displayWeatherData();
        });
    })
    .catch((error)=> {
        console.log(error);
    });

    $("#today").empty();
    $("#weatherForecast").empty();

    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    savedCities.push(cityname);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));

    displayCities(savedCities);
    $("#search-input").val("");
        });


        function displayCities(cities) {
            const history = $("#history");
            history.empty(); 
        
            cities.forEach(function (city, index) {
            const cityButton = $(
                '<button class="btn-secondary city-button"></button>'
            )
                .text(city)
                .attr("data-index", index);
            const deleteButton = $('<span class="deleteButton">Delete</span>');
        
            const listItem = $("<li></li>").append(cityButton).append(deleteButton);
            history.append(listItem);
        
            
            deleteButton.click(function () {
                deleteCity(index);
            });

            cityButton.click(function () {
                const clickedCity = $(this).text();
                console.log("Clicked City:", clickedCity);
                // handle the clicked city value
                const key = "33180eb70b4778f17b8aaca9485bd8ad";
                const queryURL1 = `https://api.openweathermap.org/geo/1.0/direct?q=${clickedCity}&limit=5&appid=${key}`;

                fetch(queryURL1)
                .then((response) => response.json())
                .then((data) => {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const country = data[0].country;
                console.log(data);    

                const queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
                // Fetch #2 to get the forecast
                fetch(queryURL2)
                .then((response) => response.json())
                .then((data) => {
                    
                    function displayWeatherData() {
                    const forecastContainer = $("#weatherForecast");
    
                      // Group data by day
                    const groupedByDay = {};
                    data.list.forEach((forecast) => {
                        
                        const dayOfWeek = dayjs(forecast.dt_txt).format("dddd DD");
    
                        
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
                        const tempKelvin = forecast.main.temp;
                        const tempC = `${Math.round(tempKelvin - 273.15)}°C`;
    
                    
                        dayContainer.append(
                        `<div><img src="${imageUrl}" alt="Weather Icon"><br> ${forecast.weather[0].description} <br>Temp: ${tempC} |<br> Wind: ${forecast.wind.speed} m/ph | <br>Humidity: ${forecast.main.humidity}%</div> <hr>`
                        );
    
                    
                        forecastContainer.append(dayContainer);
                    }
                } 
            
                const currentDate = dayjs().format("dddd DD MMM YYYY | HH:mm");
    
                const txt1 = $("<h2>").text(currentDate);
                $("#today").append(txt1);
                const location = `${clickedCity}, ${country}`;
                const locationParagraph = $("<h2>").text(location);
                const description0 = $("<span>").text(
                data.list[0].weather[0].description
                );
                $("#today").append(locationParagraph, description0);

                const imageUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
                const image = $("<img>")
                .attr("src", imageUrl)
                .attr("alt", "Weather Icon");
                $("#today").append(image, "<hr>");

                const tempKelvin = data.list[0].main.temp;
                const tempC = $("<p>").text(
                `Temp: ${Math.round(tempKelvin - 273.15)}°C`
                );
                const wind = $("<p>").text(
                `Wind: ${data.list[0].wind.speed} m/ph`
                );
                const humidity = $("<p>").text(
                `Humidity: ${data.list[0].main.humidity}%`
                );
                $("#today").append(tempC, wind, humidity);

                displayWeatherData();
                });
            })
            .catch((error)=> {
                console.log(error);
            });

            $("#today").empty();
            $("#weatherForcast").empty();
        });
    });
            }

            function deleteCity(index) {
                const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
                savedCities.splice(index, 1);
                localStorage.setItem("savedCities", JSON.stringify(savedCities));
                displayCities(savedCities);
            }

        });