import { useState, useEffect } from 'react'
import services from './services/crud';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Message from './components/Message';

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    services.read()
      .then((readPersons) => {
        setPersons(readPersons)
      })
      .catch((error) => {
        setNotification('There was an error reading the data');
        setIsError(true);
        setTimeout(() => {
          setNotification(null);
        }, 5000)
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
            setNotification(`The phone number of ${newName} was updated`);
            setIsError(false);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName('');
            setNewPhone('');
            setSearch('');
          })
          .catch((error) => {
            if (error.status === 404) {
              setNotification(`Information of ${newName} has already been removed from server`);
              setIsError(true);
              setTimeout(() => {
                setNotification(null);
              }, 5000);
            } else {
              setNotification('There was an error updating the data');
              setIsError(true);
              setTimeout(() => {
                setNotification(null);
              }, 5000);
            }
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
          setNotification(`Added ${newName}`);
          setIsError(false);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName('');
          setNewPhone('');
        })
        .catch((error) => {
          setNotification('There was an error creating the data');
          setIsError(true);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
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
          setPersons(persons.filter(person => person.id !== deleted.id));
          setShowSearch(persons.filter(person => person.id !== deleted.id));
          setSearch('');
        })
        .catch((error) => {
          setNotification('There was an error deleting the data');
          setIsError(true);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={notification} isError={isError} />
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