const searchButton = document.querySelector('[data-location]')
const inputSearch = document.querySelector('[data-city]')
const back = document.querySelector('.back')
const temp = document.querySelector('.temp')
const clouds = document.querySelector('.clouds')
const location1 = document.querySelector('.location')
const spanDisplay = document.querySelector('[data-span-display]')
const weatherDisplay = document.querySelector('[data-weather-display]')
const imageTag = document.querySelector('[data-image]')

// Weather API
const apiKey = `63c8878e4f9fbdea6f5667f42f9913c9`
let apiLink;

const images = {
    "clear_sky": "./images/sunny.png",
    "cloudy": "./images/partly_cloudy.png",
    "raining": "./images/rain_light.png",
    "overcast": "./images/cloudsss.png"
}

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


let celcius;
function KelvinToCelcius(kelvin){
    celcius = kelvin - 273
    return celcius.toFixed(2)
}

function render(){
    apiLink = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}`
    fetch(apiLink)
        .then(response => response.json())
        .then(data => {
            temp.innerHTML=KelvinToCelcius(data.main.temp) + ' °C'
            clouds.innerHTML=data.weather[0].description
            location1.innerHTML = data.name + ', ' + data.sys.country
            document.querySelector('.feels').innerHTML=KelvinToCelcius(data.main.feels_like) + ' °C'
            document.querySelector('.span-min').innerHTML=KelvinToCelcius(data.main.temp_min) + ' °C'
            document.querySelector('.span-max').innerHTML=KelvinToCelcius(data.main.temp_max) + ' °C'
            document.querySelector('.speed-wind').innerHTML=data.wind.speed + ' m/s'
            inputSearch.value=''
            console.log(data);

            if(data.weather[0].main==='Clear'){
                // console.log('sky');
                imageTag.src = images.clear_sky;
            }
            else if(data.weather[0].description==='overcast clouds'){
                // console.log('sky');
                imageTag.src = images.overcast;
            }
            else if(data.weather[0].main==='Clouds'){
                // console.log('sky');
                imageTag.src = images.cloudy;
            }
            else if(data.weather[0].main==='Rain' || result.weather[0].description==='showers' ){
                // console.log('sky');
                imageTag.src = images.raining;
            }
        })

    }
    render()

function requestApi(city) {
    apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(apiLink)
        .then(response => response.json())
        .then(data => {
            weatherDetails(data)
            console.log(data);

            if(data.weather[0].main==='Clear'){
                // console.log('sky');
                imageTag.src = images.clear_sky;
            }
            else if(data.weather[0].description==='overcast clouds'){
                // console.log('sky');
                imageTag.src = images.overcast;
            }
            else if(data.weather[0].main==='Clouds'){
                // console.log('sky');
                imageTag.src = images.cloudy;
            }
            else if(data.weather[0].main==='Rain' || result.weather[0].description==='showers' ){
                // console.log('sky');
                imageTag.src = images.raining;
            }
        })

}



function weatherDetails(data) {
    temp.innerHTML=KelvinToCelcius(data.main.temp) + ' °C'
    clouds.innerHTML=data.weather[0].description
    location1.innerHTML = data.name + ', ' + data.sys.country
    document.querySelector('.feels').innerHTML=KelvinToCelcius(data.main.feels_like) + ' °C'
    document.querySelector('.span-min').innerHTML=KelvinToCelcius(data.main.temp_min) + ' °C'
    document.querySelector('.span-max').innerHTML=KelvinToCelcius(data.main.temp_max) + ' °C'
    document.querySelector('.speed-wind').innerHTML=data.wind.speed + ' m/s'
    inputSearch.value=''
}

