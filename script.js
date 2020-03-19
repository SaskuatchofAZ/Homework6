$("#city-search").on("click", function(event) {
    event.preventDefault();
    var citySearch = $("#search-box").val().trim();
    console.log(citySearch);
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=0148692f495f14a2ef755e446f5b33e4"
    var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&cnt=5&appid=0148692f495f14a2ef755e446f5b33e4"
    var uvURL = "https://http://api.openweathermap.org/data/2.5/uvi?appid=0148692f495f14a2ef755e446f5b33e4&lat={lat}&lon={lon}"

    $.ajax({
        url: todayURL,
        method: "GET"
    }).then(function(response){

        console.log(response)
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0148692f495f14a2ef755e446f5b33e4&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(callback){
    
            console.log(callback)
    
            
        });
    });

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    });

    
})
