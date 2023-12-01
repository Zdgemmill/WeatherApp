$(document).ready(function () {
    var searchButton = $(".searchBtn");

    $(searchButton).on('click', function (event) {
        event.preventDefault();

        var cityName = $(this).siblings(".userSearch").val();
        console.log(cityName);
        var apiKey = 'b0c39f5a2971741dcd1cbbf2559ab9d7';
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

        // processing our returned data 
        fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // show us data
                // var currentTemp = data.list[0].main.temp;
                displayCurrentWeather(data);
            })
            .catch(function (error) {
                console.error('There was a problem with the fetch operation:', error);
            });

        //pull the weather data we need from our returned data 
        // displayCurrentWeather();
        //create weather elements and append to the body somewhere
        //store saved city search using local storage
        //link that to the search results


    });


});
function displayCurrentWeather(data) {
    for (let i = 0; i < 5; i++) {
        var city = data.city.name;
        var currentTemp = data.list[i * 8].main.temp;
        var currentWind = data.list[i * 8].wind.speed + " MPH";
        var currentHumidity = data.list[i * 8].main.humidity + "%";
        var currentTimeStamp = data.list[i * 8].dt;
        var currentDate = new Date(currentTimeStamp * 1000);
        var currentDay = currentDate.getDate();
        var currentMonth = currentDate.getMonth() + 1;
        var currentYear = currentDate.getFullYear();
        var formattedDate = currentMonth + '/' + currentDay + '/' + currentYear;
        var weatherIcon = data.list[i * 8].weather.icon;
        var citySearch = document.body.getElementsByClassName("citySearch col ");

        // creating html elements
        var weatherDiv = document.createElement("div");
        var tempHeader = document.createElement("h3");
        var windHeader = document.createElement("h5");
        var dateHeader = document.createElement("h5");



        // dynamic naming
        var tempStr = "temp" + i;
        var windStr = "wind" + i;
        var dateStr = "date" + i;

        // assigning classes and ids
        weatherDiv.classList.add("card");
        tempHeader.setAttribute("id", tempStr);
        windHeader.setAttribute("id", windStr);
        dateHeader.setAttribute("id", dateStr);

        debugger
        //appending elements
        weatherDiv.appendChild(tempHeader);
        weatherDiv.appendChild(windHeader);
        weatherDiv.appendChild(dateHeader);
        citySearch.appendChild(weatherDiv);

        // JQUERY text values
        $("#" + tempStr).text(currentTemp + '°F');
        $("#" + windStr).text(currentWind);
        // $().text(currentHumidity);
        $("#" + dateStr).text(city + ":  " + formattedDate);
        // $('#weatherIcon').attr('src', https://openweathermap.org/img/wn/$%7BweatherIcon%7D.png);
    }
};

