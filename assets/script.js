// List of all variables using id.
var searchBtn = document.querySelector("#search");
var currentCity = document.querySelector("#current-city");
var searchCity = document.querySelector("#city-search")
var searchData = document.querySelector("#search-data");
var clearData = document.querySelector("#clear");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumid = document.querySelector("#current-humid");
var firstDayTemp = document.querySelector("#first-day-temp");
var firstDayWind = document.querySelector("#first-day-wind");
var firstDayHumid = document.querySelector("#first-day-humid");
var secondDayTemp = document.querySelector("#second-day-temp");
var secondDayWind = document.querySelector("#second-day-wind");
var secondDayHumid = document.querySelector("#second-day-humid");
var thirdDayTemp = document.querySelector("#third-day-temp");
var thirdDayWind = document.querySelector("#third-day-wind");
var thirdDayHumid = document.querySelector("#third-day-humid");
var fourthDayTemp = document.querySelector("#fourth-day-temp");
var fourthDayWind = document.querySelector("#fourth-day-wind");
var fourthDayHumid = document.querySelector("#fourth-day-humid");
var fifthDayTemp = document.querySelector("#fifth-day-temp");
var fifthDayWind = document.querySelector("#fifth-day-wind");
var fifthDayHumid = document.querySelector("#fifth-day-humid");
var todayIcon = document.querySelector("#today-icon");
var firstDayIcon = document.querySelector("#first-day-icon");
var secondDayIcon = document.querySelector("#second-day-icon");
var thirdDayIcon = document.querySelector("#third-day-icon");
var fourthDayIcon = document.querySelector("#fourth-day-icon");
var fifthDayIcon = document.querySelector("#fifth-day-icon");
//Using dayjs to desiplay the dates.
var currentDate = dayjs();
$('#current-date').text(currentDate.format("M/D/YYYY"));
var dayOne = currentDate.add(1,'day');
$('#day-one').text(dayOne.format("M/D/YYYY"));
var dayTwo = dayOne.add(1,'day');
$('#day-two').text(dayTwo.format("M/D/YYYY"));
var dayThree = dayTwo.add(1,'day');
$('#day-three').text(dayThree.format("M/D/YYYY"));
var dayFour = dayThree.add(1,'day');
$('#day-four').text(dayFour.format("M/D/YYYY"));
var dayFifth = dayFour.add(1,'day');
$('#day-fifth').text(dayFifth.format("M/D/YYYY"));

//Clear button function.
clearData.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//Initial function
function init() {
  var cityList = [];
  cityList = JSON.parse(localStorage.getItem("searchedCities"));
if(cityList !== null) {
  for(var i = 0; i < cityList.length; i++) {
    var listEl = document.createElement("button");
    listEl.textContent = cityList[i];
    listEl.setAttribute("class", "col-12 col-md-8");
    listEl.setAttribute("style", "background-color: rgb(9, 133, 235); color: aliceblue; border-style: hidden; margin-top: 2%")
    searchData.append(listEl);
    listEl.addEventListener("click", searchHistoryBtn);
  }
  
}
};

//Function when we click previous searched cities and we display data on the website
function searchHistoryBtn () {
console.log(this.textContent);
var cityName = (this.textContent);
//Fetching info from openweather api.
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=670a481f9b9e4393630b40035da27bfc`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //Updating the info about the current day.
    currentCity.textContent = cityName
    currentTemp.textContent = `${data.list[0].main.temp}`
    currentWind.textContent = `${data.list[0].wind.speed}`
    currentHumid.textContent = `${data.list[0].main.humidity}`
    firstDayTemp.textContent = `${data.list[6].main.temp}`
    //Updating the info about the 5-days forecast.
    firstDayWind.textContent = `${data.list[6].wind.speed}`
    firstDayHumid.textContent = `${data.list[6].main.humidity}`
    secondDayTemp.textContent = `${data.list[14].main.temp}`
    secondDayWind.textContent = `${data.list[14].wind.speed}`
    secondDayHumid.textContent = `${data.list[14].main.humidity}`
    thirdDayTemp.textContent = `${data.list[22].main.temp}`
    thirdDayWind.textContent = `${data.list[22].wind.speed}`
    thirdDayHumid.textContent = `${data.list[22].main.humidity}`
    fourthDayTemp.textContent = `${data.list[30].main.temp}`
    fourthDayWind.textContent = `${data.list[30].wind.speed}`
    fourthDayHumid.textContent = `${data.list[30].main.humidity}`
    fifthDayTemp.textContent = `${data.list[38].main.temp}`
    fifthDayWind.textContent = `${data.list[38].wind.speed}`
    fifthDayHumid.textContent = `${data.list[38].main.humidity}`
    //Updating the weather icons from the api.
    todayIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
    firstDayIcon.src = `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`
    secondDayIcon.src = `https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png`
    fourthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[30].weather[0].icon}.png`
    fifthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[38].weather[0].icon}.png`
  })
}


//Fetching data from the api about our default city in the website.
fetch("https://api.openweathermap.org/data/2.5/forecast?q=philadelphia&appid=670a481f9b9e4393630b40035da27bfc")
  .then(function (answer) {
    return answer.json(); 
  })
  .then(function (data) {
    //Updating the info about the current day.
    currentTemp.textContent = `${data.list[0].main.temp}`
    currentWind.textContent = `${data.list[0].wind.speed}`
    currentHumid.textContent = `${data.list[0].main.humidity}`
    //Updating the info about the 5-days forecast.
    firstDayTemp.textContent = `${data.list[6].main.temp}`
    firstDayWind.textContent = `${data.list[6].wind.speed}`
    firstDayHumid.textContent = `${data.list[6].main.humidity}`
    secondDayTemp.textContent = `${data.list[14].main.temp}`
    secondDayWind.textContent = `${data.list[14].wind.speed}`
    secondDayHumid.textContent = `${data.list[14].main.humidity}`
    thirdDayTemp.textContent = `${data.list[22].main.temp}`
    thirdDayWind.textContent = `${data.list[22].wind.speed}`
    thirdDayHumid.textContent = `${data.list[22].main.humidity}`
    fourthDayTemp.textContent = `${data.list[30].main.temp}`
    fourthDayWind.textContent = `${data.list[30].wind.speed}`
    fourthDayHumid.textContent = `${data.list[30].main.humidity}`
    fifthDayTemp.textContent = `${data.list[38].main.temp}`
    fifthDayWind.textContent = `${data.list[38].wind.speed}`
    fifthDayHumid.textContent = `${data.list[38].main.humidity}`
    //Updating the weather icons from the api.
    todayIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
    firstDayIcon.src = `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`
    secondDayIcon.src = `https://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png`
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`
    fourthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[30].weather[0].icon}.png`
    fifthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[38].weather[0].icon}.png`
  });




//Function when we click search button and we get info about the city that we searched.
function getWeather() {
var nameCity = searchCity.value;
console.log(nameCity)
console.log(searchCity.value);
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&appid=670a481f9b9e4393630b40035da27bfc`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //Updating the info about the current day.
    currentCity.textContent = nameCity
    currentTemp.textContent = `${data.list[0].main.temp}`
    currentWind.textContent = `${data.list[0].wind.speed}`
    currentHumid.textContent = `${data.list[0].main.humidity}`
    //Updating the info about the 5-days forecast.
    firstDayTemp.textContent = `${data.list[6].main.temp}`
    firstDayWind.textContent = `${data.list[6].wind.speed}`
    firstDayHumid.textContent = `${data.list[6].main.humidity}`
    secondDayTemp.textContent = `${data.list[14].main.temp}`
    secondDayWind.textContent = `${data.list[14].wind.speed}`
    secondDayHumid.textContent = `${data.list[14].main.humidity}`
    thirdDayTemp.textContent = `${data.list[22].main.temp}`
    thirdDayWind.textContent = `${data.list[22].wind.speed}`
    thirdDayHumid.textContent = `${data.list[22].main.humidity}`
    fourthDayTemp.textContent = `${data.list[30].main.temp}`
    fourthDayWind.textContent = `${data.list[30].wind.speed}`
    fourthDayHumid.textContent = `${data.list[30].main.humidity}`
    fifthDayTemp.textContent = `${data.list[38].main.temp}`
    fifthDayWind.textContent = `${data.list[38].wind.speed}`
    fifthDayHumid.textContent = `${data.list[38].main.humidity}`
    //Updating the weather icons from the api.
    todayIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
    firstDayIcon.src = `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`
    secondDayIcon.src = `https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png`
    fourthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[30].weather[0].icon}.png`
    fifthDayIcon.src = `https://openweathermap.org/img/wn/${data.list[38].weather[0].icon}.png`
})
//Saving thhe cities that we searched into local storage.
var citiesList = JSON.parse(localStorage.getItem("searchedCities")) || [];
citiesList.push(searchCity.value);
localStorage.setItem("searchedCities",JSON.stringify(citiesList));
//Displaying the cities in the local storage into the website.
for(var i = 0; i < citiesList.length; i++) {
  var citiesList = [];
  citiesList.push(searchCity.value);
  //Creating buttons with our past searched cities.
  var list = document.createElement("button");
  list.textContent = citiesList[i];
  //Setting attributes to those buttons.
  list.setAttribute("class", "col-12 col-md-8");
  list.setAttribute("style", "background-color: rgb(9, 133, 235); color: aliceblue; border-style: hidden; margin-top: 2%")
  //Appending these buttons into the section.
  searchData.append(list);
}
};

searchBtn.addEventListener("click", getWeather);

init();
