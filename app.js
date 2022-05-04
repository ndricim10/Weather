// Selectors
const searchButton = document.querySelector('[data-location]')
const inputSearch = document.querySelector('[data-city]')
const back = document.querySelector('.back')
const temp = document.querySelector('.temp')
const clouds = document.querySelector('.clouds')
const location1 = document.querySelector('.location')

// Weather API
const apiKey = `63c8878e4f9fbdea6f5667f42f9913c9`
let apiLink;

inputSearch.addEventListener('keyup', e => {
    e = e.key;
    if (e == 'Enter' && inputSearch.value != "") {
        requestApi(inputSearch.value)
    }
    // weatherDetails() 
})


function requestApi(city) {
    apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(apiLink)
        .then(response => response.json())
        .then(result => weatherDetails(result))

}

function weatherDetails(info) {
    // KelvinToCelcius(info.main.feels_like)
    console.log(info);
    temp.innerHTML=KelvinToCelcius(info.main.temp) + '°C'
    clouds.innerHTML=info.weather[0].description
    location1.innerHTML = info.name + ', ' + info.sys.country;
}

let celcius;
function KelvinToCelcius(kelvin){
    celcius = kelvin - 273
    return celcius.toFixed(2)
}