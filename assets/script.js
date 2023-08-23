var API_KEY = '670a481f9b9e4393630b40035da27bfc';
var ciBtnList = [];
let ciName = '';
let seBtn = '';

function getCurW(ci) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${ci}&appid=${API_KEY}`
    $.get(requestUrl, function (response) {
        var curCity = ci + ' - '
        var toDa = response.list[0];
        var curDate = dayjs(toDa.dt_txt).format('MM/DD/YYYY');
        var iconUrl = `https://openweathermap.org/img/w/${toDa.weather[0].icon}.png`;
        var temp = 'Temp: ' + toDa.main.temp + '°F';
        var wiSpeed = 'Wind: ' + toDa.wind.speed + 'MPH';
        var humi = 'Humidity: ' + toDa.main.humidity + '%';
        $("#nameCurrent").text(curCity);
        $("#dateCurrent").text(curDate);
        if ($("#imgCurrent").length > 0) {
          $("#imgCurrent").remove();
        }
        var icon = $('<img>').addClass('card-img-top weather-img mr-5 mb-0').attr('src', iconUrl).attr('alt', 'weather icon').attr('id', 'imgCurrent');
        $('#current-flex-box').append(icon);
        $("#tempCurrent").text(temp);
        $("#windCurrent").text(wiSpeed);
        $("#humidityCurrent").text(humi);

        if ($("#five-days-weather .card").length > 0) {
          $("#five-days-weather .card").remove();
          $("#five-days-weather").remove();
        }
        var div = $('<div>').attr('id', 'five-days-weather').addClass('d-flex flex-wrap justify-content-between align-items-center border-2-purple');
        $('#parrentDiv').append(div);

        // Get data for the next 5 days
        for (var i = 1; i <= 5; i++) {
            var forecData = response.list[i * 8 - 1];
            var date = dayjs(forecData.dt_txt).format('MM/DD/YYYY');
            var forecIconUrl = `https://openweathermap.org/img/w/${forecData.weather[0].icon}.png`;
            var forecTemp = forecData.main.temp;
            var forecWinSpe = forecData.wind.speed;
            var forecHumi = forecData.main.humidity;
            var card = $('<div>').addClass('card col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-2');
            var cardBody = $('<div>').addClass('card-body');
            var date = $('<h5>').addClass('card-date').text(date).attr('id', 'forecast-date-' + i);
            var icon = $('<img>').addClass('card-img-top weather-img mr-5 mb-0').attr('src', forecIconUrl).attr('alt', 'weather icon').attr('id', 'forecast-icon-' + i);
            var temp = $('<p>').addClass('card-temp').text('Temp: ' + forecTemp + '°F').attr('id', 'forecast-temp-f-' + i);
            var wind = $('<p>').addClass('card-wind').text('Wind: ' + forecWinSpe + 'MPH').attr('id', 'forecast-wind-mph-' + i);
            var humi = $('<p>').addClass('card-humidity').text('Humidity: ' + forecHumi + '%').attr('id', 'forecast-humidity-' + i);
            cardBody.append(date, icon, temp, wind, humi);
            card.append(cardBody);
            div.append(card);
            $('#five-days-weather').append(div);
        }
    }).fail(function (hr, status, error) {
        var response = hr.responseJSON;
        if (response && response.cod && response.cod !== '200') {
          alert("Error: " + response.message);
        } else {
          alert("Error: " + error);
        }
    });
    return;
}

// Search for the city
function searchCi(button, city) {
  getCurW(city);
  return;
}

function renCiBu(city) {
    if ($.inArray(city, ciBtnList) !== -1) {
        return;
    } else {
        var newButton = $('<button>', {
            id: ciBtnList.length,
            class: 'btn btn-secondary',
            text: city
        });

        $('.list-group').append(newButton);
        return;
    }
}

function init() {
    console.log('data in local Storage');
    var cityBtnList = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(cityBtnList);
    if (!cityBtnList){return};
    for (var i = 0; i < cityBtnList.length; i++) {
        var cityName = cityBtnList[i];
        console.log(cityName);
        var newBu = $('<button>', {
            class: 'btn btn-secondary',
            text: cityName
        });
        $('.list-group').append(newBu);
     }
    return;
}

$(document).ready(function () {
    init();
    $('#searchBtn').click(function () {
        seBtn = $(this).attr('id');
        ciName = $('#searchInput').val();
        if (!ciName) return;
        renCiBu(ciName);
        ciBtnList.push(ciName);
        localStorage.setItem('searchHistory', JSON.stringify(ciBtnList));
        searchCi(seBtn, ciName);
        ciName = '';
        $('#searchInput').val(ciName);
        return;
    });
});

$("#buttons-list").on("click", "button", function () {
    var buttonId = $(this).attr("id");
    var cityName = $(this).html();
    searchCi(buttonId, cityName);
});
