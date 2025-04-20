const Persons = ({ persons, showSearch, search, handleDelete }) => {
    return (
        <ul>
        {search === '' ? persons.map((person) => {
          return(
            <li key={person.id}>
              <span>{person.name} {person.number} </span>  
              <button onClick={handleDelete} value={person.id}>delete</button>
            </li>
          )
        }) : showSearch.map((show) => {
          return(
            <li key={show.id}>
              <span>{show.name} {show.number} </span>
              <button onClick={handleDelete} value={show.id}>delete</button>
            </li>
          )  
        })}
      </ul>
    )
}

export default Persons;