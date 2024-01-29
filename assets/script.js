$(document).ready(function () {
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    displayCities(savedCities);

    $("#search-form").submit(function (event) {
        event.preventDefault();
    
        const cityname = $("#search-input").val();
        const key = "33180eb70b4778f17b8aaca9485bd8ad";
        const queryURL1 = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${key}`;

        
    });