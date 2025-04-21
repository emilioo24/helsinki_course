const DataCountry = ({ country, weather, icon }) => {

    icon === '' ? icon = 'https://openweathermap.org/img/wn/01d@2x.png' : icon;
    
    const celsius = weather && weather.main ? weather.main.temp : '';
    const wind = weather && weather.wind ? weather.wind.speed : '';
    const condition = weather && weather.weather ? weather.weather[0].main : '';
    
    return(
        <div>
            <h1>{country.name.common}</h1>
            <span>Capital {country.capital}</span>
            <br />
            <span>Area {country.area}</span>
            
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((e) => {
                    return <li key={e}>{e}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {Math.round(celsius - 273.15)} Celsius</p>
            <img src={icon} alt={condition} title={condition} />
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default DataCountry;