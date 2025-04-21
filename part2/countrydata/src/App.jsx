import { useState, useEffect, use } from "react";
import axios from "axios";

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState([]);
  const [isData, setIsData] = useState(false);
  const [extendedData, setExtendedData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
      setShow([]);      
    } else {
      setShow(countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())));
      if (show.length === 1) {
        setIsData(true);
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${show[0].name.common}`)
          .then((response) => {
            setExtendedData(response.data);
            setShow([]);
          })
      }
    }
  }
  
  return(
    <div>
      find countries <input type="search" value={search} onChange={handleChangeSearch} />
      <div>
        {loading ? <p>Loading...</p> : null}
        <ul>
          {show.length <= 10 ? show.map((country) => {
            return <li key={country.name.official}>{country.name.common}</li>
          }) : <p>Too many matches, specify another filter</p>}
        </ul>
        {extendedData != '' ? 
          <h1>hola</h1>
        : null}
      </div>
    </div>
  )
}

export default App;