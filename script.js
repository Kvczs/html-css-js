const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.search-button');
const apiKey = "e79e7ac720cd4985bd6f4553634c1f05";
const base = "https://api.openweathermap.org/data/2.5/";
const locationEl = document.querySelector('.location');
const currentWeatherEl = document.querySelector('.current-weather-location');
const tempEl = document.querySelector('.temp');
const descEl = document.querySelector('.description');
const selectPlEl = document.querySelector('.select-pl');
const selectEnEl = document.querySelector('.select-en');
const searchPlEl = document.querySelector('.search-pl');
const searchEnEl = document.querySelector('.search-en');

let currentLang = 0;
selectPlEl.addEventListener('click', function langPl() {
    if (currentLang === 0){
        return;
    }
    else if (currentLang === 1){
        currentLang = 0;
        if (locationEl.innerHTML === "<i class='fas fa-location-arrow'></i> Nie podano lokalizacji!)"){
            return;
        }
        else{
            currentLang = 0
            if (searchValue !==''){
                fetchWeather();
                getCurrentWeather();
            }
        };
    };
        locationEl.style.color = 'white'
        currentWeatherEl.textContent = 'Pogoda dla: brak lokacji';
        searchEnEl.textContent = '';
        tempEl.innerHTML = `-`;
        descEl.innerHTML = ``;
        locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Nie podano lokacji!`;
        searchInput.placeholder = 'Podaj lokację';
        document.title = 'Geoguessr ale to pogoda';
});
selectEnEl.addEventListener('click', function langEn() {
    if (currentLang === 1){
        return;
    }
    else if (currentLang === 0){
        currentLang = 1;
        if (locationEl.innerHTML === "<i class='fas fa-location-arrow'></i> No location given!"){
            return;
        }
        else{
            currentLang = 1;
            if (searchValue !==''){
                fetchWeather();
                getCurrentWeather();
            }
        };
        locationEl.style.color = 'white'
        searchPlEl.textContent = '';
        searchEnEl.textContent = 'Weather for: no location';
        tempEl.innerHTML = `-`;
        descEl.innerHTML = ``;
        locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> No location given!`};
        searchInput.placeholder = 'Enter location';
        document.title = 'Geoguessr but its the weather';
});

const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const daysEng = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'];
const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    if (currentLang === 0) {
        timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
    } else if (currentLang === 1) {
        timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        dateEl.innerHTML = daysEng[day] + ', ' + date + ' ' + monthsEng[month];
    }
}, 100);

let searchValue = '';
let url = '';
let forecastUrl = '';

function fetchWeather() {
    const searchInput = document.querySelector('.search');
    searchValue = searchInput.value.trim();
    console.log(searchValue);
    url = base+'weather?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=pl';
    urlEn = base+'weather?q='+searchValue+'&appid='+apiKey+'&units=metric&lang=en';
    console.log(url);
};

searchButton.addEventListener('click', () =>
{
    fetchWeather();
});
searchInput.addEventListener('keypress', (event) =>
{
    if (event.key === "Enter") 
    {
        fetchWeather();
    }
});

function getCurrentWeather() {
    if (currentLang === 0) {
        fetch(url).then(res => res.json()).then(data =>{
            if (searchValue === ''){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Wprowadź lokalizację!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                
                currentWeatherEl.textContent = 'Pogoda dla: brak lokacji';
            }
            else if (data.cod = 404){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Nie znaleziono lokalizacji!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                currentWeatherEl.textContent = 'Pogoda dla: brak lokacji';
            }
            console.log(data);
            searchEnEl.textContent = ''
            const comma = ', ';
            let icon = data.weather['0'].icon;
            let temperature = data.main.temp;
            let desc = data.weather['0'].description;
            locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> ${data.name}${comma}${data.sys.country}`;
            locationEl.style.color = 'white'
            currentWeatherEl.innerHTML = `Pogoda dla: ${data.name}${comma}${data.sys.country}<img class="weather-img" src="https://openweathermap.org/img/wn/${icon}@4x.png">`;
            tempEl.innerHTML = `${Math.round(temperature)} °C`;
            descEl.innerHTML = `${desc}`;
        });
    } else if (currentLang === 1) {
        fetch(urlEn).then(res => res.json()).then(data =>{
            if (searchValue === ''){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Enter location!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
             
                currentWeatherEl.textContent = 'Weather for: no location';
            }
            else if (data.cod = 404){
                locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> Location not found!`;
                locationEl.style.color = '#ee6b6e';
                tempEl.textContent = '-';
                descEl.textContent = '';
                currentWeatherEl.textContent = 'Weather for: no location';
           
            }
            console.log(data);
            searchEnEl.textContent = ''
            const comma = ', ';
            let icon = data.weather['0'].icon;
            let temperature = data.main.temp;
            let desc = data.weather['0'].description;
            locationEl.innerHTML = `<i class='fas fa-location-arrow'></i> ${data.name}${comma}${data.sys.country}`;
            locationEl.style.color = 'white'
            currentWeatherEl.innerHTML = `Weather for: ${data.name}${comma}${data.sys.country}<img class="weather-img" src="https://openweathermap.org/img/wn/${icon}@4x.png">`;
            tempEl.innerHTML = `${Math.round(temperature)} °C`;
            descEl.innerHTML = `${desc}`;
        });
    };
};

searchButton.addEventListener('click', () =>
{
    getCurrentWeather();
});
searchInput.addEventListener('keypress', (event) =>
{
    if (event.key === "Enter") 
    {
        getCurrentWeather();
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return formattedDate;
};




