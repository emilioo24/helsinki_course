import { useState, useEffect } from 'react'
import services from './services/crud';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState('');
  
  useEffect(() => {
    services.read()
      .then((readPersons) => {
        setPersons(readPersons)
      })
      .catch((error) => {
        alert('Hubo un error al leer los datos');
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      const idPersonUptade = persons.find(person => person.name === newName);
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPhone = {...idPersonUptade, number: newPhone};
        services.update(changedPhone, idPersonUptade.id)
          .then((personUpdate) => {
            setPersons(persons.map(person => person.id !== idPersonUptade.id ? person : personUpdate));
            setShowSearch(persons.map(person => person.id !== idPersonUptade.id ? person : personUpdate));
            setNewName('');
            setNewPhone('');
            setSearch('');
          })
          .catch((error) => {
            alert('Hubo un error al actualizar el dato');
          })
      }
    } else if (persons.find((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      }
      
      services.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewPhone('');
        })
        .catch((error) => {
          alert('Hubo un error al crear el nuevo dato');
        })
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }
  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setShowSearch(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const handleDelete = (event) => {

    const nameDelete = persons.find(person => person.id === event.target.value);

    if(window.confirm(`Delete ${nameDelete.name} ?`)) {
      services.deletePerson(event.target.value)
        .then((deleted) => {
          console.log(deleted.id);
          setPersons(persons.filter(person => person.id !== deleted.id));
          setShowSearch(persons.filter(person => person.id !== deleted.id));
          setSearch('');
        })
        .catch((error) => {
          alert('Hubo un error al eliminar el dato');
        })
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newPhone={newPhone} 
        handleChangeName={handleChangeName} 
        handleChangePhone={handleChangePhone} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        showSearch={showSearch} 
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App