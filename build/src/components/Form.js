const PersonForm = (props) => (
    <form onSubmit={props.addPerson}>
    <div>
      Name: <input  value={props.name} onChange={props.handleNameChange}/>
    </div>
    <div>
      Number: <input value={props.number} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm;