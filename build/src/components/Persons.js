const Person = ({person, handleDelete}) => (
    <div>
        {person.name} {person.number}
        <button type="button" onClick={() => handleDelete(person)}>Delete</button>
    </div>
)

const Persons = ({list, handleDelete}) => (
    <div>
        {list.map(person => 
            <Person key={person.id} person={person} handleDelete={handleDelete} />
        )}
    </div>
)

export default Persons;