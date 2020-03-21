var degreesFahrenheit

function calculateTodayFahr (response) {
    degreesFahrenheit = Math.round((parseInt(response.main.temp) - 273.15) * 1.8 + 32);
    return degreesFahrenheit
}

$("#city-search").on("click", function(event) {
    event.preventDefault();
    var citySearch = $("#search-box").val().trim();
    console.log(citySearch);
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=0148692f495f14a2ef755e446f5b33e4"
    var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=0148692f495f14a2ef755e446f5b33e4"
    
    $.ajax({
        url: todayURL,
        method: "GET"
    }).then(function(response){

        console.log(response);
        calculateTodayFahr(response);

        var date = new Date(response.dt * 1000).toLocaleDateString("en-US");

        $("#city-date").text(response.name + " " + date);
        $("#today-temp").text(degreesFahrenheit);
        $("#today-hum").text(response.main.humidity);
        $("#today-wind").text(response.wind.speed);

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0148692f495f14a2ef755e446f5b33e4&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(callback){
    
            console.log(callback)

            if (callback.value < 3) {
                var indexBtn = $("<button>")
                $(indexBtn).attr("class", "btn btn-success").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else if (3 < callback.value < 8) {
                var indexBtn = $("<button>");
                $(indexBtn).attr("class", "btn btn-warning").text(callback.value);
                $("#today-uv").append(indexBtn);
            }

            else {
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
    });

    
})
