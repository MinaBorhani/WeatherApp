const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {

    console.log(data);

    // const cityDats = data.cityDats;
    // const weather  = data.weather;

    //desttructure properties
    const {cityDats , weather} = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDats.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //updata the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
     timeSrc = "img/day.svg";
    } else {
     timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);


    //remove the d-non class if present
    if(card.classList.contains('d-none'));
    card.classList.remove('d-none');
};




const updatecity = async (city) =>{

    // console.log(city);

    const cityDats =await getCity(city);
    const weather = await getWeather(cityDats.Key);

    return { cityDats, weather }
};

cityForm.addEventListener('submit' , e =>{
    //prevent default action
    e.preventDefault();

    //get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui whith new city
    updatecity(city)
    // .then(data =>console.log(data))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});