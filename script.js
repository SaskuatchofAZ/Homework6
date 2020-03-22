var degreesFahrenheit
var citySearch
var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
var iconcode

function calculateTodayFahr (response) {
    degreesFahrenheit = Math.round((parseInt(response.main.temp) - 273.15) * 1.8 + 32);
    return degreesFahrenheit
}


$("#city-search").on("click", function(event) {
    event.preventDefault();
    citySearch = $("#search-box").val().trim();
    console.log(citySearch);
    localStorage.setItem("savedCity", citySearch);
    cityButton = $("<button>");
    cityButton.attr("type", "button");
    cityButton.attr("class", "btn btn-light");
    cityButton.attr("id", "city-button");
    cityButton.attr("style", "margin: 10px;")
    cityButton.text(citySearch)
    cityButton.attr("data-city", citySearch);
    $("#city-list").prepend(cityButton);

    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=0148692f495f14a2ef755e446f5b33e4"
    var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=0148692f495f14a2ef755e446f5b33e4"
    
    $.ajax({
        url: todayURL,
        method: "GET"
    }).then(function(response){
        var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";

        console.log(response);
        calculateTodayFahr(response);
        iconcode = response.weather[0].icon
        console.log(iconcode);

        var date = new Date(response.dt * 1000).toLocaleDateString("en-US");

        $("#city-date").text(response.name + " " + date);
        $("#today-temp").text(degreesFahrenheit);
        $("#today-hum").text(response.main.humidity);
        $("#today-wind").text(response.wind.speed);
        $("#main-icon").attr("src", iconUrl);

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0148692f495f14a2ef755e446f5b33e4&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(callback){
            $("#today-uv").empty();
    
            console.log(callback)

            if (callback.value < 3) {
                $("#today-uv").empty();
                var indexBtn = $("<button>")
                $(indexBtn).attr("class", "btn btn-success").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else if (3 < callback.value < 8) {
                $("#today-uv").empty();
                var indexBtn = $("<button>");
                $(indexBtn).attr("class", "btn btn-warning").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else {
                $("#today-uv").empty();
                var indexBtn = $("<button>");
                $(indexBtn).attr("class", "btn btn-danger").text(callback.value);
                $("#today-uv").append(indexBtn);
            }
            
    
            
        });
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        for (i = 5; i < 38; i++) {
            var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            degreesFahrenheit = Math.round((parseInt(response.list[i].main.temp) - 273.15) * 1.8 + 32)
            var newDate = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US");
            $("#daydate" + i).text(newDate);
            $("#temp" + i).text(degreesFahrenheit);
            $("#hum" + i).text(response.list[i].main.humidity);
            iconcode = response.list[i].weather[0].icon;
            console.log(iconcode);
            $("#icon" + i).attr("src", iconUrl);
        }
    });

    
});

$("#city-button").on("click", function(){

    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + this.attr("data-city") + "&appid=0148692f495f14a2ef755e446f5b33e4"
    var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + this.attr("data-city") + "&appid=0148692f495f14a2ef755e446f5b33e4"
    
    $.ajax({
        url: todayURL,
        method: "GET"
    }).then(function(response){
        var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";

        console.log(response);
        calculateTodayFahr(response);
        iconcode = response.weather[0].icon
        console.log(iconcode);

        var date = new Date(response.dt * 1000).toLocaleDateString("en-US");

        $("#city-date").text(response.name + " " + date);
        $("#today-temp").text(degreesFahrenheit);
        $("#today-hum").text(response.main.humidity);
        $("#today-wind").text(response.wind.speed);
        $("#main-icon").attr("src", iconUrl);

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0148692f495f14a2ef755e446f5b33e4&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(callback){
            $("#today-uv").empty();
    
            console.log(callback)

            if (callback.value < 3) {
                $("#today-uv").empty();
                var indexBtn = $("<button>")
                $(indexBtn).attr("class", "btn btn-success").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else if (3 < callback.value < 8) {
                $("#today-uv").empty();
                var indexBtn = $("<button>");
                $(indexBtn).attr("class", "btn btn-warning").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else {
                $("#today-uv").empty();
                var indexBtn = $("<button>");
                $(indexBtn).attr("class", "btn btn-danger").text(callback.value);
                $("#today-uv").append(indexBtn);
            }
            
    
            
        });
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        for (i = 5; i < 38; i++) {
            var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            degreesFahrenheit = Math.round((parseInt(response.list[i].main.temp) - 273.15) * 1.8 + 32)
            var newDate = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US");
            $("#daydate" + i).text(newDate);
            $("#temp" + i).text(degreesFahrenheit);
            $("#hum" + i).text(response.list[i].main.humidity);
            iconcode = response.list[i].weather[0].icon;
            $("#icon" + i).attr("src", iconUrl);
        }
    });

    
});
