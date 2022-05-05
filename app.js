const searchButton = document.querySelector('[data-location]')
const inputSearch = document.querySelector('[data-city]')
const back = document.querySelector('.back')
const temp = document.querySelector('.temp')
const clouds = document.querySelector('.clouds')
const location1 = document.querySelector('.location')
const spanDisplay = document.querySelector('[data-span-display]')
const weatherDisplay = document.querySelector('[data-weather-display]')

// Weather API
const apiKey = `63c8878e4f9fbdea6f5667f42f9913c9`
let apiLink;

inputSearch.addEventListener('keyup', e => {
    e = e.key;
    if (e == 'Enter' && inputSearch.value != "") {
        requestApi(inputSearch.value)
        weatherDisplay.setAttribute('data-weather-display', 'true')  
        spanDisplay.setAttribute('data-span-display', 'false')
        inputSearch.value=''
    }
    else{
        spanDisplay.setAttribute('data-span-display', 'true')
    }
    // weatherDetails() 
})

searchButton.addEventListener('click', ()=>{
    if(inputSearch.value != ""){
        requestApi(inputSearch.value)
        weatherDisplay.setAttribute('data-weather-display', 'true')
        spanDisplay.setAttribute('data-span-display', 'false')
        inputSearch.value=''
    }
    else{
        spanDisplay.setAttribute('data-span-display', 'true')
    }
})

back.addEventListener('click', ()=>{
    weatherDisplay.setAttribute('data-weather-display', 'false')
})

function render(){
    apiLink = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}`
    fetch(apiLink)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML=KelvinToCelcius(data.main.temp) + '°C'
            clouds.innerHTML=data.weather[0].description
            location1.innerHTML = data.name + ', ' + data.sys.country
            document.querySelector('.feels').innerHTML=KelvinToCelcius(data.main.feels_like) + '°C'
            document.querySelector('.span-min').innerHTML=KelvinToCelcius(data.main.temp_min) + '°C'
            document.querySelector('.span-max').innerHTML=KelvinToCelcius(data.main.temp_max) + '°C'
            document.querySelector('.speed-wind').innerHTML=data.wind.speed
            inputSearch.value=''
        })

    }
    render()

function requestApi(city) {
    apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(apiLink)
        .then(response => response.json())
        .then(result => weatherDetails(result))

}

function weatherDetails(data) {
    // KelvinToCelcius(info.main.feels_like)
    console.log(data);
    temp.innerHTML=KelvinToCelcius(data.main.temp) + '°C'
    clouds.innerHTML=data.weather[0].description
    location1.innerHTML = data.name + ', ' + data.sys.country
    document.querySelector('.feels').innerHTML=KelvinToCelcius(data.main.feels_like) + '°C'
    document.querySelector('.span-min').innerHTML=KelvinToCelcius(data.main.temp_min) + '°C'
    document.querySelector('.span-max').innerHTML=KelvinToCelcius(data.main.temp_max) + '°C'
    document.querySelector('.speed-wind').innerHTML=data.wind.speed
    inputSearch.value=''
}

let celcius;
function KelvinToCelcius(kelvin){
    celcius = kelvin - 273
    return celcius.toFixed(2)
}