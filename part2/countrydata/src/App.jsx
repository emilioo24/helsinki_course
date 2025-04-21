import { useState, useEffect, use } from "react";
import axios from "axios";
import DataCountry from "./components/DataCountry";
import ListCountry from "./components/ListCountry";

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState([]);
  const [isData, setIsData] = useState(false);
  const [extendedData, setExtendedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState('');

  const apiKey = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert('error al obtener la data');
      })
  }, []);

  const Weather = (capitalName) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${apiKey}`)
      .then((response) => {
        setWeather(response.data);
        setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      })
      .catch((error) => {
        alert('Hubo un error al obtener la data del clima');
      });
  }

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value === '') {
      setShow([]);      
    } else {
      const onlySearch = countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase()));
      if (onlySearch.length === 1) {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${onlySearch[0].name.common}`)
          .then((response) => {
            setExtendedData(response.data);
            setIsData(true);
            Weather(onlySearch[0].capital);
            setShow([]);
          })
          .catch((error) => {
            alert('error al obtener la data del país');
          })
      } else {
        setIsData(false);
        setExtendedData([]);
        setShow(onlySearch);
      }
    }
  }

  const handleLook = (event) => {
    const value = event.target.value;
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
      .then((response) => {
        setExtendedData(response.data);
        Weather(response.data.capital[0])
        setIsData(true);
        setShow([]);
      })
      .catch((error) => {
        alert('error al obtener la data del país');
      })
  }
  
  return(
    <div>
      find countries <input type="search" value={search} onChange={handleChangeSearch} />
      <div>
        {loading ? <p>Loading...</p> : null}
        <ListCountry show={show} handleLook={handleLook} />
        {isData ? <DataCountry country={extendedData} weather={weather} icon={icon} /> : null}
      </div>
    </div>
  )
}

export default App;