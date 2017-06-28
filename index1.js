var elem = document.querySelector('.api-location');
var curentWeather = document.querySelector('.curent-weather');
var maxTemperature = document.querySelector('.max-temperature');
var minTemperature = document.querySelector('.min-temperature');
var loc = document.querySelector('.loc');
var output = document.getElementById("out");
var info = document.querySelector("#info h1");
var infoLocation = document.querySelector("#info h2");
var lat;
var long;
var degree;
var getPrevius = document.querySelector('.previus');
var getCurrent = document.querySelector('.current');
var getNext = document.querySelector('.next');
window.onload = geoFindMe(); // при запуску зпитуєм локацію юзера і виводим її з АРІ як заголовок
// find user's location 
function geoFindMe() {
	
	if (!navigator.geolocation){
		output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}
	
	function success(position) {
		lat  = position.coords.latitude;
		long = position.coords.longitude;
		degree = lat.toFixed(4) + ',' + long.toFixed(4);
		console.log(degree);
		output.innerHTML = '';
		var img = new Image();
		img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=17&size=300x300&sensor=false";
    output.appendChild(img);
    geoLocation();
    getTodayWeather();
  };
  function error() {
  	output.innerHTML = "Unable to retrieve your location";
  };
  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);

}
function geoLocation(){
	$.ajax({
		url: 'https://freegeoip.net/json?lang=ru',
		dataType: 'jsonp'
	}).done(function(data) {
		info.innerHTML = '<p> Now You Are Standing In </p>';
		infoLocation.innerHTML = data.country_name + ', ' + data.region_name + ', ' + data.city;
		console.log(data)
	});
}

function getTodayWeather(){
	$.ajax({
		url: 'https://api.darksky.net/forecast/f0c05103dafd70f995d915fd6188fe9b/' + degree + ',' + currentWeather + '?lang=ru&units=si',
		dataType: 'jsonp'
	}).done(function(data) {
		curentWeather.innerHTML = 'Сегодня: ' + data.currently.summary + ', ' + data.daily.data[0].summary;
		maxTemperature.innerHTML = 'Максимальная температура : ' + data.daily.data[0].temperatureMax + '&#176;';
		minTemperature.innerHTML = 'Минимальная температура : ' + data.daily.data[0].temperatureMin + '&#176;';
		console.log(data);
	})
}
getCurrent.onclick = getTodayWeather;

function getTomorrowWeather(){
	$.ajax({
		url: 'https://api.darksky.net/forecast/f0c05103dafd70f995d915fd6188fe9b/' + degree + ',' + nextWeather + '?lang=ru&units=si',
		dataType: 'jsonp'
	}).done(function(data) {
		curentWeather.innerHTML = 'Завтра будет: ' + data.currently.summary + ', ' + data.daily.data[0].summary;
		maxTemperature.innerHTML = 'Максимальная температура : ' + data.daily.data[0].temperatureMax + '&#176;';
		minTemperature.innerHTML = 'Минимальная температура : ' + data.daily.data[0].temperatureMin + '&#176;';
		console.log(data);
	})
}
getNext.onclick = getTomorrowWeather;

function getPastWeather(){
	$.ajax({
		url: 'https://api.darksky.net/forecast/f0c05103dafd70f995d915fd6188fe9b/' + degree + ',' + previusWeather + '?lang=ru&units=si',
		dataType: 'jsonp'
	}).done(function(data) {
		curentWeather.innerHTML = 'Вчера было: '+ data.currently.summary + ', ' + data.daily.data[0].summary;
		maxTemperature.innerHTML = 'Максимальная температура : ' + data.daily.data[0].temperatureMax + '&#176;';
		minTemperature.innerHTML = 'Минимальная температура : ' + data.daily.data[0].temperatureMin + '&#176;';
		console.log(data);
	})
}
getPrevius.onclick = getPastWeather;

function getCurrentWeather (){
	var dateNow = new Date();
	var day = dateNow.getDate();
	var month = dateNow.getMonth() + 1;
	var year = dateNow.getFullYear();
	var hour = dateNow.getHours();
	var minutes = dateNow.getMinutes();
	var seconds = dateNow.getSeconds();
	if(day < 10){
		day = '0' + day;
	}
	if(month < 10){
		month = '0' + month;
	}
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var currentDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds;
	return currentDate;
}
var currentWeather = getCurrentWeather();

function getNextWeather (){
	var dateNow = new Date();
	var day = dateNow.getDate() + 1;
	var month = dateNow.getMonth() + 1;
	var year = dateNow.getFullYear();
	var hour = dateNow.getHours();
	var minutes = dateNow.getMinutes();
	var seconds = dateNow.getSeconds();
	if(day < 10){
		day = '0' + day;
	}
	if(month < 10){
		month = '0' + month;
	}
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var nextDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds;
	return nextDate;
}
var nextWeather = getNextWeather();

function getPreviusWeather (){
	var dateNow = new Date();
	var day = dateNow.getDate() - 1;
	var month = dateNow.getMonth() + 1;
	var year = dateNow.getFullYear();
	var hour = dateNow.getHours();
	var minutes = dateNow.getMinutes();
	var seconds = dateNow.getSeconds();
	if(day < 10){
		day = '0' + day;
	}
	if(month < 10){
		month = '0' + month;
	}
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var nextDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds;
	return nextDate;
}
var previusWeather = getPreviusWeather();
