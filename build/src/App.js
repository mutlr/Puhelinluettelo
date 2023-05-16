import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/Form';
import personService from './services/Persons';
import {ErrorMessage, SucessMessage} from './components/Messages';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const displaySucess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  }
  
  const displayError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }
  const filterPersons = () => {
    if (filter === '') {
      return persons;
    }
    return persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()));
  }

  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
        personService.deletePerson(p.id)
        .catch(err => {
          console.log(err)
          displayError(`Couldn't delete person ${p.name}`);
        });
        setPersons(persons.filter(person => person.id !== p.id))
        displaySucess(`${p.name} deleted!`)
    }
  }
  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldNumber = persons.find(n => n.name.toLowerCase() === newName.toLowerCase());
        const changedNumber = {...oldNumber, number: newNumber};

        personService
        .replaceExisting(changedNumber).then(response => {
          setPersons(persons.map(person => {
            if (person.id === response.id) {
              return response;
            } 
            return person;
          }))
          displaySucess(`Number replaced with new one!`);
        })
        .catch(err => {
          console.log(err);
          displayError("There was a problem replacing the number");
        });
      }
    } else {
      const person = {name: newName, number: newNumber};
      personService.create(person)
      .then(response => {
        setPersons(persons.concat(response.data));
        displaySucess("Person added succesfully!");
      }).catch (err => {
        console.log(err)
        displayError("There was an error adding a person")
      });
    }
    setNewName('');
    setNewNumber('');
  }

  useEffect(() => {
    console.log("Fetching data...")
    personService
      .getAll()
      .then(response =>  {
        setPersons(response.data)
        displaySucess("All data loaded!")
      })
      .catch((err) => {
        console.log(err)
        displayError("There was a problem loading the data. Refresh the page.");
      });
  }, [])
  
  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <SucessMessage message={successMessage}/>

      <h2>Phonebook</h2>

      <Filter value={filter} handleChange={handleFilterChange} />

      <h2>Add a new phonenumber</h2>

      <PersonForm addPerson={addPerson} 
      name={newName} handleNameChange={handleNameChange} 
      number={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons list={filterPersons()} handleDelete={handleDelete}/>
    </div>
  )

}

export default App