const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.user(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    //you will need to create your own key at openweather.org
    const apiKey = "";
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&" + lat + "&lon=" + lon + "&units="+ unit +"&lang=en";

    app.get(url, function(response) {
        console.log(response.statusCode);

        //how to parse a JSON file 
        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDecription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1> The temperature in " +query+ "is" + temp + "degrees</h1>");
        res.write("<h2>The weather is currently " + weatherDecription+ "</h2>");
        res.write("<img src=" + imageURL +">");
        res.send();
        });
        //creates a JSON file if needed
        //console.log(JSON.stringify(object));
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
