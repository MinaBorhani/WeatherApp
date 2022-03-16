const cityForm = document.querySelector('form');

const updatecity = async (city) =>{

    console.log(city);

    const cityDats =await getCity(city);
    const weather = await getWeather(cityDats.Key);

    return {
        cityDats : cityDats,
        weather : weather
    }
};

cityForm.addEventListener('submit' , e =>{
    //prevent default action
    e.preventDefault();

    //get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui whith new city
    updatecity(city)
    .then(data =>console.log(data))
    .catch(err => console.log(err));
});