let weather = {
    apiKey: "afcba3c113504547881081370d9ed0a3",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
             + city
             + "&appid="
             + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
          document.querySelector(".city").innerText = "Weather in " + city;
},
displayWeather: function (data) {
    for(i = 0; i<5; i++){
    const { name } = data.list[i];
    const { icon, description } = data.list[i].weather[0];
    const { temp, humidity } = data.list[i].main;
    const { speed } = data.list[i].wind;

    document.querySelector(".icon"+(i+1)).src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description"+(i+1)).innerText = description;
  document.querySelector(".temp"+(i+1)).innerText = Math.trunc(temp-273) + "°C";
  document.querySelector(".humidity"+(i+1)).innerText =
    "Humidity: " + humidity + "%";
  document.querySelector(".wind"+(i+1)).innerText =
    "Wind speed: " + speed + " kmph";
    document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80" + name + "')";}
          var d = new Date();
          var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
          function CheckDay(day){
              if(day + d.getDay() > 6){
                  return day + d.getDay() - 7;
              }
              else{
                  return day + d.getDay();
              }
          }
          
              for(j = 0; j<5; j++){
                  document.getElementById("day" + (j+1)).innerHTML = weekday[CheckDay(j)];
              }
},
search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);},
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".searchbar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Kochi");