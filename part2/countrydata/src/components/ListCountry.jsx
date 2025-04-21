const ListCountry = ({ show, handleLook }) => {
    return(
        <ul>
          {show.length <= 10 ? show.map((country) => {
            return (
                <li key={country.name.official}>
                    {country.name.common}
                    <button onClick={handleLook} value={country.name.official} type="submit">Show</button>
                </li>
            )
          }) : <p>Too many matches, specify another filter</p>}
        </ul>
    )
}

export default ListCountry;