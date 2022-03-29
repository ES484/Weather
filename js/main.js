'use strict';
var data;
let searchInput = document.getElementById('searchInp');
let nextDay = document.getElementById('tomorrow-dayname');
let OtherDay = document.getElementById('aftertomorrow-dayname');
const d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// function to get date of Today
function getToday() 
{
    document.getElementById('today-day').innerHTML = weekday[d.getDay()];
    document.getElementById('today-date').innerHTML = monthNames[d.getMonth()];
    document.getElementById('today-date-number').innerHTML = d.getDate();
}
// function to get date of Tomorrow and After Tomorrow 
function getOtherDays() {
    if (d.getDay() == 6) {
        document.getElementById('tomorrow-dayname').innerHTML =  weekday[0];
        document.getElementById('aftertomorrow-dayname').innerHTML = weekday[1];
    }
    else if (d.getDay() == 5)
    {
        document.getElementById('tomorrow-dayname').innerHTML =  weekday[d.getDay()+1];
        document.getElementById('aftertomorrow-dayname').innerHTML = weekday[0]; 
    }
    else
    {
        document.getElementById('tomorrow-dayname').innerHTML =  weekday[d.getDay()+1];
        document.getElementById('aftertomorrow-dayname').innerHTML = weekday[d.getDay()+2]; 
    }
}
getToday();
getOtherDays();

// function to get Weather of  Today then Tomorrow and After Tomorrow  
async function getWeatherData(region)
{
    data= await fetch(`http://api.weatherapi.com/v1/search.json?key=9e40a4a4281942d3b47224620220901&q=${region}`); 
    data= await data.json();
    if (data.length != 0) {
        let city= ``;
        let deg= ``;
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) && data[i].name != null) {
                city = data[i].name;
                data=  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9e40a4a4281942d3b47224620220901&q=${region}&days=3`);
                data= await data.json();
                console.log(data);
                deg = data.current.temp_c;
            }
        }
        document.getElementById('city').innerHTML = city;
        document.getElementById('degree').innerHTML = `<span>${deg}</span><sup>o</sup><span>C</span>`;
        document.getElementById('iconRefersTo').innerHTML = `<img src="http:${data.current.condition.icon}" alt="">`;
        document.getElementById('status').innerHTML = data.current.condition.text;
        getTomorrowWeather();
        getAfterTomorrowWeather();
    }
}
searchInput.addEventListener('keyup', function (e) {
    if (e.target.value.length <3) {
        getWeatherData('cairo');
        console.log(e.target.value);
    }
    else
    {
        getWeatherData(e.target.value);
    }
});
// function to get Weather of  Tomorrow 
function getTomorrowWeather() 
{
    document.getElementById('tomorrow-weather-details').innerHTML= 
    `
    <img src="http:${data.forecast.forecastday[1].day.condition.icon}" alt="">
    <h4>${data.forecast.forecastday[1].day.maxtemp_c}</h4>
    <h5>${data.forecast.forecastday[1].day.mintemp_c}</h5>
    <h6>${data.forecast.forecastday[1].day.condition.text}</h6>
    `;
}

// function to get Weather of  After Tomorrow 
function getAfterTomorrowWeather() 
{
    document.getElementById('aftertomorrow-weather-details').innerHTML= 
    `
    <img src="http:${data.forecast.forecastday[2].day.condition.icon}" alt="">
    <h4>${data.forecast.forecastday[2].day.maxtemp_c}</h4>
    <h5>${data.forecast.forecastday[2].day.mintemp_c}</h5>
    <h6>${data.forecast.forecastday[2].day.condition.text}</h6>
    `;
}











